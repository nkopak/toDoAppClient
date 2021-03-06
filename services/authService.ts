import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { User } from '../types/register';

const baseUrl: string = 'http://localhost:5000/auth';

const logout = async (): Promise<void> => {
  await localStorage.removeItem('token');
};

const getToken = () => {
  let status;
  if (typeof window !== 'undefined') {
    status = localStorage.getItem('token');
  }
  return status;
};

const getTokenInfo = () => {
  let tokenInfo;
  const token = getToken();
  if (typeof token === 'string') {
    tokenInfo = jwtDecode(token);
  }
  return tokenInfo;
};

const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const response = await Axios.post(`${baseUrl}/login`, {
    email,
    password
  });

  if (!response.data.auth) {
    return null;
  }
  localStorage.setItem('token', response.data.tokens.access_token);
  const token = response.data.tokens.access_token;
  return token;
};

const register = async (userData: User): Promise<any> => {
  const response = await Axios.post(`${baseUrl}/register`, userData);

  if (!response) {
    return null;
  }

  localStorage.setItem('token', response.data.tokens.access_token);

  return response;
};

export default {
  login,
  logout,
  register,
  getToken,
  getTokenInfo
};
