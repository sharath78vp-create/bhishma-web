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
import { mockSkillDemandTrajectories } from '../../mock';

export const SkillDemandTrajectory: FC = () => {
  return (
    <ChartContainer
      title="Skill Demand Trajectory (12-Month Momentum)"
      subtitle="Comparative requisition trajectory tracking high-growth modern analytics competencies against legacy manual testing"
      height={360}
      legend={
        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-400 inline-block" />
            <span className="text-slate-300 font-medium">Advanced SQL &amp; dbt</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-400 inline-block" />
            <span className="text-slate-300 font-medium">GenAI Prompt Analytics</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-cyan-400 inline-block" />
            <span className="text-slate-300 font-medium">Power BI / Tableau</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-rose-500 stroke-dashed inline-block" />
            <span className="text-rose-400 font-medium">Legacy Manual QA</span>
          </div>
        </div>
      }
      footerNote={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>
              GenAI Analytics surged from index 32 to 95 (+196.8%), while Manual QA contracted from 64 to 24 (-62.5%)
            </span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">Telemetry: Oct 2025 – Sep 2026</span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={mockSkillDemandTrajectories}
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
            domain={[0, 100]}
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={{ stroke: '#27303A' }}
          />
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3 shadow-xl backdrop-blur-md min-w-[210px]">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-1 mb-2">
                      <span className="font-mono text-xs font-bold text-white">{label}</span>
                      <span className="text-[10px] text-slate-400">Demand Index</span>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-indigo-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-indigo-400" />
                          SQL &amp; dbt:
                        </span>
                        <strong className="font-mono">{payload.find((p) => p.dataKey === 'sqlAndDbt')?.value}/100</strong>
                      </div>

                      <div className="flex items-center justify-between text-amber-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" />
                          GenAI Analytics:
                        </span>
                        <strong className="font-mono">{payload.find((p) => p.dataKey === 'genAiAnalytics')?.value}/100</strong>
                      </div>

                      <div className="flex items-center justify-between text-cyan-300">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-cyan-400" />
                          Power BI / Tableau:
                        </span>
                        <strong className="font-mono">{payload.find((p) => p.dataKey === 'powerBiAndTableau')?.value}/100</strong>
                      </div>

                      <div className="flex items-center justify-between text-rose-400 pt-1 border-t border-slate-800/80">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-500" />
                          Legacy Manual QA:
                        </span>
                        <strong className="font-mono">{payload.find((p) => p.dataKey === 'legacyQa')?.value}/100</strong>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="sqlAndDbt"
            name="Advanced SQL & dbt"
            stroke="#818cf8"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#818cf8' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="genAiAnalytics"
            name="GenAI Prompt Analytics"
            stroke="#fbbf24"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#fbbf24' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="powerBiAndTableau"
            name="Power BI / Tableau"
            stroke="#22d3ee"
            strokeWidth={2}
            dot={{ r: 3, fill: '#22d3ee' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="legacyQa"
            name="Legacy Manual QA"
            stroke="#f43f5e"
            strokeWidth={2}
            strokeDasharray="4 4"
            dot={{ r: 3, fill: '#f43f5e' }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
