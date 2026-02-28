import { create } from 'zustand';
import { ConversionSlice, createConversionSlice } from './conversionSlice';
import { EditorSlice, createEditorSlice } from './editorSlice';
import { ImageSlice, createImageSlice } from './imageSlice';

type StoreState = ImageSlice & EditorSlice & ConversionSlice;

export const useStore = create<StoreState>()((...args) => ({
  ...createImageSlice(...args),
  ...createEditorSlice(...args),
  ...createConversionSlice(...args),
}));
