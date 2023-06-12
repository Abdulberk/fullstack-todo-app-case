import axios from 'axios';

const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:5000';

const instance = axios.create({
  baseURL: baseURL,
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
