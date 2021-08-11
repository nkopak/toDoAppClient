import Axios from 'axios';

const baseUrl: string = 'http://localhost:5000/users';

const loadLists = async (userId: string, token: string): Promise<any> => {
  const response = await Axios.get(`${baseUrl}/${userId}/lists`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response) {
    return null;
  }
  // console.log(response);
  return response.data;
};

export default { loadLists };
