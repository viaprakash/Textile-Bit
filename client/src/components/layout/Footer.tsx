import { Heart, Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-canvas-950 text-canvas-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Scissors size={18} className="text-textile-400" />
            <span className="text-sm font-medium text-canvas-200">TextileBit</span>
          </div>
          <p className="text-xs text-canvas-500 flex items-center gap-1">
            Made with <Heart size={12} className="text-textile-500 fill-textile-500" /> for textile designers
          </p>
          <p className="text-xs text-canvas-600">© {new Date().getFullYear()} TextileBit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
