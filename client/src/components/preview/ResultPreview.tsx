import { ArrowLeftRight, Eye } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store';
import BeforeAfterSlider from './BeforeAfterSlider';
import DownloadOptions from './DownloadOptions';

export default function ResultPreview() {
  const { conversionResult } = useStore();
  const [showComparison, setShowComparison] = useState(true);

  if (!conversionResult) return null;

  return (
    <div className="space-y-4 animate-slide-up">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-canvas-900 flex items-center gap-2">
          <Eye size={20} className="text-textile-600" />
          Result
        </h3>
        <button onClick={() => setShowComparison(!showComparison)}
          className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-all
            ${showComparison ? 'bg-textile-100 text-textile-700' : 'bg-canvas-100 text-canvas-600'}`}>
          <ArrowLeftRight size={14} />
          {showComparison ? 'Comparison View' : 'Result Only'}
        </button>
      </div>
      <div className="card p-0 overflow-hidden">
        {showComparison ? (
          <BeforeAfterSlider />
        ) : (
          <div className="w-full bg-canvas-100 fabric-bg p-4">
            <img src={conversionResult.url} alt="Converted" className="max-w-full max-h-[500px] mx-auto object-contain rounded-lg" />
          </div>
        )}
      </div>
      <DownloadOptions />
    </div>
  );
}
