const base = require('@playwright/test')
const { request } = require('@playwright/test')
const { ApiUtil } = require('./ApiUtil.js')

const loginPayload = { userEmail: "saikrishnashetty081@gmail.com", userPassword: "Nams@1992" }
const orderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}

exports.customTest = base.test.extend({
    authenticatedPage: async ({ browser }, use) => {
        const context = await browser.newContext()
        const page = await context.newPage()
        await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
        await page.locator('[formcontrolname="userEmail"]').fill(loginPayload.userEmail)
        await page.locator('input#userPassword').fill(loginPayload.userPassword)
        await page.locator('input.btn').click()
        await page.waitForLoadState('networkidle')

        await use(page)

        //teardown
        await context.close()
    },

    createOrder: async ({ }, use) => {
        const apiContext = await request.newContext()
        try {
            const apiutil = new ApiUtil(apiContext, loginPayload)
            const response = await apiutil.createOrder(orderPayload)
            await use(response)
        } finally {
            await apiContext.dispose()
        }
    },

    testDataForOrder: {
        productname: 'Adidas Original',
    }
})