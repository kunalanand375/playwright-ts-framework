import { test, expect } from '../../fixtures';
import { products, validCustomer, invalidCustomers } from '../../test-data/checkout';

test.describe('Checkout', () => {
  test.beforeEach(async ({ inventoryPage, cartPage }) => {
    await inventoryPage.goto();
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.openCart();
    await cartPage.checkout();
  });

  test('completes an order end to end', async ({ checkoutPage }) => {
    await checkoutPage.fillInfo(validCustomer.first, validCustomer.last, validCustomer.zip);
    await expect(checkoutPage.subtotal).toContainText('29.99');
    await checkoutPage.finish();
    await expect(checkoutPage.confirmation).toHaveText('Thank you for your order!');
  });

  for (const c of invalidCustomers) {
    test(`validation: ${c.error}`, async ({ checkoutPage }) => {
      await checkoutPage.fillInfo(c.first, c.last, c.zip);
      await expect(checkoutPage.error).toContainText(c.error);
    });
  }
});
