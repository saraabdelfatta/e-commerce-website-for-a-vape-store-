import React from 'react';
import { Link } from 'react-router-dom';
import StatisticsCards from '../components/Admin/StatisticsCards';
import AddProductForm from '../components/Admin/AddProductForm';
import ProductCatalogTable from '../components/Admin/ProductCatalogTable';
import OrderManagementTable from '../components/Admin/OrderManagementTable';

const AdminDashboard = () => {
  return (
    <>
      {/* Admin Navigation Header */}
      <div className="navbar-wrapper">
        <nav className="navbar">
          <div className="navbar-brand" style={{ color: 'var(--primary)' }}>
            VAPE<span>CAIRO</span> 👑{' '}
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-muted)', marginLeft: '10px' }}>
              Owner Panel
            </span>
          </div>
          <div className="navbar-actions">
            <Link to="/" className="btn-nav">
              🏪 <span>Storefront</span>
            </Link>
          </div>
        </nav>
      </div>

      {/* Admin Dashboard Main Section */}
      <section
        className="admin-panel-section"
        style={{ display: 'block', maxWidth: '1400px', margin: '30px auto 60px', padding: '0 25px' }}
      >
        {/* Header Card */}
        <div className="admin-header-card">
          <h2 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--primary)', marginBottom: '10px' }}>
            👑 Store Owner Dashboard
          </h2>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
            Manage products catalog, update prices, edit stocks, and check placed orders.
          </p>
        </div>

        {/* Stats Row */}
        <StatisticsCards />

        {/* Two Column: Add Product + Catalog Table */}
        <div className="admin-two-column-layout">
          <AddProductForm />
          <ProductCatalogTable />
        </div>

        {/* Orders Table */}
        <OrderManagementTable />
      </section>
    </>
  );
};

export default AdminDashboard;
