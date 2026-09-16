import type { FC, ReactNode } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../ui/Card';

export interface ChartContainerProps {
  title: string;
  subtitle?: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
  legend?: ReactNode;
  footerNote?: ReactNode;
  className?: string;
  height?: number | string;
}

export const ChartContainer: FC<ChartContainerProps> = ({
  title,
  subtitle,
  description,
  children,
  action,
  legend,
  footerNote,
  className = '',
  height = 300,
}) => {
  const descText = description || subtitle;

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader
        action={
          (action || legend) && (
            <div className="flex items-center gap-3">
              {legend && <div className="hidden sm:block">{legend}</div>}
              {action && <div>{action}</div>}
            </div>
          )
        }
      >
        <CardTitle>{title}</CardTitle>
        {descText && <CardDescription>{descText}</CardDescription>}
      </CardHeader>

      <CardContent className="p-3 sm:p-4">
        {legend && <div className="sm:hidden pb-3 border-b border-slate-800/60 mb-3">{legend}</div>}
        <div style={{ height, width: '100%' }} className="min-w-0">
          {children}
        </div>
      </CardContent>

      {footerNote && (
        <CardFooter className="text-[11px] text-slate-400">
          <span>{footerNote}</span>
        </CardFooter>
      )}
    </Card>
  );
};

