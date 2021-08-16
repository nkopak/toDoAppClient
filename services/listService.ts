// import axios from 'axios';
import {
  ICreateListData,
  IDeleteListData,
  IUpdateListData
} from '../types/list';
import axiosInstance from './axiosInstance';

const loadLists = async (userId: string, token: string): Promise<any> => {
  const response = await axiosInstance(token).get(`/${userId}/lists`);

  if (!response) {
    return null;
  }

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

  return response.data[0];
};

const updateList = async (data: IUpdateListData): Promise<any> => {
  const response = await axiosInstance(data.token).put(
    `${data.userId}/lists/${data.id}`,
    data
  );

  return response.data[0];
};

const deleteList = async (data: IDeleteListData): Promise<any> => {
  const response = await axiosInstance(data.token).delete(
    `${data.userId}/lists/${data.id}`
  );

  return response.data[0];
};

export default { loadLists, createList, updateList, deleteList };
