import { axiosInstance } from '@/api';
import { Area } from '@/types/area';

import { ApiResponse } from './types';
import { CreateAreaPayload, UpdateAreaPayload } from './types/area';

export namespace areaApi {
  export let loading = false;

  // OData
  export async function getAll(): Promise<ApiResponse<Area[]>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.get(
        '/areas?$select=id,name,position,code,isDeleted&$filter=isDeleted eq false',
      );

      if (axiosResponse.status >= 200 && axiosResponse.status < 300) {
        return {
          isSuccess: true,
          message: 'Areas fetched successfully',
          data: axiosResponse.data.value || [],
        };
      }

      return {
        isSuccess: false,
        message: 'Failed to fetch areas',
        data: [],
      };
    } catch (error: any) {
      return {
        isSuccess: false,
        message:
          error.response?.statusText ||
          error.message ||
          'Failed to fetch areas',
        data: [],
      };
    } finally {
      loading = false;
    }
  }

  // export async function getAll(): Promise<ApiResponse<Area[]>> {
  //   try {
  //     const axiosResponse = await axiosInstance.get<ApiResponse<Area[]>>(
  //       '/areas?$select=id,name,position,code,isDeleted&$filter=isDeleted eq false',
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
    payload: CreateAreaPayload,
  ): Promise<ApiResponse<Area | undefined>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.post<ApiResponse<Area>>(
        '/areas',
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
    payload: UpdateAreaPayload,
  ): Promise<ApiResponse<Area | undefined>> {
    try {
      loading = true;
      const axiosResponse = await axiosInstance.put<ApiResponse<Area>>(
        `/areas/${id}`,
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
        `/areas/${id}`,
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
