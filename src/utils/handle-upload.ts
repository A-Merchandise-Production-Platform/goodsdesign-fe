// import { UploadApi } from '@/api/upload';

// export const handleImageUpload = async (file: File): Promise<string> => {
//   const allowedFileTypes = new Set([
//     'image/jpeg',
//     'image/png',
//     'image/jpg',
//     'image/bmp',
//   ]);

//   if (!allowedFileTypes.has(file.type)) {
//     throw new Error('Only JPG, JPEG, PNG, and BMP file types are allowed.');
//   }

//   const uploadResponse = await UploadApi.uploadImage(file);
//   return uploadResponse.fileUrl;
// };

// export const handle3DModelUpload = async (file: File): Promise<string> => {
//   const allowedFileTypes = new Set(['model/gltf+json', 'model/gltf-binary']);

//   const allowedExtensions = ['.gltf', '.glb'];

//   const fileExtension = file.name
//     .slice(file.name.lastIndexOf('.'))
//     .toLowerCase();
//   if (
//     !allowedFileTypes.has(file.type) &&
//     !allowedExtensions.includes(fileExtension)
//   ) {
//     throw new Error('Only GLTF (.gltf) and GLB (.glb) files are allowed.');
//   }

//   const uploadResponse = await UploadApi.upload3DModel(file);
//   return uploadResponse.fileUrl;
// };
