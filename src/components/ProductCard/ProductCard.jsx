import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';

export const ProductCard = ({ product }) => {
  const { addToCart, openProductDetail } = useCart();
  const { locale } = useProducts();

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    
    // Fallbacks for missing details options
    const defaultNic = product.nicotineLevels[0] || 'N/A';
    const defaultFlavor = product.flavors[0] || 'N/A';
    
    addToCart(product, 1, defaultNic, defaultFlavor);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div
      className="product-card"
      style={{ opacity: product.inStock ? 1 : 0.6 }}
      onClick={() => openProductDetail(product)}
    >
      <div className="card-badge">{product.rating} ⭐</div>
      <div className="product-img-wrapper">
        <img src={product.image} alt={product.name} className="product-img" />
      </div>
      <div className="product-name">{product.name}</div>
      <div className="product-specs">{product.capacity} • {product.resistance}</div>
      <div className="card-footer" onClick={(e) => e.stopPropagation()}>
        <div className="product-price">{product.price} EGP</div>
        {product.inStock ? (
          <button className="btn-add-quick" onClick={handleQuickAdd}>+</button>
        ) : (
          <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--danger)' }}>
            {locale === 'en' ? 'OUT OF STOCK' : 'نفذت الكمية'}
          </span>
        )}
      </div>
    </div>
  );
};
export default ProductCard;
