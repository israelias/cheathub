import axios from 'axios';

const axiosConfig = {
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
  headers: { Authorization: 'Bearer Token' },
};

function faveSnippet(id: string, accessToken: string) {
  const config = {
    baseURL: 'http://localhost:5000/api/',
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axios.post(`likesnippet/${id}`, config);
}

export { faveSnippet };
