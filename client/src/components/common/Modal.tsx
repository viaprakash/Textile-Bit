import { X } from 'lucide-react';
import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-canvas-950/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-textile-lg p-6 max-w-lg w-full mx-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-canvas-900">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-canvas-100 rounded-lg transition-colors">
            <X size={20} className="text-canvas-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
