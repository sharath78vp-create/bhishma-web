import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Target, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

const instituteSkillMatrix = [
  { skill: 'Cloud Computing (AWS/Docker)', studentAvg: 42, industryReq: 75, gap: 33, severity: 'danger' as const, studentsAffected: 1420 },
  { skill: 'Power BI & Visual DAX', studentAvg: 48, industryReq: 70, gap: 22, severity: 'warning' as const, studentsAffected: 980 },
  { skill: 'Interview Communication & Pitch', studentAvg: 61, industryReq: 80, gap: 19, severity: 'warning' as const, studentsAffected: 1100 },
  { skill: 'Machine Learning Deployment', studentAvg: 64, industryReq: 78, gap: 14, severity: 'neutral' as const, studentsAffected: 620 },
  { skill: 'Advanced SQL (Window/CTEs)', studentAvg: 72, industryReq: 85, gap: 13, severity: 'neutral' as const, studentsAffected: 480 },
  { skill: 'Python Core & Scripting', studentAvg: 85, industryReq: 88, gap: 3, severity: 'success' as const, studentsAffected: 120 }
];

export const InstituteSkillGaps: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Institutional Skill Gaps
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Cohort-level skill deficiencies diagnosed against national employer hiring benchmarks.
          </p>
        </div>
      </div>

      {/* Skill Gaps Matrix Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Competency Area</th>
                <th className="py-3 px-5 text-center">Student Avg</th>
                <th className="py-3 px-5 text-center">Industry Required</th>
                <th className="py-3 px-5 text-center">Deficit Score</th>
                <th className="py-3 px-5 text-center">Cohort Affected</th>
                <th className="py-3 px-5 text-right">Priority</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {instituteSkillMatrix.map((item) => (
                <tr key={item.skill} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {item.skill}
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-800 tabular-nums">
                    {item.studentAvg}%
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-800 tabular-nums">
                    {item.industryReq}%
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold tabular-nums ${
                      item.gap <= 5
                        ? 'bg-emerald-50 text-emerald-800'
                        : item.gap > 20
                        ? 'bg-rose-50 text-rose-800'
                        : 'bg-amber-50 text-amber-800'
                    }`}>
                      {item.gap}% Gap
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center text-slate-500 tabular-nums">
                    {item.studentsAffected} Students
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge variant={item.severity} size="sm">
                      {item.gap > 20 ? 'Critical' : item.gap > 10 ? 'Moderate' : 'Low'}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
