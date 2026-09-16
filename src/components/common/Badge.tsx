import type { FC, ReactNode } from 'react';

export type BadgeVariant = 'brand' | 'success' | 'warning' | 'danger' | 'neutral' | 'purple';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  className = ''
}) => {
  const variantStyles = {
    brand: 'bg-brand-50 text-brand-700 border-brand-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    neutral: 'bg-slate-100 text-slate-700 border-slate-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200'
  }[variant];

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5',
    md: 'text-xs px-2.5 py-1'
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-md border tracking-wide select-none ${variantStyles} ${sizeStyles} ${className}`}
    >
      {children}
    </span>
  );
};
