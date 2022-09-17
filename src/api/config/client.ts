import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  responseType: 'json',
  validateStatus: (status) => status <= 500,
  timeout: 60000,
});

export { api as HTTP_CLIENT };
