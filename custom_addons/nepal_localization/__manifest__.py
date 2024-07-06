{
    "name": "nepal_localization",
    "author": "Saurav Thakur",
    "version": "1.0",
    "category": "",
    'application': True,
    'sequence': 1,
    'depends': [
        'base',
        'web',
        'mail'
    ],
    'data': [
    ],
    'assets': {
        'point_of_sale._assets_pos': [
            '/nepal_localization/static/src/datetime/nepaliDatePicker.js',
        ],
        'web.assets_backend': [
            '/nepal_localization/static/src/datetime/nepaliDatePicker.js',
            '/nepal_localization/static/src/datetime/nepaliDatePicker.css',
            '/nepal_localization/static/src/datetime/datetime.js',
            '/nepal_localization/static/src/datetime/datetime.xml',
            # '/nepal_localization/static/src/save_discard.xml'
        ]
    }
}