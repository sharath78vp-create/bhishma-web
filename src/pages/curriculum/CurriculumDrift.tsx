import type { FC } from 'react';
import { History, ArrowRight, Sparkles, FileWarning } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface CurriculumDriftProps {
  course: CurriculumAudit;
}

export const CurriculumDrift: FC<CurriculumDriftProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';

  // Specific modernization transitions for hero curriculum
  const heroDriftTransitions = [
    {
      legacyTopic: 'Static Excel 2007 Macros & VBA',
      status: 'Deprecated in 2013',
      modernAlternative: 'Modern Analytics Engineering with Power BI, DAX & Python',
      reason: 'VBA macros lack version control, reproducible data governance, and multi-user concurrency.'
    },
    {
      legacyTopic: 'SPSS Manual Syntax Scripting',
      status: 'Niche Statistical Legacy',
      modernAlternative: 'Exploratory Data Science with Python (Pandas/Polars) & Jupyter',
      reason: 'Modern analytics workflows mandate open-source data manipulation with containerized execution.'
    },
    {
      legacyTopic: 'Hierarchical FoxPro Database Forms',
      status: 'Obsolete Technology',
      modernAlternative: 'Distributed Cloud Data Lakes (Snowflake, BigQuery, Databricks)',
      reason: 'Legacy local databases cannot scale to terabyte-scale enterprise analytics.'
    },
    {
      legacyTopic: 'Waterfall Analytics Release Cycles',
      status: 'Anti-pattern in Cloud BI',
      modernAlternative: 'Agile Analytics & CI/CD dbt Semantic Data Modeling',
      reason: 'Data teams deploy automated continuous integration and testing for analytics code.'
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="warning" className="font-mono text-[10px] uppercase">
            {course.outdatedTopics.length} Obsolete Topics Identified
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-amber-400" />
          <CardTitle>Curriculum Drift &amp; Legacy Content Review</CardTitle>
        </div>
        <CardDescription>
          Identification of legacy syllabus content recommended for phase-out, contrasted against modern industry practices
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-amber-300/90 leading-relaxed flex items-center gap-2">
          <FileWarning className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            Institutional syllabus review: The modules below occupy up to 35% of collegiate lecture hours but provide zero hiring qualification in modern data enterprise roles.
          </span>
        </div>

        {isHero ? (
          <div className="space-y-2.5">
            {heroDriftTransitions.map((item) => (
              <div
                key={item.legacyTopic}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-3"
              >
                {/* Legacy Content */}
                <div className="md:w-5/12 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-300 line-through decoration-rose-500/70">
                      {item.legacyTopic}
                    </span>
                  </div>
                  <span className="text-[10px] text-rose-400 font-mono mt-0.5 block">
                    Status: {item.status}
                  </span>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">
                    {item.reason}
                  </p>
                </div>

                {/* Transition Arrow */}
                <div className="hidden md:flex items-center justify-center shrink-0">
                  <div className="p-1 rounded-full bg-slate-800 text-brand-400 border border-slate-700">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Modern Replacement Alternative */}
                <div className="md:w-6/12 min-w-0 p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
                    <Sparkles className="w-3 h-3 text-amber-400" />
                    <span>Recommended Modern Replacement</span>
                  </div>
                  <p className="text-xs text-slate-200 font-semibold mt-1">
                    {item.modernAlternative}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {course.outdatedTopics.map((topic, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-800 bg-slate-950/40 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span className="text-slate-300 font-medium line-through decoration-rose-500/60">{topic}</span>
                </div>
                <Badge variant="declining" size="sm" className="text-[10px]">
                  Slated for Deprecation
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
