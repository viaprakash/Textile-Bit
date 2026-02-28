import { Scissors } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 glass-panel border-b border-canvas-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-textile-500 to-textile-700 rounded-xl flex items-center justify-center shadow-textile">
              <Scissors size={22} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gradient leading-tight">TextileBit</h1>
              <p className="text-[10px] text-canvas-500 font-medium -mt-0.5">Image to Bitmap Converter</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-canvas-600 hover:text-textile-600 transition-colors">Home</a>
            <a href="#how-it-works" className="text-sm font-medium text-canvas-600 hover:text-textile-600 transition-colors">How It Works</a>
          </nav>
        </div>
      </div>
    </header>
  );
}
