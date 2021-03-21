import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { FindManyQuery } from './common';

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

  read(query: FindManyQuery) {
    return this.http.get<any, FindManyQuery>('', { params: query });
  }

  update(id: number, data: Partial<Customer>) {
    return this.http.patch<Partial<Customer>, Customer>(`${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<any, Customer>(`${id}`);
  }
}
