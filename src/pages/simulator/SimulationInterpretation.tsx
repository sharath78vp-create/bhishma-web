import type { FC } from 'react';
import { Lightbulb, Info } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { SimulationScenario } from '../../types';
import type { SimulatorParameters } from './InterventionControls';

interface SimulationInterpretationProps {
  scenario: SimulationScenario;
  parameters: SimulatorParameters;
  netDeficitDelta: number;
  regionalDelta: number;
  curriculumDelta: number | null;
}

export const SimulationInterpretation: FC<SimulationInterpretationProps> = ({
  scenario,
  parameters,
  netDeficitDelta,
  regionalDelta,
  curriculumDelta
}) => {
  const isDeficitRelieved = netDeficitDelta < 0;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="default" size="sm" className="font-mono text-xs">
            DETERMINISTIC EVALUATION
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Decision Support Interpretation &amp; Guidance</CardTitle>
            <CardDescription>
              Objective synthesis of simulated outputs under the current parameter configuration
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Core Findings Bullet Points */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
            Under this scenario configuration:
          </h4>

          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
              <span>
                <strong>Skill Deficit:</strong> Enterprise skill shortages decrease by{' '}
                <span className="font-mono text-emerald-400 font-bold">
                  {Math.abs(netDeficitDelta).toFixed(1)} points
                </span>{' '}
                as training capacity expands by +{parameters.trainingCapacityExpansionPct}%.
              </span>
            </li>

            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5" />
              <span>
                <strong>Regional Deficit:</strong> Regional innovation cluster net capacity deficit shifts by{' '}
                <span className="font-mono text-cyan-400 font-bold">
                  {regionalDelta < 0 ? `${regionalDelta} points` : `+${regionalDelta} points`}
                </span>
                , reflecting collegiate lab seat deployment.
              </span>
            </li>

            {curriculumDelta !== null && (
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1.5" />
                <span>
                  <strong>Curriculum Alignment:</strong> Academic syllabus alignment lifts by{' '}
                  <span className="font-mono text-amber-400 font-bold">
                    +{curriculumDelta.toFixed(0)} percentage points
                  </span>{' '}
                  driven by a fast-track {parameters.curriculumRevisionLagMonths}-month syllabus modernization cycle.
                </span>
              </li>
            )}
          </ul>
        </div>

        {/* Policy Guidance Synthesis Box */}
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-semibold text-white">
              Institutional Decision Guidance:
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isDeficitRelieved
              ? 'This scenario produces a stronger simulated improvement under the configured assumptions. Expanding training capacity while simultaneously compressing curriculum review latency yields the highest elasticity in closing acute skill deficits.'
              : 'Under this scenario, demand momentum significantly outpaces funded training capacity expansion, suggesting that statutory mandates must be paired with larger public-private capital co-funding to avoid localized capacity bottlenecks.'}
          </p>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Proposed Playbook: {scenario.suggestedMitigation}</span>
            <span className="text-brand-400 font-semibold">Status: Evaluated</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
