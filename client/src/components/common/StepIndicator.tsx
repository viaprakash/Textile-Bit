import { Check } from 'lucide-react';
import React from 'react';

interface Step { label: string; }

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center gap-0 w-full max-w-2xl mx-auto mb-8">
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500
              ${index < currentStep ? 'bg-textile-600 text-white shadow-textile'
                : index === currentStep ? 'bg-textile-500 text-white shadow-textile-lg scale-110'
                : 'bg-canvas-200 text-canvas-500'}`}>
              {index < currentStep ? <Check size={18} /> : index + 1}
            </div>
            <span className={`text-xs font-medium text-center max-w-[80px]
              ${index <= currentStep ? 'text-textile-700' : 'text-canvas-400'}`}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 mt-[-20px] transition-all duration-500 rounded-full
              ${index < currentStep ? 'bg-textile-500' : 'bg-canvas-200'}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
