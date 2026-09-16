import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { mockPlacementMetrics } from '../../mock/skillBridgeData';
import { Briefcase, UserCheck, AlertCircle, Users, TrendingUp, Info } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

export const InstitutePlacements: FC = () => {
  const chartData = mockPlacementMetrics.nonPlacementReasons.map(r => ({
    name: r.reason,
    percentage: r.percentage,
    count: r.count
  }));

  const colors = ['#f43f5e', '#f59e0b', '#8b5cf6', '#3b82f6', '#64748b', '#94a3b8'];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Placement Outcomes &amp; Non-Placement Analysis
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Measure how many students get jobs vs. remain unemployed and diagnose root causes.
          </p>
        </div>
      </div>

      {/* 1. Placement Outcome Top Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Students Eligible"
          value={mockPlacementMetrics.totalEligible.toLocaleString()}
          subtitle="Final year engineering"
          icon={Users}
          change="Cohort 2026"
          changeType="neutral"
        />
        <StatCard
          title="Students Placed"
          value={mockPlacementMetrics.totalPlaced.toLocaleString()}
          subtitle="Offers confirmed"
          icon={UserCheck}
          change="+8.2% YoY"
          changeType="positive"
        />
        <StatCard
          title="Placement Rate"
          value={`${mockPlacementMetrics.placementRate}%`}
          subtitle="Target threshold: 80%"
          icon={TrendingUp}
          change="Above national avg"
          changeType="positive"
        />
        <StatCard
          title="Seeking Placement"
          value={mockPlacementMetrics.seekingPlacement.toLocaleString()}
          subtitle="Unplaced students"
          icon={AlertCircle}
          change="Needs intervention"
          changeType="negative"
        />
      </div>

      {/* 2. Non-Placement Root Cause Analysis (Crucial Spec Requirement) */}
      <Card padding="lg">
        <CardHeader
          title="Non-Placement Root-Cause Analysis"
          subtitle="Why students are not getting placed — empirical breakdown across 1,312 unplaced graduates"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Recharts Horizontal Distribution Chart */}
          <div className="lg:col-span-6 h-64 w-full min-w-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 10, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" unit="%" tick={{ fontSize: 11, fill: '#64748B' }} domain={[0, 40]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#334155' }} width={120} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#FFFFFF', borderColor: '#E2E8F0', borderRadius: '0.5rem', fontSize: '12px' }}
                  formatter={(val: any, name: any, item: any) => [
                    `${val}% (${item.payload.count} students)`,
                    'Impact'
                  ]}
                />
                <Bar dataKey="percentage" radius={[0, 4, 4, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Right: Detailed Root Cause Explanation Cards */}
          <div className="lg:col-span-6 space-y-2.5 text-xs">
            {mockPlacementMetrics.nonPlacementReasons.map((item, idx) => (
              <div
                key={item.reason}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-start justify-between gap-3"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: colors[idx % colors.length] }}
                    />
                    <h4 className="font-bold text-slate-900">{item.reason}</h4>
                    <span className="text-[10px] text-slate-400">({item.count} students)</span>
                  </div>
                  <p className="text-slate-600 pl-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <span className="text-sm font-extrabold text-slate-800 tabular-nums shrink-0">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 3. Actionable Takeaway Banner */}
      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-5 h-5 text-purple-600 shrink-0" />
          <p className="text-purple-900 leading-relaxed">
            <strong>Key Insight:</strong> 56% of non-placements stem directly from technical skill gaps and communication deficits—both of which are resolved by curriculum modernization and practical co-op labs.
          </p>
        </div>
      </div>
    </div>
  );
};
