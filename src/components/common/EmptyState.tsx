import type { FC, ReactNode, ComponentType } from 'react';

interface EmptyStateProps {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
  action?: ReactNode;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action
}) => (
  <div className="flex flex-col items-center justify-center p-8 text-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h4 className="text-sm font-semibold text-slate-900">{title}</h4>
    <p className="text-xs text-slate-500 max-w-sm mt-1 mb-4 leading-relaxed">{description}</p>
    {action && <div>{action}</div>}
  </div>
);
