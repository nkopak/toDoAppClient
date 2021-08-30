import axiosInstance from './axiosInstance';

const getUser = async (userId: string, token: string): Promise<any> => {
  const response = await axiosInstance(token).get(`/users/${userId}`);

  if (!response) {
    return null;
  }
  //   console.log(response.data[0]);

  return response.data[0];
};

export default { getUser };
