import type { FC } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockRegionalGaps } from '../../mock';
import type { SimulationScenario } from '../../types';

interface RegionalImpactProps {
  scenario: SimulationScenario;
  simulatedRegionalDeficit: number;
  baselineRegionalDeficit: number;
}

export const RegionalImpact: FC<RegionalImpactProps> = ({
  scenario,
  simulatedRegionalDeficit,
  baselineRegionalDeficit
}) => {
  const isHero = scenario.id === 'SIM-SCENARIO-03';
  const isSemi = scenario.id === 'SIM-SCENARIO-01';

  // Target region record
  const region = isHero
    ? mockRegionalGaps.find((r) => r.id === 'REG-05') || mockRegionalGaps[0]
    : isSemi
    ? mockRegionalGaps.find((r) => r.id === 'REG-02') || mockRegionalGaps[0]
    : mockRegionalGaps.find((r) => r.id === 'REG-03') || mockRegionalGaps[0];

  const simulatedCapacity = Math.min(
    100,
    region.trainingCapacityIndex + (baselineRegionalDeficit - simulatedRegionalDeficit)
  );

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="default" size="sm" className="font-mono text-xs">
            {region.region}
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Regional Capacity &amp; Deficit Absorption</CardTitle>
            <CardDescription>
              Simulated collegiate training expansion across regional innovation corridors
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Target Regional Node
            </div>
            <div className="text-base font-bold text-white">
              {region.region}
            </div>
            <div className="text-xs text-brand-400 font-medium">
              State: {region.state} &bull; {region.vocationalInstitutesCount} Vocational Institutes
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Training Capacity Index
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-emerald-400">
                {simulatedCapacity}
              </span>
              <span className="text-xs text-slate-400">
                from baseline {region.trainingCapacityIndex}
              </span>
            </div>
            <div className="text-xs text-slate-300">
              Capacity expansion funded via public-private co-ops
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-1">
            <div className="text-[11px] font-mono text-slate-400 uppercase">
              Net Regional Deficit
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold font-mono text-white">
                +{simulatedRegionalDeficit}
              </span>
              <span className="text-xs text-slate-400">
                from +{baselineRegionalDeficit} pts
              </span>
            </div>
            <div className="text-xs text-emerald-400 font-mono">
              Net Deficit Relief: -{baselineRegionalDeficit - simulatedRegionalDeficit} pts
            </div>
          </div>
        </div>

        {/* Capacity vs Demand Visual Bar */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300">
              Regional Demand Index: <strong className="text-white">{region.demandIndex}</strong>
            </span>
            <span className="text-slate-300">
              Simulated Capacity: <strong className="text-emerald-400">{simulatedCapacity}</strong>
            </span>
          </div>

          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Baseline Capacity Coverage</span>
                <span>{region.trainingCapacityIndex} / 100</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${region.trainingCapacityIndex}%` }}
                  className="bg-amber-500 h-full rounded-full"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                <span>Simulated Intervention Capacity Coverage</span>
                <span className="text-emerald-400 font-semibold">{simulatedCapacity} / 100</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  style={{ width: `${simulatedCapacity}%` }}
                  className="bg-emerald-500 h-full rounded-full"
                />
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
            <span>Sectors in Demand: {region.topSectorsInDemand.join(', ')}</span>
            <span className="font-mono text-emerald-400">Status: Capacity Expanded</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
