import { AxiosRequestConfig } from 'axios';
import React from 'react';
import CustomersController from './customers.controller';
import TripsController from './trips.controller';

interface APIControllers {
  customers: CustomersController;
  trips: TripsController;
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
  trips: new TripsController(
    `${process.env.REACT_APP_DRIVER_ADMIN_API_URL}/trips`,
    authInterceptor
  ),
});

const APIContext = React.createContext<APIControllers>(makeApiContextValue());

export const APIProvider = APIContext.Provider;

export const useAPI = () => {
  const context = React.useContext(APIContext);
  return context;
};
