const { test, expect } = require('@playwright/test');
const { HomePage } = require('../pages/HomePage');
const { ProductsPage } = require('../pages/ProductsPage');
const testData = require('../test-data/products.json');

test.describe('Search products flow', () => {
  test('TC1 - Search for a product and verify results', async ({ page }) => {
    const home = new HomePage(page);
    const products = new ProductsPage(page);

    await home.goto();
    expect(await home.isVisibleHome()).toBeTruthy();

    await home.clickProducts();
    expect(await products.isOnAllProducts()).toBeTruthy();

    await home.search(testData.searchProduct);
    expect(await products.isSearchedProductsVisible()).toBeTruthy();

    const count = await products.countProductsRelated();
    expect(count).toBeGreaterThan(0);
  });
});
