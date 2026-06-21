import React from 'react';
import HeroBanner from '../components/HeroBanner/HeroBanner';
import SearchBar from '../components/SearchBar/SearchBar';
import CategoryTabs from '../components/CategoryTabs/CategoryTabs';
import ProductGrid from '../components/ProductGrid/ProductGrid';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import ProductDetailsDrawer from '../components/ProductDetailsDrawer/ProductDetailsDrawer';
import MapsPicker from '../components/MapsPicker/MapsPicker';
import OrderTracking from '../components/OrderTracking/OrderTracking';
import useProducts from '../hooks/useProducts';

const triggerSupportChat = (locale) => {
  const waNumber = '+201000000000';
  const text = encodeURIComponent(
    locale === 'en'
      ? "Hello Vape Cairo, I need assistance with my delivery order."
      : "مرحباً فيب القاهرة، أحتاج مساعدة بخصوص طلبي."
  );
  window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
};

const Home = () => {
  const { locale } = useProducts();

  return (
    <>
      {/* Welcome Rewards Promo Banner */}
      <div className="rewards-promo-banner" id="rewardsWelcomeBanner">
        🎉 <span>First visit? Use code <strong>WELCOME10</strong> in cart for 10% off your first vape order!</span>
      </div>

      {/* Hero Section */}
      <HeroBanner />

      {/* Shop Controls: Search + Category Tabs */}
      <section className="shop-controls">
        <div className="search-filter-row">
          <SearchBar />
        </div>
        <CategoryTabs />
      </section>

      {/* Products Grid */}
      <main className="main-content" id="storefrontMainContent">
        <ProductGrid />
      </main>

      {/* Order Tracking — shown after checkout */}
      <OrderTracking />

      {/* Drawers */}
      <ProductDetailsDrawer />
      <CartDrawer />
      <MapsPicker />

      {/* Floating WhatsApp Support */}
      <div
        className="float-wa-support"
        id="floatWaSupport"
        onClick={() => triggerSupportChat(locale)}
        title="Chat on WhatsApp"
      >
        💬
      </div>
    </>
  );
};

export default Home;
