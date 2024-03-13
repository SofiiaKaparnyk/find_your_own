import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import handleError from './errorHandler';
import { Endpoints } from '../constants';

export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8000';

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

interface ILoginResponse {
  refresh: string;
  access: string;
}

export const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');

  return axiosInstance
    .post<ILoginResponse>(Endpoints.REFRESH_TOKEN, { refresh: refresh_token })
    .then((res) => {
      if (res.statusText === 'OK') {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);

        return res.data.access;
      }
    })
    .catch(handleError);
};

let refresh = false;
let requestQueue: any[] = [];

const callRequestsFromQueue = (token: string) => {
  requestQueue.forEach((callback: (token: string) => void) => callback(token));
};
const addRequestToQueue = (callback: (token: string) => void) => {
  requestQueue.push(callback);
};
const clearQueue = () => {
  requestQueue = [];
};

axiosInstance.interceptors.response.use(
  (resp) => resp,
  async (error: AxiosError) => {
    const { response, config: sourceConfig } = error;

    if (response?.status === 401) {
      if (!refresh) {
        refresh = true;

        refreshAccessToken()
          .then((access_token) => {
            refresh = false;
            callRequestsFromQueue(access_token as string);
            clearQueue();
          })
          .catch((err) => {
            refresh = false;
            clearQueue();
            // handleError(err);
          });
      }

      const retryRequest = new Promise((resolve) => {
        // we push new function to queue
        addRequestToQueue((token: string) => {
          // function takes one param 'token'
          (sourceConfig as InternalAxiosRequestConfig).headers.Authorization = `Bearer ${token}`; // set token to header
          resolve(axios((sourceConfig as InternalAxiosRequestConfig))); // and resolve promise with axios request by old config with new token
          // we resolve exactly axios request - NOT axiosInstance request cause it could call recursion
        });
      });

      return retryRequest;
    } else {
      return Promise.reject(error);
    }
  }
);
