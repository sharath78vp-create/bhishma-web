import React from 'react';
import type { FC } from 'react';
import { Grid, Info, ChevronRight } from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface SkillDemandHeatmapProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
}

export const SkillDemandHeatmap: FC<SkillDemandHeatmapProps> = ({
  skills,
  onSelectSkill
}) => {

  // Heatmap intensity generator helper
  const getHeatStyle = (
    type: 'interest' | 'curriculum' | 'demand' | 'supply' | 'gap' | 'growth',
    val: number
  ) => {
    if (type === 'demand') {
      if (val >= 90) return { bg: 'bg-blue-600 text-white', label: 'VERY HIGH' };
      if (val >= 75) return { bg: 'bg-blue-500 text-white', label: 'HIGH' };
      if (val >= 50) return { bg: 'bg-blue-300 text-slate-900', label: 'MEDIUM' };
      return { bg: 'bg-blue-100 text-slate-700', label: 'LOW' };
    }

    if (type === 'interest') {
      if (val >= 75) return { bg: 'bg-indigo-600 text-white', label: 'HIGH' };
      if (val >= 50) return { bg: 'bg-indigo-400 text-white', label: 'MEDIUM' };
      if (val >= 30) return { bg: 'bg-indigo-200 text-slate-900', label: 'MODERATE' };
      return { bg: 'bg-indigo-50 text-slate-600', label: 'LOW' };
    }

    if (type === 'curriculum') {
      if (val >= 75) return { bg: 'bg-emerald-600 text-white', label: 'HIGH' };
      if (val >= 50) return { bg: 'bg-emerald-400 text-white', label: 'MEDIUM' };
      if (val >= 30) return { bg: 'bg-emerald-200 text-slate-900', label: 'LOW' };
      return { bg: 'bg-rose-200 text-rose-900', label: 'CRITICAL LOW' };
    }

    if (type === 'supply') {
      if (val >= 70) return { bg: 'bg-emerald-600 text-white', label: 'HIGH' };
      if (val >= 45) return { bg: 'bg-emerald-400 text-white', label: 'MEDIUM' };
      if (val >= 30) return { bg: 'bg-amber-200 text-amber-900', label: 'LOW' };
      return { bg: 'bg-rose-300 text-rose-950 font-bold', label: 'VERY LOW' };
    }

    if (type === 'gap') {
      if (val >= 50) return { bg: 'bg-rose-600 text-white font-bold', label: 'VERY HIGH GAP' };
      if (val >= 35) return { bg: 'bg-rose-500 text-white', label: 'HIGH GAP' };
      if (val >= 15) return { bg: 'bg-amber-400 text-slate-950', label: 'MODERATE GAP' };
      if (val >= 0) return { bg: 'bg-emerald-200 text-emerald-950', label: 'BALANCED' };
      return { bg: 'bg-purple-200 text-purple-950', label: 'SURPLUS' };
    }

    if (type === 'growth') {
      if (val >= 40) return { bg: 'bg-teal-600 text-white font-bold', label: 'VERY HIGH' };
      if (val >= 25) return { bg: 'bg-teal-500 text-white', label: 'HIGH' };
      if (val >= 10) return { bg: 'bg-teal-300 text-slate-950', label: 'MEDIUM' };
      return { bg: 'bg-slate-200 text-slate-700', label: 'CONTRACTING' };
    }

    return { bg: 'bg-slate-100 text-slate-700', label: 'N/A' };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Grid className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Skill Demand &amp; Supply Heatmap
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-dimensional matrix scoring student interest, curriculum depth, industry demand, and talent deficit.
          </p>
        </div>

        {/* Heat Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-600">
          <span className="text-slate-400 uppercase tracking-wider text-[10px]">Gap Intensity:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-rose-600 inline-block" />
            <span>Very High Gap</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-rose-500 inline-block" />
            <span>High Gap</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-amber-400 inline-block" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-emerald-300 inline-block" />
            <span>Balanced</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-xs bg-purple-200 inline-block" />
            <span>Surplus</span>
          </div>
        </div>
      </div>

      {/* Heatmap Matrix Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold text-slate-700 uppercase tracking-wider">
              <th className="py-3 px-4 rounded-l-xl">Skill Area</th>
              <th className="py-3 px-3 text-center">Student Interest</th>
              <th className="py-3 px-3 text-center">Curriculum Coverage</th>
              <th className="py-3 px-3 text-center">Industry Demand</th>
              <th className="py-3 px-3 text-center">Student Supply</th>
              <th className="py-3 px-3 text-center">Demand-Supply Gap</th>
              <th className="py-3 px-3 text-center rounded-r-xl">YoY Demand Growth</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {skills.map((item) => {
              const interest = getHeatStyle('interest', item.studentInterest);
              const curriculum = getHeatStyle('curriculum', item.curriculumCoverage);
              const demand = getHeatStyle('demand', item.industryDemand);
              const supply = getHeatStyle('supply', item.studentSupply);
              const gap = getHeatStyle('gap', item.demandSupplyGap);
              const growth = getHeatStyle('growth', item.yoyGrowth);

              return (
                <tr
                  key={item.id}
                  onClick={() => onSelectSkill(item)}
                  className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                >
                  {/* Skill & Category */}
                  <td className="py-3 px-4 font-bold text-slate-900 flex items-center justify-between gap-2">
                    <div>
                      <span className="group-hover:text-blue-600 transition-colors">
                        {item.skill}
                      </span>
                      <span className="block text-[10px] font-normal text-slate-500">
                        {item.category}
                      </span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </td>

                  {/* Student Interest */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${interest.bg}`}
                      title={`Student Interest: ${item.studentInterest}% (${interest.label})`}
                    >
                      <span className="block text-xs font-bold">{item.studentInterest}%</span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{interest.label}</span>
                    </div>
                  </td>

                  {/* Curriculum Coverage */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${curriculum.bg}`}
                      title={`Curriculum Coverage: ${item.curriculumCoverage}% (${curriculum.label})`}
                    >
                      <span className="block text-xs font-bold">{item.curriculumCoverage}%</span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{curriculum.label}</span>
                    </div>
                  </td>

                  {/* Industry Demand */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${demand.bg}`}
                      title={`Industry Demand: ${item.industryDemand}% (${demand.label})`}
                    >
                      <span className="block text-xs font-bold">{item.industryDemand}%</span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{demand.label}</span>
                    </div>
                  </td>

                  {/* Student Supply */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${supply.bg}`}
                      title={`Student Supply: ${item.studentSupply}% (${supply.label})`}
                    >
                      <span className="block text-xs font-bold">{item.studentSupply}%</span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{supply.label}</span>
                    </div>
                  </td>

                  {/* Demand-Supply Gap */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-bold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${gap.bg}`}
                      title={`Gap: ${item.demandSupplyGap}% (${gap.label})`}
                    >
                      <span className="block text-xs">
                        {item.demandSupplyGap > 0 ? `+${item.demandSupplyGap}%` : `${item.demandSupplyGap}%`}
                      </span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{gap.label}</span>
                    </div>
                  </td>

                  {/* YoY Demand Growth */}
                  <td className="py-2.5 px-3 text-center">
                    <div
                      className={`py-1.5 px-2 rounded-lg font-semibold text-[11px] shadow-2xs transition-transform group-hover:scale-95 ${growth.bg}`}
                      title={`YoY Growth: +${item.yoyGrowth}% (${growth.label})`}
                    >
                      <span className="block text-xs font-bold">
                        {item.yoyGrowth > 0 ? `+${item.yoyGrowth}%` : `${item.yoyGrowth}%`}
                      </span>
                      <span className="text-[9px] uppercase tracking-tight opacity-90">{growth.label}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Interactive Helper Footer */}
      <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1 text-slate-600 font-medium">
          <Info className="w-3.5 h-3.5 text-blue-500" />
          Click on any row to open the complete multi-source skill intelligence profile.
        </span>
        <span className="text-slate-400 font-mono">Telemetry: Q3 2026 Live Heat Scoring</span>
      </div>
    </div>
  );
};
