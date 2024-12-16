import { UploadApi } from '@/api/upload';

export const handleImageUpload = async (file: File): Promise<string> => {
  const allowedFileTypes = new Set([
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/bmp',
  ]);

  if (!allowedFileTypes.has(file.type)) {
    throw new Error('Only JPG, JPEG, PNG, and BMP file types are allowed.');
  }

  const uploadResponse = await UploadApi.uploadImage(file);
  return uploadResponse.fileUrl;
};

export const handle3DModelUpload = async (file: File): Promise<string> => {
  const allowedFileTypes = new Set(['model/gltf+json', '.gltf', '.glb']);

  if (!allowedFileTypes.has(file.type)) {
    throw new Error('Only GLTF, GLB file types are allowed.');
  }

  const uploadResponse = await UploadApi.upload3DModel(file);
  return uploadResponse.fileUrl;
};
