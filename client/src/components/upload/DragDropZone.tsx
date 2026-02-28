import { Image as ImageIcon, Sparkles, Upload } from 'lucide-react';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useStore } from '../../store';

export default function DragDropZone() {
  const { upload } = useImageUpload();
  const isUploading = useStore((s) => s.isUploading);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) upload(acceptedFiles[0]);
  }, [upload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'],
      'image/webp': ['.webp'], 'image/bmp': ['.bmp'],
      'image/tiff': ['.tiff', '.tif'], 'image/gif': ['.gif'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
    disabled: isUploading,
  });

  return (
    <div
      {...getRootProps()}
      className={`relative cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 p-12
        ${isDragActive ? 'border-textile-500 bg-textile-50 scale-[1.02]' : 'border-canvas-300 bg-canvas-50/50 hover:border-textile-400 hover:bg-textile-50/50'}
        ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center gap-4 text-center">
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 ${isDragActive ? 'bg-textile-200 scale-110' : 'bg-canvas-200'}`}>
          {isDragActive
            ? <Sparkles size={36} className="text-textile-600 animate-pulse" />
            : <Upload size={36} className="text-canvas-500" />}
        </div>
        <div>
          <p className="text-lg font-semibold text-canvas-800 mb-1">
            {isDragActive ? 'Drop your image here' : 'Upload your image'}
          </p>
          <p className="text-sm text-canvas-500">
            Drag & drop or <span className="text-textile-600 font-medium">click to browse</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
          {['PNG', 'JPG', 'WEBP', 'BMP', 'TIFF'].map((fmt) => (
            <span key={fmt} className="text-[10px] font-medium text-canvas-500 bg-canvas-200 px-2 py-0.5 rounded-full">{fmt}</span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-xs text-canvas-400 mt-1">
          <ImageIcon size={14} />
          <span>Max file size: 50MB</span>
        </div>
      </div>
    </div>
  );
}
