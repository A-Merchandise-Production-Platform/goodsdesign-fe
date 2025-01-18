import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { ApiResponse, ODataResponse } from '@/api/types';
import { CreateUserDto, User } from '@/api/types/user';

export namespace UserApi {
  export async function getUsers(options: Partial<QueryOptions<User>>) {
    const query = buildQuery(options);
    const response = await axiosInstance.get<ODataResponse<User>>(
      `/users${query}`,
    );

    return response.data;
  }

  export async function getUserById(id: string) {
    const response = await axiosInstance.get<User>(`/users/${id}?$expand=role`);
    return response.data;
  }

  export async function create(payload: CreateUserDto) {
    const response = await axiosInstance.post<ApiResponse<User>>(
      `/users?role=${payload.role?.toUpperCase() || 'CUSTOMER'}`,
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
}
