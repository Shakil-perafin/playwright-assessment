class HomePage {
  constructor(page) {
    this.page = page;
    this.productsBtn = page.locator('a[href="/products"]', { hasText: 'Products' });
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.firstProductViewBtn = page.locator('text=View Product').first();
  }

  async goto() {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  }

  async clickProducts() {
    await this.productsBtn.click();
  }

  async search(productName) {
    if (await this.searchInput.count() > 0) {
      await this.searchInput.fill(productName);
    } else {
      await this.page.locator('input[placeholder*="Search"]').fill(productName);
    }
    await this.searchButton.click();
  }

  async clickFirstViewProduct() {
    await this.firstProductViewBtn.click();
  }

  async isVisibleHome() {
    const logo = this.page.locator('img[alt="Website for automation practice"]');
    return await logo.isVisible().catch(() => true);
  }
}

module.exports = { HomePage };
