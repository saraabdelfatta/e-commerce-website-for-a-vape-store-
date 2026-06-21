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
    return stored ? JSON.parse(stored) : [...DEFAULT_PRODUCTS];
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
