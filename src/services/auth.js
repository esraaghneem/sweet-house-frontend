import api from './api';

export const register = async (userData) => {
  const response = await api.post('/register', userData);

  const { token, user } = response.data.data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const login = async (credentials) => {
  const response = await api.post('/login', credentials);

  const { token, user } = response.data.data;

  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));

  return user;
};

export const logout = async () => {
  try {
    await api.post('/logout');
  } finally {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const getCurrentUser = async () => {
  const response = await api.get('/user');

  localStorage.setItem('user', JSON.stringify(response.data.data));

  return response.data.data;
};