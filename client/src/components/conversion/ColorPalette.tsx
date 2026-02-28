import { Plus, RefreshCw, X } from 'lucide-react';
import { useColorExtraction } from '../../hooks/useColorExtraction';
import { useStore } from '../../store';
import Tooltip from '../common/Tooltip';

export default function ColorPalette() {
  const { extractedColors, conversionOptions } = useStore();
  const { addToPalette, removeFromPalette, clearPalette, refreshColors } = useColorExtraction();

  return (
    <div className="space-y-3">
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label-text mb-0">Detected Colors</label>
          <button onClick={() => refreshColors(8)} className="p-1 hover:bg-canvas-100 rounded-lg transition-colors" title="Refresh colors">
            <RefreshCw size={14} className="text-canvas-500" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {extractedColors.map((color, i) => (
            <Tooltip key={i} content={`${color.name} (${color.hex})`}>
              <button onClick={() => addToPalette(color.hex)}
                className="group relative w-8 h-8 rounded-lg border-2 border-canvas-200 hover:border-textile-400 transition-all hover:scale-110 shadow-sm"
                style={{ backgroundColor: color.hex }}>
                <Plus size={12} className="absolute inset-0 m-auto text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-md" />
              </button>
            </Tooltip>
          ))}
        </div>
      </div>

      {conversionOptions.mode === 'palette' && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label-text mb-0">Custom Palette ({conversionOptions.customPalette.length})</label>
            {conversionOptions.customPalette.length > 0 && (
              <button onClick={clearPalette} className="text-[11px] text-red-500 hover:text-red-700 font-medium">Clear All</button>
            )}
          </div>
          {conversionOptions.customPalette.length === 0 ? (
            <p className="text-xs text-canvas-400 italic">Click on detected colors above to add them to your palette</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {conversionOptions.customPalette.map((hex) => (
                <div key={hex} className="relative group w-8 h-8 rounded-lg border-2 border-canvas-300 shadow-sm" style={{ backgroundColor: hex }}>
                  <button onClick={() => removeFromPalette(hex)}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="mt-2">
            <label className="text-xs text-canvas-500 mb-1 block">Add custom color</label>
            <input type="color" defaultValue="#c86628" onChange={(e) => addToPalette(e.target.value)}
              className="w-full h-8 rounded-lg cursor-pointer border border-canvas-200" />
          </div>
        </div>
      )}
    </div>
  );
}
