import type { FC } from 'react';
import { Activity, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { SimulationScenario } from '../../types';
import type { SimulatorParameters } from './InterventionControls';

interface SimulationOutcomeProps {
  scenario: SimulationScenario;
  parameters: SimulatorParameters;
  simulatedSkillGap: number;
  baselineSkillGap: number;
  simulatedRegionalDeficit: number;
  baselineRegionalDeficit: number;
  simulatedCurriculumAlignment: number | null;
  baselineCurriculumAlignment: number;
  netDeficitDelta: number;
}

export const SimulationOutcome: FC<SimulationOutcomeProps> = ({
  parameters,
  simulatedSkillGap,
  baselineSkillGap,
  simulatedRegionalDeficit,
  baselineRegionalDeficit,
  simulatedCurriculumAlignment,
  baselineCurriculumAlignment,
  netDeficitDelta
}) => {
  const isDeficitReduced = netDeficitDelta < 0;

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm relative overflow-hidden">

      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="success" size="sm" className="font-mono text-xs">
              SIMULATED OUTCOME
            </Badge>
            <span className="text-[10px] font-mono text-slate-400">
              Illustrative Prototype Assumptions
            </span>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Modeled Intervention Impact</CardTitle>
            <CardDescription>
              Counterfactual shift under current parameter configuration
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Top Progression Pill: Baseline -> Scenario -> Simulated Outcome */}
        <div className="p-3 rounded-lg border border-slate-800 bg-slate-950/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Baseline:</span>
            <span className="font-semibold text-rose-400">+{baselineSkillGap} pts Gap</span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Intervention:</span>
            <span className="font-semibold text-brand-300">
              +{parameters.trainingCapacityExpansionPct}% Cap / {parameters.curriculumRevisionLagMonths}m Lag
            </span>
          </div>

          <ArrowRight className="w-4 h-4 text-slate-600 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Simulated Outcome:</span>
            <span className="font-semibold text-emerald-400">
              {simulatedSkillGap} pts Gap ({isDeficitReduced ? `${netDeficitDelta.toFixed(1)} pts` : `+${netDeficitDelta.toFixed(1)} pts`})
            </span>
          </div>
        </div>

        {/* 3 Outcome Metric Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Skill Gap Delta */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Simulated Skill Deficit
              </span>
              <Badge variant={isDeficitReduced ? 'success' : 'critical'} size="sm">
                {isDeficitReduced ? `${netDeficitDelta.toFixed(1)} pts` : `+${netDeficitDelta.toFixed(1)} pts`}
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-white">
                +{simulatedSkillGap.toFixed(1)}
              </span>
              <span className="text-xs text-slate-400">
                from +{baselineSkillGap} pts
              </span>
            </div>

            <p className="text-xs text-slate-300">
              {isDeficitReduced
                ? 'Subsidized training capacity absorbs regional talent demand, narrowing the acute supply shortfall.'
                : 'Demand growth outpaces current training capacity under this scenario parameter set.'}
            </p>
          </div>

          {/* 2. Regional Capacity Deficit */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Regional Capacity Deficit
              </span>
              <Badge variant="info" size="sm">
                Net Shift: {simulatedRegionalDeficit - baselineRegionalDeficit} pts
              </Badge>
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-mono text-cyan-400">
                +{simulatedRegionalDeficit}
              </span>
              <span className="text-xs text-slate-400">
                from +{baselineRegionalDeficit} pts
              </span>
            </div>

            <p className="text-xs text-slate-300">
              Projected net deficit in regional training capacity after scaling lab facilities across targeted vocational colleges.
            </p>
          </div>

          {/* 3. Curriculum Alignment */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase">
                Curriculum Alignment
              </span>
              {simulatedCurriculumAlignment !== null && (
                <Badge variant="success" size="sm">
                  +{(simulatedCurriculumAlignment - baselineCurriculumAlignment).toFixed(0)}% Lift
                </Badge>
              )}
            </div>

            {simulatedCurriculumAlignment !== null ? (
              <>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-mono text-emerald-400">
                    {simulatedCurriculumAlignment}%
                  </span>
                  <span className="text-xs text-slate-400">
                    from {baselineCurriculumAlignment}%
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  Accelerated curriculum lag and sandbox grants bring academic syllabi into direct parity with industry tooling.
                </p>
              </>
            ) : (
              <div className="py-2">
                <span className="text-xs font-mono text-amber-400 block font-medium">
                  Unmodeled Dimension
                </span>
                <p className="text-xs text-slate-400 mt-1">
                  Scenario does not model curriculum alignment directly for this sector.
                </p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
