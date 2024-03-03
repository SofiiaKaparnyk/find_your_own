import axios, { AxiosInstance } from 'axios';
import handleError from './errorHandler';
import { Endpoints } from '../constants';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export default class AxiosService {
  static token: string | undefined;

  private static _axiosInstance: AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  static setToken(access: string, refresh: string) {
    this.token = access;
    this._axiosInstance.defaults.headers.common.Authorization = `Bearer ${access}`;
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
  }

  static removeToken() {
    this.token = '';
    this._axiosInstance.defaults.headers.common.Authorization = null;
    localStorage.clear();
  }

  static getToken() {
    return this.token;
  }

  static getAxiosInstance(): AxiosInstance {
    return AxiosService._axiosInstance;
  }
}

let refresh = false;

AxiosService.getAxiosInstance().interceptors.response.use(
  (resp) => resp,
  async (error) => {
    const refresh_token = localStorage.getItem('refresh_token');
    if (error.response.status === 401 && !refresh && refresh_token) {
      refresh = true;

      AxiosService.getAxiosInstance()
        .post(Endpoints.REFRESH_TOKEN, { refresh: refresh_token })
        .then((res: any) => {
          if (res.statusText === 'OK') {
            AxiosService.getAxiosInstance().defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            return axios(error.config);
          }
        })
        .catch(handleError);
    }
    refresh = false;
    return Promise.reject(error);
  }
);
