import { useContext, createContext, PropsWithChildren, useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { SubmitHandler } from 'react-hook-form';
import { IUserProfile } from 'types/users';
import { getUserProfile, logIn, logOut, register } from 'services';
import { ILoginData, ISignupData } from 'types/auth';

interface IDefaultValue {
  isAuthenticated: boolean;
  user: IUserProfile | undefined;
  register: SubmitHandler<ISignupData<string>>;
  logIn: SubmitHandler<ILoginData>;
  logOut: () => void;
}

const defaultValue: IDefaultValue = {
  isAuthenticated: false,
  user: undefined,
  register: () => {},
  logIn: () => {},
  logOut: () => {},
};

const AuthContext = createContext(defaultValue);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const token: unknown = useLoaderData();
  const [isAuthenticated, setAuthenticated] = useState(!!token);
  const [user, setUser] = useState<IUserProfile>();
  const navigate = useNavigate();

  useEffect(() => {
    if(isAuthenticated) {
      getUserProfile().then((res) => {
        if (res) {
          setUser(res);
        } else {
        }
      });
    }
  }, [isAuthenticated]);

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
      setUser(undefined);
      navigate('/');
    });
  };

  const value = {
    isAuthenticated,
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
