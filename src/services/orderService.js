import storageService from './storageService';

export const orderService = {
  getOrders() {
    return storageService.getOrders();
  },

  createOrder(orderData) {
    const orders = storageService.getOrders();
    const newOrder = {
      referenceId: orderData.referenceId || 'EGP' + Math.floor(1000 + Math.random() * 9000),
      time: orderData.time || new Date().toLocaleTimeString(),
      address: orderData.address || '',
      notes: orderData.notes || '',
      locationUrl: orderData.locationUrl || '',
      itemsSummary: orderData.itemsSummary || '',
      total: orderData.total || 0
    };
    orders.push(newOrder);
    storageService.saveOrders(orders);
    return newOrder;
  }
};
export default orderService;
