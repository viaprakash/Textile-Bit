import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-[Poppins] font-medium rounded-xl transition-all duration-300 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed gap-2';
  const variants: Record<string, string> = {
    primary: 'bg-textile-600 hover:bg-textile-700 text-white shadow-textile hover:shadow-textile-lg',
    secondary: 'bg-canvas-100 hover:bg-canvas-200 text-canvas-900 border border-canvas-300',
    outline: 'bg-transparent hover:bg-textile-50 text-textile-700 border-2 border-textile-300 hover:border-textile-500',
    ghost: 'bg-transparent hover:bg-canvas-100 text-canvas-700',
  };
  const sizes: Record<string, string> = {
    sm: 'py-1.5 px-3 text-xs',
    md: 'py-2.5 px-5 text-sm',
    lg: 'py-3 px-7 text-base',
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : icon ? icon : null}
      {children}
    </button>
  );
}
