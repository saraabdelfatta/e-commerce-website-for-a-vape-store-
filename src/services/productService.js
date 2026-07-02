import storageService from './storageService';

export const productService = {
  getProducts() {
    return storageService.getProducts();
  },

  updateProductPrice(productId, newPrice) {
    const products = storageService.getProducts();
    const idx = products.findIndex(p => p.id === productId);
    if (idx > -1) {
      products[idx].price = newPrice;
      storageService.saveProducts(products);
      return products;
    }
    return null;
  },

  toggleProductStock(productId) {
    const products = storageService.getProducts();
    const idx = products.findIndex(p => p.id === productId);
    if (idx > -1) {
      products[idx].inStock = !products[idx].inStock;
      storageService.saveProducts(products);
      return products;
    }
    return null;
  },

  updateProductStock(productId, delta) {
    const products = storageService.getProducts();
    const idx = products.findIndex(p => p.id === productId);
    if (idx > -1) {
      const nextStock = Math.max(0, (products[idx].stock || 0) + Number(delta));
      products[idx].stock = nextStock;
      products[idx].inStock = nextStock > 0;
      products[idx].lastUpdated = new Date().toISOString().split('T')[0];
      storageService.saveProducts(products);
      return products;
    }
    return null;
  },

  setProductStock(productId, quantity) {
    const products = storageService.getProducts();
    const idx = products.findIndex(p => p.id === productId);
    if (idx > -1) {
      const nextStock = Math.max(0, Number(quantity));
      products[idx].stock = nextStock;
      products[idx].inStock = nextStock > 0;
      products[idx].lastUpdated = new Date().toISOString().split('T')[0];
      storageService.saveProducts(products);
      return products;
    }
    return null;
  },

  deleteProduct(productId) {
    const products = storageService.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    storageService.saveProducts(filtered);
    return filtered;
  },

  addProduct(newProduct) {
    const products = storageService.getProducts();
    // Generate id if not exists
    const id = newProduct.id || 'ADMIN_' + Math.floor(1000 + Math.random() * 9000);
    const product = {
      ...newProduct,
      id,
      rating: newProduct.rating || 5.0,
      reviewsCount: newProduct.reviewsCount || 0,
      inStock: newProduct.inStock !== undefined ? newProduct.inStock : true
    };
    products.push(product);
    storageService.saveProducts(products);
    return products;
  }
};
export default productService;
