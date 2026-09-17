import React from 'react';
import type { FC } from 'react';
import {
  HelpCircle,
  TrendingUp,
  ArrowUpRight,
  Sparkles,
  Layers,
  Building2,
  GraduationCap,
  DollarSign,
  Briefcase,
  CheckCircle2
} from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface WhySkillIsRisingPanelProps {
  skill: EmergingSkillIntelligenceItem;
}

export const WhySkillIsRisingPanel: FC<WhySkillIsRisingPanelProps> = ({ skill }) => {
  const signalIcons = {
    jobPostings: Briefcase,
    industryAdoption: Building2,
    trainingDemand: GraduationCap,
    investment: Sparkles,
    salaryPremium: DollarSign
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-6">
      {/* Header: Skill Name & Overview Badges */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
              {skill.category}
            </span>
            <span className="text-xs font-semibold text-slate-500">
              Selected Skill Deep-Dive
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
            {skill.name}
          </h2>
          <p className="text-xs text-slate-500">
            Telemetry Evidence &amp; Empirical Growth Attribution Model
          </p>
        </div>

        {/* Current Demand & Growth Stats */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-center min-w-[100px]">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">
              Demand Index
            </span>
            <strong className="text-lg font-extrabold text-slate-900 block font-mono">
              {skill.currentDemandIndex}/100
            </strong>
          </div>

          <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-200 text-center min-w-[100px]">
            <span className="text-[10px] text-emerald-700 uppercase font-bold block">
              YoY Growth
            </span>
            <strong className="text-lg font-extrabold text-emerald-700 block font-mono">
              {skill.growthYoY > 0 ? `+${skill.growthYoY}%` : `${skill.growthYoY}%`}
            </strong>
          </div>

          <div className="bg-purple-50 p-2.5 rounded-xl border border-purple-200 text-center min-w-[100px]">
            <span className="text-[10px] text-purple-700 uppercase font-bold block">
              Future Potential
            </span>
            <strong className="text-base font-extrabold text-purple-700 block">
              {skill.futurePotential}
            </strong>
          </div>
        </div>
      </div>

      {/* TWO COLUMNS: DRIVERS (LEFT) vs DEMAND SIGNALS (RIGHT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Why is Demand Changing? (Drivers) */}
        <div className="lg:col-span-7 space-y-3.5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-orange-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Why is Demand {skill.growthYoY >= 0 ? 'Increasing' : 'Changing'}?
            </h3>
          </div>

          <div className="space-y-2.5">
            {skill.detailedDrivers.map((driver, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 space-y-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-700 text-xs font-bold flex items-center justify-center font-mono">
                      {idx + 1}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                      {driver.title}
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-semibold">
                    Attribution: {driver.impactScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {driver.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Demand Signals Telemetry */}
        <div className="lg:col-span-5 space-y-3.5">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-mono">
              Empirical Demand Signals
            </h3>
          </div>

          <div className="space-y-2">
            {Object.entries(skill.demandSignals).map(([key, sig]) => {
              const Icon = signalIcons[key as keyof typeof signalIcons] || Sparkles;
              return (
                <div
                  key={key}
                  className="p-3 rounded-xl border border-slate-200 bg-white shadow-2xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-100 text-slate-700">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs font-bold text-slate-800">
                        {sig.name}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        sig.direction === 'up'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {sig.change}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug pl-6">
                    {sig.evidence}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
