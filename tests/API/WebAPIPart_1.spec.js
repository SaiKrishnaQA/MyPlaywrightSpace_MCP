const { test, expect, request } = require('@playwright/test');
const { ApiUtil } = require('./utils/ApiUtil')
const loginPayload = { userEmail: "saikrishnashetty081@gmail.com", userPassword: "Nams@1992" }
const orderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}
// let loginToken;
// let orderId;
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiutil = new ApiUtil(apiContext, loginPayload)
    response = await apiutil.createOrder(orderPayload)
})

test('client login test', async ({ page }) => {
    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    const productName = 'ZARA COAT 3'
    const email = 'saikrishnashetty081@gmail.com';
    const products = page.locator('.card-body');
    //Networkidle seems to be flacky an recommended if we have any other solutions to have this 
    await page.waitForLoadState('networkidle') //without putting hard waits we can ask js to wait until all the networks are done

    await page.locator('li [routerlink*="myorders"]').click();
    await page.locator("text=Your Orders").waitFor();

    const rows = await page.locator('tbody tr');

    for (let i = 0; i < await rows.count(); i++) {
        const ordID = await rows.nth(i).locator("th").textContent();
        console.log(ordID.trim());
        console.log(response.orderId.trim())
        if (ordID.trim().includes(response.orderId.trim())) {
            console.log("Product lised on the orders page")
            await rows.nth(i).locator('button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('div.col-text').textContent();
    await page.pause()
    expect(response.orderId.trim().includes(orderIdDetails)).toBeTruthy();
    //await page.pause()

})
