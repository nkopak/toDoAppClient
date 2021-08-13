// import axios from 'axios';
import { ICreateListData } from '../types/list';
import axiosInstance from './axiosInstance';

const loadLists = async (userId: string, token: string): Promise<any> => {
  const response = await axiosInstance(token).get(`/${userId}/lists`);

  if (!response) {
    return null;
  }
  // console.log(response);
  return response.data;
};

// const loadLists = async (userId: string, token: string): Promise<any> => {
//   const response = await Axios.get(`${baseUrl}/${userId}/lists`, {
//     headers: {
//       Authorization: `Bearer ${token}`
//     }
//   });

//   if (!response) {
//     return null;
//   }
//   // console.log(response);
//   return response.data;
// };

const createList = async (data: ICreateListData): Promise<any> => {
  const response = await axiosInstance(data.token).post(
    `/${data.userId}/lists`,
    data
  );
  // console.log(response.data);
  return response.data[0];
};

// const createList = async (data: ICreateListData): Promise<void> => {
//   await axios.post(`${baseUrl}/${data.userId}/lists`, data, {
//     headers: {
//       Authorization: `Bearer ${data.token}`
//     }
//     // body: { userId: data.userId, todoTitle: data.todoTitle }
//   });
// };

export default { loadLists, createList };
