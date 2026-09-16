import type { FC } from 'react';
import { BrainCircuit, Layers, Building2, UserCheck, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import type { SkillMetric, SkillStatus } from '../../types';

interface HeroSkillDrilldownProps {
  skill: SkillMetric;
}

export const HeroSkillDrilldown: FC<HeroSkillDrilldownProps> = ({ skill }) => {
  const isHero = skill.id === 'SK-07';

  const statusBadgeMap: Record<SkillStatus, { variant: BadgeVariant; label: string }> = {
    'critical-shortage': { variant: 'critical', label: 'Critical Shortage' },
    emerging: { variant: 'warning', label: 'Emerging High-Growth' },
    stable: { variant: 'success', label: 'Stable Production' },
    declining: { variant: 'declining', label: 'Declining / Automated' }
  };

  const badgeInfo = statusBadgeMap[skill.status];

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-slate-900 shadow-sm">

      <CardHeader
        action={
          <div className="flex items-center gap-1.5">
            {isHero && (
              <Badge variant="critical" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                HERO SKILL
              </Badge>
            )}
            <Badge variant={badgeInfo.variant} size="sm" className="font-mono text-[10px] uppercase">
              {badgeInfo.label}
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-brand-400" />
          <CardTitle className="text-base sm:text-lg">{skill.name}</CardTitle>
        </div>
        <CardDescription>
          Domain: {skill.category} &bull; Identifier: {skill.id}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Core Metric Triplets */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 text-center">
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Demand Index</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-0.5">{skill.demandIndex}</div>
            <div className="text-[10px] text-indigo-400 font-mono mt-0.5">Scale 0 - 100</div>
          </div>

          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Supply Index</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-0.5">{skill.supplyIndex}</div>
            <div className="text-[10px] text-cyan-400 font-mono mt-0.5">Collegiate Output</div>
          </div>

          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/25">
            <div className="text-[10px] uppercase font-mono tracking-wider text-rose-300">Net Gap Score</div>
            <div className="font-mono text-xl sm:text-2xl font-bold text-rose-400 mt-0.5">
              {skill.gapScore > 0 ? `+${skill.gapScore}` : skill.gapScore}
            </div>
            <div className="text-[10px] text-rose-400/80 font-mono mt-0.5">
              {skill.growthRatePct > 0 ? `+${skill.growthRatePct}% YoY` : `${skill.growthRatePct}% YoY`}
            </div>
          </div>
        </div>

        {/* Technical Description */}
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <span className="font-semibold text-white block mb-1">Functional Competency Definition:</span>
          {skill.description}
        </div>

        {/* Hero Narrative Strategic Nexus */}
        {isHero ? (
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-slate-200">
              <Layers className="w-3.5 h-3.5" />
              <span>Hero Strategic Alignment Nexus</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px]">
              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Focus Role</span>
                <strong className="text-white flex items-center gap-1 mt-0.5">
                  <UserCheck className="w-3 h-3 text-brand-400" />
                  Data Analyst (LS-006)
                </strong>
              </div>

              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Target Sector</span>
                <strong className="text-white flex items-center gap-1 mt-0.5">
                  <Building2 className="w-3 h-3 text-indigo-400" />
                  AI &amp; Data
                </strong>
              </div>

              <div className="p-2 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[10px] uppercase">Corridor Node</span>
                <strong className="text-white flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-rose-400" />
                  Hyderabad (REG-05)
                </strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-300 leading-relaxed pt-1">
              <strong>Why it matters:</strong> Modern analytics engineering with dbt and cloud SQL has replaced traditional manual report compilation. Across 45 Tier-2 colleges in Hyderabad, syllabi still rely on Excel formulas, creating a 5.4-month retraining backlog for fresh graduates.
            </p>
          </div>
        ) : (
          <div className="p-3 rounded-lg bg-slate-950/30 border border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="font-semibold text-slate-300">Sectoral Applications:</div>
            <div className="flex flex-wrap gap-1.5">
              {skill.topEmergingSectors.map((sector) => (
                <span key={sector} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                  {sector}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sectoral Driver Tags */}
        {isHero && (
          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Cross-Sectoral Utilization ({skill.topEmergingSectors.length} Domains):
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skill.topEmergingSectors.map((sector) => (
                <span
                  key={sector}
                  className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700/80 font-medium"
                >
                  {sector}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
