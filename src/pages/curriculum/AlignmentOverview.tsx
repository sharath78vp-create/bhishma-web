import type { FC } from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { mockCurriculumAudits } from '../../mock';
import type { CurriculumAudit } from '../../types';

interface AlignmentOverviewProps {
  onSelectCourse?: (course: CurriculumAudit) => void;
  selectedCourseId?: string;
}

export const AlignmentOverview: FC<AlignmentOverviewProps> = ({
  onSelectCourse,
  selectedCourseId = 'CURR-104'
}) => {
  // Sort from lowest alignment to highest
  const sortedAudits = [...mockCurriculumAudits].sort(
    (a, b) => a.alignmentScorePct - b.alignmentScorePct
  );

  const getStatusBadge = (
    pct: number
  ): { label: string; variant: BadgeVariant; barColor: string } => {
    if (pct < 50) {
      return { label: 'Critical Deficit', variant: 'critical', barColor: 'bg-rose-500' };
    }
    if (pct <= 60) {
      return { label: 'Needs Modernization', variant: 'warning', barColor: 'bg-amber-400' };
    }
    return { label: 'Moderate Alignment', variant: 'info', barColor: 'bg-cyan-400' };
  };

  return (
    <Card>
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-mono text-[10px]">
              8 Audited Syllabi
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-brand-400" />
          <CardTitle>Curriculum Alignment Spectrum</CardTitle>
        </div>
        <CardDescription>
          Ranked distribution of collegiate syllabi by industry alignment score (lowest to highest parity)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3">
        {/* Legend strip */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800 text-xs text-slate-400">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500 inline-block" /> Critical (&lt;50%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400 inline-block" /> Needs Update (50–60%)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400 inline-block" /> Moderate (&gt;60%)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Benchmark: 75% Target Parity</span>
        </div>

        {/* Horizontal Bars */}
        <div className="space-y-2.5 pt-1">
          {sortedAudits.map((course) => {
            const isSelected = course.id === selectedCourseId;
            const isHero = course.id === 'CURR-104';
            const status = getStatusBadge(course.alignmentScorePct);

            return (
              <div
                key={course.id}
                onClick={() => onSelectCourse?.(course)}
                className={`p-2.5 sm:p-3 rounded-lg border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 bg-slate-900 ring-1 ring-brand-500/40 shadow-sm'
                    : 'border-slate-800/80 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-xs font-bold text-brand-400 shrink-0">
                      {course.courseCode}
                    </span>
                    <span className="text-slate-600">&bull;</span>
                    <span className={`text-xs font-semibold truncate ${isSelected ? 'text-brand-300' : 'text-slate-200'}`}>
                      {course.courseName}
                    </span>
                    {isHero && (
                      <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 shrink-0">
                        HERO FOCUS
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-white">
                      {course.alignmentScorePct}%
                    </span>
                    <Badge variant={status.variant} size="sm" className="text-[9px] uppercase py-0">
                      {status.label}
                    </Badge>
                  </div>
                </div>

                {/* Bar */}
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden relative">
                  {/* 75% target line indicator */}
                  <div
                    style={{ left: '75%' }}
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-600 z-10"
                    title="Target 75% Parity"
                  />
                  <div
                    style={{ width: `${course.alignmentScorePct}%` }}
                    className={`h-full rounded-full transition-all ${status.barColor}`}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-1">
                  <span>{course.program} &bull; {course.institutionTier}</span>
                  <span className="font-mono">Relevance: {course.industryRelevanceScore}/100</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
