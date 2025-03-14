import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { ApiResponse, Notification, ODataResponse } from '@/api/types';
import {
  CreateUserDto,
  UpdateProfileDto,
  UpdateUserDto,
  User,
} from '@/api/types/user';

export namespace UserApi {
  export async function create(payload: CreateUserDto) {
    const response = await axiosInstance.post<ApiResponse<User>>(
      `/users`,
      payload,
    );
    return response.data;
  }

  export async function updateUser(id: string, payload: UpdateUserDto) {
    const response = await axiosInstance.patch<ApiResponse<User>>(
      `/users/${id}`,
      payload,
    );
    return response;
  }

  export async function updateProfile(payload: UpdateProfileDto) {
    const response = await axiosInstance.patch<ApiResponse<User>>(
      '/me',
      payload,
    );
    return response.data;
  }

  export async function deleteUser(id: string) {
    const response = await axiosInstance.delete<ApiResponse<null>>(
      `/users/${id}`,
    );
    return response.data;
  }

  export async function getNotifications(
    options: Partial<QueryOptions<Notification>>,
  ) {
    const query = buildQuery(options);
    const response = await axiosInstance.get<ODataResponse<Notification>>(
      `/notifications${query}`,
    );

    return response.data;
  }
}
