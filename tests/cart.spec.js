const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductDetailPage } = require('../pages/ProductDetailPage');
const { CartPage } = require('../pages/CartPage');
const testData = require('../test-data/products.json');

test('TC2 - Add product with quantity 4 to cart and verify', async ({ page }) => {
  const home = new HomePage(page);
  const detail = new ProductDetailPage(page);
  const cart = new CartPage(page);

  await home.goto();
  expect(await home.isVisibleHome()).toBeTruthy();
  await home.clickFirstViewProduct();
  await detail.waitForProductDetail();
  await expect(detail.productName).toBeVisible();

  const productName = (await detail.productName.textContent())?.trim() ?? '';
  await detail.setQuantity(4);
  await detail.addToCart();
  await detail.clickViewCart();
  expect(await cart.isProductDisplayed(productName)).toBeTruthy();

  const qty = await cart.getQuantityForProduct(productName);
  expect(Number(qty)).toBe(4);
});

