const { test, expect } = require('@playwright/test');
const { text } = require('node:stream/consumers');

console.log(typeof test)

test('browser context playwright test', async ({ browser }) => {
    //playwright code
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    const passWord = page.locator('[name="password"]')
    const checkBox = page.locator('[type="checkbox"]');
    const submit = page.locator('input#signInBtn');
    const prodTitles = page.locator('.card-body a')

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title()) //LoginPage Practise | Rahul Shetty Academy
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

    await userName.fill('learning')
    await passWord.fill('Learning@830$3mK2')
    await checkBox.click();
    await submit.click();
    let errorMsg = await page.locator('[style*="block"]').textContent()
    console.log("Incorrect Message Validation: ", errorMsg)
    await expect(page.locator('[style*="block"]')).toContainText('Incorrect')

    //reset the userName and enter the valid userName
    await userName.fill("");
    await userName.fill("rahulshettyacademy")
    await submit.click();
    console.log(await prodTitles.first().textContent())
    console.log(await prodTitles.nth(1).textContent())

    console.log(await prodTitles.allTextContents());

})

//if the context/browser doesn't need any session id or cookies we can direclty use page
test('page playwright test', async ({ page }) => {
    //playwright code
    const userName = page.locator('#username');
    const passWord = page.locator('[name="password"]')
    const checkBox = page.locator('[type="checkbox"]');
    const submit = page.locator('input#signInBtn');
    const prodTitles = page.locator('.card-body a')
    const dropDown = page.locator('select.form-control');
    const docuemntLink = page.locator('[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title()) //LoginPage Practise | Rahul Shetty Academy
    await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy')

    await userName.fill('rahulshettyacademy')
    await passWord.fill('Learning@830$3mK2')

    await dropDown.selectOption('consult')

    await page.locator('span.checkmark').last().click();
    await page.locator('button#okayBtn').click();
    console.log(page.locator('span.checkmark').last().isChecked())
    await expect(page.locator('span.checkmark').last()).toBeChecked();

    await checkBox.click();
    await expect(checkBox).toBeChecked()
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy();
    await submit.click();

    await expect(docuemntLink).toHaveAttribute("class", "blinkingText")

})

test('child window test', async ({ browser }) => {

    const context = await browser.newContext();
    const page = await context.newPage()
    const userName = page.locator('#username');
    //playwright code
    const docuemntLink = page.locator('[href*="documents-request"]');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(docuemntLink).toHaveAttribute("class", "blinkingText")

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        docuemntLink.click()])

    const text = await newPage.locator('p.red').textContent()
    console.log(text)
    const arrTxt = text.split("@")
    const domainName = arrTxt[1].split(" ")[0]
    console.log("Domain Name: ", domainName)

    await userName.fill(domainName);
    console.log("value entered over userName: ",await userName.inputValue())
    await page.pause()
})