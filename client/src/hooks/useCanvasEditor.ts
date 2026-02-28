import { useCallback } from 'react';
import { useStore } from '../store';
import { CropRegion } from '../types/conversion';

export function useCanvasEditor() {
  const {
    zoom, setZoom,
    activeTool, setActiveTool,
    setCropRegion, setIsCropping,
  } = useStore();

  const zoomIn = useCallback(() => setZoom(zoom + 0.25), [zoom, setZoom]);
  const zoomOut = useCallback(() => setZoom(zoom - 0.25), [zoom, setZoom]);
  const resetZoom = useCallback(() => setZoom(1), [setZoom]);

  const startCrop = useCallback(() => {
    setActiveTool('crop');
    setIsCropping(true);
  }, [setActiveTool, setIsCropping]);

  const applyCrop = useCallback((region: CropRegion) => {
    setCropRegion(region);
    setIsCropping(false);
    setActiveTool('select');
  }, [setCropRegion, setIsCropping, setActiveTool]);

  const cancelCrop = useCallback(() => {
    setCropRegion(null);
    setIsCropping(false);
    setActiveTool('select');
  }, [setCropRegion, setIsCropping, setActiveTool]);

  return { zoom, activeTool, zoomIn, zoomOut, resetZoom, startCrop, applyCrop, cancelCrop };
}
