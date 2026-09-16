import type { FC, ReactNode } from 'react';
import { AlertCircle, Inbox, Loader2 } from 'lucide-react';
import { Button } from './Button';

export interface LoadingStateProps {
  message?: string;
  className?: string;
}

export const LoadingState: FC<LoadingStateProps> = ({
  message = 'Loading intelligence telemetry...',
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`p-12 flex flex-col items-center justify-center text-center ${className}`}
    >
      <Loader2 className="w-8 h-8 text-brand-500 animate-spin" />
      <p className="mt-3 text-xs font-medium text-slate-400">{message}</p>
    </div>
  );
};

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const EmptyState: FC<EmptyStateProps> = ({
  title = 'No records found',
  description = 'No intelligence signals match the selected query criteria.',
  icon,
  action,
  className = '',
}) => {
  return (
    <div className={`p-8 rounded-xl border border-slate-800 bg-slate-950/40 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-slate-400 mb-3">
        {icon || <Inbox className="w-6 h-6" />}
      </div>
      <h3 className="text-sm font-semibold text-slate-200">{title}</h3>
      <p className="text-xs text-slate-400 mt-1 max-w-sm leading-relaxed">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
};

export interface ErrorStateProps {
  title?: string;
  description?: string;
  onRetry?: () => void;
  className?: string;
}

export const ErrorState: FC<ErrorStateProps> = ({
  title = 'Failed to load telemetry',
  description = 'An error occurred while evaluating labour market data signals. Please retry.',
  onRetry,
  className = '',
}) => {
  return (
    <div className={`p-8 rounded-xl border border-rose-500/30 bg-rose-950/10 flex flex-col items-center justify-center text-center ${className}`}>
      <div className="p-3 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-sm font-semibold text-rose-300">{title}</h3>
      <p className="text-xs text-rose-400/80 mt-1 max-w-sm leading-relaxed">{description}</p>
      {onRetry && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onRetry}
          className="mt-4 border-rose-500/30 text-rose-300 hover:bg-rose-950/30"
        >
          Retry Telemetry Sync
        </Button>
      )}
    </div>
  );
};
