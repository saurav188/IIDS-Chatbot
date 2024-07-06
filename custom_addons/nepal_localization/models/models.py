from odoo.fields import Date
from odoo import api,models,fields
from odoo.tools import format_date
import nepali_datetime
from datetime import datetime


class QwebDateField(models.AbstractModel):
    _inherit = 'ir.qweb.field.date'

    @api.model
    def value_to_html(self, value, options):
        # res = super().value_to_html(value, options)
        try:       
            return nepali_datetime.date.from_datetime_date(value.date())
        except:
            # return nepali_datetime.date.from_datetime_date(value)
            try:
                return nepali_datetime.date.from_datetime_date(value)
            except:
                return value

class QwebDateTimeField(models.AbstractModel):
    _inherit = 'ir.qweb.field.datetime'

    @api.model
    def value_to_html(self, value, options):
        # res = super().value_to_html(value, options)
        try:       
            return str(nepali_datetime.date.from_datetime_date(value.date()))+' '+str(value).split(" ")[1].split('.')[0]
        except:
            try:
                return nepali_datetime.datetime.from_datetime_date(value)
            except:
                return value
            

class MailTrackingNepali(models.Model):
    _inherit = 'mail.tracking.value'

    @api.model
    def _create_tracking_values(self, initial_value, new_value, col_name, col_info, record):

        """ Prepare values to create a mail.tracking.value. It prepares old and
        new value according to the field type.

        :param initial_value: field value before the change, could be text, int,
          date, datetime, ...;
        :param new_value: field value after the change, could be text, int,
          date, datetime, ...;
        :param str col_name: technical field name, column name (e.g. 'user_id);
        :param dict col_info: result of fields_get(col_name);
        :param <record> record: record on which tracking is performed, used for
          related computation e.g. finding currency of monetary fields;

        :return: a dict values valid for 'mail.tracking.value' creation;
        """
        print(new_value,initial_value, new_value, col_name, col_info)
        field = self.env['ir.model.fields']._get(record._name, col_name)
        if not field:
            raise ValueError(f'Unknown field {col_name} on model {record._name}')

        values = {'field_id': field.id}

        if col_info['type'] in {'integer', 'float', 'char', 'text', 'datetime'}:
            values.update({
                f'old_value_{col_info["type"]}': initial_value,
                f'new_value_{col_info["type"]}': new_value
            })
        elif col_info['type'] == 'monetary':
            values.update({
                'currency_id': record[col_info['currency_field']].id,
                'old_value_float': initial_value,
                'new_value_float': new_value
            })
        elif col_info['type'] == 'date':
            print(new_value)
            values.update({
                'old_value_datetime': initial_value and fields.Datetime.to_string(datetime.combine(fields.Date.from_string(initial_value), datetime.min.time())) or False,
                'new_value_datetime': new_value and fields.Datetime.to_string(datetime.combine(fields.Date.from_string(new_value), datetime.min.time())) or False,
            })
        elif col_info['type'] == 'boolean':
            values.update({
                'old_value_integer': initial_value,
                'new_value_integer': new_value
            })
        elif col_info['type'] == 'selection':
            values.update({
                'old_value_char': initial_value and dict(col_info['selection']).get(initial_value, initial_value) or '',
                'new_value_char': new_value and dict(col_info['selection'])[new_value] or ''
            })
        elif col_info['type'] == 'many2one':
            values.update({
                'old_value_integer': initial_value.id if initial_value else 0,
                'new_value_integer': new_value.id if new_value else 0,
                'old_value_char': initial_value.display_name if initial_value else '',
                'new_value_char': new_value.display_name if new_value else ''
            })
        elif col_info['type'] in {'one2many', 'many2many'}:
            values.update({
                'old_value_char': ', '.join(initial_value.mapped('display_name')) if initial_value else '',
                'new_value_char': ', '.join(new_value.mapped('display_name')) if new_value else '',
            })
        else:
            raise NotImplementedError(f'Unsupported tracking on field {field.name} (type {col_info["type"]}')

        return values

    def _tracking_value_format(self):
        """ Return structure and formatted data structure to be used by chatter
        to display tracking values. Order it according to asked display, aka
        ascending sequence (and field name).

        :return list: for each tracking value in self, their formatted display
          values given as a dict;
        """
        if not self:
            return []
        field_models = self.field_id.mapped('model')
        if len(set(field_models)) != 1:
            raise ValueError('All tracking value should belong to the same model.')
        TrackedModel = self.env[field_models[0]]
        tracked_fields = TrackedModel.fields_get(self.field_id.mapped('name'), attributes={'string', 'type'})
        fields_col_info = (
            tracked_fields.get(tracking.field_id.name) or {
                'string': tracking.field_info['desc'],
                'type': tracking.field_info['type'],
            }
            for tracking in self
        )
        fields_sequence_map = dict(
            {tracking.field_info['name']: tracking.field_info.get('sequence', 100)
             for tracking in self.filtered('field_info')},
            **dict(TrackedModel._mail_track_order_fields(tracked_fields))
        )

        formatted = [
            {
                'changedField': col_info['string'],
                'id': tracking.id,
                'fieldName': tracking.field_id.name or tracking.field_info['name'],
                'fieldType': col_info['type'],
                'newValue': {
                    'currencyId': tracking.currency_id.id,
                    'value': tracking._format_display_value(col_info['type'], new=True)[0],
                },
                'oldValue': {
                    'currencyId': tracking.currency_id.id,
                    'value': tracking._format_display_value(col_info['type'], new=False)[0],
                },
            }
            for tracking, col_info in zip(self, fields_col_info)
        ]
        formatted.sort(
            key=lambda info: (fields_sequence_map[info['fieldName']], info['fieldName']),
            reverse=False,
        )
        return formatted

    def _format_display_value(self, field_type, new=True):
        """ Format value of 'mail.tracking.value', according to the field type.

        :param str field_type: Odoo field type;
        :param bool new: if True, display the 'new' value. Otherwise display
          the 'old' one.
        """
        field_mapping = {
            'boolean': ('old_value_integer', 'new_value_integer'),
            'date': ('old_value_datetime', 'new_value_datetime'),
            'datetime': ('old_value_datetime', 'new_value_datetime'),
            'char': ('old_value_char', 'new_value_char'),
            'float': ('old_value_float', 'new_value_float'),
            'integer': ('old_value_integer', 'new_value_integer'),
            'monetary': ('old_value_float', 'new_value_float'),
            'text': ('old_value_text', 'new_value_text'),
        }

        result = []
        for record in self:
            value_fname = field_mapping.get(
                field_type, ('old_value_char', 'new_value_char')
            )[bool(new)]
            value = record[value_fname]

            if field_type in {'integer', 'float', 'char', 'text', 'monetary'}:
                result.append(value)
            elif field_type in {'date', 'datetime'}:
                if not record[value_fname]:
                    result.append(value)
                elif field_type == 'date':
                    result.append(fields.Date.to_string(value))
                else:
                    result.append(f'{value}Z')
            elif field_type == 'boolean':
                result.append(bool(value))
            else:
                result.append(value)
        return result
