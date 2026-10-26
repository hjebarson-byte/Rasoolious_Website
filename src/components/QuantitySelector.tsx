import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  max = 99,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'h-8 text-xs',
    md: 'h-10 text-sm',
    lg: 'h-12 text-base',
  };

  const buttonClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  };

  return (
    <div
      className={`inline-flex items-center bg-cream-100 border border-caramel-200 rounded-full p-1 shadow-soft-sm ${sizeClasses[size]}`}
    >
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`${buttonClasses[size]} flex items-center justify-center rounded-full text-chocolate-700 hover:bg-white hover:text-chocolate-900 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150`}
      >
        <Minus className="w-3.5 h-3.5" />
      </button>

      <span className="w-8 text-center font-medium text-chocolate-900 select-none">
        {quantity}
      </span>

      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className={`${buttonClasses[size]} flex items-center justify-center rounded-full text-chocolate-700 hover:bg-white hover:text-chocolate-900 active:scale-90 disabled:opacity-30 disabled:pointer-events-none transition-all duration-150`}
      >
        <Plus className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
