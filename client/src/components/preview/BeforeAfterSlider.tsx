import { useCallback, useRef, useState } from 'react';
import { useStore } from '../../store';

export default function BeforeAfterSlider() {
  const { uploadedImage, conversionResult } = useStore();
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    setPosition(Math.max(0, Math.min(100, (x / rect.width) * 100)));
  }, []);

  if (!uploadedImage || !conversionResult) return null;

  return (
    <div ref={containerRef}
      className="relative w-full h-[400px] rounded-xl overflow-hidden cursor-col-resize select-none bg-canvas-100"
      onMouseDown={() => { isDragging.current = true; }}
      onMouseMove={(e) => { if (isDragging.current) handleMove(e.clientX); }}
      onMouseUp={() => { isDragging.current = false; }}
      onMouseLeave={() => { isDragging.current = false; }}>
      <img src={uploadedImage.url} alt="Before" className="absolute inset-0 w-full h-full object-contain" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={conversionResult.url} alt="After" className="absolute inset-0 w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10" style={{ left: `${position}%` }}>
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-3 bg-canvas-400 rounded-full" />
            <div className="w-0.5 h-3 bg-canvas-400 rounded-full" />
          </div>
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-canvas-900/70 text-white text-xs font-medium px-2 py-1 rounded-lg">Original</div>
      <div className="absolute top-3 right-3 bg-textile-600/90 text-white text-xs font-medium px-2 py-1 rounded-lg">Converted</div>
    </div>
  );
}
