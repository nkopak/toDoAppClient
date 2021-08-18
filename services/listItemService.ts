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

  // console.log(response);
  return response.data;
};

export default { loadListItems };
