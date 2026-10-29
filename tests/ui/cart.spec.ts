import { test, expect } from '../../fixtures';
import { products } from '../../test-data/checkout';

test.describe('Cart', () => {
  test.beforeEach(async ({ inventoryPage }) => { await inventoryPage.goto(); });

  test('adding one item shows badge 1', async ({ inventoryPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.expectCartCount(1);
  });

  test('multiple items listed with correct names and prices', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.addToCart(products.bikeLight.id);
    await inventoryPage.openCart();
    await expect(cartPage.items).toHaveCount(2);
    await expect(cartPage.itemNames).toHaveText([products.backpack.name, products.bikeLight.name]);
    await expect(cartPage.itemPrices).toHaveText([products.backpack.price, products.bikeLight.price]);
  });

  test('removing an item updates cart and badge', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.addToCart(products.bikeLight.id);
    await inventoryPage.openCart();
    await cartPage.remove(products.backpack.id);
    await expect(cartPage.items).toHaveCount(1);
    await expect(cartPage.itemNames).toHaveText([products.bikeLight.name]);
    await inventoryPage.expectCartCount(1);
  });

  test('cart persists after reload', async ({ inventoryPage, page }) => {
    await inventoryPage.addToCart(products.onesie.id);
    await page.reload();
    await inventoryPage.expectCartCount(1);
  });
});
