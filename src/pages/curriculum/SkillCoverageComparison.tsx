import type { FC } from 'react';
import { Layers, CheckCircle2, AlertTriangle, XCircle, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface SkillCoverageComparisonProps {
  course: CurriculumAudit;
}

export const SkillCoverageComparison: FC<SkillCoverageComparisonProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';

  // Structured matrix comparison for the hero curriculum
  const heroComparisonItems = [
    {
      industrySkill: 'Advanced SQL & Analytics Engineering (dbt)',
      demandLevel: '94/100 (Critical Shortage)',
      coverageStatus: 'partial',
      curriculumOutcome: 'Teaches basic relational algebra & simple SELECT queries. Zero coverage of dbt models, CTEs, or CI/CD pipelines.',
      gapLabel: 'Deficit: dbt Semantic Layer Missing'
    },
    {
      industrySkill: 'Cloud Data Warehousing (Snowflake / BigQuery)',
      demandLevel: '91/100 (Emerging High-Growth)',
      coverageStatus: 'missing',
      curriculumOutcome: '0% collegiate lab access. Engineering labs limited to on-premise local MySQL / FoxPro instances.',
      gapLabel: 'Deficit: 0% Cloud Data Lakehouse Access'
    },
    {
      industrySkill: 'Generative AI Prompt & Agentic Analytics',
      demandLevel: '95/100 (Surging +156% YoY)',
      coverageStatus: 'missing',
      curriculumOutcome: '0% coverage. Syllabus was last audited in Sep 2023, prior to enterprise LLM agentic tool-calling workflows.',
      gapLabel: 'Deficit: 0% LLM Tool Calling / RAG'
    },
    {
      industrySkill: 'BI & Predictive Dashboards (Power BI / DAX)',
      demandLevel: '89/100 (Production Bedrock)',
      coverageStatus: 'partial',
      curriculumOutcome: 'Coverage restricted to static Excel 2007 tables and manual macro calculation. Power BI & DAX modeling missing.',
      gapLabel: 'Deficit: Modern DAX & KPI Storytelling Missing'
    },
    {
      industrySkill: 'Descriptive Statistics & Relational Algebra',
      demandLevel: '78/100 (Foundational)',
      coverageStatus: 'covered',
      curriculumOutcome: 'Full academic coverage. Standard mean, variance, covariance, and normalization theorems thoroughly taught.',
      gapLabel: 'Full Baseline Academic Parity'
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px]">
            {isHero ? 'Hero Analytics Comparison' : `${course.courseCode} Diagnostic`}
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <CardTitle>Industry Requirement vs Curriculum Coverage</CardTitle>
        </div>
        <CardDescription>
          Granular line-item audit comparing enterprise hiring mandates against university learning outcomes
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        {isHero ? (
          <div className="space-y-3">
            {heroComparisonItems.map((item) => (
              <div
                key={item.industrySkill}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Industry Requisite Column */}
                <div className="md:w-5/12 min-w-0">
                  <span className="text-xs font-bold text-white block truncate">
                    {item.industrySkill}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                    Enterprise Demand: {item.demandLevel}
                  </span>
                </div>

                {/* Status Indicator Icon */}
                <div className="hidden md:flex items-center justify-center shrink-0">
                  <ArrowRight className="w-4 h-4 text-slate-600" />
                </div>

                {/* Curriculum Coverage Column */}
                <div className="md:w-6/12 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    {item.coverageStatus === 'covered' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Fully Covered
                      </span>
                    ) : item.coverageStatus === 'partial' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                        <AlertTriangle className="w-3 h-3" /> Partial / Outdated Tooling
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 border border-rose-500/20">
                        <XCircle className="w-3 h-3" /> Completely Missing (0%)
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-slate-400 truncate">
                      {item.gapLabel}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {item.curriculumOutcome}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Generic Course Coverage */}
            <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Collegiate Baseline Coverage</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(course.currentCoverageSkills || []).map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Generic Missing Skills */}
            <div className="p-3.5 rounded-lg bg-rose-950/10 border border-rose-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                <XCircle className="w-4 h-4" />
                <span>Unaddressed Industry Competencies</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(course.missingSkills || []).map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
