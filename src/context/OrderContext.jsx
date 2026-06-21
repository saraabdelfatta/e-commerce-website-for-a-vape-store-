import React, { createContext, useState, useEffect } from 'react';
import orderService from '../services/orderService';
import storageService from '../services/storageService';

export const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const [activeOrder, setActiveOrder] = useState(null);
  const [ordersHistory, setOrdersHistory] = useState([]);

  // Load order history from storage on mount
  useEffect(() => {
    setOrdersHistory(orderService.getOrders());
  }, []);

  // Tracking timeline simulation interval
  useEffect(() => {
    if (!activeOrder) return;
    if (activeOrder.stage >= 4) return;

    const interval = setInterval(() => {
      setActiveOrder(prev => {
        if (prev && prev.stage < 4) {
          return { ...prev, stage: prev.stage + 1 };
        }
        return prev;
      });
    }, 20000); // 20 seconds simulation interval

    return () => clearInterval(interval);
  }, [activeOrder]);

  const placeOrder = (cartItems, totals, addressString, notes, locationUrl, _totals, redeemedPoints, clearCart, updateLoyaltyPointsCallback, currentPoints) => {
    const orderId = 'EGP' + Math.floor(1000 + Math.random() * 9000);
    const timeString = new Date().toLocaleTimeString();
    
    // Format cart items summary
    const itemsText = cartItems.map(item => 
      `• ${item.product.name} (${item.flavor}, ${item.nicotine}) x${item.quantity} = ${item.product.price * item.quantity} EGP`
    ).join('\n');

    const itemsSummary = cartItems.map(i => 
      `${i.product.name} (${i.flavor}, ${i.nicotine}) x${i.quantity}`
    ).join('\n');

    let mapsLinkText = locationUrl || `https://maps.google.com/?q=${totals.lat || 30.0166},${totals.lng || 31.4913}`;
    let destinationText = addressString || "Custom Google Maps Link Provided";

    // Format WhatsApp template message
    const messageTemplate = 
`--- NEW ORDER: #${orderId} ---
*Items Ordered:*
${itemsText}

*Subtotal:* ${totals.subtotal} EGP
${totals.discountVal > 0 ? `*Discount Applied:* -${totals.discountVal} EGP\n` : ''}*Cairo Delivery (Flat):* ${totals.shippingFee} EGP
*Grand Total:* ${totals.total} EGP

*Delivery Address:* 
${destinationText}
GPS Location URL: ${mapsLinkText}
${notes ? `*Delivery Notes:* ${notes}` : ''}

*Payment Method:* Cash on Delivery (COD)
Please dispatch my order. Thank you!`;

    const encodedMsg = encodeURIComponent(messageTemplate);
    const waNumber = '+201000000000'; // Cairo vape shop representative line

    // Create tracking order object
    const newActiveOrder = {
      referenceId: orderId,
      time: timeString,
      address: destinationText,
      total: totals.total,
      stage: 1
    };

    setActiveOrder(newActiveOrder);

    // Save order history entry
    const loggedOrder = orderService.createOrder({
      referenceId: orderId,
      time: timeString,
      address: destinationText,
      notes: notes,
      locationUrl: mapsLinkText,
      itemsSummary: itemsSummary,
      total: totals.total
    });

    setOrdersHistory(prev => [...prev, loggedOrder]);

    // Update loyalty points: deduct spent, credit 1 point per 10 EGP spent
    const pointsEarned = Math.round(totals.total / 10);
    const finalPoints = Math.max(0, currentPoints - redeemedPoints) + pointsEarned;
    if (updateLoyaltyPointsCallback) updateLoyaltyPointsCallback(finalPoints);

    // Open WhatsApp
    window.open(`https://wa.me/${waNumber}?text=${encodedMsg}`, '_blank');

    // Reset checkout states and cart
    clearCart();
  };

  const getActiveOrdersCount = () => {
    return ordersHistory.length;
  };

  return (
    <OrderContext.Provider value={{
      activeOrder,
      setActiveOrder,
      ordersHistory,
      placeOrder,
      getActiveOrdersCount
    }}>
      {children}
    </OrderContext.Provider>
  );
};
