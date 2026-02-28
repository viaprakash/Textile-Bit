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

export interface ScaleOptions {
  width?: number;
  height?: number;
  scaleFactor: number;
  format: 'png' | 'bmp' | 'tiff' | 'jpeg' | 'webp';
  quality: number;
}

export interface UploadResult {
  id: string;
  filename: string;
  originalName: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  path: string;
  url: string;
}

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  population: number;
  name: string;
}

export interface ConversionResult {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
}
