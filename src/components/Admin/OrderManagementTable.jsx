import React from 'react';
import useOrders from '../../hooks/useOrders';

export const OrderManagementTable = () => {
  const { ordersHistory } = useOrders();

  return (
    <div className="admin-column-card" style={{ marginTop: '25px' }}>
      <h3 className="admin-card-title">📦 Placed Orders Manager (Session Logs)</h3>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Placed Time</th>
              <th>Destination Address &amp; Notes</th>
              <th>Map Coordinates/URL</th>
              <th>Items Ordered</th>
              <th>Total Bill</th>
            </tr>
          </thead>
          <tbody id="adminOrdersTableBody">
            {ordersHistory.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
                  No orders recorded in this session yet.
                </td>
              </tr>
            ) : (
              ordersHistory.map(order => (
                <tr key={order.referenceId}>
                  <td style={{ fontWeight: 800, color: 'var(--primary)' }}>#{order.referenceId}</td>
                  <td style={{ fontSize: '12px' }}>{order.time}</td>
                  <td style={{ fontSize: '12px', maxWidth: '250px' }}>
                    <strong>Address:</strong> {order.address}<br />
                    {order.notes && <><strong>Notes:</strong> {order.notes}</>}
                  </td>
                  <td>
                    <a
                      href={order.locationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'underline' }}
                    >
                      View Map Location 📍
                    </a>
                  </td>
                  <td style={{ fontSize: '11px', whiteSpace: 'pre-line' }}>{order.itemsSummary}</td>
                  <td style={{ fontWeight: 700, color: 'var(--success)' }}>{order.total} EGP</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default OrderManagementTable;
