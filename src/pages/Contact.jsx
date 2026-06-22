import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

const Contact = () => {
  const { t } = useProducts();

  return (
    <div className="contact-page">
      <div className="contact-back-wrap">
        <Link to="/" className="btn-nav btn-back">
          ← {t('backToHome')}
        </Link>
      </div>

      <section className="contact-hero">
        <div className="contact-hero-copy">
          <span className="eyebrow">{t('contact')}</span>
          <h1>{t('contact')}</h1>
          <p className="contact-intro">{t('contactPageDescription')}</p>
          <div className="contact-hero-stats">
            <div className="contact-stat">
              <span>{t('contactPhoneLabel')}</span>
              <a href="tel:+201000000000">+20 100 000 0000</a>
            </div>
            <div className="contact-stat">
              <span>{t('contactEmailLabel')}</span>
              <a href="mailto:info@vapecairo.com">info@vapecairo.com</a>
            </div>
            <div className="contact-stat">
              <span>{t('contactHoursLabel')}</span>
              <p>{t('contactHoursValue')}</p>
            </div>
          </div>
        </div>
        <div className="contact-hero-card">
          <div className="contact-hero-surface">
            <h3>{t('contactFormTitle')}</h3>
            <p className="contact-form-copy">{t('contactPageDescription')}</p>
          </div>
        </div>
      </section>

      <div className="contact-main-grid">
        <div className="contact-panel">
          <h2>{t('contactFormTitle')}</h2>
          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">{t('nameLabel')}</label>
                <input className="form-input" type="text" placeholder={t('namePlaceholder')} />
              </div>
              <div className="form-group">
                <label className="form-label">{t('emailLabel')}</label>
                <input className="form-input" type="email" placeholder={t('emailPlaceholder')} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">{t('messageLabel')}</label>
              <textarea className="form-textarea" rows="6" placeholder={t('messagePlaceholder')} />
            </div>
            <button type="button" className="btn-primary">
              {t('sendMessage')}
            </button>
          </form>
        </div>

        <aside className="contact-details-panel">
          <h2>{t('contactDetailsTitle')}</h2>
          <div className="contact-details-list">
            <div className="contact-detail-item">
              <span className="label">{t('contactPhoneLabel')}</span>
              <a href="tel:+201000000000">+20 100 000 0000</a>
            </div>
            <div className="contact-detail-item">
              <span className="label">{t('contactEmailLabel')}</span>
              <a href="mailto:info@vapecairo.com">info@vapecairo.com</a>
            </div>
            <div className="contact-detail-item">
              <span className="label">{t('contactLocationLabel')}</span>
              <p>{t('contactLocationValue')}</p>
            </div>
            <div className="contact-detail-item">
              <span className="label">{t('contactHoursLabel')}</span>
              <p>{t('contactHoursValue')}</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
