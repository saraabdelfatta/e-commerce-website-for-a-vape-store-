import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import OrderTrackingPage from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';

// Storefront layout wraps Navbar + page content
const StorefrontLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <ProductProvider>
        <CartProvider>
          <OrderProvider>
            <Routes>
              {/* Storefront routes */}
              <Route
                path="/"
                element={
                  <StorefrontLayout>
                    <Home />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/product/:productId"
                element={
                  <StorefrontLayout>
                    <ProductDetails />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/cart"
                element={
                  <StorefrontLayout>
                    <Cart />
                  </StorefrontLayout>
                }
              />
              <Route
                path="/order-tracking"
                element={
                  <StorefrontLayout>
                    <OrderTrackingPage />
                  </StorefrontLayout>
                }
              />

              {/* Admin panel — own layout (no storefront Navbar) */}
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </OrderProvider>
        </CartProvider>
      </ProductProvider>
    </BrowserRouter>
  );
}

export default App;
