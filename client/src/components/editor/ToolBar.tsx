import { Crop, MousePointer2, Move, RotateCcw } from 'lucide-react';
import { useCanvasEditor } from '../../hooks/useCanvasEditor';
import Tooltip from '../common/Tooltip';

export default function ToolBar() {
  const { activeTool, startCrop, cancelCrop } = useCanvasEditor();

  const tools = [
    { id: 'select' as const, icon: MousePointer2, label: 'Select' },
    { id: 'crop' as const, icon: Crop, label: 'Crop Region' },
    { id: 'pan' as const, icon: Move, label: 'Pan' },
  ];

  return (
    <div className="flex items-center gap-1 bg-white rounded-xl p-1 shadow-sm border border-canvas-200">
      {tools.map((tool) => (
        <Tooltip key={tool.id} content={tool.label}>
          <button
            onClick={() => tool.id === 'crop' ? startCrop() : cancelCrop()}
            className={`p-2 rounded-lg transition-all duration-200
              ${activeTool === tool.id ? 'bg-textile-100 text-textile-700 shadow-sm' : 'text-canvas-500 hover:bg-canvas-100 hover:text-canvas-700'}`}
          >
            <tool.icon size={18} />
          </button>
        </Tooltip>
      ))}
      <div className="w-px h-6 bg-canvas-200 mx-1" />
      <Tooltip content="Reset">
        <button onClick={cancelCrop} className="p-2 rounded-lg text-canvas-500 hover:bg-canvas-100 hover:text-canvas-700 transition-all">
          <RotateCcw size={18} />
        </button>
      </Tooltip>
    </div>
  );
}
