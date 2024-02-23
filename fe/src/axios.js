import axios from 'axios';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';
console.timeLog(API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
// export default class AxiosService {
//   static token: string;

//    private static _axiosInstance: AxiosInstance = axios.create({
//     baseURL: API_URL,
//   });

//   static setToken(token: string) {
//     this.token = token;
//     this._axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`
//   }

//   static removeToken() {
//     this.token = "";
//     this._axiosInstance.defaults.headers.common.Authorization = "";
//   }

//   static getToken() {
//     return this.token
//   }

//   static getAxiosInstance(): AxiosInstance {
//     return AxiosService._axiosInstance
//   }
// }
