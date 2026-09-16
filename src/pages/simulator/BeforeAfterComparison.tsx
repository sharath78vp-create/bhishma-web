import type { FC } from 'react';
import { ArrowDownRight, ArrowUpRight, Minus, GitCompare } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface BeforeAfterComparisonProps {
  baselineSkillGap: number;
  simulatedSkillGap: number;
  baselineRegionalDeficit: number;
  simulatedRegionalDeficit: number;
  baselineCurriculumAlignment: number;
  simulatedCurriculumAlignment: number | null;
  curriculumRevisionLagMonths: number;
}

export const BeforeAfterComparison: FC<BeforeAfterComparisonProps> = ({
  baselineSkillGap,
  simulatedSkillGap,
  baselineRegionalDeficit,
  simulatedRegionalDeficit,
  baselineCurriculumAlignment,
  simulatedCurriculumAlignment,
  curriculumRevisionLagMonths
}) => {
  const skillGapDelta = simulatedSkillGap - baselineSkillGap;
  const regionalDelta = simulatedRegionalDeficit - baselineRegionalDeficit;
  const curriculumDelta =
    simulatedCurriculumAlignment !== null
      ? simulatedCurriculumAlignment - baselineCurriculumAlignment
      : null;

  // Onboarding retraining lag modeled from curriculum revision speed
  const baselineRetrainingMonths = 5.4;
  const simulatedRetrainingMonths = Math.max(
    1.0,
    Number((baselineRetrainingMonths * (curriculumRevisionLagMonths / 9) * 0.4).toFixed(1))
  );
  const retrainingDelta = simulatedRetrainingMonths - baselineRetrainingMonths;

  const comparisonRows = [
    {
      metric: 'Key Skill Shortage Score',
      detail: 'Advanced SQL, dbt & Cloud Analytics',
      current: `+${baselineSkillGap} pts`,
      simulated: `+${simulatedSkillGap.toFixed(1)} pts`,
      delta: `${skillGapDelta.toFixed(1)} pts`,
      isImprovement: skillGapDelta < 0,
      direction: skillGapDelta < 0 ? 'Deficit Narrowed' : 'Shortage Expanded'
    },
    {
      metric: 'Regional Capacity Deficit',
      detail: 'Hyderabad Innovation Corridor Net Deficit',
      current: `+${baselineRegionalDeficit} pts`,
      simulated: `+${simulatedRegionalDeficit} pts`,
      delta: `${regionalDelta} pts`,
      isImprovement: regionalDelta < 0,
      direction: regionalDelta < 0 ? 'Deficit Relieved' : 'Deficit Increased'
    },
    {
      metric: 'Curriculum Alignment Parity',
      detail: 'DS-302 Syllabus Alignment to Industry',
      current: `${baselineCurriculumAlignment}%`,
      simulated:
        simulatedCurriculumAlignment !== null
          ? `${simulatedCurriculumAlignment}%`
          : 'Not Modeled',
      delta:
        curriculumDelta !== null ? `+${curriculumDelta.toFixed(0)}%` : 'N/A',
      isImprovement: curriculumDelta !== null && curriculumDelta > 0,
      direction:
        curriculumDelta !== null ? 'Syllabus Parity Lift' : 'Sector Unmodeled'
    },
    {
      metric: 'Corporate Retraining Lag',
      detail: 'Time required to onboard collegiate hire',
      current: `${baselineRetrainingMonths} Mos`,
      simulated: `${simulatedRetrainingMonths} Mos`,
      delta: `${retrainingDelta.toFixed(1)} Mos`,
      isImprovement: retrainingDelta < 0,
      direction: retrainingDelta < 0 ? 'Retraining Reduced' : 'No Change'
    }
  ];

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="outline" size="sm" className="font-mono text-xs">
            BEFORE VS AFTER MATRIX
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <GitCompare className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Before vs After Intervention Comparison</CardTitle>
            <CardDescription>
              Direct side-by-side evaluation of baseline benchmarks against counterfactual simulated outcomes
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Policy Dimension</th>
                <th className="py-3 px-4">Current Baseline</th>
                <th className="py-3 px-4">Simulated Outcome</th>
                <th className="py-3 px-4">Modeled Shift</th>
                <th className="py-3 px-4">Directional Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {comparisonRows.map((row) => (
                <tr key={row.metric} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{row.metric}</div>
                    <div className="text-[11px] text-slate-400 font-mono">{row.detail}</div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-300 font-semibold">
                    {row.current}
                  </td>

                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {row.simulated}
                  </td>

                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold ${
                        row.isImprovement
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : row.delta === 'N/A'
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}
                    >
                      {row.delta}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      {row.isImprovement ? (
                        <ArrowDownRight className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : row.delta === 'N/A' ? (
                        <Minus className="w-4 h-4 text-slate-500 shrink-0" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                      <span
                        className={`text-xs ${
                          row.isImprovement
                            ? 'text-emerald-300 font-medium'
                            : row.delta === 'N/A'
                            ? 'text-slate-400'
                            : 'text-rose-300 font-medium'
                        }`}
                      >
                        {row.direction}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
