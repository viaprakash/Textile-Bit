
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export default function Loader({ size = 'md', text }: LoaderProps) {
  const sizes: Record<string, string> = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-8">
      <div className={`${sizes[size]} relative`}>
        <div className="absolute inset-0 border-[3px] border-textile-200 rounded-full" />
        <div className="absolute inset-0 border-[3px] border-transparent border-t-textile-600 rounded-full animate-spin" />
      </div>
      {text && <p className="text-sm font-medium text-canvas-600 animate-pulse">{text}</p>}
    </div>
  );
}
