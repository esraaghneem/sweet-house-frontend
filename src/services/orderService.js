import api from './api';

export const createOrder = async (items) => {
  const response = await api.post('/orders', {
    items: items,
  });

  return response.data;
};

export const getOrders = async () => {
  const response = await api.get('/orders');

  return response.data;
};

export const getOrder = async (id) => {
  const response = await api.get('/orders/' + id);

  return response.data;
};

export const payOrder = async (orderId) => {
  const response = await api.post(
    `/orders/${orderId}/payment`
  );

  return response.data;
};