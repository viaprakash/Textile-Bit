import { Info } from 'lucide-react';
import { useStore } from '../../store';

export default function RegionSelector() {
  const { cropRegion, setCropRegion } = useStore();

  if (!cropRegion) return null;

  return (
    <div className="bg-textile-50 border border-textile-200 rounded-xl p-3 animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Info size={14} className="text-textile-600" />
        <span className="text-xs font-semibold text-textile-700">Selected Region</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-canvas-600">
        <div><span className="text-canvas-400">X:</span> {cropRegion.x}px</div>
        <div><span className="text-canvas-400">Y:</span> {cropRegion.y}px</div>
        <div><span className="text-canvas-400">W:</span> {cropRegion.width}px</div>
        <div><span className="text-canvas-400">H:</span> {cropRegion.height}px</div>
      </div>
      <button onClick={() => setCropRegion(null)} className="mt-2 text-[11px] text-textile-600 hover:text-textile-800 font-medium">
        Clear Selection
      </button>
    </div>
  );
}
