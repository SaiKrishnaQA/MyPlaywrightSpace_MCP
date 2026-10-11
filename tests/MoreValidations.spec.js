import { expect, test } from '@playwright/test'

test('popup validations', async ({ page }) => {

    await page.goto('https://rahulshettyacademy.com/AutomationPractice')
    // await page.goto('https://www.google.com')
    // await page.goBack()
    // await page.goForward()

    await expect(page.locator('#displayed-text')).toBeVisible();
    await page.locator('[value="Hide"]').click()
    await expect(page.locator('#displayed-text')).toBeHidden();

    page.on("dialog", dailog => dailog.accept())
    await page.locator('#alertbtn').click();

    await page.locator('#mousehover').hover();


    const framePage = await page.frameLocator('#courses-iframe')
    framePage.locator('li a[href*="lifetime-access"]:visible').click();
    await page.pause()
})

test('screenShot and visible comparision', async ({ page }) => {


    await page.goto('https://rahulshettyacademy.com/AutomationPractice')

    await expect(page.locator('#displayed-text')).toBeVisible();
    //locator Level Screen Shot
    await page.locator('#displayed-text').screenshot({ path: 'partialScreenShot.png' })
    await page.locator('[value="Hide"]').click()
    //page level screen shot
    await page.screenshot({ path: 'screenShot.png' })
    await expect(page.locator('#displayed-text')).toBeHidden();

})

test.only('visual comparision', async ({ page }) => {
    await page.goto('https://google.com')
    expect(await page.screenshot()).toMatchSnapshot('landedPage.png')
})