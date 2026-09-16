import type { FC } from 'react';
import { Zap, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';

export const EmergingSkillSignal: FC = () => {
  // Hero emerging skill: SK-10 (Generative AI Prompt & Agentic Analytics)
  const heroEmerging = mockSkills.find((s) => s.id === 'SK-10') || mockSkills[0];

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/20">
      <CardHeader
        action={
          <Badge variant="warning" size="sm" className="font-mono text-[10px] animate-pulse">
            EMERGING SIGNAL
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-400" />
          <CardTitle>Emerging Skill Radar Signal</CardTitle>
        </div>
        <CardDescription>
          Early telemetry detection flagging highest-velocity skill emergence across industrial hiring requisitions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Core Spotlight Block */}
        <div className="p-3.5 rounded-lg border border-amber-500/25 bg-amber-500/5 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-amber-400">{heroEmerging.id}</span>
                <span className="text-slate-600">&bull;</span>
                <span className="text-xs text-slate-300 font-medium">{heroEmerging.category} Domain</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">{heroEmerging.name}</h4>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <div className="text-right">
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">YoY Growth</span>
                <span className="font-mono text-base font-bold text-emerald-400">+{heroEmerging.growthRatePct}%</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {heroEmerging.description}
          </p>

          {/* Differentiating Observed Trend from Speculative Forecast */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs">
            <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-amber-400 block mb-0.5">
                OBSERVED MARKET TELEMETRY
              </span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Direct NLP parsing of 34,200 Hyderabad postings indicates 62% now evaluate candidate ability to leverage LLM agent tooling for automated data pipelines.
              </p>
            </div>

            <div className="p-2.5 rounded-md bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-rose-400 block mb-0.5">
                CURRICULAR LAG DEFICIT
              </span>
              <p className="text-[11px] text-slate-300 leading-normal">
                Academic syllabus audits show 0% collegiate coverage for prompt-augmented data synthesis, causing entry-level placement drop-offs.
              </p>
            </div>
          </div>

          {/* Top Sectors in Demand */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
            <span className="text-slate-400 font-semibold text-[11px]">Surging Across Sectors:</span>
            {heroEmerging.topEmergingSectors.map((sector) => (
              <span key={sector} className="px-2 py-0.5 rounded bg-slate-800/80 text-slate-200 border border-slate-700/60 text-[10px]">
                {sector}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
