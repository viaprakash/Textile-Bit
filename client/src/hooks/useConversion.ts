import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { convertImage } from '../services/api';
import { useStore } from '../store';

export function useConversion() {
  const {
    uploadedImage,
    conversionOptions,
    cropRegion,
    setConversionResult,
    setIsConverting,
  } = useStore();

  const convert = useCallback(async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }
    try {
      setIsConverting(true);
      const options = { ...conversionOptions, crop: cropRegion || undefined };
      const result = await convertImage(uploadedImage.filename, options);
      setConversionResult(result);
      toast.success('Conversion complete!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Conversion failed');
    } finally {
      setIsConverting(false);
    }
  }, [uploadedImage, conversionOptions, cropRegion, setConversionResult, setIsConverting]);

  return { convert };
}
