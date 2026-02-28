import React, { useState } from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}

export default function Tooltip({ content, children, position = 'top' }: TooltipProps) {
  const [show, setShow] = useState(false);
  const pos = position === 'top'
    ? 'bottom-full left-1/2 -translate-x-1/2 mb-2'
    : 'top-full left-1/2 -translate-x-1/2 mt-2';
  return (
    <div className="relative inline-block" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      {show && (
        <div className={`absolute ${pos} px-2.5 py-1.5 bg-canvas-900 text-white text-xs font-medium rounded-lg whitespace-nowrap z-50 animate-fade-in pointer-events-none`}>
          {content}
        </div>
      )}
    </div>
  );
}
