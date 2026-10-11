import { expect } from "@playwright/test";

class MyOrdersPage {

    constructor(page) {
        this.page = page;
        this.myOrdersLink = this.page.locator('li [routerlink*="myorders"]');
        this.ordersList = this.page.locator("text=Your Orders");
    }

    async routetoMyOrders() {
        await this.myOrdersLink.click();
        await this.ordersList.waitFor();
    }

    async verifyProductInOrdersPage(trimmedOrderId) {
        const rows = await this.page.locator('tbody tr');

        for (let i = 0; i < await rows.count(); i++) {
            const ordID = await rows.nth(i).locator("th").textContent();
            console.log(ordID.trim());
            console.log(trimmedOrderId.trim())
            if (ordID.trim().includes(trimmedOrderId.trim())) {
                console.log("Product lised on the orders page")
                await rows.nth(i).locator('button').first().click();
                break;
            }
        }
        const orderIdDetails = await this.page.locator('div.col-text').textContent();
        expect(trimmedOrderId.trim().includes(orderIdDetails)).toBeTruthy();
    }
}

module.exports = { MyOrdersPage }