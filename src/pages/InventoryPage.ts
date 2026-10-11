import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productsHeading: Locator;
  readonly inventoryContainer: Locator;

  constructor(page: Page) {
    super(page);
    this.productsHeading = page.getByText('Products', { exact: true });
    this.inventoryContainer = page.getByRole('main');
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}