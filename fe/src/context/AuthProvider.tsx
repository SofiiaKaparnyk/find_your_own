import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { IBackEndError, ILoginData, ISignupData, IUserProfile } from 'types';
import { SubmitHandler } from 'react-hook-form';
import AxiosService from '../utils/axios';
import { Endpoints } from '../constants';

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

      if(accessToken && refreshToken) {
        AxiosService.setToken(accessToken, refreshToken);
        setAuthenticated(true);
      } else if(refreshToken) {
        AxiosService.getAxiosInstance()
          .post(Endpoints.REFRESH_TOKEN, { refresh: refreshToken })
          .then((response) => {
            if (response.status === 200) {
              AxiosService.setToken(response.data.access, response.data.refresh);
              setAuthenticated(true);
            }
          })
          .catch((error) => {
            console.log(error);
            setAuthenticated(false);
          });
      } else {
        setAuthenticated(false);
      }
    }

    checkAuthorization().finally(() => setLoaded(true));
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await AxiosService.getAxiosInstance().get<IUserProfile>(Endpoints.USER_PROFILE);

        if (data.status === 200) {
          setUser(data.data);
        }
      } catch (err) {
        console.log((err as AxiosError<IBackEndError>).response?.data.errors[0].detail);
      }
    };
    if(isAuthenticated) {
      getUser();
    }

  }, [isAuthenticated]);

  const logIn: SubmitHandler<ILoginData> = async (data) => {
    try {
      const response = await AxiosService.getAxiosInstance().post<ILoginResponse>(
        Endpoints.LOGIN,
        data
      );

      if (response.data) {
        AxiosService.setToken(response.data.access, response.data.refresh);
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

  const register: SubmitHandler<ISignupData<string>> = async (data) => {
    try {
      const response = await AxiosService.getAxiosInstance().post<ISignupData>(
        Endpoints.REGISTER,
        data,
        {
          headers: {
              "Content-Type": "multipart/form-data",
          },
      }
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
    try {
      await AxiosService.getAxiosInstance().post(Endpoints.LOGOUT, {
        refresh_token: refreshToken,
      });

      AxiosService.removeToken();
      setAuthenticated(false);
      navigate('/');
    } catch (error) {
      console.error((error as AxiosError<IBackEndError>).response?.data.type);
    }
  };

  const value = { isAuthenticated, isLoaded, user, register, logIn, logOut };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
