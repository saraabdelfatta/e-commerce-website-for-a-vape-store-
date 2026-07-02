import { DEFAULT_PRODUCTS } from '../data/products';

const DB_VERSION_KEY = 'vape_db_version';
const CURRENT_DB_VERSION = '4';

const PRODUCTS_KEY = 'vape_products';
const ORDERS_KEY = 'vape_orders';
const LOYALTY_POINTS_KEY = 'vape_loyalty_points';

export const storageService = {
  initialize() {
    if (typeof window === 'undefined') return;

    const dbVersion = localStorage.getItem(DB_VERSION_KEY);
    
    if (dbVersion !== CURRENT_DB_VERSION) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      localStorage.setItem(DB_VERSION_KEY, CURRENT_DB_VERSION);
    } else {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      if (!stored) {
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
      }
    }

    const storedOrders = localStorage.getItem(ORDERS_KEY);
    if (!storedOrders) {
      localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
    }

    const storedPoints = localStorage.getItem(LOYALTY_POINTS_KEY);
    if (!storedPoints) {
      localStorage.setItem(LOYALTY_POINTS_KEY, '120'); // Starting points for demo
    }
  },

  getProducts() {
    this.initialize();
    const stored = localStorage.getItem(PRODUCTS_KEY);
    let products = stored ? JSON.parse(stored) : [...DEFAULT_PRODUCTS];
    let shouldSave = false;

    products = products.map((product) => {
      const patched = { ...product };
      if (patched.stock === undefined) {
        patched.stock = patched.inStock ? 24 : 0;
        shouldSave = true;
      }
      if (patched.minStock === undefined) {
        patched.minStock = patched.stock > 0 ? 10 : 5;
        shouldSave = true;
      }
      if (!patched.sku) {
        patched.sku = `SKU-${patched.id.toUpperCase()}`;
        shouldSave = true;
      }
      if (!patched.lastUpdated) {
        patched.lastUpdated = new Date().toISOString().split('T')[0];
        shouldSave = true;
      }
      if (patched.stock <= 0 && patched.inStock) {
        patched.inStock = false;
        shouldSave = true;
      }
      if (patched.stock > 0 && patched.inStock === false) {
        patched.inStock = true;
        shouldSave = true;
      }
      return patched;
    });

    if (shouldSave) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    }

    return products;
  },

  saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  },

  getOrders() {
    this.initialize();
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  saveOrders(orders) {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  },

  getLoyaltyPoints() {
    this.initialize();
    const stored = localStorage.getItem(LOYALTY_POINTS_KEY);
    return stored ? parseInt(stored, 10) : 120;
  },

  saveLoyaltyPoints(points) {
    localStorage.setItem(LOYALTY_POINTS_KEY, points.toString());
  }
};
export default storageService;
