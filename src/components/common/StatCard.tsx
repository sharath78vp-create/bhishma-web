import type { FC, ComponentType } from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ComponentType<{ className?: string }>;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  change,
  changeType = 'neutral',
  className = ''
}) => {
  const changeStyles = {
    positive: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    negative: 'text-rose-700 bg-rose-50 border-rose-200',
    neutral: 'text-slate-600 bg-slate-50 border-slate-200'
  }[changeType];

  return (
    <Card className={`flex flex-col justify-between ${className}`} padding="md">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{title}</span>
        {Icon && (
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2.5">
        <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight tabular-nums">
          {value}
        </div>

        <div className="mt-2 flex items-center justify-between gap-2 flex-wrap text-xs">
          {subtitle && <span className="text-slate-500 truncate">{subtitle}</span>}
          {change && (
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded border text-[11px] font-semibold tabular-nums ${changeStyles}`}>
              {change}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
};
