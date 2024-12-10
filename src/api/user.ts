import { axiosInstance } from '@/api';

export namespace UserApi {
  export async function getUsers() {
    const response = await axiosInstance.get('/users');
    return response.data;
  }
}
