import { Check, X } from 'lucide-react';
import React, { useCallback, useRef, useState } from 'react';
import { useCanvasEditor } from '../../hooks/useCanvasEditor';
import { CropRegion } from '../../types/conversion';
import Button from '../common/Button';

interface CropSelectorProps {
  imageWidth: number;
  imageHeight: number;
  containerWidth: number;
  containerHeight: number;
  zoom: number;
}

export default function CropSelector({ imageWidth, imageHeight, containerWidth, containerHeight, zoom }: CropSelectorProps) {
  const { applyCrop, cancelCrop } = useCanvasEditor();
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [cropRect, setCropRect] = useState({ x: 0, y: 0, w: 0, h: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  // The image is displayed at containerWidth x containerHeight and then zoom-scaled.
  // The overlay sits in the parent container (not zoom-transformed), so we need to
  // compute the actual on-screen position & size of the displayed image.
  const scaledW = containerWidth * zoom;
  const scaledH = containerHeight * zoom;

  const getImageBounds = useCallback(() => {
    if (!overlayRef.current) return { left: 0, top: 0, width: scaledW, height: scaledH };
    const parentW = overlayRef.current.clientWidth;
    const parentH = overlayRef.current.clientHeight;
    return {
      left: (parentW - scaledW) / 2,
      top: (parentH - scaledH) / 2,
      width: scaledW,
      height: scaledH,
    };
  }, [scaledW, scaledH]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // Don't start a new crop drag if the user clicked on the action buttons
    if (actionsRef.current && actionsRef.current.contains(e.target as Node)) {
      return;
    }
    e.preventDefault();
    const bounds = getImageBounds();
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    const x = Math.max(0, Math.min(mx - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(my - bounds.top, bounds.height));

    setStartPos({ x, y });
    setCropRect({ x, y, w: 0, h: 0 });
    setIsDragging(true);
  }, [getImageBounds]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const bounds = getImageBounds();
    const rect = overlayRef.current?.getBoundingClientRect();
    if (!rect) return;

    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const x = Math.max(0, Math.min(mx - bounds.left, bounds.width));
    const y = Math.max(0, Math.min(my - bounds.top, bounds.height));

    setCropRect({
      x: Math.min(startPos.x, x),
      y: Math.min(startPos.y, y),
      w: Math.abs(x - startPos.x),
      h: Math.abs(y - startPos.y),
    });
  }, [isDragging, startPos, getImageBounds]);

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleApply = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (cropRect.w < 5 || cropRect.h < 5) return;
    // Convert from on-screen (zoom-scaled) pixel coords to original image coords
    const region: CropRegion = {
      x: Math.round((cropRect.x / scaledW) * imageWidth),
      y: Math.round((cropRect.y / scaledH) * imageHeight),
      width: Math.round((cropRect.w / scaledW) * imageWidth),
      height: Math.round((cropRect.h / scaledH) * imageHeight),
    };
    applyCrop(region);
  }, [cropRect, scaledW, scaledH, imageWidth, imageHeight, applyCrop]);

  const handleCancel = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    cancelCrop();
  }, [cancelCrop]);

  const bounds = getImageBounds();

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 cursor-crosshair z-10"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Dark overlay only over the image area */}
      <div
        className="absolute bg-black/40 pointer-events-none"
        style={{ left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }}
      />

      {/* Crop rectangle */}
      {cropRect.w > 0 && cropRect.h > 0 && (
        <>
          <div
            className="absolute border-2 border-white/90 bg-transparent z-[11] pointer-events-none"
            style={{
              left: bounds.left + cropRect.x,
              top: bounds.top + cropRect.y,
              width: cropRect.w,
              height: cropRect.h,
            }}
          >
            {/* Corner handles */}
            {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
              <div
                key={pos}
                className={`absolute w-3 h-3 bg-white rounded-full border-2 border-textile-600
                  ${pos.includes('top') ? '-top-1.5' : '-bottom-1.5'}
                  ${pos.includes('left') ? '-left-1.5' : '-right-1.5'}`}
              />
            ))}
            {/* Dimension label */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-canvas-900 text-white text-[10px] px-2 py-0.5 rounded font-medium whitespace-nowrap">
              {Math.round((cropRect.w / scaledW) * imageWidth)} × {Math.round((cropRect.h / scaledH) * imageHeight)}
            </div>
          </div>

          {/* SVG mask to darken everything except the crop area */}
          <svg
            className="absolute pointer-events-none z-[10]"
            style={{ left: bounds.left, top: bounds.top, width: bounds.width, height: bounds.height }}
          >
            <defs>
              <mask id="crop-mask">
                <rect width="100%" height="100%" fill="white" />
                <rect x={cropRect.x} y={cropRect.y} width={cropRect.w} height={cropRect.h} fill="black" />
              </mask>
            </defs>
            <rect width="100%" height="100%" fill="rgba(0,0,0,0.5)" mask="url(#crop-mask)" />
          </svg>
        </>
      )}

      {/* Apply / Cancel buttons */}
      {!isDragging && cropRect.w > 10 && (
        <div ref={actionsRef} className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          <Button size="sm" variant="primary" icon={<Check size={14} />} onClick={handleApply}>
            Apply Crop
          </Button>
          <Button size="sm" variant="secondary" icon={<X size={14} />} onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
