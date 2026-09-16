import type { FC, ReactNode, HTMLAttributes } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  ...rest
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8'
  }[padding];

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl shadow-card transition-all ${paddingStyles} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardHeader: FC<{
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}> = ({ title, subtitle, action, className = '' }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100 ${className}`}>
    <div>
      <h3 className="text-base font-semibold text-slate-900 tracking-tight">{title}</h3>
      {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);
