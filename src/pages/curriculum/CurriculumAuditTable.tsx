import type { FC } from 'react';
import { Table, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { mockCurriculumAudits } from '../../mock';
import type { CurriculumAudit } from '../../types';

interface CurriculumAuditTableProps {
  onSelectCourse?: (course: CurriculumAudit) => void;
  selectedCourseId?: string;
}

export const CurriculumAuditTable: FC<CurriculumAuditTableProps> = ({
  onSelectCourse,
  selectedCourseId = 'CURR-104'
}) => {
  const getStatusBadge = (
    pct: number
  ): { label: string; variant: BadgeVariant } => {
    if (pct < 50) return { label: 'Critical Deficit', variant: 'critical' };
    if (pct <= 60) return { label: 'Needs Update', variant: 'warning' };
    return { label: 'Moderate Match', variant: 'info' };
  };

  const columns: Column<CurriculumAudit>[] = [
    {
      key: 'courseCode',
      header: 'Course Code & Program',
      render: (item) => {
        const isSelected = item.id === selectedCourseId;
        const isHero = item.id === 'CURR-104';

        return (
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-mono text-xs font-bold ${isSelected ? 'text-brand-300' : 'text-white'}`}>
                {item.courseCode}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">({item.id})</span>
              {isHero && (
                <Badge variant="critical" size="sm" className="text-[9px] px-1 py-0 uppercase">
                  Hero
                </Badge>
              )}
            </div>
            <span className="text-[11px] text-slate-400 block truncate max-w-xs mt-0.5">
              {item.program}
            </span>
          </div>
        );
      }
    },
    {
      key: 'courseName',
      header: 'Course Title',
      render: (item) => {
        const isSelected = item.id === selectedCourseId;
        return (
          <span className={`text-xs font-semibold ${isSelected ? 'text-brand-300' : 'text-slate-200'}`}>
            {item.courseName}
          </span>
        );
      }
    },
    {
      key: 'institutionTier',
      header: 'Cluster Tier',
      render: (item) => (
        <span className="text-xs text-slate-300 font-medium">
          {item.institutionTier}
        </span>
      )
    },
    {
      key: 'alignmentScorePct',
      header: 'Alignment',
      align: 'right',
      render: (item) => (
        <span
          className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
            item.alignmentScorePct < 50
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              : item.alignmentScorePct <= 60
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
          }`}
        >
          {item.alignmentScorePct}%
        </span>
      )
    },
    {
      key: 'industryRelevanceScore',
      header: 'Relevance',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-300">
          {item.industryRelevanceScore}/100
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (item) => {
        const status = getStatusBadge(item.alignmentScorePct);
        return (
          <Badge variant={status.variant} size="sm" className="text-[10px] uppercase">
            {status.label}
          </Badge>
        );
      }
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px]">
            {mockCurriculumAudits.length} Syllabi Audited
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-brand-400" />
          <CardTitle>Collegiate Curriculum Audit Registry</CardTitle>
        </div>
        <CardDescription>
          Complete inventory of evaluated technical syllabi under AICTE Model Curriculum standards across Tier-2/3 institutions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <DataTable
          columns={columns}
          data={mockCurriculumAudits}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => onSelectCourse?.(item)}
          compact
          striped
        />
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-400" />
            Click any course row to inspect detailed syllabus coverage, missing modules, and drift telemetry
          </span>
          <span className="font-mono text-slate-500">8 Evaluated University Syllabi</span>
        </div>
      </CardContent>
    </Card>
  );
};
