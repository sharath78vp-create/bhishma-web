import React, { useState } from 'react';
import type { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { ArrowUpDown, Eye, TrendingUp } from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface StudentInterestVsDemandChartProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
  selectedSkillId?: string;
}

export const StudentInterestVsDemandChart: FC<StudentInterestVsDemandChartProps> = ({
  skills,
  onSelectSkill,
  selectedSkillId
}) => {
  const [localSort, setLocalSort] = useState<'demand' | 'gap' | 'interest'>('demand');

  const sortedSkills = [...skills].sort((a, b) => {
    if (localSort === 'demand') return b.industryDemand - a.industryDemand;
    if (localSort === 'gap') return b.demandSupplyGap - a.demandSupplyGap;
    if (localSort === 'interest') return b.studentInterest - a.studentInterest;
    return 0;
  });

  // Chart data format
  const chartData = sortedSkills.slice(0, 10).map((s) => ({
    raw: s,
    skill: s.skill.length > 22 ? `${s.skill.substring(0, 20)}...` : s.skill,
    fullSkill: s.skill,
    category: s.category,
    studentInterest: s.studentInterest,
    industryDemand: s.industryDemand,
    demandSupplyGap: s.demandSupplyGap,
    curriculumCoverage: s.curriculumCoverage
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const raw: SkillDemandIntelligenceItem = data.raw;
      const gap = raw.industryDemand - raw.studentInterest;
      const isMismatch = gap > 20;

      return (
        <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl text-xs space-y-2.5 min-w-[240px] z-50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <p className="font-bold text-slate-900 text-sm">{raw.skill}</p>
              <p className="text-[11px] text-slate-500">{raw.category}</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200">
              +{raw.yoyGrowth}% YoY
            </span>
          </div>

          <div className="space-y-1.5 font-medium">
            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block" />
                Industry Demand:
              </span>
              <strong className="text-slate-900 font-bold">{raw.industryDemand}%</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-indigo-400 inline-block" />
                Student Interest:
              </span>
              <strong className="text-slate-900 font-bold">{raw.studentInterest}%</strong>
            </div>

            <div className="flex items-center justify-between text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400 inline-block" />
                Curriculum Coverage:
              </span>
              <strong className="text-slate-900 font-bold">{raw.curriculumCoverage}%</strong>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-slate-500 font-semibold">Demand-Interest Gap:</span>
              <span
                className={`font-bold ${
                  gap > 25
                    ? 'text-rose-600'
                    : gap > 0
                    ? 'text-amber-600'
                    : 'text-emerald-600'
                }`}
              >
                {gap > 0 ? `+${gap}% Shortage` : `${gap}% Surplus`}
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 text-[10px] text-blue-600 font-semibold flex items-center gap-1">
            <Eye className="w-3 h-3" /> Click bar to inspect full intelligence profile
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Student Interest vs Industry Demand
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comparative analysis showing how student preference aligns against actual hiring requisitions.
          </p>
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <span className="text-[11px] text-slate-500 px-2 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" /> Sort:
          </span>
          <button
            onClick={() => setLocalSort('demand')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              localSort === 'demand'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Highest Demand
          </button>
          <button
            onClick={() => setLocalSort('gap')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              localSort === 'gap'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Largest Gap
          </button>
          <button
            onClick={() => setLocalSort('interest')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              localSort === 'interest'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Highest Student Interest
          </button>
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-[360px] sm:h-[400px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 35, bottom: 20 }}
            barCategoryGap="18%"
            barGap={4}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={true} vertical={true} />
            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              type="category"
              dataKey="skill"
              tick={{ fill: '#334155', fontSize: 11, fontWeight: 600 }}
              axisLine={{ stroke: '#cbd5e1' }}
              width={140}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ paddingBottom: '12px', fontSize: '11px', fontWeight: 600 }}
              formatter={(value) => (
                <span className="text-slate-700">
                  {value === 'industryDemand' ? 'Industry Demand (%)' : 'Student Interest (%)'}
                </span>
              )}
            />
            <Bar
              dataKey="industryDemand"
              name="industryDemand"
              fill="#2563eb"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(entry: any) => {
                const target = entry?.payload?.raw || entry?.raw;
                if (target) onSelectSkill(target);
              }}
            />
            <Bar
              dataKey="studentInterest"
              name="studentInterest"
              fill="#818cf8"
              radius={[0, 4, 4, 0]}
              cursor="pointer"
              onClick={(entry: any) => {
                const target = entry?.payload?.raw || entry?.raw;
                if (target) onSelectSkill(target);
              }}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Notes & Callouts */}
      <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-600" />
          <span>
            <strong>GenAI &amp; Cloud</strong> demonstrate highest corporate hiring pull with persistent collegiate supply bottlenecks.
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          Click any skill bar to view detailed institutional curriculum recommendations.
        </span>
      </div>
    </div>
  );
};
