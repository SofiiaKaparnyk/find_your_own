import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { axiosInstance, refreshAccessToken } from '../utils/axios';
import { Endpoints } from '../constants';
import { ILoginData, ISignupData, IUserProfile } from 'types/users';
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
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        refreshAccessToken()
          .then((access_token) => {
            if(access_token) {
              setAuthenticated(true);
            }
          })
          .catch((err) => {
            handleError(err);
            setAuthenticated(false);
          });
        
      } else {
        setAuthenticated(false);
      }
    };

    checkAuthorization().finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      axiosInstance.get<IUserProfile>(Endpoints.USER_PROFILE)
        .then((res) => {
          if(res?.statusText === 'OK') {
            setUser(res.data);
          }
        })
        .catch(handleError);
    };

    if (isAuthenticated) {
      getUser();
    }
  }, [isAuthenticated]);

  const logIn: SubmitHandler<ILoginData> = async (data) => {
    axiosInstance
      .post<ILoginResponse>(Endpoints.LOGIN, data)
      .then((res) => {
        if (res.statusText === 'OK') {
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
          localStorage.setItem('access_token', res.data.access);
          localStorage.setItem('refresh_token', res.data.refresh);

          setAuthenticated(true);
          navigate('/map');
        }
      })
      .catch(handleError);
  };

  const register: SubmitHandler<ISignupData<string>> = async (data) => {
    axiosInstance
      .post<ISignupData>(Endpoints.REGISTER, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        if (res.statusText === 'Created') {
          logIn({ email: res.data.email, password: res.data.password });
        }
      })
      .catch(handleError);
  };

  const logOut = async () => {
    const refreshToken = localStorage.getItem('refresh_token') || '';
    axiosInstance
      .post(Endpoints.LOGOUT, {
        refresh_token: refreshToken,
      })
      .then(() => {
        axiosInstance.defaults.headers.common.Authorization = null;
        localStorage.clear();

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
