import React from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';

export const LoyaltyRewards = () => {
  const {
    loyaltyPoints,
    redeemLoyaltyPoints
  } = useCart();

  const { t } = useProducts();

  return (
    <div className="loyalty-claim-container" id="loyaltyClaimContainer">
      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>
        💎 <span>{t('loyaltyPoints')}</span> <span id="cartLoyaltyBalanceVal">{loyaltyPoints}</span>
      </div>
      <button className="btn-rewards-sub" onClick={redeemLoyaltyPoints}>
        🎁 <span>{t('redeemPoints')}</span>
      </button>
    </div>
  );
};
export default LoyaltyRewards;
