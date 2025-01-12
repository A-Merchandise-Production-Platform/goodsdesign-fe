import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { Product } from '@/types/product';

import { ApiResponse, ODataResponse } from './types';

export namespace ProductApi {
  export async function getAll(options: Partial<QueryOptions<Product>> = {}) {
    const query = buildQuery(options);
    const axiosResponse = await axiosInstance.get<ODataResponse<Product>>(
      `/products${query}`,
    );
    return axiosResponse.data;
  }
  export async function create(payload: Partial<Product>) {
    const axiosResponse = await axiosInstance.post<ApiResponse<Product>>(
      '/products',
      payload,
    );
    return axiosResponse.data;
  }

  export async function update(id: string, payload: Partial<Product>) {
    const axiosResponse = await axiosInstance.put<ApiResponse<Product>>(
      `/products/${id}`,
      payload,
    );
    return axiosResponse.data;
  }

  export async function deleteById(id: string) {
    const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
      `/products/${id}`,
    );
    return axiosResponse.data;
  }
}
