import type { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: ReactNode;
  accessor?: keyof T;
  render?: (item: T, index: number) => ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor?: (item: T, index: number) => string;
  onRowClick?: (item: T, index: number) => void;
  emptyMessage?: string;
  compact?: boolean;
  className?: string;
  striped?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  onRowClick,
  emptyMessage = 'No records found',
  compact = false,
  className = '',
  striped = false,
}: DataTableProps<T>) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right font-mono tabular-nums',
  };

  const paddingClass = compact ? 'px-3 py-2 text-xs' : 'px-4 py-3 text-xs sm:text-sm';

  return (
    <div className={`w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 ${className}`}>
      <table className="w-full border-collapse text-slate-200 text-left">
        <thead>
          <tr className="border-b border-slate-800 bg-slate-950/60 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                style={{ width: col.width }}
                className={`${paddingClass} ${alignClasses[col.align || 'left']} ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-xs text-slate-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, idx) => {
              const rowKey = keyExtractor
                ? keyExtractor(item, idx)
                : (item as { id?: string }).id || String(idx);
              const isClickable = !!onRowClick;

              return (
                <tr
                  key={rowKey}
                  onClick={() => onRowClick?.(item, idx)}
                  className={`transition-colors ${
                    striped && idx % 2 === 1 ? 'bg-slate-950/20' : ''
                  } ${
                    isClickable
                      ? 'cursor-pointer hover:bg-slate-800/60 active:bg-slate-800'
                      : 'hover:bg-slate-800/30'
                  }`}
                >
                  {columns.map((col) => {
                    let cellContent: ReactNode;
                    if (col.render) {
                      cellContent = col.render(item, idx);
                    } else if (col.accessor) {
                      cellContent = String(item[col.accessor] ?? '');
                    } else {
                      cellContent = String((item as Record<string, unknown>)[col.key] ?? '');
                    }

                    return (
                      <td
                        key={col.key}
                        className={`${paddingClass} ${alignClasses[col.align || 'left']} ${col.className || ''}`}
                      >
                        {cellContent}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
