import React from 'react';
import { Link } from 'react-router-dom';
import CartDrawer from '../components/CartDrawer/CartDrawer';
import MapsPicker from '../components/MapsPicker/MapsPicker';
import useCart from '../hooks/useCart';

const Cart = () => {
  const { setCartOpen } = useCart();
  // Auto-open cart drawer when this page loads
  React.useEffect(() => { setCartOpen(true); }, []);

  return (
    <div style={{ padding: '40px 25px', textAlign: 'center' }}>
      <Link to="/" className="btn-nav" style={{ display: 'inline-flex', marginBottom: '20px' }}>← Back to Store</Link>
      <CartDrawer />
      <MapsPicker />
    </div>
  );
};

export default Cart;
