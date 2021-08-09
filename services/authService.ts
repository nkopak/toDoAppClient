import Axios from 'axios';
import { User } from '../types/register';

const baseUrl: string = 'http://localhost:5000/auth';

const logout = async (): Promise<void> => {
  await localStorage.removeItem('token');
};

// function handleResponse(response: any) {
//   return response.text().then((text: string) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         window.location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }

const login = async (
  email: string,
  password: string
): Promise<string | null> => {
  const response = await Axios.post(`${baseUrl}/login`, {
    email,
    password
  });
  // console.log(response);

  if (!response.data.auth) {
    return null;
  }
  localStorage.setItem('token', response.data.tokens.access_token);
  const token = response.data.tokens.access_token;
  // console.log(token);
  return token;
};

const register = async (userData: User): Promise<any> => {
  const response = await Axios.post(`${baseUrl}/register`, userData);

  if (!response) {
    return null;
  }

  return response;
};
export default {
  login,
  logout,
  register
};
