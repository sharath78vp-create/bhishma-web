import type { FC } from 'react';
import { BrainCircuit, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SkillMetric, SkillStatus } from '../../types';

export const SkillSignalsSection: FC = () => {
  // Filter hero relevant skills and key declining skills
  const heroSkillIds = ['SK-10', 'SK-07', 'SK-09', 'SK-08', 'SK-05'];
  const featuredSkills: SkillMetric[] = heroSkillIds
    .map((id) => mockSkills.find((s) => s.id === id))
    .filter((s): s is SkillMetric => Boolean(s));

  const statusBadgeMap: Record<SkillStatus, { variant: 'critical' | 'warning' | 'info' | 'declining'; label: string }> = {
    'critical-shortage': { variant: 'critical', label: 'Critical Shortage' },
    emerging: { variant: 'warning', label: 'Emerging' },
    stable: { variant: 'info', label: 'Stable' },
    declining: { variant: 'declining', label: 'Declining' }
  };

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader
          action={
            <Badge variant="info" className="text-[10px]">
              AI & Data Stack
            </Badge>
          }
        >
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-4 h-4 text-brand-400" />
            <CardTitle>Skill Intelligence & Talent Deficits</CardTitle>
          </div>
          <CardDescription>
            Demand vs collegiate supply indexing for critical analytical competencies driving the Hyderabad node
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-3.5">
          {featuredSkills.map((skill) => {
            const badgeInfo = statusBadgeMap[skill.status];
            const isNegative = skill.gapScore < 0;

            return (
              <div
                key={skill.id}
                className="p-3 rounded-lg border border-slate-800/80 bg-slate-950/40 hover:border-slate-700/80 transition-all space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="font-semibold text-xs text-white block truncate">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {skill.category} &bull; Growth:{' '}
                      <strong className={skill.growthRatePct > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                        {skill.growthRatePct > 0 ? `+${skill.growthRatePct}%` : `${skill.growthRatePct}%`}
                      </strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`font-mono text-xs font-bold tabular-nums px-1.5 py-0.5 rounded ${
                        skill.gapScore > 35
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : isNegative
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {skill.gapScore > 0 ? `+${skill.gapScore}` : skill.gapScore} gap
                    </span>
                    <Badge variant={badgeInfo.variant} size="sm" className="text-[10px]">
                      {badgeInfo.label}
                    </Badge>
                  </div>
                </div>

                {/* Progress bars: Demand vs Supply comparison */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-2.5 h-2.5 text-indigo-400" />
                      Demand Index: <strong className="text-slate-200">{skill.demandIndex}/100</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingDown className="w-2.5 h-2.5 text-amber-400" />
                      Supply Index: <strong className="text-slate-300">{skill.supplyIndex}/100</strong>
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden flex">
                    <div
                      style={{ width: `${skill.demandIndex}%` }}
                      className="bg-indigo-500 h-full rounded-full transition-all"
                      title={`Demand: ${skill.demandIndex}`}
                    />
                    <div
                      style={{ width: `${skill.supplyIndex}%` }}
                      className="bg-amber-400/80 h-full -ml-2 rounded-full transition-all opacity-80"
                      title={`Supply: ${skill.supplyIndex}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </CardContent>
      </div>

      <CardFooter>
        <Link
          to="/skill-intelligence"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
        >
          <span>Explore complete taxonomy (14 monitored skills)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
