import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

const Terms = () => {
  const { t } = useProducts();

  return (
    <div className="page-content" style={{ padding: '30px 25px' }}>
      <Link to="/" className="btn-nav" style={{ marginBottom: '20px', display: 'inline-flex' }}>
        ← {t('backToHome')}
      </Link>
      <div className="page-header">
        <h1>{t('termsTitle')}</h1>
        <p className="page-description">{t('termsPageDescription')}</p>
      </div>
      <section className="page-section">
        <h2>{t('ordersPayments')}</h2>
        <p>{t('termsOrdersPayments')}</p>
      </section>
      <section className="page-section">
        <h2>{t('shippingReturns')}</h2>
        <p>{t('termsShippingReturns')}</p>
      </section>
      <section className="page-section">
        <h2>{t('warrantiesCustomer')}</h2>
        <p>{t('termsWarrantiesCustomer')}</p>
      </section>
    </div>
  );
};

export default Terms;
