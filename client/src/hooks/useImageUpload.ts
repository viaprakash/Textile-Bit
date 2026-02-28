import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { uploadImage as uploadImageApi } from '../services/api';
import { useStore } from '../store';

export function useImageUpload() {
  const {
    setUploadedImage,
    setExtractedColors,
    setIsUploading,
    resetImage,
    resetEditor,
    resetConversion,
  } = useStore();

  const upload = useCallback(
    async (file: File) => {
      const maxSize = 50 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size must be less than 50MB');
        return;
      }
      const allowedTypes = [
        'image/png', 'image/jpeg', 'image/webp',
        'image/bmp', 'image/tiff', 'image/gif',
      ];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type.');
        return;
      }
      try {
        setIsUploading(true);
        resetEditor();
        resetConversion();
        const result = await uploadImageApi(file);
        setUploadedImage(result);
        setExtractedColors(result.colors || []);
        toast.success('Image uploaded successfully!');
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to upload image');
        resetImage();
      } finally {
        setIsUploading(false);
      }
    },
    [setUploadedImage, setExtractedColors, setIsUploading, resetImage, resetEditor, resetConversion]
  );

  return { upload };
}
