import React from 'react';
import useProducts from '../../hooks/useProducts';

export const SearchBar = () => {
  const { searchQuery, setSearchQuery, t } = useProducts();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        id="productSearchInput"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder={t('searchPlaceholder')}
      />
    </div>
  );
};
export default SearchBar;
