import React from 'react';

interface SidebarProps {
  children: React.ReactNode;
  title?: string;
}

export default function Sidebar({ children, title }: SidebarProps) {
  return (
    <aside className="w-full lg:w-80 shrink-0">
      <div className="sticky top-20 space-y-4">
        {title && <h2 className="text-lg font-semibold text-canvas-900 px-1">{title}</h2>}
        {children}
      </div>
    </aside>
  );
}
