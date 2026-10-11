const base = require('@playwright/test')

exports.customtest = base.test.extend(
    {
        placeOrderDetails: {
            "email": "saikrishnashetty081@gmail.com",
            "passWord": "Nams@1992",
            "productName": "ZARA COAT 3"
        }
    }
)