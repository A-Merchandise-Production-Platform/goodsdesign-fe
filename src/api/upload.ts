import { axiosFormDataInstance } from '@/api';
import { UploadImageResponse } from '@/api/types/upload';

export namespace UploadApi {
  export async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosFormDataInstance.post<UploadImageResponse>(
      '/uploads',
      formData,
    );
    return response.data;
  }
}
