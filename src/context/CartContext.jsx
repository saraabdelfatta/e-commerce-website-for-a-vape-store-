import React, { createContext, useState, useEffect, useContext } from 'react';
import storageService from '../services/storageService';
import { MAP_LOCATIONS } from '../data/products';
import { ProductContext } from './ProductContext';
import TRANSLATIONS from '../data/translations';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { locale } = useContext(ProductContext);
  const t = (key) => TRANSLATIONS[locale]?.[key] || key;

  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [mapsOpen, setMapsOpen] = useState(false);

  // Specifications Drawer Details State
  const [activeDetailProduct, setActiveDetailProduct] = useState(null);
  const [selectedNicotine, setSelectedNicotine] = useState('');
  const [selectedFlavor, setSelectedFlavor] = useState('');
  const [detailQuantity, setDetailQuantity] = useState(1);

  // Address picker states
  const [tempSelectedMapLocation, setTempSelectedMapLocation] = useState(MAP_LOCATIONS.newcairo);
  const [confirmedAddress, setConfirmedAddress] = useState(null);

  // Loyalty rewards and coupon states
  const [loyaltyPoints, setLoyaltyPoints] = useState(120);
  const [redeemedPointsVal, setRedeemedPointsVal] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponFeedback, setCouponFeedback] = useState({ message: '', type: '' });

  // Address Inputs
  const [pastedLocationUrl, setPastedLocationUrl] = useState('');
  const [addressNotes, setAddressNotes] = useState('');

  // Initial load of loyalty points
  useEffect(() => {
    setLoyaltyPoints(storageService.getLoyaltyPoints());
  }, []);

  const addToCart = (product, qty, nic, flavor) => {
    setCart(prev => {
      const idx = prev.findIndex(
        item => item.product.id === product.id && item.nicotine === nic && item.flavor === flavor
      );

      if (idx > -1) {
        const next = [...prev];
        next[idx].quantity += qty;
        return next;
      } else {
        return [...prev, { product, quantity: qty, nicotine: nic, flavor }];
      }
    });
  };

  const updateCartItemQty = (index, amount) => {
    setCart(prev => {
      const next = [...prev];
      next[index].quantity += amount;
      if (next[index].quantity <= 0) {
        next.splice(index, 1);
      }
      return next;
    });
  };

  const removeCartItem = (index) => {
    setCart(prev => {
      const next = [...prev];
      next.splice(index, 1);
      return next;
    });
  };

  const getCartTotals = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    let discountVal = 0;

    // 1. Coupon Discount (WELCOME10)
    if (appliedCoupon && appliedCoupon.code === 'WELCOME10') {
      discountVal = Math.round(subtotal * 0.10);
    }

    // 2. Loyalty Points Discount
    if (redeemedPointsVal > 0) {
      const loyaltyDiscount = Math.round(redeemedPointsVal / 10);
      discountVal += loyaltyDiscount;
    }

    const shippingFee = subtotal > 0 ? 50 : 0;
    const total = Math.max(0, subtotal - discountVal + shippingFee);

    return {
      subtotal,
      discountVal,
      shippingFee,
      total
    };
  };

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'WELCOME10') {
      setAppliedCoupon({ code: 'WELCOME10', type: 'percent', val: 10 });
      setCouponFeedback({
        message: locale === 'en' ? 'WELCOME10 coupon applied! 10% discount subtracted.' : 'تم تطبيق كوبون الخصم! تم خصم ١٠٪.',
        type: 'success'
      });
    } else {
      setAppliedCoupon(null);
      setCouponFeedback({
        message: locale === 'en' ? 'Invalid coupon code.' : 'رمز الكوبون غير صحيح.',
        type: 'danger'
      });
    }
  };

  const redeemLoyaltyPoints = () => {
    if (loyaltyPoints <= 0) {
      alert(locale === 'en' ? "You don't have loyalty points to redeem yet." : "ليس لديك نقاط ولاء كافية لاستبدالها.");
      return;
    }

    const { subtotal } = getCartTotals();
    const maxRedeemPoints = subtotal * 10; // 10 points per EGP

    const toRedeem = loyaltyPoints > maxRedeemPoints ? maxRedeemPoints : loyaltyPoints;
    setRedeemedPointsVal(toRedeem);

    setCouponFeedback({
      message: locale === 'en' 
        ? `Redeemed ${toRedeem} points for a ${toRedeem / 10} EGP discount.`
        : `تم استبدال ${toRedeem} نقطة بخصم قدره ${toRedeem / 10} جنيه.`,
      type: 'success'
    });
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setRedeemedPointsVal(0);
    setCouponFeedback({ message: '', type: '' });
    setPastedLocationUrl('');
    setAddressNotes('');
    setConfirmedAddress(null);
  };

  // Specs drawer operations
  const openProductDetail = (product) => {
    setActiveDetailProduct(product);
    setSelectedNicotine(product.nicotineLevels[0] || 'N/A');
    setSelectedFlavor(product.flavors[0] || 'N/A');
    setDetailQuantity(1);
    setDetailOpen(true);
  };

  // Map Picker operations
  const confirmMapAddress = () => {
    setConfirmedAddress({
      addressString: tempSelectedMapLocation.name,
      lat: tempSelectedMapLocation.lat,
      lng: tempSelectedMapLocation.lng,
      notes: addressNotes
    });
    setMapsOpen(false);
  };

  const updateLoyaltyPoints = (newPoints) => {
    setLoyaltyPoints(newPoints);
    storageService.saveLoyaltyPoints(newPoints);
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartOpen,
      setCartOpen,
      detailOpen,
      setDetailOpen,
      mapsOpen,
      setMapsOpen,
      activeDetailProduct,
      setActiveDetailProduct,
      selectedNicotine,
      setSelectedNicotine,
      selectedFlavor,
      setSelectedFlavor,
      detailQuantity,
      setDetailQuantity,
      tempSelectedMapLocation,
      setTempSelectedMapLocation,
      confirmedAddress,
      setConfirmedAddress,
      loyaltyPoints,
      setLoyaltyPoints: updateLoyaltyPoints,
      redeemedPointsVal,
      setRedeemedPointsVal,
      appliedCoupon,
      setAppliedCoupon,
      couponFeedback,
      setCouponFeedback,
      pastedLocationUrl,
      setPastedLocationUrl,
      addressNotes,
      setAddressNotes,
      addToCart,
      updateCartItemQty,
      removeCartItem,
      getCartTotals,
      applyCouponCode,
      redeemLoyaltyPoints,
      clearCart,
      openProductDetail,
      confirmMapAddress
    }}>
      {children}
    </CartContext.Provider>
  );
};
