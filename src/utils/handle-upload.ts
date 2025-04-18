// import { UploadApi } from '@/api/upload';

// export const handleImageUpload = async (file: File): Promise<string> => {
//   const allowedTypes = [
//     'image/jpeg',
//     'image/png',
//     'image/jpg',
//     'image/bmp',
//   ];

//   if (!allowedTypes.includes(file.type)) {
//     throw new Error('Invalid file type');
//   }

//   const uploadResponse = await UploadApi.uploadImage(file);

//   return uploadResponse.url;
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

/**
 * Converts a File object to a base64 string
 * @param file The file to convert
 * @returns A promise that resolves to the base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = error => reject(error);
  });
};

/**
 * Converts multiple files to base64 strings
 * @param files Array of files to convert
 * @returns A promise that resolves to an array of base64 strings
 */
export const filesToBase64 = async (files: File[]): Promise<string[]> => {
  const base64Promises = files.map(file => fileToBase64(file));
  return Promise.all(base64Promises);
};
