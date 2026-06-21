import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';

export const ProductDetailsDrawer = () => {
  const {
    detailOpen,
    setDetailOpen,
    activeDetailProduct,
    selectedNicotine,
    setSelectedNicotine,
    selectedFlavor,
    setSelectedFlavor,
    detailQuantity,
    setDetailQuantity,
    addToCart
  } = useCart();

  const { t } = useProducts();

  if (!activeDetailProduct) return null;

  const product = activeDetailProduct;

  const handleNicotineSelect = (nic) => {
    setSelectedNicotine(nic);
  };

  const handleFlavorSelect = (flav) => {
    setSelectedFlavor(flav);
  };

  const handleQtyChange = (amount) => {
    setDetailQuantity(prev => Math.max(1, prev + amount));
  };

  const handleAddToCart = () => {
    addToCart(product, detailQuantity, selectedNicotine, selectedFlavor);
    alert(`${product.name} added to cart!`);
    setDetailOpen(false);
  };

  return (
    <>
      <div 
        className={`drawer-overlay ${detailOpen ? 'active' : ''}`} 
        onClick={() => setDetailOpen(false)}
      />
      <div className={`drawer ${detailOpen ? 'active' : ''}`} id="productDetailDrawer">
        <div className="drawer-header">
          <div className="drawer-title">{t('specifications')}</div>
          <button className="btn-close" onClick={() => setDetailOpen(false)}>✖</button>
        </div>
        <div className="drawer-content" id="detailDrawerContent">
          <div className="detail-img-container">
            <img src={product.image} alt={product.name} className="detail-img" />
          </div>
          <div className="detail-price">{product.price} EGP</div>
          <div className="detail-rating">
            <span className="rating-star">★</span>
            <span>{product.rating} ({product.reviewsCount || 142} {t('reviews')})</span>
          </div>
          <div className="detail-desc">{product.description}</div>

          {/* Flavor Options */}
          {product.flavors && product.flavors[0] !== 'N/A' && (
            <div className="selection-section">
              <div className="section-label">{t('flavor')}</div>
              <div className="options-grid">
                {product.flavors.map(flavor => (
                  <div
                    key={flavor}
                    className={`option-badge ${selectedFlavor === flavor ? 'selected' : ''}`}
                    onClick={() => handleFlavorSelect(flavor)}
                  >
                    {flavor}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nicotine Options */}
          {product.nicotineLevels && product.nicotineLevels[0] !== 'N/A' && (
            <div className="selection-section">
              <div className="section-label">{t('nicotine')}</div>
              <div className="options-grid">
                {product.nicotineLevels.map(nic => (
                  <div
                    key={nic}
                    className={`option-badge ${selectedNicotine === nic ? 'selected' : ''}`}
                    onClick={() => handleNicotineSelect(nic)}
                  >
                    {nic}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Specifications */}
          <div className="selection-section">
            <div className="section-label">{t('specifications')}</div>
            <div className="detail-specs-list">
              <div className="spec-line">
                <span className="spec-title">{t('battery')}</span>
                <span className="spec-val">{product.battery}</span>
              </div>
              <div className="spec-line">
                <span className="spec-title">{t('capacity')}</span>
                <span className="spec-val">{product.capacity}</span>
              </div>
              <div className="spec-line">
                <span className="spec-title">{t('resistance')}</span>
                <span className="spec-val">{product.resistance}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="drawer-footer" id="detailDrawerFooter">
          <div className="detail-purchase-row">
            <div className="qty-spinner">
              <button className="qty-btn" onClick={() => handleQtyChange(-1)}>-</button>
              <div className="qty-number" id="detailQtyNum">{detailQuantity}</div>
              <button className="qty-btn" onClick={() => handleQtyChange(1)}>+</button>
            </div>
            {product.inStock ? (
              <button className="btn-add-cart" onClick={handleAddToCart}>
                {t('addToCart')}
              </button>
            ) : (
              <button className="btn-add-cart" style={{ background: 'var(--text-muted)', cursor: 'default' }} disabled>
                {t('outOfStock')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductDetailsDrawer;
