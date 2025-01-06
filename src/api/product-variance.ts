import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { ProductVariance } from '@/types/product-variance';

import { ApiResponse } from './types';

export namespace ProductApi {
  export async function getAll(
    options: Partial<QueryOptions<ProductVariance>> = {},
  ): Promise<ApiResponse<ProductVariance[]>> {
    try {
      const query = buildQuery(options);
      const axiosResponse = await axiosInstance.get(`/product-variances${query}`);
      const data = axiosResponse.data;

      return {
        isSuccess: true,
        message: 'Product variances fetched successfully',
        data: data.value || [],
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message:
          error.response?.statusText ||
          error.message ||
          'Failed to fetch product variances',
        data: [],
      };
    }
  }

  export async function create(
    payload: Partial<ProductVariance>,
  ): Promise<ApiResponse<ProductVariance | undefined>> {
    try {
      const axiosResponse = await axiosInstance.post<ApiResponse<ProductVariance>>(
        '/product-variances',
        payload,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to create product variance',
        data: undefined,
      };
    }
  }

  export async function update(
    id: string,
    payload: Partial<ProductVariance>,
  ): Promise<ApiResponse<ProductVariance | undefined>> {
    try {
      const axiosResponse = await axiosInstance.put<ApiResponse<ProductVariance>>(
        `/product-variances/${id}`,
        payload,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to update product variance',
        data: undefined,
      };
    }
  }

  export async function deleteById(
    id: string,
  ): Promise<ApiResponse<undefined>> {
    try {
      const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
        `/product-variances/${id}`,
      );
      return axiosResponse.data;
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'Failed to delete product variance',
        data: undefined,
      };
    }
  }
}
