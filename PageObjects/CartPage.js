const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;
        //this.cartText = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkOut = page.locator('text=Checkout')
        this.submit = page.locator("a.action__submit");
    }

    async checkoutPage(productName) {
        await this.page.locator('div li').last().waitFor();
        const bool = await this.page.locator("h3:has-text('" + productName + "')").isVisible()
        expect(bool).toBeTruthy();
        //if (await this.cartText.isVisible()) {
        if (await this.page.locator("h3:has-text('" + productName + "')").isVisible()) {
            console.log("Yes. Element added to the cart")
        }
        await this.checkOut.click()
    }

    async verify_Submit(email) {
        await this.page.locator('[placeholder="Select Country"]').pressSequentially("Ind")

        const sectiondropDown = await this.page.locator('section.ta-results')
        await sectiondropDown.waitFor();
        const buttonCount = await sectiondropDown.locator("button").count()
        console.log(buttonCount)

        for (let i = 0; i < buttonCount; i++) {
            if (await sectiondropDown.locator("button").nth(i).textContent() === " India") {
                await sectiondropDown.locator("button").nth(i).click()
                break;
            }
        }

        await expect(this.page.locator("div.user__name [type='text']").first()).toHaveText(email)
        await this.submit.click()

    }

    async verify_FetchOrderID() {
        await expect(this.page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
        let orderId = await this.page.locator('label.ng-star-inserted').textContent();
        let trimmedOrderId = orderId.split('|')[1]
        console.log("OrderId: ", trimmedOrderId.split('|')[0].trim())
        return trimmedOrderId;
    }
}
module.exports = { CartPage }