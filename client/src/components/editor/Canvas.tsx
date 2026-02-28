import { useCallback, useEffect, useRef, useState } from 'react';
import { useStore } from '../../store';
import CropSelector from './CropSelector';
import RegionSelector from './RegionSelector';
import ToolBar from './ToolBar';
import ZoomControls from './ZoomControls';

export default function Canvas() {
  const { uploadedImage, zoom, isCropping, cropRegion } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const imgWrapperRef = useRef<HTMLDivElement>(null);
  const [imageDisplaySize, setImageDisplaySize] = useState({ width: 0, height: 0 });

  const computeImageSize = useCallback(() => {
    if (!uploadedImage || !containerRef.current) return;
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    if (cw === 0 || ch === 0) return;

    const imgAspect = uploadedImage.width / uploadedImage.height;
    const containerAspect = cw / ch;
    let displayW: number, displayH: number;
    if (imgAspect > containerAspect) {
      displayW = cw;
      displayH = cw / imgAspect;
    } else {
      displayH = ch;
      displayW = ch * imgAspect;
    }
    setImageDisplaySize({ width: displayW, height: displayH });
  }, [uploadedImage]);

  useEffect(() => {
    computeImageSize();
    window.addEventListener('resize', computeImageSize);
    return () => window.removeEventListener('resize', computeImageSize);
  }, [computeImageSize]);

  if (!uploadedImage) return null;

  return (
    <div className="card p-0 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-canvas-100 bg-canvas-50/50">
        <ToolBar />
        <ZoomControls />
      </div>
      {/* Outer container — crop overlay lives here so it is NOT affected by zoom transform */}
      <div ref={containerRef} className="relative w-full bg-canvas-100 fabric-bg overflow-hidden" style={{ height: '500px' }}>
        {/* Zoomable image layer */}
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center', transition: 'transform 0.2s ease' }}>
          <div ref={imgWrapperRef} className="relative" style={{ width: imageDisplaySize.width, height: imageDisplaySize.height }}>
            <img src={uploadedImage.url} alt="Source" className="w-full h-full object-contain select-none" draggable={false} />
            {/* Show applied crop region indicator (dashed) */}
            {cropRegion && !isCropping && (
              <div className="absolute border-2 border-textile-500 border-dashed bg-textile-500/10 pointer-events-none"
                style={{
                  left: `${(cropRegion.x / uploadedImage.width) * 100}%`,
                  top: `${(cropRegion.y / uploadedImage.height) * 100}%`,
                  width: `${(cropRegion.width / uploadedImage.width) * 100}%`,
                  height: `${(cropRegion.height / uploadedImage.height) * 100}%`,
                }}
              />
            )}
          </div>
        </div>

        {/* Crop overlay — placed OUTSIDE the zoom transform so mouse coords are accurate */}
        {isCropping && imageDisplaySize.width > 0 && imageDisplaySize.height > 0 && (
          <CropSelector
            imageWidth={uploadedImage.width}
            imageHeight={uploadedImage.height}
            containerWidth={imageDisplaySize.width}
            containerHeight={imageDisplaySize.height}
            zoom={zoom}
          />
        )}
      </div>
      <div className="px-4 py-3 border-t border-canvas-100">
        <RegionSelector />
        {!cropRegion && (
          <p className="text-xs text-canvas-400 text-center">Use the crop tool to select a specific region, or convert the entire image</p>
        )}
      </div>
    </div>
  );
}
