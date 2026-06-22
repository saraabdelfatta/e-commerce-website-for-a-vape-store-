import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { AuthProvider } from './context/AuthContext';

import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import Navbar from './components/Navbar/Navbar';
import AdminLogin from './pages/AdminLogin';
import RequireAuth from './components/RequireAuth';
import Home from './pages/Home';
import Shop from './pages/Shop';
import About from './pages/About';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import OrderTrackingPage from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';

// Wrapper that shows the splash screen only on the home route
function SplashWrapper({ showSplash, children }) {
  const location = useLocation();

  // If splash should be shown only on home route
  if (showSplash && location.pathname === '/') {
    return <LoadingScreen />;
  }
  return children;
}

// Layout for storefront pages (navbar + content)
const StorefrontLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splashShown'));


  useEffect(() => {
    if (showSplash) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem('splashShown', 'true');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  return (
    <BrowserRouter>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <OrderProvider>
              <Routes>
                {/* Admin routes — no splash screen, render immediately */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin" element={<RequireAuth><AdminDashboard /></RequireAuth>} />

                {/* Storefront routes — with splash screen on first visit */}
                <Route
                  path="/*"
                  element={
                    showSplash ? (
                      <LoadingScreen />
                    ) : (
                      <Routes>
                        <Route path="/" element={<StorefrontLayout><Home /></StorefrontLayout>} />
                        <Route path="/shop" element={<StorefrontLayout><Shop /></StorefrontLayout>} />
                        <Route path="/about" element={<StorefrontLayout><About /></StorefrontLayout>} />
                        <Route path="/blog" element={<StorefrontLayout><Blog /></StorefrontLayout>} />
                        <Route path="/contact" element={<StorefrontLayout><Contact /></StorefrontLayout>} />
                        <Route path="/terms" element={<StorefrontLayout><Terms /></StorefrontLayout>} />
                        <Route path="/product/:productId" element={<StorefrontLayout><ProductDetails /></StorefrontLayout>} />
                        <Route path="/cart" element={<StorefrontLayout><Cart /></StorefrontLayout>} />
                        <Route path="/order-tracking" element={<StorefrontLayout><OrderTrackingPage /></StorefrontLayout>} />
                      </Routes>
                    )
                  }
                />
              </Routes>
            </OrderProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
