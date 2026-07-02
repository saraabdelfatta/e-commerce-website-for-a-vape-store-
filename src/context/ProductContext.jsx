import React, { createContext, useState, useEffect } from 'react';
import productService from '../services/productService';
import TRANSLATIONS from '../data/translations';

export const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [locale, setLocale] = useState('ar'); // Default to Arabic as in original app.js

  // Initial load
  useEffect(() => {
    setProducts(productService.getProducts());
  }, []);

  // Update layout direction when locale changes
  useEffect(() => {
    if (locale === 'ar') {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
  }, [locale]);

  const toggleLanguage = () => {
    setLocale(prev => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    if (!TRANSLATIONS[locale] || !TRANSLATIONS[locale][key]) {
      return key;
    }
    return TRANSLATIONS[locale][key];
  };

  // Product operations
  const updatePrice = (productId, price) => {
    const updated = productService.updateProductPrice(productId, price);
    if (updated) setProducts(updated);
  };

  const toggleStock = (productId) => {
    const updated = productService.toggleProductStock(productId);
    if (updated) setProducts(updated);
  };

  const updateStock = (productId, delta) => {
    const updated = productService.updateProductStock(productId, delta);
    if (updated) setProducts(updated);
  };

  const setStock = (productId, quantity) => {
    const updated = productService.setProductStock(productId, quantity);
    if (updated) setProducts(updated);
  };

  const deleteProduct = (productId) => {
    const updated = productService.deleteProduct(productId);
    if (updated) setProducts(updated);
  };

  const addProduct = (newProduct) => {
    const updated = productService.addProduct(newProduct);
    if (updated) setProducts(updated);
  };

  // Refresh products from storage (useful for cross-tab syncing)
  const refreshProducts = () => {
    setProducts(productService.getProducts());
  };

  return (
    <ProductContext.Provider value={{
      products,
      selectedCategory,
      setSelectedCategory,
      searchQuery,
      setSearchQuery,
      locale,
      toggleLanguage,
      t,
      updatePrice,
      toggleStock,
      updateStock,
      setStock,
      deleteProduct,
      addProduct,
      refreshProducts
    }}>
      {children}
    </ProductContext.Provider>
  );
};
