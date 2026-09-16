import type { FC } from 'react';

interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  label?: string;
  showPercentage?: boolean;
  color?: 'brand' | 'emerald' | 'amber' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProgressBar: FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  showPercentage = true,
  color = 'brand',
  size = 'md',
  className = ''
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const colorStyles = {
    brand: 'bg-brand-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-500',
    rose: 'bg-rose-500'
  }[color];

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3'
  }[size];

  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          {label && <span>{label}</span>}
          {showPercentage && <span className="tabular-nums text-slate-900 font-semibold">{percentage}%</span>}
        </div>
      )}
      <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${sizeStyles}`}>
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${colorStyles}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};
