import React, { useState } from 'react';
import useCart from '../../hooks/useCart';

export const CouponSection = () => {
  const { applyCouponCode, couponFeedback } = useCart();
  const [couponInput, setCouponInput] = useState('');

  const handleApply = () => {
    applyCouponCode(couponInput);
  };

  return (
    <div className="coupon-container" style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        className="coupon-input"
        id="cartCouponInput"
        value={couponInput}
        onChange={(e) => setCouponInput(e.target.value)}
        placeholder="Promo code (e.g., WELCOME10)"
      />
      <button className="btn-apply-coupon" onClick={handleApply}>Apply</button>
      {couponFeedback.message && (
        <div
          className="coupon-feedback"
          style={{
            fontSize: '12px',
            fontWeight: 600,
            marginTop: '4px',
            color: couponFeedback.type === 'success' ? 'var(--success)' : 'var(--danger)',
            width: '100%'
          }}
        >
          {couponFeedback.message}
        </div>
      )}
    </div>
  );
};
export default CouponSection;
