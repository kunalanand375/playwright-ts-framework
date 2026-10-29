import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  async goto() { await this.page.goto('/inventory.html'); }
  async addToCart(productId: string) { await this.page.getByTestId(`add-to-cart-${productId}`).click(); }
  async removeFromCart(productId: string) { await this.page.getByTestId(`remove-${productId}`).click(); }
  async openCart() { await this.page.getByTestId('shopping-cart-link').click(); }

  get cartBadge() { return this.page.getByTestId('shopping-cart-badge'); }
  get title() { return this.page.getByTestId('title'); }

  async expectCartCount(n: number) {
    if (n === 0) await expect(this.cartBadge).toHaveCount(0);
    else await expect(this.cartBadge).toHaveText(String(n));
  }
}
