import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  children: ReactNode;
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:opacity-50 disabled:pointer-events-none cursor-pointer';

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-5 py-2.5 text-base gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-brand-600 hover:bg-brand-500 active:bg-brand-700 text-white focus-visible:ring-brand-500 shadow-sm border border-brand-500/30',
    secondary: 'bg-slate-800/90 hover:bg-slate-700/90 active:bg-slate-800 text-slate-200 border border-slate-700/80 focus-visible:ring-slate-400',
    outline: 'bg-transparent border border-slate-700/80 hover:bg-slate-800/60 active:bg-slate-800 text-slate-300 hover:text-white focus-visible:ring-slate-400',
    ghost: 'bg-transparent hover:bg-slate-800/60 active:bg-slate-800/90 text-slate-400 hover:text-slate-100 focus-visible:ring-slate-400',
    danger: 'bg-rose-600 hover:bg-rose-500 active:bg-rose-700 text-white focus-visible:ring-rose-500 border border-rose-500/40',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {rightIcon && !isLoading && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

