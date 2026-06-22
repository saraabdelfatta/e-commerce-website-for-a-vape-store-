import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

const About = () => {
  const { t } = useProducts();

  return (
    <div className="page-content page-content--about">
      <div className="page-top-bar">
        <Link to="/" className="btn-nav btn-back">
          ← {t('backToHome')}
        </Link>
      </div>

      <div className="page-header page-header--about">
        <div>
          <h1>{t('about')}</h1>
          <p className="page-description">{t('aboutPageDescription')}</p>
        </div>
      </div>

      <div className="about-highlight-grid">
        <article className="feature-card">
          <span className="feature-icon">🏆</span>
          <h3>{t('ourMission')}</h3>
          <p>{t('aboutMission')}</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">📜</span>
          <h3>{t('ourHistory')}</h3>
          <p>{t('aboutHistory')}</p>
        </article>
        <article className="feature-card">
          <span className="feature-icon">🔒</span>
          <h3>{t('qualityCommitment')}</h3>
          <p>{t('aboutQuality')}</p>
        </article>
      </div>

      <div className="page-grid">
        <section className="page-section">
          <h2>{t('whyChooseUs')}</h2>
          <p>{t('aboutWhyChooseUs')}</p>
        </section>

        <section className="page-section">
          <h2>{t('customerPromise')}</h2>
          <p>{t('aboutCustomerPromise')}</p>
        </section>
      </div>
    </div>
  );
};

export default About;
