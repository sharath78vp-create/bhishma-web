import React from 'react';
import type { FC } from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import type { ComputedDashboardMetrics } from '../../../mock/skillDemandIntelligenceData';
import { generateDynamicDemandInsight } from '../../../mock/skillDemandIntelligenceData';

interface SkillDemandInsightPanelProps {
  metrics: ComputedDashboardMetrics;
  activeIndustry: string;
}

export const SkillDemandInsightPanel: FC<SkillDemandInsightPanelProps> = ({
  metrics,
  activeIndustry
}) => {
  const insight = generateDynamicDemandInsight(metrics, 'all', activeIndustry);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-2xl border border-indigo-900/50 text-white p-6 sm:p-7 shadow-xl space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-900/60 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            <Sparkles className="w-5 h-5 text-indigo-400" />
          </span>
          <div>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
              AI-GENERATED WORKFORCE INTELLIGENCE
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Key Demand Insight
            </h3>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30 self-start sm:self-auto">
          High Urgency Telemetry
        </span>
      </div>

      {/* Main Insight Narrative */}
      <div className="space-y-3">
        <p className="text-sm sm:text-base text-indigo-100 font-medium leading-relaxed max-w-4xl">
          "{insight.body}"
        </p>
      </div>

      {/* Key Metric Ratio Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Industry Demand
          </span>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-extrabold text-blue-400">
              {insight.demandMetric}%
            </strong>
            <span className="text-xs text-slate-400">Hiring Intensity</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            Collegiate Student Supply
          </span>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-extrabold text-emerald-400">
              {insight.supplyMetric}%
            </strong>
            <span className="text-xs text-slate-400">Active Pipeline</span>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-3.5 space-y-1">
          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
            Workforce Shortfall
          </span>
          <div className="flex items-baseline gap-2">
            <strong className="text-2xl font-extrabold text-rose-400">
              +{insight.gapMetric}%
            </strong>
            <span className="text-xs text-rose-300 font-medium">Acute Gap</span>
          </div>
        </div>
      </div>

      {/* Curriculum Action Signal */}
      <div className="p-4 rounded-xl bg-indigo-900/30 border border-indigo-700/40 flex items-start gap-3">
        <BookOpen className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs">
          <strong className="text-indigo-200 uppercase tracking-wider text-[10px] block font-mono">
            CURRICULUM ACTION SIGNAL
          </strong>
          <p className="text-indigo-100/90 leading-relaxed">
            {insight.curriculumSignal}
          </p>
        </div>
      </div>
    </div>
  );
};
