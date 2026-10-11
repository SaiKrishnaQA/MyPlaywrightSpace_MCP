const Module = require("node:module");

class Dashboard {

    constructor(page) {
        this.products = page.locator('.card-body');
        this.cart = page.locator('[routerlink*="cart"]');
    }

    async searchProduct_AddCart(productName) {
        await this.products.last().waitFor();
        const prodTitles = await this.products.allTextContents()
        console.log('All Product List: ', prodTitles)
        const count = await this.products.count();
        console.log("Products count: ", count)

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator('b').textContent() === productName) {
                //add to cart
                await this.products.nth(i).locator('text= Add To Cart').click();
                break
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();
        //await this.page.locator('div li').last().waitFor();
    }
}
module.exports = {Dashboard}