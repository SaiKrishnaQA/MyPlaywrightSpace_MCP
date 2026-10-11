const { test, expect } = require('@playwright/test');
const {customtest} = require('../utils/test-base')
const { POmanager } = require('../PageObjects/POmanager')
//best way JSON -> String -> Java Script Object
const dataSet = JSON.parse(JSON.stringify(require('../utils/placeOrderData.json')))


for (const data of dataSet) {
    test(`client login test ${data.productName}`, async ({ page }) => {

        const pomanager = new POmanager(page);
        const login = pomanager.getLoginPage();
        const dashBoard = pomanager.getDashBoardPage();
        const cartPage = pomanager.getCartPage();
        const ordersPage = pomanager.getOrdersPage();


        const products = page.locator('.card-body');

        await login.goto()
        await login.validLogin(data.email, data.passWord)

        await dashBoard.searchProduct_AddCart(data.productName)
        await dashBoard.navigateToCart()

        await cartPage.checkoutPage('ZARA COAT 3');
        await cartPage.verify_Submit(data.email);
        const orderId = await cartPage.verify_FetchOrderID();

        await ordersPage.routetoMyOrders();
        await ordersPage.verifyProductInOrdersPage(orderId);
    })
}

    customtest.only('client login test', async ({ page, placeOrderDetails }) => {

        const pomanager = new POmanager(page);
        const login = pomanager.getLoginPage();
        const dashBoard = pomanager.getDashBoardPage();
        const cartPage = pomanager.getCartPage();
        const ordersPage = pomanager.getOrdersPage();


        const products = page.locator('.card-body');

        await login.goto()
        await login.validLogin(placeOrderDetails.email, placeOrderDetails.passWord)

        await dashBoard.searchProduct_AddCart(placeOrderDetails.productName)
        await dashBoard.navigateToCart()

        await cartPage.checkoutPage(placeOrderDetails.productName);
        await cartPage.verify_Submit(placeOrderDetails.email);
        const orderId = await cartPage.verify_FetchOrderID();

        await ordersPage.routetoMyOrders();
        await ordersPage.verifyProductInOrdersPage(orderId);
    })
