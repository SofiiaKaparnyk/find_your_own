import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
}

const defaults: ILoadingContext = {
  isLoading: false,
  setIsLoading: (val: boolean) => {},
};

const LoadingContext = createContext(defaults);

const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
export const useLoading = () => {
  return useContext(LoadingContext);
};
