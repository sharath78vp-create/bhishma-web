import type { FC } from 'react';
import { AlertOctagon, ArrowUpRight, Clock, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockEarlyWarnings } from '../../mock';

export const EarlyWarningSection: FC = () => {
  // Show highest-priority alerts (EW-901 and EW-902 are both critical)
  const topAlert = mockEarlyWarnings.find((w) => w.id === 'EW-901') || mockEarlyWarnings[0];
  const secondaryAlert = mockEarlyWarnings.find((w) => w.id === 'EW-902');

  return (
    <Card className="h-full flex flex-col justify-between border-rose-950/40 bg-gradient-to-br from-slate-900 via-slate-900 to-rose-950/20">
      <div>
        <CardHeader
          action={
            <Badge variant="critical" size="sm" className="font-mono text-[10px] animate-pulse">
              CRITICAL ALERT
            </Badge>
          }
        >
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <CardTitle>Early Warning Signals</CardTitle>
          </div>
          <CardDescription>
            Predictive radar flagging urgent structural labour deficits and curriculum lag
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-3.5">
          {/* Main Top Alert */}
          <div className="p-3.5 rounded-lg border border-rose-500/30 bg-rose-500/5 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-rose-400">{topAlert.id}</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs font-semibold text-white">{topAlert.sector}</span>
              </div>
              <span className="flex items-center gap-1 text-[10px] font-mono text-slate-400 shrink-0">
                <Clock className="w-3 h-3 text-amber-400" />
                {topAlert.predictedImpactHorizon}
              </span>
            </div>

            <h4 className="text-xs sm:text-sm font-bold text-rose-200 leading-snug">
              {topAlert.title}
            </h4>

            <p className="text-xs text-slate-300 line-clamp-2">
              {topAlert.description}
            </p>

            <div className="pt-2 border-t border-rose-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
              <span className="text-slate-400">
                Action: <strong className="text-rose-300">{topAlert.recommendedImmediateAction}</strong>
              </span>
            </div>
          </div>

          {/* Secondary Brief Alert */}
          {secondaryAlert && (
            <div className="p-2.5 rounded-lg border border-slate-800 bg-slate-950/50 flex items-center justify-between gap-2 text-xs">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Badge variant="critical" size="sm" className="text-[9px] py-0">Critical</Badge>
                  <span className="font-semibold text-slate-200 truncate">{secondaryAlert.title}</span>
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  {secondaryAlert.sector} &bull; Horizon: {secondaryAlert.predictedImpactHorizon}
                </div>
              </div>
              <AlertOctagon className="w-4 h-4 text-amber-400 shrink-0" />
            </div>
          )}
        </CardContent>
      </div>

      <CardFooter>
        <Link
          to="/early-warnings"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
        >
          <span>View all warnings ({mockEarlyWarnings.length} active advisories)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
