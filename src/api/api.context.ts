import { AxiosRequestConfig } from 'axios';
import React from 'react';
import CustomersController from './customers.controller';

interface APIControllers {
  customers: CustomersController;
}

export const makeApiContextValue = (
  authInterceptor?: (
    config: AxiosRequestConfig
  ) => Promise<AxiosRequestConfig> | AxiosRequestConfig
) => ({
  customers: new CustomersController(
    `${process.env.REACT_APP_DRIVER_ADMIN_API_URL}/customers`,
    authInterceptor
  ),
});

const APIContext = React.createContext<APIControllers>(makeApiContextValue());

export const APIProvider = APIContext.Provider;

export const useAPI = () => {
  const context = React.useContext(APIContext);
  return context;
};
