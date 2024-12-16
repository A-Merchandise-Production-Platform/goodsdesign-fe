import { axiosFormDataInstance } from '@/api';
import { Upload3DModelResponse, UploadImageResponse } from '@/api/types/upload';

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

  export async function upload3DModel(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await axiosFormDataInstance.post<Upload3DModelResponse>(
      '/uploads/3dmodel',
      formData,
    );
    return response.data;
  }
}
