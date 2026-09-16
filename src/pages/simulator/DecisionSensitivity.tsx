import type { FC } from 'react';
import { Gauge } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { SimulationScenario } from '../../types';

interface DecisionSensitivityProps {
  scenario: SimulationScenario;
  baselineDeficitDelta: number;
}

export const DecisionSensitivity: FC<DecisionSensitivityProps> = ({
  scenario,
  baselineDeficitDelta
}) => {
  const isDeficitRelieved = baselineDeficitDelta < 0;
  const absDelta = Math.abs(baselineDeficitDelta);

  const tiers = [
    {
      name: 'Low Intensity (50% Cap)',
      intensity: '0.5x Scale',
      capacityPct: Math.round(scenario.parameters.trainingCapacityExpansionPct * 0.5),
      lagMonths: Math.min(24, Math.round(scenario.parameters.curriculumRevisionLagMonths * 1.5)),
      modeledDelta: isDeficitRelieved ? -(absDelta * 0.52).toFixed(1) : +(absDelta * 0.52).toFixed(1),
      description: 'Budget-constrained rollout across Tier-1 institutions only',
      color: 'border-slate-800 text-slate-300'
    },
    {
      name: 'Baseline Intervention (1.0x)',
      intensity: 'Target Scale',
      capacityPct: scenario.parameters.trainingCapacityExpansionPct,
      lagMonths: scenario.parameters.curriculumRevisionLagMonths,
      modeledDelta: isDeficitRelieved ? -absDelta.toFixed(1) : +absDelta.toFixed(1),
      description: 'Planned public-private co-op across 45 Tier-2 campuses',
      color: 'border-brand-500/50 bg-slate-900 text-brand-300 ring-1 ring-brand-500/30'
    },
    {
      name: 'High Intensity (1.5x Aggressive)',
      intensity: '1.5x Scale',
      capacityPct: Math.min(100, Math.round(scenario.parameters.trainingCapacityExpansionPct * 1.5)),
      lagMonths: Math.max(3, Math.round(scenario.parameters.curriculumRevisionLagMonths * 0.6)),
      modeledDelta: isDeficitRelieved ? -(absDelta * 1.38).toFixed(1) : +(absDelta * 1.38).toFixed(1),
      description: 'Statewide acceleration with corporate tax subsidies',
      color: 'border-emerald-500/40 bg-slate-900 text-emerald-300'
    }
  ];

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="outline" size="sm" className="font-mono text-xs">
            SENSITIVITY ANALYSIS
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <Gauge className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Intervention Intensity &amp; Sensitivity Spectrum</CardTitle>
            <CardDescription>
              Modeled outcome sensitivity across low, baseline, and accelerated capital intensity tiers
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${tier.color}`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-white">
                    {tier.name}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {tier.intensity}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {tier.description}
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs font-mono">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Cap. Expansion:</span>
                  <span className="font-semibold text-emerald-400">+{tier.capacityPct}%</span>
                </div>

                <div className="flex items-center justify-between text-slate-400">
                  <span>Revision Lag:</span>
                  <span className="font-semibold text-amber-400">{tier.lagMonths} Mos</span>
                </div>

                <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-slate-800">
                  <span className="font-semibold">Simulated Deficit Delta:</span>
                  <span className="text-sm font-bold text-white">
                    {Number(tier.modeledDelta) > 0 ? `+${tier.modeledDelta}` : tier.modeledDelta} pts
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
