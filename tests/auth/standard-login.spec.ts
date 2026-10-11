import { test, expect } from '../../src/fixtures/base';
import { InventoryPage } from '../../src/pages/InventoryPage';
import { LoginPage } from '../../src/pages/LoginPage';
import users from '../data/users.json';

test.describe('SauceDemo login', () => {
  test('standard user logs in successfully @smoke @critical', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await test.step('Open the SauceDemo login page', async () => {
      await loginPage.goto();
    });

    await test.step('Log in with the standard user credentials', async () => {
      await loginPage.login(users.standard.username, users.standard.password);
    });

    await test.step('Verify the inventory page is displayed', async () => {
      await expect(page).toHaveURL(/inventory\.html/);
      await expect(inventoryPage.productsHeading).toBeVisible();
      await expect(inventoryPage.inventoryContainer).toBeVisible();
    });
  });
});