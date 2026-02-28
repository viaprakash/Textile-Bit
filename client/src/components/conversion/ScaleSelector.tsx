import { useStore } from '../../store';
import Slider from '../common/Slider';

export default function ScaleSelector() {
  const { scaleOptions, setScaleOptions, conversionResult } = useStore();

  if (!conversionResult) return null;

  const presetScales = [0.5, 1, 2, 3, 4, 5, 10];
  const formats = [
    { value: 'png', label: 'PNG' },
    { value: 'jpeg', label: 'JPG' },
    { value: 'webp', label: 'WebP' },
    { value: 'tiff', label: 'TIFF' },
    { value: 'bmp', label: 'BMP' },
  ] as const;

  return (
    <div className="space-y-4">
      <div>
        <label className="label-text">Scale</label>
        <div className="flex flex-wrap gap-2 mb-3">
          {presetScales.map((scale) => (
            <button key={scale} onClick={() => setScaleOptions({ scaleFactor: scale, width: undefined, height: undefined })}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                ${scaleOptions.scaleFactor === scale && !scaleOptions.width ? 'bg-textile-100 text-textile-700 border border-textile-300' : 'bg-canvas-100 text-canvas-500 border border-canvas-200 hover:border-canvas-300'}`}>
              {scale}x
            </button>
          ))}
        </div>
        <Slider label="Custom Scale" value={scaleOptions.scaleFactor} min={0.1} max={20} step={0.1}
          onChange={(v) => setScaleOptions({ scaleFactor: v, width: undefined, height: undefined })} unit="x" />
        <p className="text-xs text-canvas-500 mt-1">
          Output: {Math.round(conversionResult.width * scaleOptions.scaleFactor)} × {Math.round(conversionResult.height * scaleOptions.scaleFactor)} px
        </p>
      </div>

      <div>
        <label className="label-text">Or Custom Dimensions (px)</label>
        <div className="flex gap-2">
          <input type="number" placeholder="Width" value={scaleOptions.width || ''}
            onChange={(e) => setScaleOptions({ width: e.target.value ? Number(e.target.value) : undefined, height: undefined })}
            className="input-field" />
          <input type="number" placeholder="Height" value={scaleOptions.height || ''}
            onChange={(e) => setScaleOptions({ height: e.target.value ? Number(e.target.value) : undefined, width: undefined })}
            className="input-field" />
        </div>
      </div>

      <div>
        <label className="label-text">Format</label>
        <div className="flex flex-wrap gap-2">
          {formats.map((fmt) => (
            <button key={fmt.value} onClick={() => setScaleOptions({ format: fmt.value })}
              className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-all
                ${scaleOptions.format === fmt.value ? 'bg-textile-100 text-textile-700 border border-textile-300' : 'bg-canvas-100 text-canvas-500 border border-canvas-200 hover:border-canvas-300'}`}>
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {scaleOptions.format !== 'png' && scaleOptions.format !== 'bmp' && (
        <Slider label="Quality" value={scaleOptions.quality} min={1} max={100}
          onChange={(v) => setScaleOptions({ quality: v })} unit="%" />
      )}
    </div>
  );
}
