export interface CropRegion {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface ConversionOptions {
  mode: 'bw' | 'color' | 'palette';
  threshold: number;
  dithering: boolean;
  ditheringType: 'floyd-steinberg' | 'ordered' | 'none';
  enhance: boolean;
  sharpen: boolean;
  denoise: boolean;
  contrast: number;
  brightness: number;
  colors: number;
  customPalette: string[];
  crop?: CropRegion;
}

export interface ConversionResult {
  id: string;
  filename: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export interface ScaleOptions {
  scaleFactor: number;
  width?: number;
  height?: number;
  format: 'png' | 'bmp' | 'tiff' | 'jpeg' | 'webp';
  quality: number;
}
