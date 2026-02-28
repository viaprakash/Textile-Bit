import { Circle, Grid3X3, Palette } from 'lucide-react';
import { useStore } from '../../store';

const modes = [
  { id: 'bw' as const, label: 'Black & White', description: 'Classic monochrome bitmap', icon: Circle },
  { id: 'color' as const, label: 'Color Reduced', description: 'Reduce to N colors', icon: Grid3X3 },
  { id: 'palette' as const, label: 'Custom Palette', description: 'Map to selected colors', icon: Palette },
];

export default function ColorModeSelector() {
  const { conversionOptions, setConversionOptions } = useStore();

  return (
    <div className="space-y-2">
      <label className="label-text">Conversion Mode</label>
      <div className="space-y-2">
        {modes.map((mode) => (
          <button key={mode.id} onClick={() => setConversionOptions({ mode: mode.id })}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left
              ${conversionOptions.mode === mode.id ? 'border-textile-500 bg-textile-50 shadow-sm' : 'border-canvas-200 bg-white hover:border-canvas-300'}`}>
            <mode.icon size={20} className={conversionOptions.mode === mode.id ? 'text-textile-600' : 'text-canvas-400'} />
            <div>
              <p className={`text-sm font-medium ${conversionOptions.mode === mode.id ? 'text-textile-800' : 'text-canvas-700'}`}>{mode.label}</p>
              <p className="text-[11px] text-canvas-500">{mode.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
