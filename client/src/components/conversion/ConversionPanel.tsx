import { Wand2 } from 'lucide-react';
import { useConversion } from '../../hooks/useConversion';
import { useStore } from '../../store';
import Button from '../common/Button';
import ColorModeSelector from './ColorModeSelector';
import ColorPalette from './ColorPalette';
import ThresholdSlider from './ThresholdSlider';

export default function ConversionPanel() {
  const { uploadedImage, isConverting } = useStore();
  const { convert } = useConversion();

  if (!uploadedImage) return null;

  return (
    <div className="card space-y-5">
      <h3 className="text-base font-semibold text-canvas-900 flex items-center gap-2">
        <Wand2 size={18} className="text-textile-600" />
        Conversion Settings
      </h3>
      <ColorModeSelector />
      <ThresholdSlider />
      <ColorPalette />
      <Button variant="primary" size="lg" className="w-full" onClick={convert} loading={isConverting} icon={<Wand2 size={18} />}>
        {isConverting ? 'Converting...' : 'Convert to Bitmap'}
      </Button>
    </div>
  );
}
