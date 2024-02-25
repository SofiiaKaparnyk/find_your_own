import axios from 'axios';
import AxiosService from './axios';

let refresh = false;

AxiosService.getAxiosInstance().interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;
      console.log('In interceptor: ', localStorage.getItem('refresh_token'));

      const response = await AxiosService.getAxiosInstance().post(
        '/users/token/',
        { refresh_token: localStorage.getItem('refresh_token') },
        { withCredentials: true }
      );

      if (response.status === 200) {
        AxiosService.getAxiosInstance().defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
