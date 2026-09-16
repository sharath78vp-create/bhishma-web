import React, { useState } from 'react';
import type { FC } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import { Activity, Info, Sparkles, Filter } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface SkillMomentumChartProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}

const colorPalette: { [id: string]: { stroke: string; type: 'rising' | 'declining' | 'stable' } } = {
  'gen-ai': { stroke: '#ea580c', type: 'rising' }, // Orange
  'cloud-security': { stroke: '#0284c7', type: 'rising' }, // Sky Blue
  'data-engineering': { stroke: '#059669', type: 'rising' }, // Emerald
  'agentic-ai': { stroke: '#7c3aed', type: 'rising' }, // Purple
  'rust-systems': { stroke: '#d97706', type: 'rising' }, // Amber
  'legacy-manual-qa': { stroke: '#e11d48', type: 'declining' }, // Rose
  'static-web-scripting': { stroke: '#94a3b8', type: 'declining' } // Slate
};

export const SkillMomentumChart: FC<SkillMomentumChartProps> = ({
  skills,
  selectedSkillId,
  onSelectSkill
}) => {
  const [activeSkills, setActiveSkills] = useState<string[]>([
    'gen-ai',
    'cloud-security',
    'data-engineering',
    'agentic-ai',
    'legacy-manual-qa'
  ]);

  const toggleSkill = (id: string) => {
    setActiveSkills((prev) =>
      prev.includes(id) ? (prev.length > 1 ? prev.filter((s) => s !== id) : prev) : [...prev, id]
    );
  };

  // Construct unified monthly timeline
  const months = skills[0]?.monthlyMomentum.map((m) => m.month) || [];
  const chartData = months.map((m) => {
    const point: any = { month: m };
    skills.forEach((s) => {
      const monthObj = s.monthlyMomentum.find((mm) => mm.month === m);
      if (monthObj) {
        point[s.id] = monthObj.demand;
      }
    });
    return point;
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-900/95 text-white p-3.5 rounded-xl border border-slate-700 shadow-xl text-xs space-y-2 min-w-[220px] backdrop-blur-md">
          <p className="font-bold text-slate-300 border-b border-slate-700 pb-1 font-mono text-[11px]">
            Timeline: {label}
          </p>
          <div className="space-y-1">
            {payload.map((p: any) => {
              const skillObj = skills.find((s) => s.id === p.dataKey);
              if (!skillObj) return null;
              const isSelected = skillObj.id === selectedSkillId;
              return (
                <div
                  key={p.dataKey}
                  className={`flex items-center justify-between gap-2 p-1 rounded ${
                    isSelected ? 'bg-white/10 font-bold' : ''
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                    <span className="text-slate-200">{skillObj.name.split(' ')[0]}</span>
                  </div>
                  <strong className="text-white font-mono">{p.value}/100</strong>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header & Toggle Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-orange-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Skill Demand Momentum (12-Month Telemetry)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Normalized monthly demand index (0–100) tracking technology momentum and transition curves.
          </p>
        </div>

        {/* Legend Indicator */}
        <div className="flex items-center gap-3 text-xs font-semibold text-slate-600">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-emerald-500 inline-block" /> Rising (+20% YoY)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-0.5 bg-rose-500 inline-block" /> Declining (&lt;0% YoY)
          </span>
        </div>
      </div>

      {/* Skill Toggle Filter Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1">
          Toggle Lines:
        </span>
        {skills.map((s) => {
          const isToggled = activeSkills.includes(s.id);
          const palette = colorPalette[s.id] || { stroke: '#64748b', type: 'stable' };
          return (
            <button
              key={s.id}
              onClick={() => toggleSkill(s.id)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center gap-1.5 border ${
                isToggled
                  ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 opacity-60'
              }`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: palette.stroke }} />
              <span>{s.name.split(' ')[0]}</span>
              {s.growthYoY > 0 ? (
                <span className="text-[10px] text-emerald-400">+{s.growthYoY}%</span>
              ) : (
                <span className="text-[10px] text-rose-400">{s.growthYoY}%</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Multi-Line Chart Canvas */}
      <div className="h-[340px] sm:h-[380px] w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: '#64748b', fontSize: 11, fontWeight: 500 }}
              axisLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(v) => `${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            {skills.map((s) => {
              if (!activeSkills.includes(s.id)) return null;
              const palette = colorPalette[s.id] || { stroke: '#64748b', type: 'stable' };
              const isSelected = s.id === selectedSkillId;

              return (
                <Line
                  key={s.id}
                  type="monotone"
                  dataKey={s.id}
                  name={s.name}
                  stroke={palette.stroke}
                  strokeWidth={isSelected ? 3.5 : 2}
                  strokeDasharray={palette.type === 'declining' ? '4 4' : undefined}
                  dot={isSelected ? { r: 4, strokeWidth: 2 } : { r: 2 }}
                  activeDot={{ r: 6 }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Callout */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          <strong>Insight:</strong> Generative AI &amp; Agentic AI demonstrate highest acceleration (+48% to +64%), while Legacy QA exhibits continuous replacement.
        </span>
        <span className="font-mono text-slate-400">Observation Window: Oct 2025 – Sep 2026</span>
      </div>
    </div>
  );
};
