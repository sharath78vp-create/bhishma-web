import type { FC } from 'react';
import { Database, Target, BookOpen, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockRegionalGaps, mockSkills, mockCurriculumAudits } from '../../mock';
import type { SimulationScenario } from '../../types';

interface BaselineStateProps {
  scenario: SimulationScenario;
}

export const BaselineState: FC<BaselineStateProps> = ({ scenario }) => {
  // Dynamically derive baseline figures from datasets
  const hyderabad = mockRegionalGaps.find((r) => r.id === 'REG-05') || mockRegionalGaps[0];
  const sk07 = mockSkills.find((s) => s.id === 'SK-07') || mockSkills[0];
  const curr104 = mockCurriculumAudits.find((c) => c.id === 'CURR-104') || mockCurriculumAudits[0];

  // Specific baseline for other scenarios if non-hero
  const isSemi = scenario.id === 'SIM-SCENARIO-01';
  const isEV = scenario.id === 'SIM-SCENARIO-02';

  const skill = isSemi
    ? mockSkills.find((s) => s.id === 'SK-02') || sk07
    : isEV
    ? mockSkills.find((s) => s.id === 'SK-03') || sk07
    : sk07;

  const region = isSemi
    ? mockRegionalGaps.find((r) => r.id === 'REG-02') || hyderabad
    : isEV
    ? mockRegionalGaps.find((r) => r.id === 'REG-03') || hyderabad
    : hyderabad;

  const curr = isSemi
    ? mockCurriculumAudits.find((c) => c.id === 'CURR-101') || curr104
    : isEV
    ? mockCurriculumAudits.find((c) => c.id === 'CURR-103') || curr104
    : curr104;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="outline" size="sm" className="font-mono text-[10px] uppercase">
            EMPIRICAL BASELINE &bull; SEPT 2026
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Current Baseline (Pre-Intervention)</CardTitle>
            <CardDescription>
              Empirical market benchmarks prior to counterfactual parameter adjustments
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Regional Capacity Benchmark */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-400" />
                  <span>Regional Deficit</span>
                </span>
                <Badge variant={region.severity === 'critical' ? 'critical' : 'warning'} size="sm">
                  {region.severity}
                </Badge>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white">
                  +{region.netDeficit}
                </span>
                <span className="text-xs text-slate-400">Net Index Deficit</span>
              </div>

              <p className="text-xs text-slate-300">
                <strong className="text-white">{region.region}</strong> ({region.state}): Demand index {region.demandIndex} vs collegiate training capacity {region.trainingCapacityIndex}.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Institutes: {region.vocationalInstitutesCount}</span>
              <span>Baseline Gap: +{region.netDeficit} pts</span>
            </div>
          </div>

          {/* 2. Core Skill Shortage */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-rose-400" />
                  <span>Key Skill Shortage</span>
                </span>
                <Badge variant="critical" size="sm">
                  {skill.status}
                </Badge>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-rose-400">
                  +{skill.gapScore}
                </span>
                <span className="text-xs text-slate-400">Demand 94 vs Supply 48</span>
              </div>

              <p className="text-xs text-slate-300">
                <strong className="text-white">{skill.name}</strong> ({skill.id}): Enterprise hiring demand index {skill.demandIndex} vs collegiate talent supply {skill.supplyIndex}.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Category: {skill.category}</span>
              <span>Growth: +{skill.growthRatePct}% YoY</span>
            </div>
          </div>

          {/* 3. Curriculum Alignment Gap */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                  <span>Curriculum Parity</span>
                </span>
                <Badge variant="critical" size="sm">
                  {curr.alignmentScorePct}% Alignment
                </Badge>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-amber-400">
                  {curr.alignmentScorePct}%
                </span>
                <span className="text-xs text-slate-400">54% Syllabus Lag</span>
              </div>

              <p className="text-xs text-slate-300">
                <strong className="text-white">{curr.courseCode}</strong> ({curr.courseName.split('&')[0].trim()}): Audited at {curr.institutionTier} institutions, last reviewed in {curr.lastReviewedDate.split('-')[0]}.
              </p>
            </div>

            <div className="mt-4 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Missing Modules: {curr.missingSkills?.length || 0}</span>
              <span>Relevance: {curr.industryRelevanceScore}/100</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
