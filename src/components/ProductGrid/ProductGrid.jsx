import React from 'react';
import useProducts from '../../hooks/useProducts';
import ProductCard from '../ProductCard/ProductCard';

export const ProductGrid = () => {
  const { products, selectedCategory, searchQuery, locale } = useProducts();

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filteredProducts.length === 0) {
    return (
      <div className="empty-grid-indicator">
        {locale === 'en' ? 'No products found matching filters.' : 'لم يتم العثور على منتجات تطابق البحث.'}
      </div>
    );
  }

  return (
    <div className="products-grid" id="productsGridContainer">
      {filteredProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
export default ProductGrid;
