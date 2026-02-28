import { StateCreator } from 'zustand';
import { ColorInfo, UploadedImage } from '../types/image';

export interface ImageSlice {
  uploadedImage: UploadedImage | null;
  extractedColors: ColorInfo[];
  isUploading: boolean;
  setUploadedImage: (image: UploadedImage | null) => void;
  setExtractedColors: (colors: ColorInfo[]) => void;
  setIsUploading: (loading: boolean) => void;
  resetImage: () => void;
}

export const createImageSlice: StateCreator<ImageSlice> = (set) => ({
  uploadedImage: null,
  extractedColors: [],
  isUploading: false,
  setUploadedImage: (image) => set({ uploadedImage: image }),
  setExtractedColors: (colors) => set({ extractedColors: colors }),
  setIsUploading: (loading) => set({ isUploading: loading }),
  resetImage: () =>
    set({ uploadedImage: null, extractedColors: [], isUploading: false }),
});
