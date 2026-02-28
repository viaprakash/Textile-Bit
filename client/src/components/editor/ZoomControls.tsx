import { Maximize, ZoomIn, ZoomOut } from 'lucide-react';
import { useCanvasEditor } from '../../hooks/useCanvasEditor';
import Tooltip from '../common/Tooltip';

export default function ZoomControls() {
  const { zoom, zoomIn, zoomOut, resetZoom } = useCanvasEditor();

  return (
    <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-canvas-200">
      <Tooltip content="Zoom Out">
        <button onClick={zoomOut} className="p-2 rounded-lg text-canvas-500 hover:bg-canvas-100 hover:text-canvas-700 transition-all disabled:opacity-30" disabled={zoom <= 0.25}>
          <ZoomOut size={18} />
        </button>
      </Tooltip>
      <span className="text-xs font-medium text-canvas-600 min-w-[48px] text-center">{Math.round(zoom * 100)}%</span>
      <Tooltip content="Zoom In">
        <button onClick={zoomIn} className="p-2 rounded-lg text-canvas-500 hover:bg-canvas-100 hover:text-canvas-700 transition-all disabled:opacity-30" disabled={zoom >= 5}>
          <ZoomIn size={18} />
        </button>
      </Tooltip>
      <div className="w-px h-6 bg-canvas-200 mx-1" />
      <Tooltip content="Fit to View">
        <button onClick={resetZoom} className="p-2 rounded-lg text-canvas-500 hover:bg-canvas-100 hover:text-canvas-700 transition-all">
          <Maximize size={18} />
        </button>
      </Tooltip>
    </div>
  );
}
