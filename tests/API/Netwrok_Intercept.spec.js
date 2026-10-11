const { test, expect, request } = require('@playwright/test');
const { ApiUtil } = require('./utils/ApiUtil')
const loginPayload = { userEmail: "saikrishnashetty081@gmail.com", userPassword: "Nams@1992" }
const orderPayload = {
    orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }]
}
const fakeBodyResp = {data:[], message:"No Orders"}
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

    //intercepting the response, before sending to the browser and then the fake reponse will render on the browser
   await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
        async route=>{
            const response = await page.request.fetch(route.request());
            let body = JSON.stringify(fakeBodyResp);
            route.fulfill(
                {
                    response,
                    body,
                })
        })

    await page.locator('li [routerlink*="myorders"]').click();
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*")
    console.log(await page.locator('.mt-4').textContent())

})
