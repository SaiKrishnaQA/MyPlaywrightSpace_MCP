const { expect } = require('@playwright/test')
const { customTest } = require('./API/utils/fixtures.js')

customTest('custom Fixture Demo', async ({ authenticatedPage, createOrder, testDataForOrder }) => {
    await authenticatedPage.locator('li [routerlink*="myorders"]').click()
    await authenticatedPage.locator('text=Your Orders').waitFor()
    await expect(authenticatedPage.getByText(createOrder.orderId)).toBeVisible()
    await console.log(testDataForOrder.productname)
    
})