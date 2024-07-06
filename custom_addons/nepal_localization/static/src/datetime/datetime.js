/** @odoo-module **/

import { Component, onWillRender, useState, useRef,onError, onMounted,onInput } from "@odoo/owl";
import { useDateTimePicker } from "@web/core/datetime/datetime_hook";
import {
    areDatesEqual,
    deserializeDate,
    deserializeDateTime,
    formatDate,
    formatDateTime,
    today,
    momentToLuxon,
    moment
} from "@web/core/l10n/dates";
import { _t } from "@web/core/l10n/translation";
import { registry } from "@web/core/registry";
import { ensureArray } from "@web/core/utils/arrays";
import { archParseBoolean } from "@web/views/utils";
import { standardFieldProps } from "@web/views/standard_view_props";
import { DateTimeField } from "@web/views/fields/datetime/datetime_field";
import { dateField } from "@web/views/fields/datetime/datetime_field";

const { DateTime } = luxon;
/**
 * @typedef {luxon_bs.DateTime} DateTime
 *
 * @typedef {import("@web/views/standard_field_props").StandardFieldProps & {
 *  endDateField?: string;
 *  maxDate?: string;
 *  minDate?: string;
 *  placeholder?: string;
 *  required?: boolean;
 *  rounding?: number;
 *  startDateField?: string;
 *  warnFuture?: boolean;
 * }} DateTimeFieldProps
 *
 * @typedef {import("@web/core/datetime/datetime_picker").DateTimePickerProps} DateTimePickerProps
 */

/** @extends {Component<DateTimeFieldProps>} */
export class DateTimeFieldBS extends DateTimeField {
    // static props = {
    //     ...standardFieldProps,
    //     endDateField: { type: String, optional: true },
    //     maxDate: { type: String, optional: true },
    //     minDate: { type: String, optional: true },
    //     corresponding_field: { type: String, optional: true },
    //     alwaysRange: { type: Boolean, optional: true },
    //     placeholder: { type: String, optional: true },
    //     required: { type: Boolean, optional: true },
    //     rounding: { type: Number, optional: true },
    //     startDateField: { type: String, optional: true },
    //     warnFuture: { type: Boolean, optional: true },
    // };
    static template = "nepal_localization.DateTimeField";
    static components = {
        DateTimeField
    };

    setup() {
        super.setup();
        this.state2 = useState({
            key: '',
            ad_date: '',
            bs_date: '',
            id: this.props.id,
            new_id:this.props.name+"aa",
            type : this.field.type,
            field: this.field
        });
        this.field['corresponding_field'] = this.props.corresponding_field
        this.inputel = useRef("nepali-datepicker")
        let bs_dict={},ad_dict=false,temp,ad,bs,new_ad,key,new_dict;
        this.state2.key = this.props.name
        bs_dict = this.getRecordValue().c
        this.time = ''
        this.props.record.update = (changes, { save } = {})=>{
            if(!changes)
                return
            let key = Object.keys(changes)[0]
            if(String(this.props.record.fields[key].type).includes('date')){
                let ad_dict = Object.values(changes)[0].c
                let same_dates = true;
                if(this.props.record.data[key] && this.props.record.data[key].c)
                    Object.keys(ad_dict).forEach(k=>{
                        if(ad_dict[k]!=this.props.record.data[key].c[k])
                            same_dates = false
                    })
                else
                    same_dates = false
                if(same_dates)
                    return
                if(this.props.record.fields[key].type == 'datetime')
                    this.time = ` ${ad_dict['hour']}:${ad_dict['minute']}:${ad_dict['second']}`
                ad_dict = {
                    'year':ad_dict['year'],
                    'month':ad_dict['month'],
                    'day':ad_dict['day'],
                }
                try{
                    bs_dict = NepaliFunctions.AD2BS(ad_dict)
                }
                catch{
                    return
                }
                if(this.props.record.fields[key].type == 'datetime'){
                    document.getElementById(key+'aa').value = Object.values(bs_dict).join('/') + this.time;
                    this.state2.bs_date = Object.values(bs_dict).join('/') + this.time;
                    this.state2.ad_date = Object.values(ad_dict).join('/') + this.time;
                    if(this.props.record.fields[key].corresponding_field){
                        changes[this.props.record.fields[key].corresponding_field] = Object.values(bs_dict).join('/') + this.time;
                    }
                }
                else if (this.props.record.fields[key].type == 'date'){
                    document.getElementById(key+'aa').value = Object.values(bs_dict).join('/');
                    this.state2.bs_date = Object.values(bs_dict).join('/');
                    this.state2.ad_date = Object.values(ad_dict).join('/');
                    if(this.props.record.fields[key].corresponding_field){
                        changes[this.props.record.fields[key].corresponding_field] = Object.values(bs_dict).join('/');
                    }
                }
            }
            if (this.props.record.model._urgentSave) {
                return this.props.record._update(changes, { save: false }); // save is already scheduled
            }
            return this.props.record.model.mutex.exec(async () => {
                await this.props.record._update(changes, { withoutOnchange: save });
                if (save) {
                    return this.props.record._save();
                }
            });
        }
        if(bs_dict){
            if(this.state2.type == 'datetime'){
                this.time = ` ${bs_dict['hour']}:${bs_dict['minute']}:${bs_dict['second']}`
            }
            ad_dict = NepaliFunctions.BS2AD(bs_dict)
            if(this.state2.type == 'date'){
                this.state2.ad_date = Object.values(ad_dict).slice(0,3).join('/');
                this.state2.bs_date = Object.values(bs_dict).slice(0,3).join('/');
            }
            else if(this.state2.type == 'datetime'){
                this.state2.ad_date = Object.values(ad_dict).slice(0,3).join('/') + this.time;
                this.state2.bs_date = Object.values(bs_dict).slice(0,3).join('/') + this.time;
            }
            ad_dict = new Date(this.state2.ad_date);
            ad_dict = luxon.DateTime.fromJSDate(ad_dict);
            this.new_dict ={}
            this.new_dict[this.state2.key] = ad_dict
            if(this.props.corresponding_field){
                this.new_dict[this.props.corresponding_field]=this.state2.bs_date;
            }
        }
        let err = false;
        onError((e) => {
            this.err=true;
            console.log(e);
        });


        onMounted(async () => {
            let date = await this.env.services.orm.searchRead(
                this.props.record.evalContext.active_model,
                [['id','=',this.props.record.data.id]],
                ['id',String(this.props.name)]
            );
            if(date.length>0 && date[0][this.props.name]){
                date = date[0][this.props.name].split('-');
                bs_dict['year'] = date[0]
                bs_dict['month'] = date[1]
                if(date[2].length>2){
                    bs_dict['day'] = date[2].split(' ')[0]
                    this.time = date[2].split(' ')[1]
                }
                else{
                    bs_dict['day'] = date[2]
                }
                ad_dict = NepaliFunctions.BS2AD(bs_dict)
                if(this.state2.type == 'date'){
                    this.state2.ad_date = Object.values(ad_dict).slice(0,3).join('/');
                    this.state2.bs_date = Object.values(bs_dict).slice(0,3).join('/');
                }
                else if(this.state2.type == 'datetime'){
                    this.state2.ad_date = Object.values(ad_dict).slice(0,3).join('/') + ' ' + this.time;
                    this.state2.bs_date = Object.values(bs_dict).slice(0,3).join('/') + ' ' + this.time;
                }
                ad_dict = new Date(this.state2.ad_date);
                ad_dict = luxon.DateTime.fromJSDate(ad_dict);
                this.new_dict ={}
                this.new_dict[this.state2.key] = ad_dict
                if(this.props.corresponding_field){
                    this.new_dict[this.props.corresponding_field]=this.state2.bs_date;
                }
            }
            if(err){
                return;
            }
            if(!document.getElementById(this.props.id)){
                return
            }
            this.props.record.update(this.new_dict);
            // document.getElementById(this.props.id).value=this.state2.ad_date;
            let first_click= {},curr_top={};
            first_click[this.props.id] = true;

            const on_o_content_scroll=(e)=>{
                if(document.getElementById('ndp-nepali-box')){
                    document.getElementById('ndp-nepali-box').classList.add('d-none');
                    document.getElementsByClassName('o_content')[0].removeEventListener('scroll',on_o_content_scroll)
                    // document.getElementById('ndp-nepali-box').style.top = (curr_top-scroll_dist)+'px'
                    // console.log(document.getElementById('ndp-nepali-box').style.top)
                }
            }

            // this.inputel.el.addEventListener('click',event=>{
            //     console.log(event)
            //     if(document.querySelector('.modal-dialog.modal-lg')){
            //         return;
            //     }
            //     if(document.getElementById('ndp-nepali-box')){
            //         document.getElementById('ndp-nepali-box').classList.remove('d-none');
            //         if(first_click[this.props.id]){
            //             curr_top[this.props.id] = document.getElementById('ndp-nepali-box').style.top;
            //             console.log(curr_top[this.props.id])
            //             curr_top[this.props.id] = Number(curr_top[this.props.id].slice(0,curr_top[this.props.id].length-2));
            //             first_click[this.props.id]=false;
            //         }
            //         let scroll_dist = document.getElementsByClassName('o_content')[0].scrollTop;
            //         let top_value = curr_top[this.props.id]-scroll_dist;
            //         console.log(top_value)
            //         console.log(document.getElementById('ndp-nepali-box').offsetHeight)
            //         if(top_value<0){
            //             top_value += document.getElementById('ndp-nepali-box').offsetHeight + this.inputel.el.offsetHeight
            //         }
            //         document.getElementById('ndp-nepali-box').style.top = top_value + 'px';
            //         document.getElementsByClassName('o_content')[0].addEventListener('scroll',on_o_content_scroll)
            //     }
            // })
            /* Initialize Datepicker with options */
            this.inputel.el.nepaliDatePicker({
                ndpYear: true,
                ndpMonth: true,
                onChange: (ev)=>{
                    if(this.field.type=='date'){
                        this.state2.ad_date = ev.ad.slice(0,4)+'/'+ev.ad.slice(5,7)+'/'+ev.ad.slice(8,11);
                        this.state2.bs_date = ev.bs.replaceAll('-','/');
                    }else{
                        this.state2.ad_date = ev.ad.slice(0,4)+'/'+ev.ad.slice(5,7)+'/'+ev.ad.slice(8,11)+this.time;
                        this.state2.bs_date = ev.bs.replaceAll('-','/')+ this.time;
                    }
                    let ad_dict = {},bs_dict= {},temp;
                    ad = ev.ad.slice(0,4)+'/'+ev.ad.slice(5,7)+'/'+ev.ad.slice(8,11);
                    temp = ad.split('/');
                    ad_dict["year"] = Number(temp[0]);
                    ad_dict["month"] = Number(temp[1]);
                    ad_dict["day"] = Number(temp[2]);
                    temp = this.state2.bs_date.split('/');
                    bs_dict["year"] = Number(temp[0]);
                    bs_dict["month"] = Number(temp[1]);
                    bs_dict["day"] = Number(temp[2]);
                    this.state2.bs_date.split('/');
                    new_ad = new Date(this.state2.ad_date);
                    ad_dict =luxon.DateTime.fromJSDate(new_ad);
                    console.log('in nepal localization datetime fomat',ad_dict)
                    new_dict ={}
                    new_dict[this.state2.key]=ad_dict
                    if(this.props.corresponding_field){
                        new_dict[this.props.corresponding_field]=this.state2.bs_date;
                    }
                    this.props.record.update(new_dict);
                }
            });
        });
    };

}

const START_DATE_FIELD_OPTION = "start_date_field";
const END_DATE_FIELD_OPTION = "end_date_field";

export const dateFieldBS = {
    component: DateTimeFieldBS,
    displayName: _t("Date for BS"),
    supportedOptions: [
        {
            label: _t("Earliest accepted date"),
            name: "min_date",
            type: "string",
            help: _t(`ISO-formatted date (e.g. "2018-12-31") or "today".`),
        },
        {
            label: _t("Latest accepted date"),
            name: "max_date",
            type: "string",
            help: _t(`ISO-formatted date (e.g. "2018-12-31") or "today".`),
        },
        {
            label: _t("Warning for future dates"),
            name: "warn_future",
            type: "boolean",
            help: _t(`Displays a warning icon if the input dates are in the future.`),
        },
        {
            label: _t("Corresponding BS field"),
            name: "corresponding_field",
            type: "string",
            help: _t(`Stores the BS date into the given field(Should be char field).`),
        },
    ],
    supportedTypes: ["date"],
    // extractProps: ({ attrs, options }, dynamicInfo) => ({
    //     ...standardFieldProps,
    //     endDateField: options[END_DATE_FIELD_OPTION] || undefined,
    //     maxDate: options.max_date || undefined,
    //     minDate: options.min_date || undefined,
    //     corresponding_field: options.corresponding_field || undefined,
    //     alwaysRange: archParseBoolean(options.always_range) || undefined,
    //     placeholder: attrs.placeholder || undefined,
    //     required: dynamicInfo.required || undefined,
    //     rounding: options.rounding && parseInt(options.rounding, 10) || undefined,
    //     startDateField: options[START_DATE_FIELD_OPTION] || undefined,
    //     warnFuture: archParseBoolean(options.warn_future) || undefined,
    // })
};

export const dateTimeFieldBS = {
    ...dateFieldBS,
    displayName: _t("Date & Time"),
    supportedOptions: [
        ...dateFieldBS.supportedOptions,
        {
            label: _t("Time interval"),
            name: "rounding",
            type: "number",
            default: 5,
            help: _t(
                `Control the number of minutes in the time selection. E.g. set it to 15 to work in quarters.`
            ),
        },
    ],
    supportedTypes: ["datetime"],
};

export const dateRangeFieldBS = {
    ...dateTimeFieldBS,
    displayName: _t("Date Range"),
    supportedOptions: [
        ...dateTimeFieldBS.supportedOptions,
        {
            label: _t("Start date field"),
            name: START_DATE_FIELD_OPTION,
            type: "field",
            availableTypes: ["date", "datetime"],
        },
        {
            label: _t("End date field"),
            name: END_DATE_FIELD_OPTION,
            type: "field",
            availableTypes: ["date", "datetime"],
        },
        {
            label: _t("Always range"),
            name: "always_range",
            type: "boolean",
            default: false,
            help: _t(
                `Set to true the full range input has to be display by default, even if empty.`
            ),
        },
    ],
    supportedTypes: ["date", "datetime"],
};


registry.category('fields').content.date[1]=dateFieldBS;
// registry.category('fields').content.daterange[1]=dateRangeFieldBS;
registry.category('fields').content.datetime[1]=dateTimeFieldBS;

// registry
//     .category("fields")
//     .add("bs_date", dateField)
//     .add("bs_daterange", dateRangeField)
//     .add("bs_datetime", dateTimeField);
