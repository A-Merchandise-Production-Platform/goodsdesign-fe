import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { Category } from '@/types/category';

import { ApiResponse } from './types';

export namespace CategoryApi {
  export async function getAll(options: Partial<QueryOptions<Category>>) {
    const query = buildQuery(options);
    const axiosResponse = await axiosInstance.get(`/categories${query}`);
    return axiosResponse.data;
  }

  export async function create(payload: Partial<Category>) {
    const axiosResponse = await axiosInstance.post<ApiResponse<Category>>(
      '/categories',
      payload,
    );
    return axiosResponse.data;
  }

  export async function update(id: string, payload: Partial<Category>) {
    const axiosResponse = await axiosInstance.put<ApiResponse<Category>>(
      `/categories/${id}`,
      payload,
    );
    return axiosResponse.data;
  }

  export async function deleteById(id: string) {
    const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
      `/categories/${id}`,
    );
    return axiosResponse.data;
  }
}
