const { test, expect } = require('@playwright/test');


test('client login test', async ({ page }) => {
    const productName = 'ZARA COAT 3'
    const email = 'saikrishnashetty081@gmail.com';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.locator('[formcontrolname="userEmail"]').fill(email)
    await page.locator('input#userPassword').fill('Nams@1992')
    await page.locator('input.btn').click();

    //Networkidle seems to be flacky an recommended if we have any other solutions to have this 
    await page.waitForLoadState('networkidle') //without putting hard waits we can ask js to wait until all the networks are done

    //alternate way- still it is not harcoded
    await products.last().waitFor();
    const prodTitles = await products.allTextContents()
    console.log('All Product List: ', prodTitles)
    const count = await products.count();
    console.log("Products count: ", count)

    for (let i = 0; i < count; i++) {
        if (await products.nth(i).locator('b').textContent() === productName) {
            //add to cart
            await products.nth(i).locator('text= Add To Cart').click();
            break
        }
    }

    await page.locator('[routerlink*="cart"]').click();
    await page.locator('div li').last().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
    expect(bool).toBeTruthy();
    if (await page.locator("h3:has-text('ZARA COAT 3')").isVisible()) {
        console.log("Yes. Element added to the cart")
    }

    await page.locator('text=Checkout').click()
    await page.locator('[placeholder="Select Country"]').pressSequentially("Ind")

    const sectiondropDown = await page.locator('section.ta-results')
    await sectiondropDown.waitFor();
    const buttonCount = await sectiondropDown.locator("button").count()
    console.log(buttonCount)

    for (let i = 0; i < buttonCount; i++) {
        if (await sectiondropDown.locator("button").nth(i).textContent() === " India") {
            await sectiondropDown.locator("button").nth(i).click()
            break;
        }
    }

    await expect(page.locator("div.user__name [type='text']").first()).toHaveText(email)
    await page.locator("a.action__submit").click()

    //const thankNote = await page.locator('.hero-primary').textContent()
    await expect(page.locator('.hero-primary')).toHaveText(" Thankyou for the order. ");
    let orderId = await page.locator('label.ng-star-inserted').textContent();
    let trimmedOrderId = orderId.split('|')[1]
    console.log("OrderId: ", trimmedOrderId.split('|')[0].trim())

    await page.locator('li [routerlink*="myorders"]').click();
    await page.locator("text=Your Orders").waitFor();

    const rows = await page.locator('tbody tr');

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
    const orderIdDetails = await page.locator('div.col-text').textContent();
    expect(trimmedOrderId.trim().includes(orderIdDetails)).toBeTruthy();
    //await page.pause()

})

test('getBy locators client login test', async ({ page }) => {
    const productName = 'ZARA COAT 3'
    const email = 'saikrishnashetty081@gmail.com';
    const products = page.locator('.card-body');
    await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
    await page.getByPlaceholder('email@example.com').fill(email)
    await page.getByPlaceholder('enter your passsword').fill('Nams@1992')
    await page.getByRole('button', { name: 'login' }).click();

    //Networkidle seems to be flacky an recommended if we have any other solutions to have this 
    await page.waitForLoadState('networkidle') //without putting hard waits we can ask js to wait until all the networks are done

    //alternate way- still it is not harcoded
    await products.last().waitFor();
    const prodTitles = await products.allTextContents()
    console.log('All Product List: ', prodTitles)
    const count = await products.count();
    console.log("Products count: ", count)

    await page.locator('div.card-body').filter({ hasText: productName }).getByRole('button', { name: ' Add To Cart' }).click();

    await page.getByRole("listitem").getByRole('button', { name: 'Cart' }).click();

    await page.locator('div li').last().waitFor();

    await expect(page.getByText('ZARA COAT 3')).toBeVisible();


    await page.getByRole('button', { name: 'Checkout' }).click()

    await page.getByPlaceholder('Select Country').pressSequentially('Ind')
    await page.getByRole('button', { name: 'India' }).nth(1).click();


    await page.getByText('PLACE ORDER').click()

    await expect(page.getByText('Thankyou for the order.')).toBeVisible();

    // await page.pause()

})