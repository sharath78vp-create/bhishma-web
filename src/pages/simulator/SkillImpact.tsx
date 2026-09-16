import type { FC } from 'react';
import { Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SimulationScenario } from '../../types';

interface SkillImpactProps {
  scenario: SimulationScenario;
  netDeficitDelta: number;
}

export const SkillImpact: FC<SkillImpactProps> = ({
  scenario,
  netDeficitDelta
}) => {
  const isHero = scenario.id === 'SIM-SCENARIO-03';
  const isSemi = scenario.id === 'SIM-SCENARIO-01';

  // Determine affected skill IDs based on scenario
  const targetSkillIds = isHero
    ? ['SK-07', 'SK-08', 'SK-09', 'SK-10']
    : isSemi
    ? ['SK-02']
    : ['SK-03'];

  const affectedSkills = mockSkills.filter((s) => targetSkillIds.includes(s.id));

  // Intensity factor from netDeficitDelta (baseline is -26.0 for hero)
  const intensity = Math.abs(netDeficitDelta) / 26.0;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="default" size="sm" className="font-mono text-xs">
            {affectedSkills.length} LINKED SKILLS
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Skill Gap Deficit Impact</CardTitle>
            <CardDescription>
              Modeled contraction of acute enterprise skill shortages across linked competencies
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {affectedSkills.map((skill) => {
            const baselineGap = skill.gapScore;
            // Simulated reduction proportional to skill gap weight and intensity
            const gapReduction = Math.round(
              (baselineGap > 50 ? 26 : 14) * Math.max(0.3, intensity)
            );
            const simulatedGap = Math.max(5, baselineGap - gapReduction);
            const pctReduction = Math.round(((baselineGap - simulatedGap) / baselineGap) * 100);

            return (
              <div
                key={skill.id}
                className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-brand-400">
                        {skill.id}
                      </span>
                      <span className="text-slate-600">&bull;</span>
                      <span className="text-xs font-semibold text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Category: {skill.category}
                    </span>
                  </div>

                  <Badge variant="success" size="sm" className="font-mono text-[10px]">
                    -{pctReduction}% GAP
                  </Badge>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Baseline Shortage:</span>
                    <span className="text-rose-400 font-semibold">+{baselineGap} pts</span>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Simulated Shortage:</span>
                    <span className="text-emerald-400 font-bold">+{simulatedGap} pts</span>
                  </div>

                  {/* Progress bar comparison */}
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${(simulatedGap / 100) * 100}%` }}
                      className="bg-emerald-500 h-full rounded-l-full"
                    />
                    <div
                      style={{
                        width: `${((baselineGap - simulatedGap) / 100) * 100}%`
                      }}
                      className="bg-rose-500/40 h-full rounded-r-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>Simulated: +{simulatedGap}</span>
                    <span>Relieved Deficit: -{gapReduction} pts</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed">
                  {skill.description}
                </p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
