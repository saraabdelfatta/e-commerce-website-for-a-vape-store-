import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import useCart from '../../hooks/useCart';
import useOrders from '../../hooks/useOrders';

export const Navbar = () => {
  const navigate = useNavigate();
  const { locale, toggleLanguage, t } = useProducts();
  const { cart, setCartOpen } = useCart();
  const { activeOrder } = useOrders();

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleTrackClick = () => {
    if (activeOrder) {
      navigate('/order-tracking');
    } else {
      alert(locale === 'en' ? "Please place an order first to track status." : "برجاء تقديم طلب أولاً لتتمكن من التتبع.");
    }
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <Link to="/" className="navbar-brand">
          VAPE<span>CAIRO</span>
        </Link>
        {/* ================= Navigation Menu ================= */}
        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            {t('home')}
          </Link>

          <Link to="/shop" className="nav-link">
            {t('shop')}
          </Link>

          <Link to="/about" className="nav-link">
            {t('about')}
          </Link>

          <Link to="/blog" className="nav-link">
            {t('blog')}
          </Link>

          <Link to="/contact" className="nav-link">
            {t('contact')}
          </Link>
        </div>
        {/* =============== End Navigation Menu =============== */}
        <div className="navbar-actions">
          <button className="btn-nav" id="langToggleBtn" onClick={toggleLanguage}>
            {locale === 'en' ? 'العربية 🇪🇬' : 'English 🇬🇧'}
          </button>
          <button className="btn-nav" id="navTrackBtn" onClick={handleTrackClick}>
            🔍 <span>{t('trackOrder')}</span>
          </button>
          <button className="btn-nav btn-cart" onClick={() => setCartOpen(true)}>
            🛒 <span>{t('cartTitle')}</span>
            <div className="cart-badge" id="cartCountBadge">{cartCount}</div>
          </button>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
