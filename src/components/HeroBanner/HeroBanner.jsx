import React from 'react';
import useProducts from '../../hooks/useProducts';

export const HeroBanner = () => {
  const { t } = useProducts();

  return (
    <header className="hero-banner">
      <div className="banner-card">
        <div className="banner-badge">{t('cairoArea')}</div>
        <h1 className="banner-title">{t('heroTitle')}</h1>
        <p className="banner-desc">{t('heroDesc')}</p>
        <div className="banner-features">
          <div className="feature-tag">⚡ <span>{t('fastDelivery')}</span></div>
          <div className="feature-tag">💵 <span>{t('codTag')}</span></div>
          <div className="feature-tag">🔞 <span>{t('ageTag')}</span></div>
        </div>
      </div>
    </header>
  );
};
export default HeroBanner;
