import React, { useMemo, useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import useProducts from '../../hooks/useProducts';

const statusClasses = {
  'In Stock': 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
  'Low Stock': 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
  'Out of Stock': 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
};

const InventoryCard = ({ label, value, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
    <p className="text-sm uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">{label}</p>
    <div className="mt-3 text-2xl font-semibold text-gray-900 dark:text-white/90">{value}</div>
    {children}
  </div>
);

const InventoryPage = () => {
  const { products, updateStock } = useProducts();
  const [filter, setFilter] = useState('All Products');
  const [search, setSearch] = useState('');

  const inventoryProducts = useMemo(() => {
    const normalized = products.map((product) => {
      const stock = Number(product.stock ?? 0);
      const minStock = Number(product.minStock ?? 10);
      const status = stock === 0 ? 'Out of Stock' : stock <= minStock ? 'Low Stock' : 'In Stock';
      return { ...product, stock, minStock, status };
    });

    return normalized;
  }, [products]);

  const filteredProducts = useMemo(() => {
    return inventoryProducts.filter((product) => {
      const searchMatch = product.name.toLowerCase().includes(search.toLowerCase());
      const filterMatch =
        filter === 'All Products' ||
        (filter === 'In Stock' && product.status === 'In Stock') ||
        (filter === 'Low Stock' && product.status === 'Low Stock') ||
        (filter === 'Out of Stock' && product.status === 'Out of Stock');
      return searchMatch && filterMatch;
    });
  }, [inventoryProducts, filter, search]);

  const totalProducts = inventoryProducts.length;
  const totalUnits = inventoryProducts.reduce((sum, product) => sum + product.stock, 0);
  const lowStockCount = inventoryProducts.filter((product) => product.status === 'Low Stock').length;
  const outOfStockCount = inventoryProducts.filter((product) => product.status === 'Out of Stock').length;
  const totalValue = inventoryProducts.reduce((sum, product) => sum + product.price * product.stock, 0);
  const alerts = inventoryProducts.filter((product) => product.status === 'Low Stock');

  const handleUpdateStock = (productId, delta) => {
    updateStock(productId, delta);
  };

  const handleSetStock = (product) => {
    const input = window.prompt(`Set stock quantity for ${product.name}`, String(product.stock));
    if (input === null) return;
    const quantity = Number(input);
    if (Number.isNaN(quantity) || quantity < 0) return;
    updateStock(product.id, quantity - product.stock);
  };

  const handleViewDetails = (product) => {
    window.alert(`Product: ${product.name}\nCategory: ${product.category}\nSKU: ${product.sku}\nStock: ${product.stock} units\nMin Stock: ${product.minStock} units`);
  };

  return (
    <div className="space-y-6">
      <Breadcrumb pageName="Inventory" />

      <div className="grid gap-4 lg:grid-cols-5">
        <InventoryCard label="Total Products" value={totalProducts} />
        <InventoryCard label="Total Units in Stock" value={totalUnits} />
        <InventoryCard label="Low Stock Products" value={lowStockCount} />
        <InventoryCard label="Out of Stock Products" value={outOfStockCount} />
        <InventoryCard label="Total Inventory Value" value={`${totalValue.toLocaleString()} EGP`} />
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between mb-5">
          <div className="flex flex-wrap items-center gap-2">
            {['All Products', 'In Stock', 'Low Stock', 'Out of Stock'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilter(tab)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  filter === tab
                    ? 'bg-brand-500 text-white'
                    : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.05]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search product"
              className="w-full min-w-[220px] rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:focus:border-brand-400"
            />
          </div>
        </div>

        <div className="mb-5 rounded-2xl border border-orange-100 bg-orange-50 p-4 text-sm text-orange-900 dark:border-orange-500/20 dark:bg-orange-950/10 dark:text-orange-300">
          <div className="font-semibold">Low Stock Alerts</div>
          <div className="mt-2 space-y-1">
            {alerts.length > 0 ? (
              alerts.map((product) => (
                <div key={product.id} className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-orange-200 bg-orange-100/70 px-3 py-2 dark:border-orange-500/20 dark:bg-orange-900/20">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-orange-700 dark:text-orange-300">Only {product.stock} left in stock</div>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-200">
                    Restock needed
                  </span>
                </div>
              ))
            ) : (
              <div className="text-gray-500 dark:text-gray-400">No products need restocking right now.</div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full table-fixed border-separate border-spacing-0">
            <thead>
              <tr className="border-y border-gray-100 bg-gray-50 text-left text-xs font-semibold uppercase tracking-[0.18em] text-gray-500 dark:border-gray-800 dark:bg-white/[0.03] dark:text-gray-400">
                <th className="py-3 px-3">Product Image</th>
                <th className="py-3 px-3">Product Name</th>
                <th className="py-3 px-3">SKU</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3 text-right">Current Stock</th>
                <th className="py-3 px-3 text-right">Minimum Stock Level</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Last Updated</th>
                <th className="py-3 px-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-3">
                    <div className="h-14 w-14 overflow-hidden rounded-xl bg-slate-100 dark:bg-gray-800">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-medium text-gray-900 dark:text-white/90">{product.name}</div>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-500 dark:text-gray-400">{product.sku}</td>
                  <td className="py-3 px-3 text-sm text-gray-500 dark:text-gray-400">{product.category}</td>
                  <td className="py-3 px-3 text-right font-semibold text-gray-900 dark:text-white/90">{product.stock}</td>
                  <td className="py-3 px-3 text-right text-sm text-gray-500 dark:text-gray-400">{product.minStock}</td>
                  <td className="py-3 px-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses[product.status]}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-sm text-gray-500 dark:text-gray-400">{product.lastUpdated || '-'}</td>
                  <td className="py-3 px-3 text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleUpdateStock(product.id, -1)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.08]"
                      >
                        -
                      </button>
                      <button
                        type="button"
                        onClick={() => handleUpdateStock(product.id, 1)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.08]"
                      >
                        +
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSetStock(product)}
                        className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.08]"
                      >
                        Set
                      </button>
                      <button
                        type="button"
                        onClick={() => handleViewDetails(product)}
                        className="rounded-lg border border-brand-500 bg-brand-500 px-3 py-1 text-xs font-semibold text-white hover:bg-brand-600"
                      >
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
