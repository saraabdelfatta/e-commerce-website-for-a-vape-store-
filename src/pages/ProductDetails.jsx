import React from 'react';
import { useParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';

const ProductDetails = () => {
  const { productId } = useParams();
  const { products, t } = useProducts();
  const { addToCart } = useCart();
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <p style={{ fontSize: '48px' }}>😕</p>
        <p>Product not found.</p>
        <Link to="/" className="btn-nav" style={{ display: 'inline-block', marginTop: '20px' }}>← Back to Store</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '0 25px' }}>
      <Link to="/" className="btn-nav" style={{ display: 'inline-flex', marginBottom: '20px' }}>← Back</Link>
      <div className="tracking-card">
        <div className="detail-img-container">
          <img src={product.image} alt={product.name} className="detail-img" />
        </div>
        <h1 style={{ fontSize: '22px', fontWeight: 800, marginBottom: '8px' }}>{product.name}</h1>
        <div className="detail-price">{product.price} EGP</div>
        <div className="detail-rating">
          <span className="rating-star">★</span>
          <span>{product.rating} ({product.reviewsCount} {t('reviews')})</span>
        </div>
        <p className="detail-desc">{product.description}</p>
        <div className="detail-specs-list">
          <div className="spec-line"><span className="spec-title">{t('battery')}</span><span className="spec-val">{product.battery}</span></div>
          <div className="spec-line"><span className="spec-title">{t('capacity')}</span><span className="spec-val">{product.capacity}</span></div>
          <div className="spec-line"><span className="spec-title">{t('resistance')}</span><span className="spec-val">{product.resistance}</span></div>
        </div>
        {product.inStock && (
          <button
            className="btn-add-cart"
            style={{ marginTop: '20px' }}
            onClick={() => { addToCart(product, 1, product.nicotineLevels[0], product.flavors[0]); alert('Added to cart!'); }}
          >
            {t('addToCart')}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
