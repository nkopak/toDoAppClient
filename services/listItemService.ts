import { ICreateListItemData } from '../types/listItem';
import axiosInstance from './axiosInstance';

const loadListItems = async (
  userId: string,
  todoId: string,
  token: string
): Promise<any> => {
  const response = await axiosInstance(token).get(
    `/users/${userId}/lists/${todoId}/todoItems`
  );

  if (!response) {
    return null;
  }

  return response.data;
};

const createListItem = async (data: ICreateListItemData): Promise<any> => {
  const response = await axiosInstance(data.token).post(
    `/users/${data.userId}/lists/${data.todoId}/todoItems`,
    data
  );

  if (!response) {
    return null;
  }
  console.log(response);
  return response.data[0];
};

export default { loadListItems, createListItem };
