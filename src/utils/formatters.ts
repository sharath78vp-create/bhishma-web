/**
 * Formatting utilities for BHISHMA metrics and indicators
 */

export function formatPercent(value: number, includeSign = true): string {
  const prefix = includeSign && value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(1)}%`;
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat('en-IN', { notation: 'compact', compactDisplay: 'short' }).format(num);
}

export function formatIndianCurrency(crores: number): string {
  return `₹${crores.toLocaleString('en-IN')} Cr`;
}

export function getStatusColor(status: string): { bg: string; text: string; border: string } {
  switch (status) {
    case 'critical':
    case 'critical-shortage':
      return { bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/30' };
    case 'emerging':
    case 'high':
      return { bg: 'bg-indigo-500/10', text: 'text-indigo-400', border: 'border-indigo-500/30' };
    case 'stable':
    case 'medium':
      return { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/30' };
    case 'declining':
    case 'warning':
    case 'low':
      return { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/30' };
    default:
      return { bg: 'bg-slate-500/10', text: 'text-slate-400', border: 'border-slate-500/30' };
  }
}
