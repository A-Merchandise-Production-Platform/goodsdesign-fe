import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { Area } from '@/types/area';

import { ApiResponse, ODataResponse } from './types';

export namespace AreaApi {
  export async function getAll(options: Partial<QueryOptions<Area>>) {
    const query = buildQuery(options);
    const response = await axiosInstance.get<ODataResponse<Area>>(
      `/areas${query}`,
    );
    return response.data;
  }
}

export async function create(
  payload: Partial<Area>,
): Promise<ApiResponse<Area | undefined>> {
  try {
    const axiosResponse = await axiosInstance.post<ApiResponse<Area>>(
      '/areas',
      payload,
    );
    return axiosResponse.data;
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error?.message || 'An unexpected error occurred.',
      data: undefined,
    };
  }
}

export async function update(
  id: string,
  payload: Partial<Area>,
): Promise<ApiResponse<Area | undefined>> {
  try {
    const axiosResponse = await axiosInstance.put<ApiResponse<Area>>(
      `/areas/${id}`,
      payload,
    );
    return axiosResponse.data;
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error?.message || 'An unexpected error occurred.',
      data: undefined,
    };
  }
}

export async function deleteById(id: string): Promise<ApiResponse<undefined>> {
  try {
    const axiosResponse = await axiosInstance.delete<ApiResponse<undefined>>(
      `/areas/${id}`,
    );
    return axiosResponse.data;
  } catch (error: any) {
    return {
      isSuccess: false,
      message: error?.message || 'An unexpected error occurred.',
      data: undefined,
    };
  }
}
