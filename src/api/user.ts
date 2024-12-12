import buildQuery, { QueryOptions } from 'odata-query';

import { axiosInstance } from '@/api';
import { ODataResponse } from '@/api/types';
import { User } from '@/api/types/user';

export namespace UserApi {
  export async function getUsers(options: Partial<QueryOptions<User>>) {
    const query = buildQuery(options);
    const response = await axiosInstance.get<ODataResponse<User>>(
      `/users${query}`,
    );

    return response.data;
  }
}
