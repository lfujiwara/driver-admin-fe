import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { FindManyQuery } from './common';

export interface Trip {
  id: number;
  createdAt?: string;
  updatedAt?: string;
  origin: string;
  destination: string;
  scheduledTime: string;
  departTime: string;
  arrivalTime: string;
  fare: number;
  customerId: number;
}

export interface TripCreateInput {
  origin: string;
  destination: string;
  scheduledTime: string | Date;
  departTime?: string | Date;
  arrivalTime?: string | Date;
  fare: number;
  customerId: number;
}

export default class TripsController {
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

  create(trip: TripCreateInput) {
    return this.http.post<TripCreateInput, AxiosResponse<Trip>>('', trip);
  }

  read(query: FindManyQuery = {}) {
    return this.http.get<any, AxiosResponse<Trip[]>>('', { params: query });
  }

  update(id: number, data: Partial<Trip>) {
    return this.http.patch<Partial<Trip>, AxiosResponse<Trip>>(`${id}`, data);
  }

  delete(id: number) {
    return this.http.delete<any, AxiosResponse<Trip>>(`${id}`);
  }
}
