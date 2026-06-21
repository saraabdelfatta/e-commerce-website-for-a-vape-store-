import React from 'react';
import { Link } from 'react-router-dom';
import OrderTracking from '../components/OrderTracking/OrderTracking';
import useOrders from '../hooks/useOrders';

const OrderTrackingPage = () => {
  const { activeOrder } = useOrders();

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 25px' }}>
      <Link to="/" className="btn-nav" style={{ display: 'inline-flex', marginBottom: '20px' }}>← Back to Store</Link>
      {activeOrder ? (
        <OrderTracking />
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 20px', color: 'var(--text-muted)' }}>
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
          <p style={{ fontSize: '18px', fontWeight: 700 }}>No active order to track.</p>
          <p style={{ marginTop: '8px' }}>Place an order from the store to see your delivery status here.</p>
          <Link to="/" className="btn-checkout" style={{ display: 'inline-flex', marginTop: '24px', width: 'auto', padding: '12px 32px' }}>
            🛒 Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
