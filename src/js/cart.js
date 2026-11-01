export class Cart {
  constructor() {
    this.storageKey = 'moda_optic_cart';
    this.items = this.getCartData();
    this.updateBadge();
  }

  getCartData() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCartData() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
  }

  addItem(id, name, price) {
    const existing = this.items.find((item) => String(item.id) === String(id));

    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ id: String(id), name, price: Number(price), quantity: 1 });
    }

    this.saveCartData();
    this.updateBadge();
  }

  getTotalCount() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  updateBadge() {
    const count = this.getTotalCount();
    const elements = document.querySelectorAll('#cartCount, .js-cart-count');
    elements.forEach((el) => {
      el.textContent = count;
    });
  }
}