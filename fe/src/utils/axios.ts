import axios, { AxiosInstance } from 'axios';
// import './axiosInterceptor';

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
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await AxiosService.getAxiosInstance().post(
        '/users/token/refresh/',
        { refresh: localStorage.getItem('refresh_token') }
        // {
        //   headers: { 'Content-Type': 'application/json' },
        //   withCredentials: true
        // },
      );

      if (response.status === 200) {
        AxiosService.getAxiosInstance().defaults.headers.common.Authorization = `Bearer ${response.data.access}`;
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return axios(error.config);
      }
    }
    refresh = false;
    // return error;
  }
);
