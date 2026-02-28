import { useStore } from '../../store';
import Slider from '../common/Slider';

export default function ThresholdSlider() {
  const { conversionOptions, setConversionOptions } = useStore();

  return (
    <div className="space-y-4">
      {conversionOptions.mode === 'bw' && (
        <>
          <Slider label="Threshold" value={conversionOptions.threshold} min={0} max={255}
            onChange={(v) => setConversionOptions({ threshold: v })} />
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="label-text mb-0">Dithering</label>
              <button onClick={() => setConversionOptions({ dithering: !conversionOptions.dithering })}
                className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${conversionOptions.dithering ? 'bg-textile-500' : 'bg-canvas-300'}`}>
                <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${conversionOptions.dithering ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            {conversionOptions.dithering && (
              <div className="flex gap-2 mt-2">
                {(['floyd-steinberg', 'ordered'] as const).map((type) => (
                  <button key={type} onClick={() => setConversionOptions({ ditheringType: type })}
                    className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                      ${conversionOptions.ditheringType === type ? 'bg-textile-100 text-textile-700 border border-textile-300' : 'bg-canvas-100 text-canvas-500 border border-canvas-200'}`}>
                    {type === 'floyd-steinberg' ? 'Floyd-Steinberg' : 'Ordered'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {conversionOptions.mode === 'color' && (
        <Slider label="Number of Colors" value={conversionOptions.colors} min={2} max={64}
          onChange={(v) => setConversionOptions({ colors: v })} />
      )}

      <div className="space-y-3 pt-2 border-t border-canvas-100">
        <p className="text-xs font-semibold text-canvas-600 uppercase tracking-wider">Enhancement</p>
        {([
          { key: 'enhance', label: 'Auto Enhance' },
          { key: 'sharpen', label: 'Sharpen' },
          { key: 'denoise', label: 'Denoise' },
        ] as const).map((opt) => (
          <div key={opt.key} className="flex items-center justify-between">
            <label className="text-sm text-canvas-700">{opt.label}</label>
            <button onClick={() => setConversionOptions({ [opt.key]: !(conversionOptions as any)[opt.key] })}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${(conversionOptions as any)[opt.key] ? 'bg-textile-500' : 'bg-canvas-300'}`}>
              <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${(conversionOptions as any)[opt.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
            </button>
          </div>
        ))}
        <Slider label="Contrast" value={conversionOptions.contrast} min={0.5} max={2} step={0.1}
          onChange={(v) => setConversionOptions({ contrast: v })} unit="x" />
        <Slider label="Brightness" value={conversionOptions.brightness} min={0.5} max={2} step={0.1}
          onChange={(v) => setConversionOptions({ brightness: v })} unit="x" />
      </div>
    </div>
  );
}
