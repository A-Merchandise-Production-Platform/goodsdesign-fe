import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { Product } from '@/types/product';

import { ApiResponse } from './types';

export namespace ProductApi {
  export async function getAll(
    options: Partial<QueryOptions<Product>> = {},
  ): Promise<ApiResponse<Product[]>> {
    try {
      const query = buildQuery(options);
      const axiosResponse = await axiosInstance.get(`/products${query}`);
      const data = axiosResponse.data;

      return {
        isSuccess: true,
        message: 'Products fetched successfully',
        data: data.value || [],
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message:
          error.response?.statusText ||
          error.message ||
          'Failed to fetch products',
        data: [],
      };
    }
  }

  export async function create(
    payload: Partial<Product>,
  ): Promise<ApiResponse<Product | undefined>> {
    try {
      const axiosResponse = await axiosInstance.post<ApiResponse<Product>>(
        '/products',
        payload,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to create product',
        data: undefined,
      };
    }
  }

  export async function update(
    id: string,
    payload: Partial<Product>,
  ): Promise<ApiResponse<Product | undefined>> {
    try {
      const axiosResponse = await axiosInstance.put<ApiResponse<Product>>(
        `/products/${id}`,
        payload,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to update product',
        data: undefined,
      };
    }
  }

  export async function deleteById(
    id: string,
  ): Promise<ApiResponse<undefined>> {
    try {
      const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
        `/products/${id}`,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to delete product',
        data: undefined,
      };
    }
  }
}
