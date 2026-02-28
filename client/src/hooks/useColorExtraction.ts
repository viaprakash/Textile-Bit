import { useCallback } from 'react';
import toast from 'react-hot-toast';
import { extractColors } from '../services/api';
import { useStore } from '../store';

export function useColorExtraction() {
  const { uploadedImage, setExtractedColors, setConversionOptions } = useStore();

  const refreshColors = useCallback(async (count: number = 8) => {
    if (!uploadedImage) return;
    try {
      const result = await extractColors(uploadedImage.filename, count);
      setExtractedColors(result.colors);
    } catch {
      toast.error('Failed to extract colors');
    }
  }, [uploadedImage, setExtractedColors]);

  const addToPalette = useCallback((hex: string) => {
    const state = useStore.getState();
    const palette = [...state.conversionOptions.customPalette];
    if (!palette.includes(hex)) {
      palette.push(hex);
      setConversionOptions({ customPalette: palette });
    }
  }, [setConversionOptions]);

  const removeFromPalette = useCallback((hex: string) => {
    const state = useStore.getState();
    const palette = state.conversionOptions.customPalette.filter((c) => c !== hex);
    setConversionOptions({ customPalette: palette });
  }, [setConversionOptions]);

  const clearPalette = useCallback(() => {
    setConversionOptions({ customPalette: [] });
  }, [setConversionOptions]);

  return { refreshColors, addToPalette, removeFromPalette, clearPalette };
}
