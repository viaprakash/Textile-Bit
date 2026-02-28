import { Download, Image, Layers, Palette, Scissors, Sparkles, Wand2, ZoomIn } from 'lucide-react';

const features = [
  {
    icon: Image,
    title: 'Any Image Format',
    description: 'Upload PNG, JPG, BMP, TIFF, or WebP images of any resolution. Even low-quality images produce crisp results.',
  },
  {
    icon: Wand2,
    title: 'Intelligent Enhancement',
    description: 'Our AI-powered pipeline upscales, denoises, and sharpens your images before conversion for the best possible output.',
  },
  {
    icon: Palette,
    title: 'Flexible Color Modes',
    description: 'Convert to black & white bitmap, reduce to custom color counts, or map to your own textile color palette.',
  },
  {
    icon: Layers,
    title: 'Advanced Dithering',
    description: 'Floyd-Steinberg and ordered dithering algorithms preserve detail and create beautiful bitmap textures.',
  },
  {
    icon: Scissors,
    title: 'Region Selection',
    description: 'Select and crop specific regions of your image for targeted conversion — perfect for isolating pattern elements.',
  },
  {
    icon: ZoomIn,
    title: 'Scale to Any Size',
    description: 'Download your bitmap at any scale factor without quality loss. Perfect for large-format textile printing.',
  },
  {
    icon: Download,
    title: 'Multiple Export Formats',
    description: 'Export as PNG, BMP, TIFF, JPEG, or WebP with full control over quality settings.',
  },
  {
    icon: Sparkles,
    title: 'Before & After Preview',
    description: 'Interactive comparison slider lets you see the original and converted image side by side.',
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gradient mb-3">
          Designed for Textile Creators
        </h2>
        <p className="text-canvas-500 max-w-2xl mx-auto text-sm leading-relaxed">
          TextileBit is a purpose-built tool for textile designers who need to convert images
          into high-quality bitmaps for weaving, embroidery, knitting, and digital textile printing.
          Upload any image — even a photo from your phone — and get a production-ready bitmap in seconds.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="card hover:shadow-textile-lg transition-shadow duration-300 group"
          >
            <div className="w-11 h-11 bg-textile-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-textile-200 transition-colors">
              <feature.icon size={20} className="text-textile-600" />
            </div>
            <h3 className="text-sm font-semibold text-canvas-900 mb-1.5">{feature.title}</h3>
            <p className="text-xs text-canvas-500 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="card bg-gradient-to-br from-textile-50 to-canvas-50 text-center">
        <h3 className="text-xl font-bold text-canvas-900 mb-2">Ready to Get Started?</h3>
        <p className="text-sm text-canvas-500 mb-5 max-w-md mx-auto">
          No sign-up required. Just upload your image and start converting.
        </p>
        <a href="/" className="btn-primary inline-block">
          Open the Editor
        </a>
      </div>
    </div>
  );
}
