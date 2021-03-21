import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface Customer {
  id: number;
  name: string;
  phoneNumber?: string;
  createAt: string;
  updatedAt: string;
}

export interface CustomerCreateInput {
  name: string;
  phoneNumber?: string;
}

export default class CustomersController {
  http: AxiosInstance;

  constructor(
    baseURL: string,
    authInterceptor?: (
      config: AxiosRequestConfig
    ) => Promise<AxiosRequestConfig> | AxiosRequestConfig
  ) {
    this.http = axios.create({ baseURL });
    if (authInterceptor) this.http.interceptors.request.use(authInterceptor);
  }

  create(customer: CustomerCreateInput) {
    return this.http.post<CustomerCreateInput, Customer>('', customer);
  }
}
