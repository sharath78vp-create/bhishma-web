import type { FC } from 'react';
import { Activity, AlertTriangle, Sparkles, CheckCircle2, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SkillMetric, SkillStatus } from '../../types';

interface SkillMovementOverviewProps {
  onSelectSkill?: (skill: SkillMetric) => void;
  selectedSkillId?: string;
}

export const SkillMovementOverview: FC<SkillMovementOverviewProps> = ({
  onSelectSkill,
  selectedSkillId = 'SK-07'
}) => {
  const groups: {
    status: SkillStatus;
    title: string;
    subtitle: string;
    icon: typeof AlertTriangle;
    badgeVariant: 'critical' | 'warning' | 'success' | 'declining';
    borderClass: string;
    bgClass: string;
    textClass: string;
    skills: SkillMetric[];
  }[] = [
    {
      status: 'critical-shortage',
      title: 'Critical Shortage',
      subtitle: 'Acute supply deficits (>+45 gap)',
      icon: AlertTriangle,
      badgeVariant: 'critical',
      borderClass: 'border-rose-500/30',
      bgClass: 'bg-rose-500/5',
      textClass: 'text-rose-400',
      skills: mockSkills.filter((s) => s.status === 'critical-shortage')
    },
    {
      status: 'emerging',
      title: 'Emerging High-Growth',
      subtitle: 'Rapid industry adoption (>+45% YoY)',
      icon: Sparkles,
      badgeVariant: 'warning',
      borderClass: 'border-amber-500/30',
      bgClass: 'bg-amber-500/5',
      textClass: 'text-amber-400',
      skills: mockSkills.filter((s) => s.status === 'emerging')
    },
    {
      status: 'stable',
      title: 'Stable / Core Production',
      subtitle: 'Balanced enterprise baseline',
      icon: CheckCircle2,
      badgeVariant: 'success',
      borderClass: 'border-cyan-500/30',
      bgClass: 'bg-cyan-500/5',
      textClass: 'text-cyan-400',
      skills: mockSkills.filter((s) => s.status === 'stable')
    },
    {
      status: 'declining',
      title: 'Declining / Automation Risk',
      subtitle: 'Contraction or legacy migration',
      icon: TrendingDown,
      badgeVariant: 'declining',
      borderClass: 'border-slate-800',
      bgClass: 'bg-slate-950/40',
      textClass: 'text-slate-400',
      skills: mockSkills.filter((s) => s.status === 'declining')
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-mono text-[10px]">
              14 Monitored Competencies
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-brand-400" />
          <CardTitle>Skill Market Movement Architecture</CardTitle>
        </div>
        <CardDescription>
          Categorization of competencies by structural velocity, industrial hiring momentum, and collegiate deficit
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Macro Distribution Ratio Strip */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Taxonomy Momentum Distribution</span>
            <span className="font-mono text-[11px] text-slate-300">
              4 Critical &bull; 4 Emerging &bull; 3 Stable &bull; 3 Declining
            </span>
          </div>

          <div className="w-full h-2 rounded-full overflow-hidden flex bg-slate-800">
            <div style={{ width: '28.6%' }} className="bg-rose-500 h-full" title="Critical: 28.6%" />
            <div style={{ width: '28.6%' }} className="bg-amber-400 h-full" title="Emerging: 28.6%" />
            <div style={{ width: '21.4%' }} className="bg-cyan-400 h-full" title="Stable: 21.4%" />
            <div style={{ width: '21.4%' }} className="bg-slate-600 h-full" title="Declining: 21.4%" />
          </div>
        </div>

        {/* 4 Group Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {groups.map((grp) => {
            const Icon = grp.icon;
            return (
              <div
                key={grp.status}
                className={`p-3.5 rounded-xl border ${grp.borderClass} ${grp.bgClass} flex flex-col justify-between space-y-3`}
              >
                <div>
                  {/* Group Header */}
                  <div className="flex items-center justify-between gap-1 pb-2 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <Icon className={`w-3.5 h-3.5 ${grp.textClass} shrink-0`} />
                      <span className="text-xs font-bold text-white truncate">{grp.title}</span>
                    </div>
                    <Badge variant={grp.badgeVariant} size="sm" className="text-[10px] font-mono px-1.5 py-0 shrink-0">
                      {grp.skills.length}
                    </Badge>
                  </div>

                  <p className="text-[10px] text-slate-400 mt-1 mb-2.5">
                    {grp.subtitle}
                  </p>

                  {/* Skills List in Group */}
                  <div className="space-y-2">
                    {grp.skills.map((skill) => {
                      const isSelected = skill.id === selectedSkillId;
                      const isHero = skill.id === 'SK-07';

                      return (
                        <div
                          key={skill.id}
                          onClick={() => onSelectSkill?.(skill)}
                          className={`p-2 rounded-lg border text-left cursor-pointer transition-all ${
                            isSelected
                              ? 'border-brand-500 bg-slate-900 ring-1 ring-brand-500/40 shadow-sm'
                              : 'border-slate-800/90 bg-slate-900/60 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-1.5">
                            <span className="text-xs font-medium text-slate-200 line-clamp-1 leading-snug">
                              {skill.name}
                            </span>
                            {isHero && (
                              <span className="text-[8px] font-bold px-1 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                                HERO
                              </span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-1.5 text-[10px]">
                            <span className="text-slate-400">
                              Demand: <strong className="text-slate-200 font-mono">{skill.demandIndex}</strong>
                            </span>
                            <span
                              className={`font-mono font-semibold ${
                                skill.growthRatePct > 0 ? 'text-emerald-400' : 'text-rose-400'
                              }`}
                            >
                              {skill.growthRatePct > 0 ? `+${skill.growthRatePct}%` : `${skill.growthRatePct}%`}
                            </span>
                            <span
                              className={`font-mono font-bold px-1 rounded ${
                                skill.gapScore > 35
                                  ? 'bg-rose-500/20 text-rose-300'
                                  : skill.gapScore < 0
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-amber-500/20 text-amber-300'
                              }`}
                            >
                              {skill.gapScore > 0 ? `+${skill.gapScore}` : skill.gapScore}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
