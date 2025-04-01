// hooks/useUploadMutation.js
import { gql, useMutation } from '@apollo/client';
import uploadClient from './apollo-upload-client';

export function useUploadFileMutation() {
  const UPLOAD_FILE = gql`
    mutation UploadFile($file: Upload!) {
      uploadFile(file: $file) {
        url
      }
    }
  `;

  return useMutation(UPLOAD_FILE, { client: uploadClient });
}
