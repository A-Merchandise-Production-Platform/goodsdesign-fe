/* eslint-disable unicorn/no-null */
import { useCallback, useState } from 'react';

export function useImageUpload(onChange: (file: File) => void) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageUpload = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        const file = acceptedFiles[0];
        onChange(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange],
  );

  const removeImage = useCallback(() => {
    setPreview(null);
  }, []);

  return { preview, handleImageUpload, removeImage };
}
