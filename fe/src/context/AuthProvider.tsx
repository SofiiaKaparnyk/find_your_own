import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { refreshAccessToken } from '../utils/axios';
import { IUserProfile } from 'types/users';
import handleError from '../utils/errorHandler';
import { getUserProfile, logIn, logOut, register } from 'services';
import { ILoginData, ISignupData } from 'types/auth';

interface IDefaultValue {
  isAuthenticated: boolean;
  isLoaded: boolean;
  user: IUserProfile | undefined;
  register: SubmitHandler<ISignupData<string>>;
  logIn: SubmitHandler<ILoginData>;
  logOut: () => void;
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
    getUserProfile().then((res) => {
      if (res) {
        setUser(res);
        setAuthenticated(true);
        setLoaded(true);
      } else {
        setLoaded(true);
      }
    });
  }, []);

  const logInFn: SubmitHandler<ILoginData> = async (data) => {
    logIn(data).then((res) => {
      if (res) {
        setAuthenticated(true);
        navigate('/map');
      }
    });
  };

  const registerFn: SubmitHandler<ISignupData<string>> = async (data) => {
    register(data, logInFn);
  };

  const logOutFn = async () => {
    logOut().then(() => {
      setAuthenticated(false);
      navigate('/');
    });
  };

  const value = {
    isAuthenticated,
    isLoaded,
    user,
    register: registerFn,
    logIn: logInFn,
    logOut: logOutFn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
