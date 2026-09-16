import React from 'react';
import type { FC } from 'react';
import { Zap, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface EmergingDemandSignalsProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
}

export const EmergingDemandSignals: FC<EmergingDemandSignalsProps> = ({
  skills,
  onSelectSkill
}) => {
  // Sort by highest YoY growth rate
  const fastGrowing = [...skills]
    .filter((s) => s.yoyGrowth > 20)
    .sort((a, b) => b.yoyGrowth - a.yoyGrowth);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Emerging Demand Signals
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Forward-looking velocity telemetry tracking technologies with rapid annual demand acceleration.
          </p>
        </div>

        <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
          <Activity className="w-3.5 h-3.5 text-teal-600" />
          12-Month Momentum Sparklines
        </span>
      </div>

      {/* Grid of Rapidly Rising Skills */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {fastGrowing.slice(0, 5).map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => onSelectSkill(item)}
              className="p-3.5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Skill & Momentum Badge */}
                <div className="flex items-start justify-between gap-1 mb-1">
                  <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {item.skill}
                  </h4>
                  <span className="inline-flex items-center text-[11px] font-extrabold text-teal-700 bg-teal-50 px-1.5 py-0.5 rounded-md border border-teal-200 shrink-0">
                    +{item.yoyGrowth}%
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 block mb-2">
                  {item.category}
                </span>

                {/* Mini Sparkline Chart */}
                <div className="h-10 w-full my-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={item.monthlyTrend}>
                      <Line
                        type="monotone"
                        dataKey="demand"
                        stroke="#0d9488"
                        strokeWidth={2}
                        dot={false}
                        isAnimationActive={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Telemetry Info */}
              <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-500">
                <span>Demand: <strong className="text-slate-900">{item.industryDemand}%</strong></span>
                <span className="text-blue-600 font-semibold group-hover:translate-x-0.5 transition-transform flex items-center">
                  Details &rarr;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
