import type { FC } from 'react';
import { Award, FileText, Building2, DollarSign, Users, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockSkills, mockCurriculumAudits } from '../../mock';
import type { PolicyIntervention } from '../../types';

interface HeroRecommendationProps {
  policy: PolicyIntervention;
  onOpenEvidence: () => void;
  onScrollToReview?: () => void;
}

export const HeroRecommendation: FC<HeroRecommendationProps> = ({
  policy,
  onOpenEvidence,
  onScrollToReview
}) => {
  const isHero = policy.id === 'POL-304';

  // Resolve skill names from mockSkills
  const linkedSkills = (policy.relatedSkillIds || []).map((id) => {
    const s = mockSkills.find((skill) => skill.id === id);
    return s ? s.name : id;
  });

  // Resolve curriculum names from mockCurriculumAudits
  const linkedCourses = (policy.relatedCourseIds || []).map((id) => {
    const c = mockCurriculumAudits.find((curr) => curr.id === id);
    return c ? `${c.courseCode} (${c.courseName.split('&')[0].trim()})` : id;
  });

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-slate-900 shadow-sm">

      <CardHeader
        action={
          <div className="flex items-center gap-2">
            {isHero && (
              <Badge variant="critical" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
                HERO POLICY DECISION
              </Badge>
            )}
            <Badge
              variant={policy.priority === 'high' ? 'critical' : 'warning'}
              size="sm"
              className="font-mono text-[10px] uppercase"
            >
              {policy.priority} Priority
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Award className="w-4 h-4" />
          </div>
          <CardTitle className="text-base sm:text-lg">
            {policy.id}: {policy.title}
          </CardTitle>
        </div>
        <CardDescription>
          Sector: {policy.targetSector} &bull; Target Corridor: {policy.targetRegion} &bull; Model: {policy.interventionType}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-6 space-y-5">
        {/* Core Rationale Statement */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              {isHero
                ? 'Recommended intervention for the identified Hyderabad AI & Data analytics capability gap'
                : `Empirical intervention mandate for ${policy.targetRegion}`}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {policy.rationale}
          </p>
        </div>

        {/* 3 Metric Triplets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <DollarSign className="w-4 h-4" />
            </div>
            <div className="font-mono text-2xl font-bold text-white">₹{policy.estimatedCostCr} Cr</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
              Capital Investment
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Cloud sandbox & tool subsidies</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center text-brand-400 mb-1">
              <Users className="w-4 h-4" />
            </div>
            <div className="font-mono text-2xl font-bold text-white">{(policy.projectedTalentOutput / 1000).toFixed(0)}K</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
              Qualified Graduates
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Direct absorption pool</span>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 text-center">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="font-mono text-2xl font-bold text-white">{policy.implementationTimeMonths} Mo</div>
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">
              Rollout Horizon
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Mandatory 6-month co-op</span>
          </div>
        </div>

        {/* Linked Competencies and Syllabi */}
        <div className="space-y-3 pt-1">
          {linkedSkills.length > 0 && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                Directly Closes Empirical Skill Deficits ({linkedSkills.length} Competencies):
              </div>
              <div className="flex flex-wrap gap-1.5">
                {linkedSkills.map((skillName, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-800/90 text-slate-200 border border-slate-700 font-medium"
                  >
                    {skillName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {linkedCourses.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400">
              <span className="font-semibold text-slate-300">Target Overhaul Syllabi:</span>
              {linkedCourses.map((course, idx) => (
                <span
                  key={idx}
                  className="font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80 text-[11px]"
                >
                  {course}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Action Button Strip */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-brand-400" />
            <span>Target Execution Body: <strong>Telangana State Council of Higher Education (TSCHE)</strong></span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={onOpenEvidence}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-brand-400" />
              <span>View Evidence &amp; Provenance</span>
            </Button>

            <Button
              variant="primary"
              size="sm"
              onClick={onScrollToReview}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 font-bold"
            >
              <span>Review Policy Action</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
