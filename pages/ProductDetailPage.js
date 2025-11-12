class ProductDetailPage {
  constructor(page) {
    this.page = page;
    this.productName = page.locator('.product-information h2');
    this.quantityInput = page.locator('#quantity');
    this.addToCartBtn = page.locator('button:has-text("Add to cart")');
    this.viewCartBtn = page.locator('a:has-text("View Cart")');
  }

  async waitForProductDetail() {
    await this.page.waitForSelector('.product-information h2', { timeout: 15000 });
  }

  async setQuantity(qty) {
    if (await this.quantityInput.count() > 0) {
      await this.quantityInput.fill(String(qty));
    } else {
      const plus = this.page.locator('.qty .plus');
      for (let i = 1; i < qty; ++i) {
        await plus.click().catch(() => {});
      }
    }
  }

  async addToCart() {
    await this.addToCartBtn.click();
    await this.viewCartBtn.waitFor({ state: 'visible', timeout: 10000 });
  }

  async clickViewCart() {
    await this.viewCartBtn.click();
  }
}

module.exports = { ProductDetailPage };
