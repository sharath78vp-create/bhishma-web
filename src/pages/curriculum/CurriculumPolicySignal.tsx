import type { FC } from 'react';
import { ArrowRight, Award, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface CurriculumPolicySignalProps {
  course: CurriculumAudit;
}

export const CurriculumPolicySignal: FC<CurriculumPolicySignalProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm">
      <CardContent className="p-5 sm:p-6 lg:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-brand-400 uppercase tracking-wider">
                  Curriculum-to-Policy Mandate Nexus
                </span>
                <Badge variant="critical" size="sm" className="font-mono text-[10px] uppercase">
                  Intervention Triggered
                </Badge>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mt-0.5">
                {isHero
                  ? 'State Policy Mandate: Modern Data Analytics & Cloud Co-op Initiative'
                  : `Curricular Deficit Intervention for ${course.courseCode}`}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Badge variant="info" className="text-xs">
              AI &amp; Data Sector
            </Badge>
            <Badge variant="default" className="text-xs">
              Linked: POL-304
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          <div className="lg:col-span-8 space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evidence-Backed Policy Formulation</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curriculum coverage is materially below current industry requirements in the monitored Hyderabad AI &amp; Data cluster. With an alignment score of only <strong className="text-rose-400 font-mono font-bold">{course.alignmentScorePct}%</strong> for {course.courseCode}, accredited programs leave fresh graduates unequipped for cloud analytics engineering roles.
            </p>
            <p className="text-xs text-slate-400">
              BHISHMA policy recommendation <strong>POL-304</strong> establishes subsidized university cloud sandbox environments (Snowflake, dbt, Power BI) and a mandatory 6-month industry co-op across 45 Tier-2 engineering colleges in Telangana.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-center space-y-2.5">
            <Link
              to="/recommendations"
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs sm:text-sm font-bold shadow-sm transition-all text-center"
            >
              <Building2 className="w-4 h-4" />
              <span>View policy recommendation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <span className="text-[11px] text-slate-500 text-center block font-mono">
              Connects to Step 5: Policy Recommendations (POL-304)
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
