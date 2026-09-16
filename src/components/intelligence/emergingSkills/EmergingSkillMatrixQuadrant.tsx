import type { FC } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { Card } from '../../common/Card';
import { Grid } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface EmergingSkillMatrixQuadrantProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}

export const EmergingSkillMatrixQuadrant: FC<EmergingSkillMatrixQuadrantProps> = ({
  skills,
  onSelectSkill
}) => {
  // Map skills to scatter points
  const scatterData = skills.map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    currentDemand: s.currentDemandIndex,
    growthYoY: s.growthYoY,
    postings: s.activeJobPostings || 12000,
    trendType: s.trendType,
    raw: s
  }));

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-700">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Emerging Skill Strategic Matrix (Demand vs. Velocity Quadrant)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              2D classification of skills by Current Market Demand (X) vs. Annual Hiring Velocity (Y); bubble size represents active job postings
            </p>
          </div>
        </div>

        <span className="text-xs text-slate-500 font-semibold bg-slate-100 px-2.5 py-1 rounded-md">
          Quadrant Analysis
        </span>
      </div>

      {/* Quadrant Legend Headers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-3 text-[11px]">
        <div className="p-2.5 bg-purple-50/80 border border-purple-200 rounded-lg text-purple-950">
          <span className="font-extrabold uppercase text-[10px] text-purple-700 block mb-0.5">
            Top-Left: High-Velocity Emerging
          </span>
          <span>Low Current Base, Rapid Exponential Growth</span>
        </div>

        <div className="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-lg text-emerald-950">
          <span className="font-extrabold uppercase text-[10px] text-emerald-700 block mb-0.5">
            Top-Right: Strategic Transformers
          </span>
          <span>High Volume + High Acceleration</span>
        </div>

        <div className="p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-800">
          <span className="font-extrabold uppercase text-[10px] text-slate-600 block mb-0.5">
            Bottom-Left: Transition / Watch
          </span>
          <span>Lower Volume, Declining or Static Velocity</span>
        </div>

        <div className="p-2.5 bg-sky-50/80 border border-sky-200 rounded-lg text-sky-950">
          <span className="font-extrabold uppercase text-[10px] text-sky-700 block mb-0.5">
            Bottom-Right: Mature Foundations
          </span>
          <span>High Demand Base, Stable Steady Growth</span>
        </div>
      </div>

      {/* Interactive Scatter Chart */}
      <div className="h-80 w-full mt-2 relative">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              type="number"
              dataKey="currentDemand"
              name="Current Demand Index"
              domain={[0, 100]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: 'Current Demand Index (0 → 100)', position: 'insideBottom', offset: -10, fontSize: 11, fill: '#64748b' }}
            />
            <YAxis
              type="number"
              dataKey="growthYoY"
              name="YoY Hiring Velocity"
              domain={[-30, 60]}
              stroke="#64748b"
              fontSize={11}
              label={{ value: 'Annual Velocity Growth %', angle: -90, position: 'insideLeft', offset: 0, fontSize: 11, fill: '#64748b' }}
            />
            <ZAxis
              type="number"
              dataKey="postings"
              range={[120, 650]}
              name="Requisitions"
            />
            {/* Mid-point Reference Lines defining 4 quadrants */}
            <ReferenceLine x={50} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} />
            <ReferenceLine y={10} stroke="#cbd5e1" strokeDasharray="4 4" strokeWidth={1.5} />

            <Tooltip
              cursor={{ strokeDasharray: '3 3' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-slate-700 min-w-[210px]">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                        <span className="font-bold text-white text-sm">{data.name}</span>
                        <span className="text-[10px] text-slate-400">{data.category}</span>
                      </div>
                      <div className="space-y-1 pt-0.5 text-slate-300 text-[11px]">
                        <div className="flex justify-between">
                          <span>Current Demand Index:</span>
                          <span className="font-bold text-white">{data.currentDemand}/100</span>
                        </div>
                        <div className="flex justify-between">
                          <span>YoY Growth Velocity:</span>
                          <span className={`font-bold ${data.growthYoY >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {data.growthYoY >= 0 ? `+${data.growthYoY}%` : `${data.growthYoY}%`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Active Requisitions:</span>
                          <span className="font-bold text-indigo-300">{data.postings.toLocaleString()}</span>
                        </div>
                      </div>
                      <div className="pt-1 text-[10px] text-orange-400 font-semibold border-t border-slate-800">
                        Click bubble to select this skill
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />

            <Scatter
              data={scatterData}
              fill="#ea580c"
              onClick={(entry: any) => {
                const id = entry?.id || entry?.raw?.id;
                if (id) onSelectSkill(id);
              }}
              cursor="pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-center text-xs text-slate-500">
        💡 Click on any bubble to inspect full intelligence telemetry for that skill.
      </div>
    </Card>
  );
};
