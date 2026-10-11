const { LoginPage } = require('../PageObjects/LoginPage')
const { Dashboard } = require('../PageObjects/Dashboard')
const { CartPage } = require('../PageObjects/CartPage')
const { MyOrdersPage } = require('../PageObjects/MyOrdersPage')

class POmanager {

    constructor(page) {
        this.page = page;
        this.login = new LoginPage(this.page);
        this.dashBoard = new Dashboard(this.page)
        this.cartPage = new CartPage(this.page);
        this.orderPage = new MyOrdersPage(this.page)
    }

    getLoginPage() {
        return this.login;
    }

    getDashBoardPage() {
        return this.dashBoard;
    }

    getCartPage() {
        return this.cartPage;
    }

    getOrdersPage() {
        return this.orderPage;
    }
}

module.exports = { POmanager }