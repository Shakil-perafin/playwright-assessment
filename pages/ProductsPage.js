class ProductsPage {
  constructor(page) {
    this.page = page;
    this.productsHeader = page.locator('h2.title.text-center');
    this.searchInput = page.locator('#search_product');
    this.searchButton = page.locator('#submit_search');
    this.productItems = page.locator('.product-image-wrapper');
  }

  async isOnAllProducts() {
    await this.page.waitForSelector('h2.title.text-center', { timeout: 10000 });
    const headerText = (await this.productsHeader.first().textContent())?.trim();
    return headerText.includes('All') || headerText.includes('Features');
  }

  async search(productName) {
    await this.searchInput.fill(productName);
    await this.searchButton.click();
  }

  async isSearchedProductsVisible() {
    await this.page.waitForSelector('h2.title.text-center', { timeout: 10000 });
    const headerText = (await this.productsHeader.first().textContent())?.trim();
    return headerText.includes('Searched');
  }

  async countProductsRelated() {
    await this.page.waitForSelector('.product-image-wrapper', { timeout: 10000 });
    return await this.productItems.count();
  }
}

module.exports = { ProductsPage };
