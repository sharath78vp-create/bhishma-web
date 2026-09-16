import type { FC } from 'react';
import { BookOpen, Calendar, Building2, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface HeroCurriculumAuditProps {
  course: CurriculumAudit;
}

export const HeroCurriculumAudit: FC<HeroCurriculumAuditProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';
  const isCritical = course.alignmentScorePct < 50;

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-slate-900 shadow-sm">

      <CardHeader
        action={
          <div className="flex items-center gap-1.5">
            {isHero && (
              <Badge variant="critical" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                HERO CURRICULUM
              </Badge>
            )}
            <Badge
              variant={isCritical ? 'critical' : course.alignmentScorePct <= 60 ? 'warning' : 'info'}
              size="sm"
              className="font-mono text-[10px] uppercase"
            >
              {isCritical ? 'Critical Deficit' : course.alignmentScorePct <= 60 ? 'Needs Update' : 'Moderate Match'}
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-brand-400" />
          <CardTitle className="text-base sm:text-lg">
            {course.courseCode}: {course.courseName}
          </CardTitle>
        </div>
        <CardDescription>
          Program: {course.program} &bull; Classification: {course.institutionTier} Collegiate Cluster
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Core Metric Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Main 46% Alignment Score Gauge */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 sm:col-span-1">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 block">
                Alignment Score
              </span>
              <div className="font-mono text-3xl font-extrabold text-rose-400 mt-0.5">
                {course.alignmentScorePct}%
              </div>
              <span className="text-[10px] text-rose-300/80 mt-0.5 block">
                {100 - course.alignmentScorePct}% Curricular Deficit
              </span>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-rose-500/30 border-t-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
          </div>

          {/* Industry Relevance */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Industry Relevance
            </span>
            <div>
              <div className="font-mono text-2xl font-bold text-amber-400">
                {course.industryRelevanceScore}/100
              </div>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Enterprise demand weight index
              </span>
            </div>
          </div>

          {/* Review Audit Lag */}
          <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Last Syllabus Audit
            </span>
            <div>
              <div className="font-mono text-base font-bold text-slate-200 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-400" />
                {course.lastReviewedDate}
              </div>
              <span className="text-[10px] text-rose-400 block mt-0.5 font-mono font-semibold">
                3-Year Revision Lag (Pre-LLM Stack)
              </span>
            </div>
          </div>
        </div>

        {/* Narrative Diagnostic Summary */}
        <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800/90 text-xs text-slate-300 leading-relaxed space-y-1.5">
          <p>
            The syllabus alignment score for <strong className="text-white">{course.courseCode}</strong> stands at{' '}
            <strong className="text-rose-400 font-mono font-bold">{course.alignmentScorePct}%</strong>.
            {isHero ? (
              <span>
                {' '}Across 45 affiliated Tier-2 engineering colleges in the Hyderabad Innovation Corridor, only 46% of the required industry capability set is currently taught. The accredited learning outcomes remain focused on static spreadsheet macros and manual SQL formulas, leaving modern cloud data warehouses and dbt analytics engineering entirely unaddressed.
              </span>
            ) : (
              <span>
                {' '}The audit indicates {course.missingSkills?.length || 0} missing critical competencies and {course.outdatedTopics.length} deprecated modules slated for syllabus modernization.
              </span>
            )}
          </p>
        </div>

        {/* Contextual Scope Tags */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400 pt-1">
          <span className="flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            Audited Scope: <strong className="text-slate-200">{course.institutionTier} Hyderabad Cluster</strong>
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            Accreditation Body: <strong className="text-slate-200">AICTE Model Curriculum</strong>
          </span>
          <span className="text-slate-600">&bull;</span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
            Course ID: <span className="font-mono text-brand-300">{course.id}</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
