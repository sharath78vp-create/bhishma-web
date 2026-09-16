import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Award, Calendar, CheckCircle2, Users, Clock } from 'lucide-react';

const cohortAssessments = [
  {
    id: 'CASM-01',
    title: 'Semester 6 SQL & Database Architecture Exam',
    program: 'B.Tech Data Science & CSE',
    studentsCount: 320,
    scheduledDate: '18 Sep 2026',
    status: 'Upcoming',
    passCriteria: '75%'
  },
  {
    id: 'CASM-02',
    title: 'Cloud Infrastructure Practical Benchmark',
    program: 'B.Tech CSE & IT',
    studentsCount: 280,
    scheduledDate: '22 Sep 2026',
    status: 'Upcoming',
    passCriteria: '70%'
  },
  {
    id: 'CASM-03',
    title: 'Machine Learning Core Evaluation',
    program: 'B.Tech AI & Data Science',
    studentsCount: 240,
    scheduledDate: '10 Sep 2026',
    status: 'Completed',
    avgScore: '78.4%',
    passCriteria: '70%'
  },
  {
    id: 'CASM-04',
    title: 'Python Systems & OOP Certification',
    program: 'B.Tech 2nd Year',
    studentsCount: 450,
    scheduledDate: '28 Aug 2026',
    status: 'Completed',
    avgScore: '82.1%',
    passCriteria: '65%'
  }
];

export const InstituteAssessments: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Institutional Assessments
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor proctored tests, cohort score averages, and certification outcomes.
          </p>
        </div>
      </div>

      {/* Cohort Assessments Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Assessment Title</th>
                <th className="py-3 px-5">Target Program</th>
                <th className="py-3 px-5 text-center">Cohort Size</th>
                <th className="py-3 px-5 text-center">Date</th>
                <th className="py-3 px-5 text-center">Average Score</th>
                <th className="py-3 px-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {cohortAssessments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {a.title}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {a.program}
                  </td>
                  <td className="py-3.5 px-5 text-center tabular-nums">
                    {a.studentsCount} Students
                  </td>
                  <td className="py-3.5 px-5 text-center text-slate-500">
                    {a.scheduledDate}
                  </td>
                  <td className="py-3.5 px-5 text-center font-bold text-slate-900 tabular-nums">
                    {a.avgScore || 'Pending'}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge variant={a.status === 'Completed' ? 'success' : 'warning'} size="sm">
                      {a.status}
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
