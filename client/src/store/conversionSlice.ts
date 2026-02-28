import { StateCreator } from 'zustand';
import { ConversionOptions, ConversionResult, ScaleOptions } from '../types/conversion';

export interface ConversionSlice {
  conversionOptions: ConversionOptions;
  conversionResult: ConversionResult | null;
  isConverting: boolean;
  scaleOptions: ScaleOptions;
  setConversionOptions: (options: Partial<ConversionOptions>) => void;
  setConversionResult: (result: ConversionResult | null) => void;
  setIsConverting: (converting: boolean) => void;
  setScaleOptions: (options: Partial<ScaleOptions>) => void;
  resetConversion: () => void;
}

const defaultConversionOptions: ConversionOptions = {
  mode: 'bw',
  threshold: 128,
  dithering: false,
  ditheringType: 'floyd-steinberg',
  enhance: true,
  sharpen: true,
  denoise: true,
  contrast: 1,
  brightness: 1,
  colors: 8,
  customPalette: [],
};

const defaultScaleOptions: ScaleOptions = {
  scaleFactor: 1,
  format: 'png',
  quality: 100,
};

export const createConversionSlice: StateCreator<ConversionSlice> = (set) => ({
  conversionOptions: defaultConversionOptions,
  conversionResult: null,
  isConverting: false,
  scaleOptions: defaultScaleOptions,
  setConversionOptions: (options) =>
    set((state) => ({
      conversionOptions: { ...state.conversionOptions, ...options },
    })),
  setConversionResult: (result) => set({ conversionResult: result }),
  setIsConverting: (converting) => set({ isConverting: converting }),
  setScaleOptions: (options) =>
    set((state) => ({
      scaleOptions: { ...state.scaleOptions, ...options },
    })),
  resetConversion: () =>
    set({
      conversionOptions: defaultConversionOptions,
      conversionResult: null,
      isConverting: false,
      scaleOptions: defaultScaleOptions,
    }),
});
