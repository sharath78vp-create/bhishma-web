import type { FC } from 'react';
import { BookOpen, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockCurriculumAudits } from '../../mock';
import type { SimulationScenario } from '../../types';

interface CurriculumImpactProps {
  scenario: SimulationScenario;
  simulatedCurriculumAlignment: number | null;
  baselineCurriculumAlignment: number;
}

export const CurriculumImpact: FC<CurriculumImpactProps> = ({
  scenario,
  simulatedCurriculumAlignment,
  baselineCurriculumAlignment
}) => {
  const isHero = scenario.id === 'SIM-SCENARIO-03';
  const isSemi = scenario.id === 'SIM-SCENARIO-01';

  // Target audited curriculum
  const course = isHero
    ? mockCurriculumAudits.find((c) => c.id === 'CURR-104')
    : isSemi
    ? mockCurriculumAudits.find((c) => c.id === 'CURR-101')
    : null;

  const isModeled = simulatedCurriculumAlignment !== null && course !== null;

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge
            variant={isModeled ? 'success' : 'outline'}
            size="sm"
            className="font-mono text-xs"
          >
            {isModeled ? 'CURRICULUM MODELED' : 'UNMODELED DIMENSION'}
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Curriculum Alignment Shift</CardTitle>
            <CardDescription>
              Modeled syllabus modernization and integration of cloud industry tooling
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isModeled && course ? (
          <div className="space-y-6">
            <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-amber-400">
                    {course.courseCode}
                  </span>
                  <span className="text-slate-600">&bull;</span>
                  <h4 className="text-sm font-semibold text-white">
                    {course.courseName}
                  </h4>
                  <Badge variant="outline" size="sm" className="text-[10px]">
                    {course.institutionTier}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Program: {course.program} &bull; Audited Cohort Focus: Tier-2 Colleges
                </p>
              </div>

              <div className="flex items-center gap-4 shrink-0 bg-slate-900 p-3 rounded-lg border border-slate-800">
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Baseline Alignment
                  </div>
                  <div className="text-xl font-bold font-mono text-amber-400">
                    {baselineCurriculumAlignment}%
                  </div>
                </div>

                <ArrowRight className="w-5 h-5 text-slate-600" />

                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase">
                    Simulated Alignment
                  </div>
                  <div className="text-xl font-bold font-mono text-emerald-400">
                    {simulatedCurriculumAlignment}%
                  </div>
                </div>

                <Badge variant="success" size="sm" className="font-mono text-xs">
                  +{(simulatedCurriculumAlignment - baselineCurriculumAlignment).toFixed(0)}% Lift
                </Badge>
              </div>
            </div>

            {/* Replacement Modules Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <span className="text-xs font-mono font-semibold text-rose-400 uppercase flex items-center gap-1.5">
                  <span>Superseded Obsolete Topics</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {course.outdatedTopics.map((topic, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500/60" />
                      <span className="line-through decoration-rose-500/50">{topic}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3.5 rounded-xl border border-slate-800 bg-slate-900/60 space-y-2">
                <span className="text-xs font-mono font-semibold text-emerald-400 uppercase flex items-center gap-1.5">
                  <span>Simulated Modern Additions</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {course.recommendedModules.map((mod, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{mod}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-8 border-2 border-dashed border-slate-800 rounded-xl text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h4 className="text-sm font-semibold text-white">
              Scenario does not model curriculum alignment directly.
            </h4>
            <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
              This intervention scenario (<em>{scenario.name}</em>) focuses on operational capital deployment, fleet conversion incentives, and rapid infrastructure ramping. Curricular syllabus audit modules are unmodeled for this specific statutory domain.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
