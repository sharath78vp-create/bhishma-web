import type { FC } from 'react';
import { Card, CardContent } from './Card';
import type { LucideIcon } from 'lucide-react';

export interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  subtitle?: string;
  className?: string;
}

export const StatCard: FC<StatCardProps> = ({
  title,
  value,
  change,
  changeType = 'positive',
  icon: Icon,
  subtitle,
  className = ''
}) => {
  const changeStyles = {
    positive: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    negative: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
    neutral: 'text-slate-400 bg-slate-800/60 border-slate-700/50'
  };

  return (
    <Card hover className={`relative overflow-hidden group ${className}`}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider truncate">
            {title}
          </span>
          <div className="p-1.5 sm:p-2 rounded-lg bg-slate-800/80 text-brand-400 border border-slate-700/40 group-hover:text-brand-300 group-hover:border-slate-600 transition-colors shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        </div>

        <div className="mt-2.5 flex items-baseline gap-2.5">
          <span className="text-2xl sm:text-3xl font-bold tracking-tight text-white tabular-nums">
            {value}
          </span>
          {change && (
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[11px] font-semibold border ${changeStyles[changeType]}`}
            >
              {change}
            </span>
          )}
        </div>

        {subtitle && (
          <p className="mt-1.5 text-xs text-slate-400 leading-normal line-clamp-1">
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

