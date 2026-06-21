import React from 'react';
import useProducts from '../../hooks/useProducts';

export const ProductCatalogTable = () => {
  const { products, updatePrice, toggleStock, deleteProduct } = useProducts();

  const handlePriceChange = (productId, value) => {
    const price = parseInt(value);
    if (!isNaN(price) && price >= 0) {
      updatePrice(productId, price);
    }
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
    }
  };

  return (
    <div className="admin-column-card">
      <h3 className="admin-card-title">📋 Edit Current Vape Catalog</h3>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Vape Product</th>
              <th>Category</th>
              <th>Price (EGP)</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="adminCatalogTableBody">
            {products.map(product => (
              <tr key={product.id}>
                <td style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{product.name}</td>
                <td style={{ textTransform: 'capitalize', fontSize: '12px' }}>{product.category}</td>
                <td>
                  <input
                    type="number"
                    className="form-input"
                    style={{ width: '90px', height: '30px' }}
                    defaultValue={product.price}
                    onBlur={(e) => handlePriceChange(product.id, e.target.value)}
                  />
                </td>
                <td>
                  <button
                    className={`btn-admin-action stock ${product.inStock ? '' : 'out'}`}
                    onClick={() => toggleStock(product.id)}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      background: product.inStock ? 'var(--success-light)' : 'rgba(235,87,87,0.1)',
                      color: product.inStock ? 'var(--success)' : 'var(--danger)'
                    }}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </button>
                </td>
                <td>
                  <button
                    className="btn-admin-action delete"
                    onClick={() => handleDelete(product.id)}
                    style={{
                      padding: '4px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '12px',
                      cursor: 'pointer',
                      background: 'rgba(235,87,87,0.1)',
                      color: 'var(--danger)'
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductCatalogTable;
