import axios from 'axios';
import { ConversionOptions, ConversionResult } from '../types/conversion';
import { UploadedImage } from '../types/image';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

// In production, image URLs from the server (like /api/files/xxx.png)
// need to be prefixed with the server origin since client and server are on different domains.
function resolveImageUrl(url: string): string {
  if (!url) return url;
  if (import.meta.env.VITE_API_URL && url.startsWith('/api/')) {
    // VITE_API_URL is like "https://server.onrender.com/api", strip the /api suffix to get origin
    const serverOrigin = import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '');
    return `${serverOrigin}${url}`;
  }
  return url;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 120000,
});

export async function uploadImage(file: File): Promise<UploadedImage> {
  const formData = new FormData();
  formData.append('image', file);
  const response = await api.post('/uploads', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  const data = response.data;
  data.url = resolveImageUrl(data.url);
  return data;
}

export async function convertImage(
  filename: string,
  options: ConversionOptions
): Promise<ConversionResult> {
  const response = await api.post('/conversion/convert', { filename, ...options });
  const data = response.data;
  data.url = resolveImageUrl(data.url);
  return data;
}

export async function extractColors(
  filename: string,
  count: number = 8
): Promise<{ colors: any[] }> {
  const response = await api.post('/conversion/colors', { filename, count });
  return response.data;
}

export async function upscaleImage(
  filename: string,
  factor: number = 2
): Promise<ConversionResult> {
  const response = await api.post('/conversion/upscale', { filename, factor });
  const data = response.data;
  data.url = resolveImageUrl(data.url);
  return data;
}

export function getDownloadUrl(
  filename: string,
  options: {
    scaleFactor?: number;
    width?: number;
    height?: number;
    format?: string;
    quality?: number;
  }
): string {
  const params = new URLSearchParams({ filename });
  if (options.scaleFactor) params.set('scaleFactor', String(options.scaleFactor));
  if (options.width) params.set('width', String(options.width));
  if (options.height) params.set('height', String(options.height));
  if (options.format) params.set('format', options.format);
  if (options.quality) params.set('quality', String(options.quality));
  return `${API_BASE_URL}/download?${params.toString()}`;
}

export default api;
