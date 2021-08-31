import { IUser } from '../types/user';
import axiosInstance from './axiosInstance';

const getUser = async (userId: string, token: string): Promise<any> => {
  const response = await axiosInstance(token).get(`/users/${userId}`);

  if (!response) {
    return null;
  }
  //   console.log(response.data[0]);

  return response.data[0];
};

const updateUser = async (
  userData: IUser,
  role: string,
  token: string
): Promise<any> => {
  const response = await axiosInstance(token).put(
    `/users/${userData.id}`,
    userData
  );

  if (!response) {
    return null;
  }

  return response;
};

const deleteUser = async (userId: string, token: string): Promise<any> => {
  const response = await axiosInstance(token).delete(`/users/${userId}`);

  if (!response) {
    return null;
  }
  console.log(response);

  return response;
};

export default { getUser, updateUser, deleteUser };
