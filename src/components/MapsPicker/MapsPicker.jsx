import React, { useState } from 'react';
import useCart from '../../hooks/useCart';
import useProducts from '../../hooks/useProducts';
import { MAP_LOCATIONS } from '../../data/products';

// Center coordinate mappings for our mock map pin visual positioning
const PIN_COORDINATES = {
  zamalek: { left: '190px', top: '130px' },
  heliopolis: { left: '440px', top: '115px' },
  maadi: { left: '235px', top: '300px' },
  newcairo: { left: '560px', top: '265px' }
};

export const MapsPicker = () => {
  const {
    mapsOpen,
    setMapsOpen,
    tempSelectedMapLocation,
    setTempSelectedMapLocation,
    confirmMapAddress,
    addressNotes,
    setAddressNotes
  } = useCart();

  const { t, locale } = useProducts();
  const [districtSearch, setDistrictSearch] = useState('');
  const [activeKey, setActiveKey] = useState('newcairo');

  if (!mapsOpen) return null;

  const handleDistrictSelect = (key) => {
    if (MAP_LOCATIONS[key]) {
      setTempSelectedMapLocation(MAP_LOCATIONS[key]);
      setActiveKey(key);
    }
  };

  const handleMapSearch = () => {
    const query = districtSearch.toLowerCase().trim();
    let foundKey = null;

    for (let key in MAP_LOCATIONS) {
      if (MAP_LOCATIONS[key].name.toLowerCase().includes(query) || key.includes(query)) {
        foundKey = key;
        break;
      }
    }

    if (foundKey) {
      handleDistrictSelect(foundKey);
    } else {
      alert(locale === 'en' 
        ? "Neighborhood not found. Select New Cairo, Zamalek, Heliopolis, or Maadi on the map." 
        : "لم يتم العثور على الحي. يرجى اختيار مصر الجديدة، الزمالك، المعادي أو التجمع على الخريطة."
      );
    }
  };

  const currentCoords = PIN_COORDINATES[activeKey] || PIN_COORDINATES.newcairo;

  return (
    <div className={`modal-overlay ${mapsOpen ? 'active' : ''}`}>
      <div className="modal-container">
        <div className="modal-header">
          <div className="drawer-title">{t('mapHeader')}</div>
          <button className="btn-close" onClick={() => setMapsOpen(false)}>✖</button>
        </div>
        <div className="modal-body">
          {/* Search Bar inside map overlay */}
          <div className="map-search-overlay">
            <input
              type="text"
              className="map-search-input"
              value={districtSearch}
              onChange={(e) => setDistrictSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleMapSearch()}
              placeholder={t('mapSearchPlaceholder')}
            />
            <button className="btn-map-search" onClick={handleMapSearch}>🔍</button>
          </div>

          {/* Map canvas containing grids */}
          <div className="map-canvas-mock">
            <div className={`map-grid-district district-zamalek ${activeKey === 'zamalek' ? 'active-zone' : ''}`} onClick={() => handleDistrictSelect('zamalek')}>Zamalek</div>
            <div className={`map-grid-district district-heliopolis ${activeKey === 'heliopolis' ? 'active-zone' : ''}`} onClick={() => handleDistrictSelect('heliopolis')}>Heliopolis</div>
            <div className={`map-grid-district district-maadi ${activeKey === 'maadi' ? 'active-zone' : ''}`} onClick={() => handleDistrictSelect('maadi')}>Maadi</div>
            <div className={`map-grid-district district-newcairo ${activeKey === 'newcairo' ? 'active-zone' : ''}`} onClick={() => handleDistrictSelect('newcairo')}>New Cairo</div>

            {/* Positioned Center Pin */}
            <div className="map-center-pin-container" style={{ left: currentCoords.left, top: currentCoords.top }}>
              <span className="map-center-pin">📍</span>
              <div className="map-pin-shadow"></div>
            </div>

            {/* Default locate trigger */}
            <button className="btn-locate-me" onClick={() => handleDistrictSelect('newcairo')}>🎯</button>
          </div>
        </div>
        <div className="modal-footer">
          <div className="selected-coordinates-card">
            <span>📍</span>
            <div>
              <div className="delivery-text-title" id="mapConfirmTitle">{tempSelectedMapLocation.name}</div>
              <div className="delivery-text-desc" id="mapConfirmCoords">
                Lat: {tempSelectedMapLocation.lat.toFixed(4)}, Lng: {tempSelectedMapLocation.lng.toFixed(4)}
              </div>
            </div>
          </div>
          <button className="btn-confirm-coords" onClick={confirmMapAddress}>
            {t('confirmLocation')}
          </button>
        </div>
      </div>
    </div>
  );
};
export default MapsPicker;
