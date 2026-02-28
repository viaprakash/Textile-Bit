export interface UploadedImage {
  id: string;
  filename: string;
  originalName: string;
  width: number;
  height: number;
  size: number;
  mimeType: string;
  url: string;
  colors: ColorInfo[];
}

export interface ColorInfo {
  hex: string;
  rgb: { r: number; g: number; b: number };
  population: number;
  name: string;
}
