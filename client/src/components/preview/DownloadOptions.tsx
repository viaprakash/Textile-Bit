import { Download, Maximize2 } from 'lucide-react';
import { useDownload } from '../../hooks/useDownload';
import { useStore } from '../../store';
import Button from '../common/Button';
import ScaleSelector from '../conversion/ScaleSelector';

export default function DownloadOptions() {
  const { conversionResult } = useStore();
  const { download } = useDownload();

  if (!conversionResult) return null;

  return (
    <div className="card space-y-4">
      <h3 className="text-base font-semibold text-canvas-900 flex items-center gap-2">
        <Download size={18} className="text-textile-600" />
        Download Options
      </h3>
      <div className="flex items-center gap-3 text-xs text-canvas-500 bg-canvas-50 rounded-lg p-3">
        <Maximize2 size={14} />
        <span>Converted size: {conversionResult.width} × {conversionResult.height} px</span>
      </div>
      <ScaleSelector />
      <Button variant="primary" size="lg" className="w-full" onClick={download} icon={<Download size={18} />}>
        Download
      </Button>
    </div>
  );
}
