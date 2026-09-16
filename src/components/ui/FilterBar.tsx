import type { FC, ReactNode } from 'react';
import { Filter, RotateCcw } from 'lucide-react';
import { Button } from './Button';

export interface FilterBarProps {
  children: ReactNode;
  activeCount?: number;
  onReset?: () => void;
  title?: string;
  className?: string;
}

export const FilterBar: FC<FilterBarProps> = ({
  children,
  activeCount = 0,
  onReset,
  title = 'Filters',
  className = '',
}) => {
  return (
    <div
      className={`p-3.5 rounded-xl border border-slate-800 bg-slate-900/70 flex flex-wrap items-center justify-between gap-3 text-xs ${className}`}
    >
      <div className="flex flex-wrap items-center gap-3 flex-1 min-w-0">
        <div className="flex items-center gap-1.5 text-slate-400 font-semibold uppercase tracking-wider text-[11px] shrink-0 pr-2 border-r border-slate-800 hidden sm:flex">
          <Filter className="w-3.5 h-3.5 text-brand-400" />
          <span>{title}</span>
          {activeCount > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full bg-brand-500/20 text-brand-300 text-[10px] font-bold border border-brand-500/30">
              {activeCount}
            </span>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-2.5 flex-1">
          {children}
        </div>
      </div>

      {onReset && activeCount > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          leftIcon={<RotateCcw className="w-3 h-3" />}
          className="text-slate-400 hover:text-slate-200 text-xs shrink-0"
        >
          Reset
        </Button>
      )}
    </div>
  );
};
