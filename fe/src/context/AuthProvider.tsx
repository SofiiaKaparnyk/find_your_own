import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import IUser, { IBackEndError, ILoginData, ISignupData } from 'types';
import { SubmitHandler } from 'react-hook-form';
import AxiosService from '../utils/axios';

interface IDefaultValue {
  isAuthenticated: boolean;
  isLoading: boolean;
  register: SubmitHandler<ISignupData>;
  logIn: SubmitHandler<ILoginData>;
  logOut: () => void;
}

interface ILoginResponse {
  refresh: string;
  access: string;
}
const defaultValue: IDefaultValue = {
  isAuthenticated: false,
  isLoading: false,
  register: () => {},
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem('access_token') || '';
      AxiosService.setToken(token);
    } else {
      
      const refreshToken = localStorage.getItem('refresh_token') || '';
      if (refreshToken) {
        AxiosService.getAxiosInstance()
          .post('/users/token/refresh/', { refresh: refreshToken })
          .then((response) => {
            if (response.status === 200) {
              AxiosService.setToken(response.data.access);
              localStorage.setItem('access_token', response.data.access);
              localStorage.setItem('refresh_token', response.data.refresh);
              setAuthenticated(true);
            }
          })
          .finally(() => setLoading(false));
      }
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logIn: SubmitHandler<ILoginData> = async (data) => {
    try {
      const response = await AxiosService.getAxiosInstance().post<ILoginResponse>(
        '/users/token/',
        data
      );

      if (response.data) {
        AxiosService.setToken(response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('access_token', response.data.access);
        setAuthenticated(true);
        navigate('/map');
        return;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error((error as AxiosError<IBackEndError>).response?.data.type);
    }
  };

  const register: SubmitHandler<ISignupData> = async (data) => {
    try {
      const response = await AxiosService.getAxiosInstance().post<IUser>(
        '/users/register/',
        data
      );
      if (response.data) {
        logIn({ email: response.data.email, password: response.data.password });
        return;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.error((error as AxiosError<IBackEndError>).response?.data.type);
    }
  };

  const logOut = async () => {
    const refreshToken = localStorage.getItem('refresh_token') || '';

    await AxiosService.getAxiosInstance().post('/users/logout/', {
      refresh_token: refreshToken,
    });

    AxiosService.removeToken();
    localStorage.clear();
    setAuthenticated(false);
    navigate('/');
  };

  const value = { isAuthenticated, isLoading, register, logIn, logOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
