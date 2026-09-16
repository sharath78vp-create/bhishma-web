import type { FC } from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';

export const SimulationDisclaimer: FC = () => {
  return (
    <div className="p-4 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900/80 shadow-lg shadow-amber-500/5 relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-amber-200">
                Decision-Support Prototype Notice
              </span>
              <Badge variant="warning" size="sm" className="font-mono text-[10px] uppercase">
                Heuristic Sandbox
              </Badge>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
              <strong>Prototype simulation:</strong> Outputs are scenario estimates based on configured institutional assumptions, not verified forecasts. Simulation coefficients are illustrative parameters for prototype scenario exploration and are not calibrated production forecasts. Use for policy exploration, parameter sensitivity analysis, and committee deliberations &mdash; <em>not for final fiscal allocation decisions</em>.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-end sm:self-center text-[11px] font-mono text-slate-400 border-t sm:border-t-0 sm:border-l border-slate-800 pt-2 sm:pt-0 sm:pl-4">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>SIH-26134 Sandbox Mode</span>
        </div>
      </div>
    </div>
  );
};
