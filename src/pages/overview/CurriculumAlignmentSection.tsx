import type { FC } from 'react';
import { BookOpen, AlertTriangle, CheckCircle2, ArrowUpRight, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockCurriculumAudits } from '../../mock';

export const CurriculumAlignmentSection: FC = () => {
  // Hero curriculum: CURR-104 (DS-302 Business Intelligence & Enterprise Data Analytics)
  const heroCurriculum = mockCurriculumAudits.find((c) => c.id === 'CURR-104') || mockCurriculumAudits[0];

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <CardHeader
          action={
            <Badge variant="critical" className="font-mono font-bold text-[11px] px-2 py-0.5">
              {heroCurriculum.alignmentScorePct}% Alignment
            </Badge>
          }
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-rose-400" />
            <CardTitle>Curriculum Alignment Diagnostic</CardTitle>
          </div>
          <CardDescription>
            AICTE syllabus audit vs modern enterprise market demands for Tier-2 engineering colleges
          </CardDescription>
        </CardHeader>

        <CardContent className="p-4 sm:p-5 space-y-4">
          {/* Target Course Identity Banner */}
          <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-400">{heroCurriculum.courseCode}</span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs text-slate-300 font-medium">{heroCurriculum.program}</span>
                <span className="text-slate-500">&bull;</span>
                <Badge variant="default" size="sm" className="text-[10px] py-0">{heroCurriculum.institutionTier}</Badge>
              </div>
              <h4 className="text-sm font-semibold text-white mt-0.5">{heroCurriculum.courseName}</h4>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400">Industry Relevance</div>
                <div className="text-sm font-bold font-mono text-amber-400">{heroCurriculum.industryRelevanceScore}/100</div>
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-rose-500/30 bg-rose-500/10 flex flex-col items-center justify-center shrink-0">
                <span className="font-mono text-xs font-bold text-rose-400 leading-none">{heroCurriculum.alignmentScorePct}%</span>
                <span className="text-[8px] uppercase tracking-tighter text-slate-400 mt-0.5">Match</span>
              </div>
            </div>
          </div>

          {/* Conceptual Diagnostic Chain: Industry Demand -> Curriculum -> 46% Match -> Gaps */}
          <div className="p-2.5 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-between text-center gap-1 text-[11px]">
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Industry Demand</div>
              <div className="font-medium text-slate-200 truncate">Cloud Data Analyst</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Curriculum</div>
              <div className="font-medium text-slate-200 truncate">DS-302 Syllabus</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-rose-400 uppercase tracking-wider font-semibold">Alignment</div>
              <div className="font-mono font-bold text-rose-400">46% Deficit</div>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">Intervention</div>
              <div className="font-medium text-amber-300 truncate">Co-op Sandbox</div>
            </div>
          </div>

          {/* Dual Panel: Current Coverage vs Missing Critical Skills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Current Coverage */}
            <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/80 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Collegiate Baseline Coverage</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {(heroCurriculum.currentCoverageSkills || []).map((skill, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                    <span className="truncate">{skill}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1 text-[10px] text-slate-500 border-t border-slate-800">
                Outdated: {heroCurriculum.outdatedTopics.slice(0, 2).join(', ')}
              </div>
            </div>

            {/* Critical Missing Skills */}
            <div className="p-3 rounded-lg bg-rose-950/10 border border-rose-900/30 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Critical Industry Gaps (0% Taught)</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {(heroCurriculum.missingSkills || []).map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="pt-1 flex items-center gap-1 text-[10px] text-amber-400/90 border-t border-rose-900/20">
                <Layers className="w-2.5 h-2.5 shrink-0" />
                <span>Recommended: dbt & Snowflake Cloud Lab Sandbox</span>
              </div>
            </div>
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <Link
          to="/curriculum-alignment"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
        >
          <span>View full curriculum audit suite (8 accredited syllabi)</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
