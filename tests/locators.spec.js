import { test, expect } from '@playwright/test'

test("getBy locators Demo", async ({ page }) => {

    //getByLabel
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByLabel('Employed').click();
    await page.getByLabel('Check me out if you Love IceCreams!').click()
    await page.getByLabel('Gender').selectOption('Female')

    //getByPlaceHolder
    await page.getByPlaceholder('Password').fill('Password')

    //getByRole
    await page.getByRole('button', { name: 'Submit' }).click()

    //getByText
    const isvisible = await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    console.log(isvisible)

    await page.getByRole('link', { name: 'Shop' }).click()

    await page.getByRole('link', { name: 'Nokia Edge' }).click()
    await page.getByRole('link', { name: 'Shop' }).click()

    await page.locator('app-card').filter({ hasText: 'Samsung Note 8' }).getByRole('button').click()
    //await page.pause()
})


test("Ways to handle waits", async ({ page }) => {

    test.setTimeout(60000) //test level
    page.setDefaultTimeout(9000)
    const slowWait = expect.configure({ timeout: 20000 }) //expect assertion test level
    await page.goto('https://rahulshettyacademy.com/angularpractice/');
    await page.getByRole('button', { name: 'Submit' }).click()

    const isvisible = await page.getByText('Success! The Form has been submitted successfully!.').isVisible()
    await slowWait(page.getByText('Success! The Form has been submitted successfully!.')).toBeVisible({ timeout: 10000 })
    await page.getByRole('link', { name: 'Shop' }).click({ timeout: 15000 })

})
