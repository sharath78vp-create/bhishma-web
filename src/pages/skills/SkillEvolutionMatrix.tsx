import type { FC } from 'react';
import { Compass, TrendingUp, AlertTriangle, ShieldCheck, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SkillMetric } from '../../types';

interface SkillEvolutionMatrixProps {
  onSelectSkill?: (skill: SkillMetric) => void;
  selectedSkillId?: string;
}

export const SkillEvolutionMatrix: FC<SkillEvolutionMatrixProps> = ({
  onSelectSkill,
  selectedSkillId = 'SK-07'
}) => {
  // Quadrant 1: Exponential Surge & Critical Shortage (Demand >= 90 & gapScore >= 45)
  const q1Skills = mockSkills.filter((s) => s.demandIndex >= 90 && s.gapScore >= 45);

  // Quadrant 2: High-Growth Frontier (growthRatePct >= 45% & not in Q1)
  const q2Skills = mockSkills.filter((s) => s.growthRatePct >= 45 && !q1Skills.some((q) => q.id === s.id));

  // Quadrant 3: Core Enterprise Bedrock (status === 'stable' or gapScore between 0 and 30)
  const q3Skills = mockSkills.filter(
    (s) => (s.status === 'stable' || (s.gapScore >= 0 && s.gapScore < 45)) &&
      !q1Skills.some((q) => q.id === s.id) &&
      !q2Skills.some((q) => q.id === s.id) &&
      s.status !== 'declining'
  );

  // Quadrant 4: Legacy Contraction (status === 'declining')
  const q4Skills = mockSkills.filter((s) => s.status === 'declining');

  const quadrants = [
    {
      id: 'Q1',
      title: 'Exponential Surge & Acute Deficit',
      subtitle: 'Highest industry demand + severe collegiate shortage',
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/5',
      badge: 'Critical Priority',
      badgeVariant: 'critical' as const,
      icon: AlertTriangle,
      skills: q1Skills
    },
    {
      id: 'Q2',
      title: 'High-Growth Strategic Frontier',
      subtitle: 'Surging YoY requisitions across emerging industries',
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/5',
      badge: 'Rapid Adoption',
      badgeVariant: 'warning' as const,
      icon: TrendingUp,
      skills: q2Skills
    },
    {
      id: 'Q3',
      title: 'Core Production Bedrock',
      subtitle: 'Standardized operational baseline with stable absorption',
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/5',
      badge: 'Production Anchor',
      badgeVariant: 'success' as const,
      icon: ShieldCheck,
      skills: q3Skills
    },
    {
      id: 'Q4',
      title: 'Legacy Contraction & Phase-Out',
      subtitle: 'Contracting demand driven by agentic automation',
      color: 'text-slate-400',
      border: 'border-slate-800',
      bg: 'bg-slate-950/40',
      badge: 'Automation Risk',
      badgeVariant: 'declining' as const,
      icon: TrendingDown,
      skills: q4Skills
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="info" className="font-mono text-[10px]">
            4-Quadrant Dynamics
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-brand-400" />
          <CardTitle>Skill Evolution & Velocity Matrix</CardTitle>
        </div>
        <CardDescription>
          Multi-dimensional mapping of capability shifts, separating high-velocity modern stacks from automated legacy roles
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quadrants.map((quad) => {
            const Icon = quad.icon;
            return (
              <div
                key={quad.id}
                className={`p-4 rounded-xl border ${quad.border} ${quad.bg} flex flex-col justify-between space-y-3`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <Icon className={`w-3.5 h-3.5 ${quad.color}`} />
                        <h4 className="text-xs sm:text-sm font-bold text-white">{quad.title}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">{quad.subtitle}</p>
                    </div>
                    <Badge variant={quad.badgeVariant} size="sm" className="text-[9px] uppercase font-mono shrink-0">
                      {quad.badge}
                    </Badge>
                  </div>

                  {/* Skills Tag Cloud */}
                  <div className="flex flex-wrap gap-1.5 pt-3">
                    {quad.skills.map((skill) => {
                      const isSelected = skill.id === selectedSkillId;
                      const isHero = skill.id === 'SK-07';

                      return (
                        <button
                          key={skill.id}
                          type="button"
                          onClick={() => onSelectSkill?.(skill)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border text-left transition-all ${
                            isSelected
                              ? 'border-brand-400 bg-brand-600/30 text-white shadow-sm'
                              : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700 hover:text-white'
                          }`}
                        >
                          <span className="truncate max-w-[200px]">{skill.name}</span>
                          {isHero && (
                            <span className="text-[8px] font-bold px-1 py-0 rounded bg-rose-500/30 text-rose-300">
                              HERO
                            </span>
                          )}
                          <span
                            className={`font-mono text-[10px] ${
                              skill.growthRatePct > 0 ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {skill.growthRatePct > 0 ? `+${skill.growthRatePct}%` : `${skill.growthRatePct}%`}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Cluster Representation:</span>
                  <span className="font-mono text-slate-300 font-semibold">{quad.skills.length} Competencies</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
