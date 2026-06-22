import React from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';

const Blog = () => {
  const { t } = useProducts();

  return (
    <div className="page-content" style={{ padding: '30px 25px' }}>
      <Link to="/" className="btn-nav" style={{ marginBottom: '20px', display: 'inline-flex' }}>
        ← {t('backToHome')}
      </Link>
      <div className="page-header">
        <h1>{t('blog')}</h1>
        <p className="page-description">{t('blogPageDescription')}</p>
      </div>
      <section className="page-section">
        <h2>{t('latestArticles')}</h2>
        <ul className="blog-list">
          <li>{t('blogArticle1')}</li>
          <li>{t('blogArticle2')}</li>
          <li>{t('blogArticle3')}</li>
        </ul>
      </section>
    </div>
  );
};

export default Blog;
