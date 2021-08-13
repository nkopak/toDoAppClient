import axios from 'axios';

const axiosInstance = (token: string) =>
  axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 1000,
    headers: { Authorization: `Bearer ${token}` }
  });

export default axiosInstance;
