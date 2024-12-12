import { axiosInstance } from '@/api';
import { Category } from '@/types/category';

import { ApiResponse } from './types';
import { CreateCategoryPayload, UpdateCategoryPayload } from './types/category';

export namespace categoryApi {
  export let loading = false;

  // OData
  export async function getAll(): Promise<ApiResponse<Category[]>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.get(
        '/categories?$select=id,name,description,imageUrl,isDeleted&$filter=isDeleted eq false',
      );

      if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
        return {
          isSuccess: true,
          message: 'Categories fetched successfully',
          data: axiosResponse.data.value || [],
        };
      }

      return {
        isSuccess: false,
        message: 'Failed to fetch categories',
        data: [],
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message:
          error.response?.statusText ||
          error.message ||
          'Failed to fetch categories',
        data: [],
      };
    } finally {
      loading = false;
    }
  }

  // export async function getAll(): Promise<ApiResponse<Category[]>> {
  //   try {
  //     const axiosResponse = await axiosInstance.get<ApiResponse<Category[]>>(
  //       '/categories?$select=id,name,position,code,isDeleted&$filter=isDeleted eq false',
  //     );
  //     const response = axiosResponse.data;

  //     if (response.isSuccess) {
  //       return {
  //         isSuccess: true,
  //         message: response.message,
  //         data: response.data,
  //       };
  //     }

  //     return {
  //       isSuccess: false,
  //       message: response.message,
  //       data: [],
  //     };
  //   } catch (error: any) {
  //     return {
  //       isSuccess: false,
  //       message: error?.message || 'An unexpected error occurred.',
  //       data: [],
  //     };
  //   }
  // }

  export async function create(
    payload: CreateCategoryPayload,
  ): Promise<ApiResponse<Category | undefined>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.post<ApiResponse<Category>>(
        '/categories',
        payload,
      );
      const response = axiosResponse.data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      }

      return {
        isSuccess: false,
        message: response.message,
        data: undefined,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'An unexpected error occurred.',
        data: undefined,
      };
    } finally {
      loading = false;
    }
  }

  export async function update(
    id: string,
    payload: UpdateCategoryPayload,
  ): Promise<ApiResponse<Category | undefined>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.put<ApiResponse<Category>>(
        `/categories/${id}`,
        payload,
      );
      const response = axiosResponse.data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: response.data,
        };
      }

      return {
        isSuccess: false,
        message: response.message,
        data: undefined,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'An unexpected error occurred.',
        data: undefined,
      };
    } finally {
      loading = false;
    }
  }

  export async function deleteById(
    id: string,
  ): Promise<ApiResponse<undefined>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
        `/categories/${id}`,
      );
      const response = axiosResponse.data;

      if (response.isSuccess) {
        return {
          isSuccess: true,
          message: response.message,
          data: undefined,
        };
      }

      return {
        isSuccess: false,
        message: response.message,
        data: undefined,
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message: error?.message || 'An unexpected error occurred.',
        data: undefined,
      };
    } finally {
      loading = false;
    }
  }
}
