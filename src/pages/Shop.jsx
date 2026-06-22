import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryTabs from '../components/CategoryTabs/CategoryTabs';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import ProductDetailsDrawer from '../components/ProductDetailsDrawer/ProductDetailsDrawer';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import MapsPicker from '../components/MapsPicker/MapsPicker';
import useProducts from '../hooks/useProducts';

const Shop = () => {
  const { t } = useProducts();

  return (
    <>
      <div className="page-header">
        <h1>{t('shop')}</h1>
        <p className="page-description">
          {t('shopPageDescription')}
        </p>
        <Link to="/" className="btn-nav" style={{ marginBottom: '20px' }}>
          {t('backToHome')}
        </Link>
      </div>

      <section className="shop-controls">
        <div className="search-filter-row">
          <SearchBar />
        </div>
        <CategoryTabs />
      </section>

      <main className="main-content" id="shopMainContent">
        <ProductGrid />
      </main>

      <ProductDetailsDrawer />
      <CartDrawer />
      <MapsPicker />
    </>
  );
};

export default Shop;
