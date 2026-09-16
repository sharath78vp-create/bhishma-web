import type { FC } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import { ChartContainer } from '../../components/charts/ChartContainer';
import { mockMonthlyTrends } from '../../mock';

export const CurriculumTrajectory: FC = () => {
  return (
    <ChartContainer
      title="Monitored Curriculum Alignment Trend (12 Months)"
      subtitle="Aggregate syllabus parity index across monitored engineering institutions indicating progressive curricular lag"
      height={320}
      legend={
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500 inline-block" />
            <span className="text-slate-300 font-medium">Average Syllabus Alignment %</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-slate-600 stroke-dashed inline-block" />
            <span className="text-slate-400 font-medium">Target Baseline (75%)</span>
          </div>
        </div>
      }
      footerNote={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              Average collegiate alignment contracted from 56.2% (Oct 2025) to 49.2% (Sep 2026) due to static 3-year syllabus revision cycles
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Telemetry: Oct 2025 – Sep 2026</span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockMonthlyTrends}
          margin={{ top: 15, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27303A" vertical={false} />
          <XAxis
            dataKey="month"
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={{ stroke: '#27303A' }}
          />
          <YAxis
            domain={[40, 80]}
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={{ stroke: '#27303A' }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                const val = payload[0].value;
                return (
                  <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3 shadow-xl backdrop-blur-md min-w-[200px]">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
                      <span className="font-mono text-xs font-bold text-white">{label}</span>
                      <span className="text-[10px] text-slate-400">Aggregate Parity</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        Alignment Avg:
                      </span>
                      <strong className="font-mono text-rose-400 font-bold">{val}%</strong>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-800">
                      Gap against 75% target: <strong className="text-rose-400">{(75 - Number(val)).toFixed(1)}% deficit</strong>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="curriculumAlignmentAvg"
            name="Curriculum Alignment Avg"
            stroke="#f43f5e"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#f43f5e' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
