import React from 'react';
import useProducts from '../../hooks/useProducts';

export const CategoryTabs = () => {
  const { selectedCategory, setSelectedCategory, t } = useProducts();

  const categoriesList = [
    { id: 'all', labelKey: 'all' },
    { id: 'devices', labelKey: 'devices' },
    { id: 'disposables', labelKey: 'disposables' },
    { id: 'eliquids', labelKey: 'eliquids' },
    { id: 'accessories', labelKey: 'accessories' }
  ];

  return (
    <div className="category-tabs" id="categoryTabsContainer">
      {categoriesList.map(cat => (
        <button
          key={cat.id}
          className={`tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
          onClick={() => setSelectedCategory(cat.id)}
        >
          {t(cat.labelKey)}
        </button>
      ))}
    </div>
  );
};
export default CategoryTabs;
