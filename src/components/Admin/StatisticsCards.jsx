import React from 'react';
import useProducts from '../../hooks/useProducts';
import useOrders from '../../hooks/useOrders';

export const StatisticsCards = () => {
  const { products } = useProducts();
  const { ordersHistory } = useOrders();

  return (
    <div className="admin-stats-row">
      <div className="stat-card">
        <div className="stat-title">Total Products</div>
        <div className="stat-value" id="adminStatProducts">{products.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Session Orders</div>
        <div className="stat-value" id="adminStatOrders">{ordersHistory.length}</div>
      </div>
      <div className="stat-card">
        <div className="stat-title">Admin State</div>
        <div className="stat-value" style={{ color: 'var(--success)' }}>Online</div>
      </div>
    </div>
  );
};
export default StatisticsCards;
