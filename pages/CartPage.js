class CartPage {
  constructor(page) {
    this.page = page;
    this.cartItems = page.locator('.cart_info tbody tr');
  }

  async isProductDisplayed(productName) {
    const productLocator = this.page.locator(`.cart_description:has-text("${productName}")`);
    return productLocator.isVisible();
  }

  async getQuantityForProduct(productName) {
    const row = this.page.locator(`.cart_description:has-text("${productName}")`).locator('..');
    const qtyInput = row.locator('input[type="text"], input.qty');
    if (await qtyInput.count() > 0) {
      return (await qtyInput.inputValue()).trim();
    } else {
      const qtyCell = row.locator('.cart_quantity');
      return (await qtyCell.textContent())?.trim() ?? '';
    }
  }
}

module.exports = { CartPage };
