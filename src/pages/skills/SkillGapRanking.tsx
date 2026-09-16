import type { FC } from 'react';
import { Target } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SkillMetric, SkillStatus } from '../../types';

interface SkillGapRankingProps {
  onSelectSkill?: (skill: SkillMetric) => void;
  selectedSkillId?: string;
}

export const SkillGapRanking: FC<SkillGapRankingProps> = ({
  onSelectSkill,
  selectedSkillId = 'SK-07'
}) => {
  // Hero focused skills + contrast declining skill
  const prioritySkillIds = ['SK-10', 'SK-09', 'SK-07', 'SK-08', 'SK-05'];
  const rankedSkills = prioritySkillIds
    .map((id) => mockSkills.find((s) => s.id === id))
    .filter((s): s is SkillMetric => Boolean(s));

  const statusBadgeMap: Record<SkillStatus, { variant: BadgeVariant; label: string }> = {
    'critical-shortage': { variant: 'critical', label: 'Critical Shortage' },
    emerging: { variant: 'warning', label: 'Emerging' },
    stable: { variant: 'success', label: 'Stable' },
    declining: { variant: 'declining', label: 'Declining' }
  };

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px]">
            Hero Analytical Focus
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-rose-400" />
          <CardTitle>Critical Skill Gap Disparities</CardTitle>
        </div>
        <CardDescription>
          Direct comparison of enterprise demand index against collegiate talent output for focal analytics roles
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        {rankedSkills.map((skill) => {
          const isSelected = skill.id === selectedSkillId;
          const isHero = skill.id === 'SK-07';
          const isNegative = skill.gapScore < 0;
          const badgeInfo = statusBadgeMap[skill.status];

          return (
            <div
              key={skill.id}
              onClick={() => onSelectSkill?.(skill)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'border-brand-500 bg-slate-900 ring-1 ring-brand-500/40 shadow-sm'
                  : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
              }`}
            >
              {/* Row Top: Name, Category, Gap Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs sm:text-sm font-bold truncate ${isSelected ? 'text-brand-300' : 'text-white'}`}>
                      {skill.name}
                    </span>
                    {isHero && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40">
                        HERO SKILL
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    {skill.category} &bull; Growth:{' '}
                    <strong className={skill.growthRatePct > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {skill.growthRatePct > 0 ? `+${skill.growthRatePct}%` : `${skill.growthRatePct}%`} YoY
                    </strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div
                    className={`font-mono text-xs font-bold px-2 py-0.5 rounded border ${
                      skill.gapScore >= 45
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                        : isNegative
                        ? 'bg-slate-800 text-slate-400 border-slate-700'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                    }`}
                  >
                    {skill.gapScore > 0 ? `+${skill.gapScore}` : skill.gapScore} Gap
                  </div>
                  <Badge variant={badgeInfo.variant} size="sm" className="text-[10px]">
                    {badgeInfo.label}
                  </Badge>
                </div>
              </div>

              {/* Progress Dual Bar: Demand vs Supply */}
              <div className="space-y-1.5 pt-2.5">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-indigo-500" />
                    Demand Index: <strong className="text-slate-200 font-mono">{skill.demandIndex}/100</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-sm bg-cyan-400" />
                    Collegiate Supply Index: <strong className="text-slate-200 font-mono">{skill.supplyIndex}/100</strong>
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-800/90 overflow-hidden flex relative">
                  <div
                    style={{ width: `${skill.demandIndex}%` }}
                    className="bg-indigo-500 h-full rounded-full transition-all"
                  />
                  <div
                    style={{ width: `${skill.supplyIndex}%` }}
                    className="bg-cyan-400/90 h-full -ml-2 rounded-full transition-all opacity-80"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
