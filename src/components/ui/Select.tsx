import type { SelectHTMLAttributes, FC } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  sizeVariant?: 'sm' | 'md';
  helperText?: string;
  className?: string;
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  sizeVariant = 'sm',
  helperText,
  className = '',
  disabled,
  id,
  ...props
}) => {
  const selectId = id || (label ? `select-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  const sizeClasses = {
    sm: 'py-1.5 pl-3 pr-8 text-xs',
    md: 'py-2 pl-3.5 pr-9 text-sm',
  };

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider select-none"
        >
          {label}
        </label>
      )}
      <div className="relative inline-block w-full">
        <select
          id={selectId}
          disabled={disabled}
          className={`w-full appearance-none rounded-lg border border-slate-700/80 bg-slate-900 text-slate-200 transition-colors focus-visible:border-brand-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-50 ${sizeClasses[sizeVariant]}`}
          {...props}
        >
          {options.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="bg-slate-900 text-slate-200"
            >
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-slate-400">
          <ChevronDown className="w-3.5 h-3.5" />
        </div>
      </div>
      {helperText && <p className="text-[11px] text-slate-400">{helperText}</p>}
    </div>
  );
};
