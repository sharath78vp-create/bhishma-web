import type { FC } from 'react';
import { Award, ArrowRight, DollarSign, Users, Calendar, Sparkles, Building2, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockPolicyInterventions, mockSkills, mockCurriculumAudits } from '../../mock';

export const PriorityActionSection: FC = () => {
  // Hero policy: POL-304
  const heroPolicy = mockPolicyInterventions.find((p) => p.id === 'POL-304') || mockPolicyInterventions[0];

  // Resolve linked skill names
  const linkedSkills = (heroPolicy.relatedSkillIds || []).map((id) => {
    const s = mockSkills.find((skill) => skill.id === id);
    return s ? s.name : id;
  });

  // Resolve linked courses
  const linkedCourses = (heroPolicy.relatedCourseIds || []).map((id) => {
    const c = mockCurriculumAudits.find((curr) => curr.id === id);
    return c ? `${c.courseCode} (${c.courseName.split('&')[0].trim()})` : id;
  });

  return (
    <Card className="relative overflow-hidden border-slate-800 bg-slate-900 shadow-sm">

      <CardContent className="p-5 sm:p-6 lg:p-7 relative z-10 space-y-5">
        {/* Header Ribbon */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-wider text-brand-400 uppercase">
                  {heroPolicy.id} &bull; Priority Policy Intervention
                </span>
                <Badge variant="critical" size="sm" className="font-mono text-[10px] uppercase">
                  {heroPolicy.priority} Priority
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                {heroPolicy.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="info" className="text-xs">
              {heroPolicy.targetSector}
            </Badge>
            <Badge variant="default" className="text-xs">
              {heroPolicy.interventionType}
            </Badge>
          </div>
        </div>

        {/* Core Rationale & Impact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          {/* Left Narrative: Gap to Solution (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-2">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Evidence-Backed Policy Formulation</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {heroPolicy.rationale}
              </p>
            </div>

            {/* Target Region & Colleges */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-brand-400" />
                Target Cluster: <strong className="text-white">{heroPolicy.targetRegion}</strong>
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                Institution Scope: <strong className="text-white">45 Tier-2 Colleges</strong>
              </span>
            </div>

            {/* Linked Skill and Curriculum Chips */}
            <div className="space-y-2 pt-1">
              <div className="text-[11px] font-medium text-slate-400">Addressed Skill Inconsistencies:</div>
              <div className="flex flex-wrap gap-1.5">
                {linkedSkills.map((name, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-800/80 text-slate-200 border border-slate-700/60"
                  >
                    {name}
                  </span>
                ))}
              </div>

              {linkedCourses.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span className="font-semibold text-slate-300">Audited Syllabi:</span>
                  {linkedCourses.map((course, i) => (
                    <span key={i} className="font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/80">
                      {course}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Metrics & CTA (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/90 rounded-xl p-4 sm:p-5 space-y-4">
            <div className="grid grid-cols-3 gap-3 text-center">
              {/* Estimated Cost */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-center text-emerald-400 mb-1">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div className="font-mono text-lg font-bold text-white">₹{heroPolicy.estimatedCostCr} Cr</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">Investment</div>
              </div>

              {/* Projected Output */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-center text-brand-400 mb-1">
                  <Users className="w-4 h-4" />
                </div>
                <div className="font-mono text-lg font-bold text-white">{(heroPolicy.projectedTalentOutput / 1000).toFixed(0)}K</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">Graduates</div>
              </div>

              {/* Horizon */}
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="flex items-center justify-center text-amber-400 mb-1">
                  <Calendar className="w-4 h-4" />
                </div>
                <div className="font-mono text-lg font-bold text-white">{heroPolicy.implementationTimeMonths} Mo</div>
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mt-0.5">Horizon</div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800/80">
              <span className="text-[11px] text-slate-400 text-center sm:text-left">
                Actionable mandate for Telangana State Council of Higher Education (TSCHE)
              </span>
              <Link
                to="/recommendations"
                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all shrink-0 w-full sm:w-auto"
              >
                <span>View recommendation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
