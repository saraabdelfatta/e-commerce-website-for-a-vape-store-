import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import useOrders from '../../hooks/useOrders';
import LoyaltyRewards from '../LoyaltyRewards/LoyaltyRewards';
import CouponSection from '../CouponSection/CouponSection';

export const CartDrawer = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartItemQty,
    removeCartItem,
    getCartTotals,
    setMapsOpen,
    confirmedAddress,
    loyaltyPoints,
    setLoyaltyPoints,
    redeemedPointsVal,
    appliedCoupon,
    clearCart,
    pastedLocationUrl,
    setPastedLocationUrl,
    addressNotes,
    setAddressNotes,
    couponFeedback
  } = useCart();

  const { t, locale } = useProducts();
  const { placeOrder } = useOrders();

  const { subtotal, discountVal, shippingFee, total } = getCartTotals();

  const handleCheckout = () => {
    if (cart.length === 0) return;

    if (!confirmedAddress && !pastedLocationUrl) {
      alert(locale === 'en'
        ? "Please select a location on the map OR paste a Google Maps location link."
        : "برجاء تحديد موقعك على الخريطة أو لصق رابط عنوان جوجل ماب.");
      setMapsOpen(true);
      return;
    }

    const totals = getCartTotals();
    let mapsLinkText = '';
    let destinationText = '';

    if (pastedLocationUrl) {
      mapsLinkText = pastedLocationUrl;
      destinationText = confirmedAddress
        ? confirmedAddress.addressString
        : "Custom Google Maps Link Provided";
    } else {
      mapsLinkText = `https://maps.google.com/?q=${confirmedAddress.lat.toFixed(6)},${confirmedAddress.lng.toFixed(6)}`;
      destinationText = confirmedAddress.addressString;
    }

    placeOrder(
      cart,
      totals,
      destinationText,
      addressNotes,
      mapsLinkText,
      totals,
      redeemedPointsVal,
      clearCart,
      setLoyaltyPoints,
      loyaltyPoints
    );

    setCartOpen(false);

    // Hide welcome banner after first order
    const banner = document.getElementById('rewardsWelcomeBanner');
    if (banner) banner.style.display = 'none';
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`drawer-overlay ${cartOpen ? 'active' : ''}`}
        onClick={() => setCartOpen(false)}
      />

      {/* Cart Drawer */}
      <div className={`drawer ${cartOpen ? 'active' : ''}`} id="cartDrawer">
        <div className="drawer-header">
          <div className="drawer-title">{t('cartTitle')}</div>
          <button className="btn-close" onClick={() => setCartOpen(false)}>✖</button>
        </div>

        <div className="drawer-content">
          {/* Cart Items List */}
          <div className="cart-items-list" id="cartItemsContainer">
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-muted)' }}>
                <p style={{ fontSize: '48px', marginBottom: '10px' }}>🛒</p>
                <p>{t('emptyCart')}</p>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div className="cart-item" key={`${item.product.id}-${item.flavor}-${item.nicotine}-${idx}`}>
                  <div className="cart-item-img-wrapper">
                    <img src={item.product.image} alt={item.product.name} className="cart-item-img" />
                  </div>
                  <div className="cart-item-info">
                    <div>
                      <div className="cart-item-title">{item.product.name}</div>
                      <div className="cart-item-specs">{item.flavor} | {item.nicotine}</div>
                    </div>
                    <div className="cart-item-footer">
                      <div className="qty-spinner">
                        <button className="qty-btn" onClick={() => updateCartItemQty(idx, -1)}>-</button>
                        <div className="qty-number">{item.quantity}</div>
                        <button className="qty-btn" onClick={() => updateCartItemQty(idx, 1)}>+</button>
                      </div>
                      <div className="cart-item-price">{item.product.price * item.quantity} EGP</div>
                      <button className="btn-delete-item" onClick={() => removeCartItem(idx)}>🗑️</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Inputs — only when cart has items */}
          {cart.length > 0 && (
            <div id="cartCheckoutInputs" style={{ marginTop: '20px' }}>
              {/* Delivery Section */}
              <div className="delivery-section">
                <div className="drawer-title" style={{ fontSize: '14px', marginBottom: '10px' }}>
                  {t('deliveryTitle')}
                </div>
                <button
                  className="delivery-selector-btn"
                  style={{ marginBottom: '10px' }}
                  onClick={() => setMapsOpen(true)}
                >
                  <span className="pin-icon-animated">📍</span>
                  <div className="delivery-text-wrapper">
                    <div className="delivery-text-title" id="deliveryBtnTitle">
                      {confirmedAddress ? confirmedAddress.addressString : t('selectAddress')}
                    </div>
                    <div className="delivery-text-desc" id="deliveryBtnDesc">
                      {confirmedAddress
                        ? `Lat: ${confirmedAddress.lat.toFixed(4)}, Lng: ${confirmedAddress.lng.toFixed(4)}`
                        : (locale === 'en' ? 'Double-click to set coordinates' : 'اضغط مرتين لتحديد الإحداثيات')}
                    </div>
                  </div>
                  <span>➡️</span>
                </button>

                <input
                  type="text"
                  className="notes-input"
                  id="cartLocationUrl"
                  value={pastedLocationUrl}
                  onChange={(e) => setPastedLocationUrl(e.target.value)}
                  placeholder="Or paste Google Maps location URL (optional)"
                  style={{ marginBottom: '10px', height: '38px', padding: '0 10px', fontSize: '13px' }}
                />

                <textarea
                  className="notes-input"
                  id="cartAddressNotes"
                  value={addressNotes}
                  onChange={(e) => setAddressNotes(e.target.value)}
                  placeholder={t('notesPlaceholder')}
                />
              </div>

              {/* Loyalty & Coupon Block */}
              <div
                className="rewards-checkout-block"
                style={{ marginTop: '15px', borderTop: '1px solid var(--border-color)', paddingTop: '15px' }}
              >
                <LoyaltyRewards />
                <CouponSection />
                {couponFeedback.message && (
                  <div
                    id="couponFeedbackMessage"
                    style={{
                      fontSize: '12px',
                      fontWeight: 600,
                      marginTop: '4px',
                      color: couponFeedback.type === 'success' ? 'var(--success)' : 'var(--danger)'
                    }}
                  >
                    {couponFeedback.message}
                  </div>
                )}
              </div>

              {/* Payment Method */}
              <div className="payment-method-card">
                <span>🟢</span>
                <span>{t('cod')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Cart Footer / Bill */}
        <div className="drawer-footer">
          <div className="bill-breakdown">
            <div className="bill-line">
              <span>{t('subtotal')}</span>
              <span id="billSubtotalVal">{subtotal} EGP</span>
            </div>
            {discountVal > 0 && (
              <div className="bill-line" id="billDiscountRow" style={{ color: 'var(--danger)' }}>
                <span>{t('discount')}</span>
                <span id="billDiscountVal">-{discountVal} EGP</span>
              </div>
            )}
            <div className="bill-line">
              <span>{t('deliveryFee')}</span>
              <span id="billShippingVal">{shippingFee} EGP</span>
            </div>
            <div className="bill-line total">
              <span>{t('total')}</span>
              <span id="billTotalVal">{total} EGP</span>
            </div>
          </div>
          <button
            className="btn-checkout"
            style={{ marginTop: '15px' }}
            id="checkoutBtn"
            onClick={handleCheckout}
          >
            <span>{t('checkout')}</span>
          </button>
        </div>
      </div>
    </>
  );
};
export default CartDrawer;
