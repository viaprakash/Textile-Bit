
interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  showValue?: boolean;
  unit?: string;
}

export default function Slider({ label, value, min, max, step = 1, onChange, showValue = true, unit = '' }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="label-text">{label}</label>
        {showValue && (
          <span className="text-xs font-medium text-textile-600 bg-textile-50 px-2 py-0.5 rounded-full">
            {value}{unit}
          </span>
        )}
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #c86628 0%, #c86628 ${pct}%, #edeae3 ${pct}%, #edeae3 100%)`,
        }}
      />
      <div className="flex justify-between mt-1">
        <span className="text-[10px] text-canvas-400">{min}{unit}</span>
        <span className="text-[10px] text-canvas-400">{max}{unit}</span>
      </div>
    </div>
  );
}
