import type { FC } from 'react';
import { AlertTriangle, Sparkles, Cloud, Database, Cpu, LayoutDashboard } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface CurriculumGapsProps {
  course: CurriculumAudit;
}

export const CurriculumGaps: FC<CurriculumGapsProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';

  // Specific impact metadata for hero curriculum missing skills
  const heroGapDetails: Record<string, { impact: string; icon: typeof Database; priority: 'Critical' | 'High' }> = {
    'Cloud Data Warehouse Interfacing (Snowflake/BigQuery)': {
      impact: 'Enterprise analytics has shifted 100% to cloud data platforms. Fresh graduates without SQL data lakehouse experience cannot contribute to modern data teams without extensive retraining.',
      icon: Cloud,
      priority: 'Critical'
    },
    'Semantic Data Modeling (dbt)': {
      impact: 'dbt represents the industry standard for reproducible ELT transformations. Absence of version-controlled modular SQL produces severe engineering friction in enterprise deployments.',
      icon: Database,
      priority: 'Critical'
    },
    'Interactive KPI Storytelling': {
      impact: 'Modern business intelligence requires dynamic DAX parameters and user-centric dashboard storytelling rather than static report compilation.',
      icon: LayoutDashboard,
      priority: 'High'
    },
    'Prompt-Augmented Data Analytics': {
      impact: '62% of Hyderabad job postings evaluate candidate proficiency with AI tools for query generation and automated data exploration.',
      icon: Cpu,
      priority: 'High'
    }
  };

  const missingList = course.missingSkills || [];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="critical" className="font-mono text-[10px] uppercase">
            {missingList.length} Unmet Competencies
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <CardTitle>Priority Curricular Skill Gaps</CardTitle>
        </div>
        <CardDescription>
          Critical competencies required by employers currently absent (0% coverage) in the accredited course syllabus
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {missingList.map((skillName) => {
            const detail = isHero ? heroGapDetails[skillName] : null;
            const Icon = detail?.icon || Sparkles;

            return (
              <div
                key={skillName}
                className="p-3.5 rounded-xl border border-rose-500/25 bg-rose-500/5 hover:border-rose-500/40 transition-all flex flex-col justify-between space-y-2.5"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-md bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-white truncate">
                        {skillName}
                      </h4>
                    </div>
                    <Badge variant={detail?.priority === 'Critical' ? 'critical' : 'warning'} size="sm" className="text-[9px] uppercase shrink-0">
                      {detail?.priority || 'Critical Deficit'}
                    </Badge>
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed mt-2">
                    {detail?.impact || 'This competency represents an essential industrial prerequisite completely omitted from collegiate learning outcomes.'}
                  </p>
                </div>

                <div className="pt-2 border-t border-rose-900/30 flex items-center justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">Collegiate Syllabus Coverage:</span>
                  <span className="font-mono text-rose-400 font-bold">0% (Completely Absent)</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
