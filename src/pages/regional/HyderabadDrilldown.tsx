import type { FC } from 'react';
import { Building2, TrendingUp, BookOpen, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import type { RegionalGap, RegionalSeverity } from '../../types';

interface HyderabadDrilldownProps {
  region: RegionalGap;
}

export const HyderabadDrilldown: FC<HyderabadDrilldownProps> = ({ region }) => {
  const isHero = region.id === 'REG-05';
  const severity = (region.severity || 'moderate') as RegionalSeverity;

  const severityBadgeMap: Record<RegionalSeverity, { variant: BadgeVariant; label: string }> = {
    critical: { variant: 'critical', label: 'Critical Capacity Deficit' },
    high: { variant: 'warning', label: 'High Capacity Deficit' },
    moderate: { variant: 'info', label: 'Moderate Deficit' },
    low: { variant: 'success', label: 'Low Deficit / Balanced' }
  };

  const badgeInfo = severityBadgeMap[severity] || severityBadgeMap.moderate;

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-slate-900 shadow-sm">

      <CardHeader
        action={
          <div className="flex items-center gap-1.5">
            {isHero && (
              <Badge variant="critical" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                HERO NODE
              </Badge>
            )}
            <Badge variant={badgeInfo.variant} size="sm" className="font-mono text-[10px] uppercase">
              {badgeInfo.label}
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-brand-400" />
          <CardTitle className="text-base sm:text-lg">{region.region}</CardTitle>
        </div>
        <CardDescription>
          {region.state} &bull; Coordinates: [{region.coordinates[0].toFixed(2)}°N, {region.coordinates[1].toFixed(2)}°E]
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Core Metric Grid */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          {/* Industry Demand */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-center text-indigo-400 mb-1">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">{region.demandIndex}</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
              Industry Demand
            </div>
          </div>

          {/* Training Capacity */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <BookOpen className="w-4 h-4" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white">{region.trainingCapacityIndex}</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
              Training Capacity
            </div>
          </div>

          {/* Net Deficit */}
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/25">
            <div className="flex items-center justify-center text-rose-400 mb-1">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-rose-400">+{region.netDeficit}</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-rose-300 mt-0.5">
              Net Deficit
            </div>
          </div>
        </div>

        {/* Demand vs Capacity Progress Visualization */}
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-300 font-medium">Corridor Capacity Coverage</span>
            <span className="font-mono font-bold text-slate-200">
              {((region.trainingCapacityIndex / region.demandIndex) * 100).toFixed(0)}% coverage
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
            {/* Demand target bar */}
            <div
              style={{ width: `${region.demandIndex}%` }}
              className="h-full bg-indigo-500/30 rounded-full absolute top-0 left-0"
              title={`Demand Target: ${region.demandIndex}`}
            />
            {/* Capacity filled bar */}
            <div
              style={{ width: `${region.trainingCapacityIndex}%` }}
              className={`h-full rounded-full transition-all relative z-10 ${
                region.netDeficit >= 25 ? 'bg-rose-500' : region.netDeficit >= 15 ? 'bg-amber-400' : 'bg-emerald-400'
              }`}
              title={`Training Capacity: ${region.trainingCapacityIndex}`}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
            <span>0</span>
            <span className="text-cyan-400">Capacity: {region.trainingCapacityIndex}</span>
            <span className="text-indigo-400">Demand: {region.demandIndex}</span>
            <span>100</span>
          </div>
        </div>

        {/* Data-driven Analytical Explanation */}
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed">
          <p>
            Industry demand currently exceeds available training capacity by <strong className="text-rose-400 font-mono font-semibold">+{region.netDeficit} points</strong>.
            {isHero ? (
              <span>
                {' '}Across the Hyderabad corridor, 124 vocational and engineering institutions provide foundational instruction, but rapid growth in AI & Data and Cloud Data Warehousing has created a structural hiring bottleneck.
              </span>
            ) : (
              <span>
                {' '}The cluster contains {region.vocationalInstitutesCount} vocational institutes currently operating at a training capacity index of {region.trainingCapacityIndex}/100 against an industrial demand of {region.demandIndex}/100.
              </span>
            )}
          </p>
        </div>

        {/* Priority Sectors In Demand */}
        <div className="space-y-2 pt-1">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span>Primary Driver Sectors ({region.topSectorsInDemand.length}):</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {region.topSectorsInDemand.map((sector) => (
              <span
                key={sector}
                className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium"
              >
                {sector}
              </span>
            ))}
          </div>
        </div>

        {/* Institutional Scope */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Active Vocational & Collegiate Hubs:</span>
          <span className="font-mono font-bold text-white flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {region.vocationalInstitutesCount} Accredited Campuses
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
