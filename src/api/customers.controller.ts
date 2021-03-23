import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { FindManyQuery } from './common';
import { Trip } from './trips.controller';

export interface Customer {
  id: number;
  name: string;
  phoneNumber?: string;
  createdAt?: string;
  updatedAt?: string;
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
    return this.http.post<CustomerCreateInput, AxiosResponse<Customer>>(
      '',
      customer
    );
  }

  read(query: FindManyQuery = {}) {
    return this.http.get<any, AxiosResponse<Customer[]>>('', { params: query });
  }

  update(id: number, data: Partial<Customer>) {
    return this.http.patch<Partial<Customer>, AxiosResponse<Customer>>(
      `${id}`,
      data
    );
  }

  delete(id: number) {
    return this.http.delete<any, AxiosResponse<Customer>>(`${id}`);
  }

  search(text: string, query: FindManyQuery = {}) {
    return this.http.get<any, AxiosResponse<Customer[]>>(
      text.trim() ? `search/${text.trim()}` : '',
      {
        params: query,
      }
    );
  }

  getById(id: number) {
    return this.http.get<any, AxiosResponse<Customer & { _tripCount: number }>>(
      `${id}`
    );
  }

  getMonthlyReportById(id: number, start: string, end: string) {
    return this.http.get<
      any,
      AxiosResponse<{
        trips: Trip[];
        aggregate: {
          avg: { fare: number };
          sum: { fare: number };
          count: number;
        };
      }>
    >(`${id}/report`, { params: { start, end } });
  }
}
