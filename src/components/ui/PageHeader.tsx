import type { FC, ReactNode } from 'react';
import { Badge, type BadgeVariant } from './Badge';

export interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  badgeVariant?: BadgeVariant;
  actions?: ReactNode;
  breadcrumbs?: string[];
  className?: string;
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  description,
  badge,
  badgeVariant = 'info',
  actions,
  breadcrumbs,
  className = '',
}) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-slate-800/60 ${className}`}>
      <div className="flex-1 min-w-0">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400 mb-1.5 font-medium">
            {breadcrumbs.map((crumb, idx) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {idx > 0 && <span className="text-slate-400">/</span>}
                <span className={idx === breadcrumbs.length - 1 ? 'text-slate-200 font-semibold' : ''}>
                  {crumb}
                </span>
              </span>
            ))}
          </nav>
        )}

        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {title}
          </h1>
          {badge && (
            <Badge variant={badgeVariant} className="uppercase tracking-wider font-semibold">
              {badge}
            </Badge>
          )}
        </div>

        {description && (
          <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2.5 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
