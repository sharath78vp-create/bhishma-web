import React from 'react';
import type { FC } from 'react';
import { ShieldAlert } from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface SkillShortageWatchlistProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
}

export const SkillShortageWatchlist: FC<SkillShortageWatchlistProps> = ({
  skills,
  onSelectSkill
}) => {
  // Filter for genuine shortages (demand > supply) and sort descending by gap
  const shortages = [...skills]
    .filter((s) => s.demandSupplyGap > 25)
    .sort((a, b) => b.demandSupplyGap - a.demandSupplyGap);

  const getSeverityBadge = (gap: number) => {
    if (gap >= 50) {
      return {
        label: 'Severe Shortage',
        bg: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-600'
      };
    }
    if (gap >= 35) {
      return {
        label: 'High Deficit',
        bg: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500'
      };
    }
    return {
      label: 'Moderate Deficit',
      bg: 'bg-blue-50 text-blue-700 border-blue-200',
      dot: 'bg-blue-500'
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Skill Shortage Watchlist
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Critical competencies where corporate hiring demand substantially outpaces collegiate student supply.
          </p>
        </div>

        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 self-start sm:self-auto">
          {shortages.length} Priority Deficits Monitored
        </span>
      </div>

      {/* Watchlist Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {shortages.slice(0, 4).map((item, index) => {
          const severity = getSeverityBadge(item.demandSupplyGap);
          return (
            <div
              key={item.id}
              onClick={() => onSelectSkill(item)}
              className="p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/80 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group flex flex-col justify-between"
            >
              <div className="space-y-2">
                {/* Header: Rank + Severity Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono font-bold text-slate-400">
                    #{index + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold border flex items-center gap-1 ${severity.bg}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${severity.dot}`} />
                    {severity.label}
                  </span>
                </div>

                {/* Skill Name */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.skill}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Telemetry Metrics Grid */}
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">Demand</span>
                    <strong className="text-blue-600 font-extrabold text-sm">
                      {item.industryDemand}%
                    </strong>
                  </div>
                  <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="text-[10px] text-slate-500 block">Supply</span>
                    <strong className="text-slate-800 font-extrabold text-sm">
                      {item.studentSupply}%
                    </strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] pt-1">
                  <span className="text-rose-600 font-bold">
                    Gap: +{item.demandSupplyGap}%
                  </span>
                  <span className="text-teal-600 font-bold">
                    +{item.yoyGrowth}% YoY
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
