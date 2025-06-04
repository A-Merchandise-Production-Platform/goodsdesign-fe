'use client';

import { useState } from 'react';
import { uploadImage } from '@/graphql/upload';

export default function TestPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a file first');
      return;
    }

    try {
      setIsUploading(true);
      setError('');
      const url = await uploadImage(selectedFile);
      setUploadedUrl(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Image Upload Test</h1>
      
      <div className="space-y-4">
        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {previewUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Preview:</h2>
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-sm rounded-lg shadow-md"
            />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className={`px-4 py-2 rounded-md text-white font-medium
            ${!selectedFile || isUploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
            }`}
        >
          {isUploading ? 'Uploading...' : 'Upload Image'}
        </button>

        {error && (
          <div className="text-red-500 mt-2">
            {error}
          </div>
        )}

        {uploadedUrl && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Uploaded Image:</h2>
            <img
              src={uploadedUrl}
              alt="Uploaded"
              className="max-w-sm rounded-lg shadow-md"
            />
            <p className="mt-2 text-sm text-gray-600 break-all">
              URL: {uploadedUrl}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
