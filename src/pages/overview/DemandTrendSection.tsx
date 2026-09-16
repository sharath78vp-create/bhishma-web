import type { FC } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { ArrowUpRight, TrendingUp, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ChartContainer } from '../../components/charts/ChartContainer';
import { mockMonthlyTrends } from '../../mock';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomChartTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-700/80 bg-slate-900/95 p-3 shadow-xl backdrop-blur-md text-xs font-sans">
        <p className="font-bold text-slate-200 mb-1.5 border-b border-slate-800 pb-1">{label}</p>
        <div className="space-y-1">
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5 text-slate-400 text-[11px]">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                {entry.name}:
              </span>
              <span className="font-mono font-bold text-white tabular-nums">
                {entry.value.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const DemandTrendSection: FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 12-Month Recharts Demand Line Chart */}
      <div className="lg:col-span-8">
        <ChartContainer
          title="Labour Demand Trajectory (12-Month Telemetry)"
          description="Comparative active posting volumes across national aggregate, AI & Data sector, and Data Analyst roles"
          height={320}
          footerNote="Source: BHISHMA Ingestion Pipeline • Aggregated from Naukri, LinkedIn, and corporate portals"
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockMonthlyTrends} margin={{ top: 10, right: 15, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27303A" vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                axisLine={{ stroke: '#27303A' }}
                tickLine={false}
              />
              <YAxis
                stroke="#4B5563"
                tick={{ fill: '#9CA3AF', fontSize: 11 }}
                axisLine={{ stroke: '#27303A' }}
                tickLine={false}
                tickFormatter={(val: number) => `${(val / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomChartTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '10px', fontSize: '11px' }}
                formatter={(value: string) => <span className="text-slate-300 mr-3">{value}</span>}
              />
              <Line
                type="monotone"
                dataKey="jobDemand"
                name="National Aggregate"
                stroke="#94a3b8"
                strokeWidth={1.5}
                strokeDasharray="4 4"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="aiDataDemand"
                name="AI & Data Sector"
                stroke="#6366f1"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#6366f1' }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="dataAnalystDemand"
                name="Data Analyst Roles (Hero)"
                stroke="#06b6d4"
                strokeWidth={2.5}
                dot={{ r: 3, fill: '#06b6d4' }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Analytical Callout & Trend Insight Panel */}
      <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-xl border border-slate-800 bg-slate-900/90 shadow-sm space-y-4">
        <div>
          <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Demand Momentum Diagnosis
            </h3>
          </div>

          <div className="mt-3.5 space-y-3 text-xs leading-relaxed text-slate-300">
            <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">
              <span className="font-bold text-white block mb-0.5">Surging AI & Data Postings</span>
              AI & Data sector postings surged from <strong className="text-white">22.1K</strong> in Oct 2025 to{' '}
              <strong className="text-white">36.2K</strong> in Sep 2026 (+63.8%), making it the fastest-growing vertical in the national telemetry pool.
            </div>

            <p className="text-slate-400">
              Within this vertical, <strong className="text-slate-200">Data Analyst & Analytics Engineer</strong> requisitions rose from 9.1K to 16.2K (+78.0%), driven by enterprise analytics modernisation and generative reporting adoption.
            </p>

            <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-400">
              <Info className="w-3.5 h-3.5 text-brand-400 shrink-0 mt-0.5" />
              <span>
                Hiring velocity index reached <strong className="text-white">93/100</strong>, indicating urgent recruitment turnarounds and severe talent scarcity in metropolitan clusters.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-slate-800">
          <Link
            to="/labour-market"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-400 hover:text-brand-300 transition-colors"
          >
            <span>Inspect complete labour market breakdown</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};
