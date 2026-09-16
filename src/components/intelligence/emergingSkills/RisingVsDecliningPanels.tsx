import React from 'react';
import type { FC } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface RisingVsDecliningPanelsProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}

export const RisingVsDecliningPanels: FC<RisingVsDecliningPanelsProps> = ({
  skills,
  selectedSkillId,
  onSelectSkill
}) => {
  const risingSkills = skills.filter((s) => s.trendType === 'rising');
  const decliningSkills = skills.filter((s) => s.trendType === 'declining');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      {/* LEFT: Skills Rising in Demand */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                <TrendingUp className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Skills Rising in Demand
                </h3>
                <p className="text-[11px] text-slate-500">
                  Competencies with sustained corporate hiring pull and expanding requisition volume.
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              +{risingSkills.length} Tracked
            </span>
          </div>

          <div className="space-y-2.5">
            {risingSkills.map((item) => {
              const isSelected = item.id === selectedSkillId;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSkill(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-orange-50/40 border-orange-300 ring-2 ring-orange-400/20 shadow-xs'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-xs font-extrabold text-emerald-700 bg-emerald-100/70 border border-emerald-200">
                        +{item.growthYoY}% YoY
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Telemetry Row */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current Demand:</span>
                      <strong className="text-slate-900 font-mono">{item.currentDemandIndex}/100</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Future Potential:</span>
                      <span className="text-purple-700 font-bold">{item.futurePotential}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Main Driver:</span>
                      <span className="text-slate-700 font-medium truncate block" title={item.mainDriver}>
                        {item.mainDriver.split(' ')[0]} {item.mainDriver.split(' ')[1]}...
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          Click any rising skill card to inspect driving factors and multi-year forecasts below.
        </div>
      </div>

      {/* RIGHT: Skills Losing Demand / Transition Risk */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4 flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
                <TrendingDown className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Skills Losing Demand
                </h3>
                <p className="text-[11px] text-slate-500">
                  Legacy or static competencies experiencing technology displacement and reduced hiring share.
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
              -{decliningSkills.length} Tracked
            </span>
          </div>

          <div className="space-y-2.5">
            {decliningSkills.map((item) => {
              const isSelected = item.id === selectedSkillId;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectSkill(item.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer group ${
                    isSelected
                      ? 'bg-rose-50/40 border-rose-300 ring-2 ring-rose-400/20 shadow-xs'
                      : 'bg-slate-50/50 hover:bg-slate-50 border-slate-200/80 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md text-xs font-extrabold text-rose-700 bg-rose-100/70 border border-rose-200">
                        {item.growthYoY}% YoY
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Telemetry Row */}
                  <div className="grid grid-cols-3 gap-2 text-[11px] pt-2 border-t border-slate-200/60 text-slate-600">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Current Demand:</span>
                      <strong className="text-slate-900 font-mono">{item.currentDemandIndex}/100</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Displacement Risk:</span>
                      <span className="text-rose-700 font-bold">{item.displacementRisk || 'High'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Possible Reason:</span>
                      <span className="text-slate-700 font-medium truncate block" title={item.possibleReason}>
                        {item.possibleReason || 'Automation / Migration'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400">
          Note: Declining signals reflect reduced relative hiring share, not immediate obsolescence.
        </div>
      </div>
    </div>
  );
};
