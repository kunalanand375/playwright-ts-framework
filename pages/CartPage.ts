import { Page } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  get items() { return this.page.getByTestId('inventory-item'); }
  get itemNames() { return this.page.getByTestId('inventory-item-name'); }
  get itemPrices() { return this.page.getByTestId('inventory-item-price'); }

  async remove(productId: string) { await this.page.getByTestId(`remove-${productId}`).click(); }
  async checkout() { await this.page.getByTestId('checkout').click(); }
}
