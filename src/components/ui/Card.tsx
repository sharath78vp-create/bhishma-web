import type { FC, ReactNode, HTMLAttributes } from 'react';

export type CardVariant = 'default' | 'glass' | 'bordered' | 'critical' | 'warning' | 'accent';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  hover?: boolean;
}

export const Card: FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  hover = false,
  ...props
}) => {
  const baseStyles = 'rounded-xl transition-colors duration-150 relative';
  const variants: Record<CardVariant, string> = {
    default: 'bg-slate-900/90 border border-slate-800/90 text-slate-100 shadow-sm',
    glass: 'bg-slate-900/70 backdrop-blur-md border border-slate-800/80 text-slate-100',
    bordered: 'bg-transparent border border-slate-800 text-slate-100',
    critical: 'bg-slate-900/95 border border-rose-500/30 text-slate-100',
    warning: 'bg-slate-900/95 border border-amber-500/30 text-slate-100',
    accent: 'bg-slate-900/95 border border-brand-500/30 text-slate-100'
  };

  const hoverStyles = hover ? 'hover:border-slate-700 hover:bg-slate-900 transition-all' : '';

  return (
    <div className={`${baseStyles} ${variants[variant]} ${hoverStyles} ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardHeader: FC<{ children: ReactNode; className?: string; action?: ReactNode }> = ({
  children,
  className = '',
  action
}) => (
  <div className={`px-5 py-4 border-b border-slate-800/80 flex items-start justify-between gap-4 ${className}`}>
    <div className="flex-1 min-w-0">{children}</div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
);

export const CardTitle: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <h3 className={`text-sm md:text-base font-semibold text-slate-100 tracking-tight ${className}`}>
    {children}
  </h3>
);

export const CardDescription: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <p className={`text-xs text-slate-400 mt-0.5 leading-relaxed ${className}`}>
    {children}
  </p>
);

export const CardContent: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`p-5 ${className}`}>
    {children}
  </div>
);

export const CardFooter: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`px-5 py-3 border-t border-slate-800/80 bg-slate-950/30 text-xs text-slate-400 flex items-center justify-between gap-2 rounded-b-xl ${className}`}>
    {children}
  </div>
);


