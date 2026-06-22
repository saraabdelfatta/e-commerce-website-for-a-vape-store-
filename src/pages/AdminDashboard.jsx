import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import StatisticsCards from '../components/Admin/StatisticsCards';
import AddProductForm from '../components/Admin/AddProductForm';
import ProductCatalogTable from '../components/Admin/ProductCatalogTable';
import OrderManagementTable from '../components/Admin/OrderManagementTable';

const AdminDashboard = () => {
  const { logout } = useAuth();

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
            {/* Opens storefront in a new tab so the owner doesn't lose the dashboard */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-nav"
              title="Open storefront in a new tab"
            >
              🏪 <span>View Website</span>
            </a>
            <button
              className="btn-nav"
              onClick={logout}
              title="Sign out and return to login"
              style={{ color: 'var(--text-muted)' }}
            >
              🔒 <span>Sign Out</span>
            </button>
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
