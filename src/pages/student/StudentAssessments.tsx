import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Award, Calendar, CheckCircle2, Clock, Play, TrendingUp } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const assessmentTrendData = [
  { test: 'Test 1 (Stats)', score: 82 },
  { test: 'Test 2 (Python)', score: 88 },
  { test: 'Test 3 (ML Core)', score: 76 },
  { test: 'Current Avg', score: 82 }
];

export const StudentAssessments: FC = () => {
  const { assessments, completeCloudAssessment } = useSkillBridge();

  const upcoming = assessments.filter(a => a.status === 'Upcoming');
  const completed = assessments.filter(a => a.status === 'Completed');

  const cloudUpcoming = upcoming.find(a => a.skill === 'Cloud Computing');

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Assessments &amp; Certifications
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Demonstrate verified skill proficiency through proctored evaluations.
          </p>
        </div>
      </div>

      {/* 1. Upcoming Assessments */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          Upcoming Assessments ({upcoming.length})
        </h2>

        {upcoming.length === 0 ? (
          <Card padding="md" className="text-center text-xs text-slate-500 py-6">
            All scheduled assessments completed.
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {upcoming.map((item) => {
              const isCloud = item.skill === 'Cloud Computing';

              return (
                <Card
                  key={item.id}
                  padding="md"
                  className={`flex flex-col justify-between space-y-4 border ${
                    isCloud ? 'border-brand-300 bg-brand-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-sm font-bold text-slate-900">
                        {item.title}
                      </h3>
                      <Badge variant={isCloud ? 'brand' : 'warning'} size="sm">
                        Upcoming
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Date: {item.date}</span>
                      </div>
                      <span>&bull;</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>Duration: {item.duration}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-500">{item.totalQuestions} Questions</span>

                    {/* Step 7 Demo Trigger: Complete Cloud Assessment */}
                    {isCloud ? (
                      <button
                        onClick={completeCloudAssessment}
                        className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Take Assessment (Demo)</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-400 text-xs font-medium cursor-not-allowed"
                      >
                        Scheduled
                      </button>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Past Assessments */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          Past Assessments ({completed.length})
        </h2>

        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-5">Assessment</th>
                  <th className="py-3 px-5">Skill Domain</th>
                  <th className="py-3 px-5">Completed Date</th>
                  <th className="py-3 px-5 text-center">Score</th>
                  <th className="py-3 px-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {completed.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-5 font-semibold text-slate-900">
                      {item.title}
                    </td>
                    <td className="py-3 px-5 text-slate-600">
                      {item.skill}
                    </td>
                    <td className="py-3 px-5 text-slate-500">
                      {item.date}
                    </td>
                    <td className="py-3 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold tabular-nums">
                        {item.score}%
                      </span>
                    </td>
                    <td className="py-3 px-5 text-right">
                      <Badge variant="success" size="sm">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Verified</span>
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* 3. Performance Trend Chart */}
      <Card padding="md">
        <CardHeader
          title="Performance Trend"
          subtitle="Score progression across consecutive technical assessments"
        />

        <div className="h-56 w-full min-w-0 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={assessmentTrendData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="test" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: '#64748B' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', fontSize: '12px' }}
                formatter={(val: any) => [`${val}%`, 'Score']}
              />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#2563eb"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2563eb' }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};
