const { test, expect } = require('@playwright/test');

test('network intercept request', async ({ page }) => {

    const productName = 'ZARA COAT 3'
    const email = 'saikrishnashetty081@gmail.com';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill(email)
    await page.getByPlaceholder('enter your passsword').fill('Nams@1992')
    await page.getByRole('button', { name: 'login' }).click();

    //Networkidle seems to be flacky an recommended if we have any other solutions to have this 
    await page.waitForLoadState('networkidle') //without putting hard waits we can ask js to wait until all the networks are done

    await page.locator('li [routerlink*="myorders"]').click();
    //continue is here to intercetp any thing(like: url,. headers or both)
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
       async route => route.continue({ url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a9cb379e7cd69710fc2" })

    )
    await page.locator("button:has-text('view')").first().click();
    await expect(page.locator('p.blink_me')).toHaveText('You are not authorize to view this order')
    await page.pause()

})