import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import AxiosService from '../utils/axios';
import { Endpoints } from '../constants';
import { ILoginData, ISignupData, IUserProfile } from 'types';
import handleError from '../utils/errorHandler';

interface IDefaultValue {
  isAuthenticated: boolean;
  isLoaded: boolean;
  user: IUserProfile | undefined;
  register: SubmitHandler<ISignupData<string>>;
  logIn: SubmitHandler<ILoginData>;
  logOut: () => void;
}

interface ILoginResponse {
  refresh: string;
  access: string;
}
const defaultValue: IDefaultValue = {
  isAuthenticated: false,
  isLoaded: false,
  user: undefined,
  register: () => {},
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState<IUserProfile>();
  const [isLoaded, setLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (accessToken && refreshToken) {
        AxiosService.setToken(accessToken, refreshToken);
        setAuthenticated(true);
      } else if (refreshToken) {
        AxiosService.getAxiosInstance()
          .post<ILoginResponse>(Endpoints.REFRESH_TOKEN, { refresh: refreshToken })
          .then(res => {
            if (res.statusText === 'OK') {
              AxiosService.setToken(res.data.access, res.data.refresh);
              setAuthenticated(true);
            }
          })
          .catch(handleError);
      } else {
        setAuthenticated(false);
      }
    };

    checkAuthorization().finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      AxiosService.getAxiosInstance()
        .get<IUserProfile>(Endpoints.USER_PROFILE)
        .then(res => {
          setUser(res.data);
        })
        .catch(handleError);
    };

    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  const logIn: SubmitHandler<ILoginData> = async (data) => {
    AxiosService.getAxiosInstance()
      .post<ILoginResponse>(Endpoints.LOGIN, data)
      .then(res => {
        if (res.statusText === 'OK') {
          AxiosService.setToken(res.data.access, res.data.refresh);
          setAuthenticated(true);
          navigate('/map');
        }
      })
      .catch(handleError);
  };

  const register: SubmitHandler<ISignupData<string>> = async (data) => {
    AxiosService.getAxiosInstance()
      .post<ISignupData>(Endpoints.REGISTER, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        if (res.statusText === 'OK') {
          logIn({ email: res.data.email, password: res.data.password });
        }
      })
      .catch(handleError);
  };

  const logOut = async () => {
    const refreshToken = localStorage.getItem('refresh_token') || '';
    AxiosService.getAxiosInstance()
      .post(Endpoints.LOGOUT, {
        refresh_token: refreshToken,
      })
      .then(() => {
        AxiosService.removeToken();
        setAuthenticated(false);
        navigate('/');
      })
      .catch(handleError);
  };

  const value = { isAuthenticated, isLoaded, user, register, logIn, logOut };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
