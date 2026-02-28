import { FileImage, Maximize2, X } from 'lucide-react';
import { useStore } from '../../store';

export default function ImagePreview() {
  const { uploadedImage, resetImage, resetEditor, resetConversion } = useStore();

  if (!uploadedImage) return null;

  const handleRemove = () => { resetImage(); resetEditor(); resetConversion(); };

  const fileSizeFormatted = uploadedImage.size > 1024 * 1024
    ? `${(uploadedImage.size / (1024 * 1024)).toFixed(1)} MB`
    : `${(uploadedImage.size / 1024).toFixed(0)} KB`;

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileImage size={16} className="text-textile-600" />
          <h3 className="text-sm font-semibold text-canvas-900">Source Image</h3>
        </div>
        <button onClick={handleRemove} className="p-1.5 hover:bg-red-50 rounded-lg transition-colors group" title="Remove image">
          <X size={16} className="text-canvas-400 group-hover:text-red-500" />
        </button>
      </div>
      <div className="relative rounded-xl overflow-hidden bg-canvas-100 mb-3">
        <img src={uploadedImage.url} alt={uploadedImage.originalName} className="w-full h-48 object-contain" />
      </div>
      <div className="space-y-1.5">
        <p className="text-xs font-medium text-canvas-700 truncate" title={uploadedImage.originalName}>{uploadedImage.originalName}</p>
        <div className="flex items-center gap-3 text-[11px] text-canvas-500">
          <span className="flex items-center gap-1"><Maximize2 size={10} />{uploadedImage.width} × {uploadedImage.height}</span>
          <span>{fileSizeFormatted}</span>
        </div>
      </div>
    </div>
  );
}
