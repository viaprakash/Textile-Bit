import StepIndicator from '../components/common/StepIndicator';
import ConversionPanel from '../components/conversion/ConversionPanel';
import Canvas from '../components/editor/Canvas';
import Sidebar from '../components/layout/Sidebar';
import ResultPreview from '../components/preview/ResultPreview';
import ImageUploader from '../components/upload/ImageUploader';
import { useStore } from '../store';

const steps = [
  { label: 'Upload' },
  { label: 'Adjust' },
  { label: 'Convert' },
  { label: 'Download' },
];

export default function EditorPage() {
  const { uploadedImage, conversionResult } = useStore();
  const currentStep = !uploadedImage ? 0 : !conversionResult ? 1 : 3;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <StepIndicator steps={steps} currentStep={currentStep} />

      {!uploadedImage ? (
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gradient mb-2">Transform Your Images Into Bitmaps</h2>
            <p className="text-canvas-500 text-sm max-w-md mx-auto">
              Upload any image — even low-quality ones. We'll enhance and convert it into a crisp, high-quality bitmap perfect for textile design.
            </p>
          </div>
          <ImageUploader />

          <div id="how-it-works" className="mt-16 space-y-6">
            <h3 className="text-xl font-bold text-center text-canvas-900">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: '01', title: 'Upload Image', desc: 'Upload any image in PNG, JPG, BMP, TIFF or WebP format.' },
                { step: '02', title: 'Configure & Convert', desc: 'Select a region, choose color mode, adjust settings and convert.' },
                { step: '03', title: 'Download', desc: 'Download the high-quality bitmap at any scale and format.' },
              ].map((item) => (
                <div key={item.step} className="card text-center">
                  <div className="w-12 h-12 bg-textile-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-textile-600">{item.step}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-canvas-900 mb-1">{item.title}</h4>
                  <p className="text-xs text-canvas-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            <Canvas />
            {conversionResult && <ResultPreview />}
          </div>
          <Sidebar title="Settings">
            <ImageUploader />
            <ConversionPanel />
          </Sidebar>
        </div>
      )}
    </div>
  );
}
