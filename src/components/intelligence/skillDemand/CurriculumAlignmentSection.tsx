import React from 'react';
import type { FC } from 'react';
import {
  BookOpenCheck,
  AlertOctagon,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface CurriculumAlignmentSectionProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
}

export const CurriculumAlignmentSection: FC<CurriculumAlignmentSectionProps> = ({
  skills,
  onSelectSkill
}) => {
  // Sort by highest curriculum gap
  const sortedByCurriculumGap = [...skills].sort((a, b) => b.curriculumGap - a.curriculumGap);

  const getAttentionBadge = (attention: SkillDemandIntelligenceItem['curriculumAttention']) => {
    switch (attention) {
      case 'Critical':
        return {
          bg: 'bg-rose-50 text-rose-700 border-rose-200',
          icon: AlertOctagon,
          label: 'Critical Revision'
        };
      case 'High':
        return {
          bg: 'bg-amber-50 text-amber-700 border-amber-200',
          icon: AlertTriangle,
          label: 'High Priority'
        };
      case 'Moderate':
        return {
          bg: 'bg-blue-50 text-blue-700 border-blue-200',
          icon: TrendingUp,
          label: 'Moderate Align'
        };
      case 'Stable':
      default:
        return {
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
          icon: CheckCircle2,
          label: 'Stable & Aligned'
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpenCheck className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Curriculum Alignment
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Evaluating how well current university syllabi and college courses match real-time industry skill expectations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Institutional Recommendation Protocol Active</span>
        </div>
      </div>

      {/* Visual Comparison Progress Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedByCurriculumGap.slice(0, 8).map((item) => {
          const badge = getAttentionBadge(item.curriculumAttention);
          const BadgeIcon = badge.icon;
          const isLagging = item.curriculumGap > 20;

          return (
            <div
              key={item.id}
              onClick={() => onSelectSkill(item)}
              className="p-4 rounded-xl border border-slate-200/90 bg-white hover:bg-slate-50/70 hover:border-slate-300 transition-all cursor-pointer shadow-2xs group space-y-3"
            >
              {/* Top Row: Skill Name & Attention Badge */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {item.skill}
                  </h3>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {item.category}
                  </span>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg}`}
                >
                  <BadgeIcon className="w-3 h-3" />
                  {badge.label}
                </span>
              </div>

              {/* Dual Visual Progress Bars */}
              <div className="space-y-2 text-xs">
                {/* Curriculum Coverage Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      Current Curriculum Coverage:
                    </span>
                    <strong className="text-slate-900">{item.curriculumCoverage}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                      style={{ width: `${item.curriculumCoverage}%` }}
                    />
                  </div>
                </div>

                {/* Industry Demand Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-medium text-slate-600">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      Industry Demand:
                    </span>
                    <strong className="text-slate-900">{item.industryDemand}%</strong>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 rounded-full transition-all duration-500"
                      style={{ width: `${item.industryDemand}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Bottom Summary Pill */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500 font-medium">
                  Curriculum Gap:
                </span>
                <span
                  className={`font-bold ${
                    item.curriculumGap > 30
                      ? 'text-rose-600'
                      : item.curriculumGap > 0
                      ? 'text-amber-600'
                      : 'text-emerald-600'
                  }`}
                >
                  {item.curriculumGap > 0 ? `+${item.curriculumGap}% Deficit` : `${item.curriculumGap}% Covered`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Callout */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-600">
          Target: Achieve ≥75% Curriculum Coverage on all Very-High-Demand technologies before Semester 8.
        </span>
        <span className="text-[11px] text-blue-600 font-semibold flex items-center gap-1 cursor-pointer">
          Click any card to inspect curriculum adjustment recommendations <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};
