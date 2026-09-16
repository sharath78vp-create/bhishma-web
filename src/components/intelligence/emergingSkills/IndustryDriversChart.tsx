import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Building2, PieChart, Briefcase } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface IndustryDriversChartProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkill: EmergingSkillIntelligenceItem;
  onSelectSkill: (skillId: string) => void;
}

export const IndustryDriversChart: FC<IndustryDriversChartProps> = ({
  skills,
  selectedSkill,
  onSelectSkill
}) => {
  const distribution = selectedSkill.industryDistribution || [];

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-50 text-amber-700">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Industries Driving Emerging Skill Demand
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Sectoral absorption analysis and enterprise requisition share for {selectedSkill.name}
            </p>
          </div>
        </div>

        {/* Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 hidden sm:inline">
            Skill Focus:
          </span>
          <select
            value={selectedSkill.id}
            onChange={(e) => onSelectSkill(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Horizontal Bars List */}
        <div className="lg:col-span-8 space-y-3.5">
          {distribution.map((item, idx) => {
            const colors = [
              'from-indigo-600 to-indigo-500',
              'from-emerald-600 to-emerald-500',
              'from-sky-600 to-sky-500',
              'from-amber-600 to-amber-500',
              'from-purple-600 to-purple-500',
              'from-rose-600 to-rose-500'
            ];
            const barColor = colors[idx % colors.length];

            return (
              <div key={item.industry} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-bold text-slate-800">{item.industry}</span>
                  </div>
                  <span className="font-extrabold text-slate-900">{item.sharePct}% share</span>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                  <div
                    className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-500`}
                    style={{ width: `${item.sharePct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Industry Concentration Summary */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 border-b border-slate-200 pb-2">
              <PieChart className="w-4 h-4 text-orange-500" />
              <span>Cross-Sector Spread</span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Primary Hiring Sector:</span>
                <span className="font-bold text-slate-900">{distribution[0]?.industry || 'IT Services'}</span>
              </div>
              <div className="flex justify-between">
                <span>Top Sector Concentration:</span>
                <span className="font-bold text-slate-900">{distribution[0]?.sharePct || 0}%</span>
              </div>
              <div className="flex justify-between">
                <span>Multi-Sector Adoption:</span>
                <span className="font-bold text-emerald-700">Broad ({distribution.length} Core Sectors)</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed pt-2 border-t border-slate-200">
              Demand for <strong className="text-slate-700">{selectedSkill.name}</strong> is expanding rapidly beyond pure technology providers into banking, healthcare, and retail ecosystems.
            </p>
          </div>

          <div className="mt-3 pt-2 text-[10px] text-slate-400">
            Source: Aggregated parsing of 185k+ job requisitions across sector portals.
          </div>
        </div>
      </div>
    </Card>
  );
};
