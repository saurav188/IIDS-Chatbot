{
    "name": "Generative AI System in Nepali",
    "author": "Saurav Thakur",
    "version": "1.0",
    "category": "",
    'application': True,
    'sequence': 1,
    'depends': [
        'base',
        'website',
    ],
    'data': [
        # 'security/user_group_access.xml',
        'security/ir.model.access.csv',
        'views/menu.xml',
        'data/chat_page.xml',
        # 'data/service.xml',
        # 'data/invoice.xml',
        'views/web_crawler_views.xml',
        # 'views/product_product.xml',
        # 'views/sale_order.xml',
        # 'views/account_invoice.xml',
        # 'views/fleet_vehicle.xml',
    ],
    'assets': {
        'web.assets_frontend': [
            'GenAI/static/src/js/aiChat.js',
        ],
        'web.assets_backend': {
            '/GenAI/static/src/js/menu_systray.js',
        },
    }
}