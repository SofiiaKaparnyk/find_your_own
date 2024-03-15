import { SubmitHandler } from 'react-hook-form';
import { Endpoints } from 'constants/index';
import { axiosInstance } from 'utils/axios';
import handleError from 'utils/errorHandler';
import { IEvent } from 'types/events';
import { IUser, IUserProfile } from 'types/users';
import { ILoginData, ILoginResponse, ISignupData } from 'types/auth';

// **************************Auth methods**************************//

export const logIn = async (data: ILoginData) => {
  return axiosInstance
    .post<ILoginResponse>(Endpoints.LOGIN, data)
    .then((res) => {
      if (res.statusText === 'OK') {
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
        localStorage.setItem('access_token', res.data.access);
        localStorage.setItem('refresh_token', res.data.refresh);
        return res.data;
      }
    })
    .catch(handleError);
};

export const register = async (
  data: ISignupData<string>,
  loginCallback: SubmitHandler<ILoginData>
) => {
  axiosInstance
    .post<ISignupData>(Endpoints.REGISTER, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.statusText === 'Created') {
        loginCallback({ email: res.data.email, password: res.data.password });
      }
    })
    .catch(handleError);
};

export const logOut = async () => {
  const refreshToken = localStorage.getItem('refresh_token') || '';
  axiosInstance
    .post(Endpoints.LOGOUT, {
      refresh_token: refreshToken,
    })
    .then(() => {
      axiosInstance.defaults.headers.common.Authorization = null;
      localStorage.clear();
    })
    .catch(handleError);
};

// ************************************************************** //

// *************************Users methods*************************//

export const getUserProfile = async (): Promise<IUserProfile | void> => {
  return axiosInstance
    .get<IUserProfile>(Endpoints.USER_PROFILE)
    .then((res) => {
      if (res?.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);
};

export const getUsers = async (): Promise<IUser[] | void> => {
  return axiosInstance
    .get<IUser[]>(Endpoints.USERS)
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);
};

// ************************************************************** //

// ************************Events methods************************//

export const getEvent = async (
  eventId: string | number
): Promise<IEvent<Date> | undefined | void> => {
  return axiosInstance
    .get<IEvent>(`${Endpoints.EVENT}${eventId}`)
    .then((res) => {
      if (res.statusText === 'OK') {
        return { ...res.data, date: new Date(res.data.date) };
      }
    })
    .catch(handleError);
};

export const getEvents = async (): Promise<IEvent[] | undefined | void> => {
  return axiosInstance
    .get<IEvent[]>(Endpoints.EVENTS)
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);
};

export const createEvent = async (data: IEvent): Promise<IEvent | undefined> => {
  return axiosInstance
    .post(Endpoints.EVENT, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.statusText === 'Created') {
        return res.data;
      }
    })
    .catch(handleError);
};

export const updateEvent = async (data: IEvent) => {
  return axiosInstance
    .put(`${Endpoints.EVENT}${data.id}`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);
};

// ************************************************************** //
