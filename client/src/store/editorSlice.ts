import { StateCreator } from 'zustand';
import { CropRegion } from '../types/conversion';
import { ToolType } from '../types/editor';

export interface EditorSlice {
  activeTool: ToolType;
  zoom: number;
  cropRegion: CropRegion | null;
  isCropping: boolean;
  setActiveTool: (tool: ToolType) => void;
  setZoom: (zoom: number) => void;
  setCropRegion: (region: CropRegion | null) => void;
  setIsCropping: (cropping: boolean) => void;
  resetEditor: () => void;
}

export const createEditorSlice: StateCreator<EditorSlice> = (set) => ({
  activeTool: 'select',
  zoom: 1,
  cropRegion: null,
  isCropping: false,
  setActiveTool: (tool) => set({ activeTool: tool }),
  setZoom: (zoom) => set({ zoom: Math.max(0.1, Math.min(5, zoom)) }),
  setCropRegion: (region) => set({ cropRegion: region }),
  setIsCropping: (cropping) => set({ isCropping: cropping }),
  resetEditor: () =>
    set({ activeTool: 'select', zoom: 1, cropRegion: null, isCropping: false }),
});
