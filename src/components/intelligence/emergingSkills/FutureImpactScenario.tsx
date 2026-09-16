import React, { useState } from 'react';
import type { FC } from 'react';
import {
  Compass,
  Users,
  GraduationCap,
  Building2,
  Calendar,
  Sparkles,
  Info
} from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface FutureImpactScenarioProps {
  skill: EmergingSkillIntelligenceItem;
}

export const FutureImpactScenario: FC<FutureImpactScenarioProps> = ({ skill }) => {
  const [selectedHorizon, setSelectedHorizon] = useState<'year1' | 'year3' | 'year5'>('year3');

  const horizonLabels = {
    year1: '1-Year Horizon (2027)',
    year3: '3-Year Horizon (2029)',
    year5: '5-Year Horizon (2031)'
  };

  const activeScenario = skill.futureImpact[selectedHorizon];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
      {/* Header & Horizon Stepper */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              If This Trend Continues (Scenario Modeling)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Projected workforce, education, and industry implications for <strong>{skill.name}</strong>.
          </p>
        </div>

        {/* Timeline Stepper Buttons */}
        <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold self-start sm:self-auto">
          {(['year1', 'year3', 'year5'] as const).map((h) => (
            <button
              key={h}
              onClick={() => setSelectedHorizon(h)}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                selectedHorizon === h
                  ? 'bg-indigo-600 text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {h === 'year1' ? '1 Year' : h === 'year3' ? '3 Years' : '5 Years'}
            </button>
          ))}
        </div>
      </div>

      {/* 3 Impact Scenario Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* 1. Workforce Impact */}
        <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/30 space-y-2.5">
          <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-wider font-mono">
            <Users className="w-4 h-4 text-blue-600" />
            <span>Workforce Impact</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {activeScenario.workforce}
          </p>
        </div>

        {/* 2. Education Impact */}
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/30 space-y-2.5">
          <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider font-mono">
            <GraduationCap className="w-4 h-4 text-emerald-600" />
            <span>Education &amp; Curriculum Impact</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {activeScenario.education}
          </p>
        </div>

        {/* 3. Industry Impact */}
        <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/30 space-y-2.5">
          <div className="flex items-center gap-2 text-purple-900 font-bold text-xs uppercase tracking-wider font-mono">
            <Building2 className="w-4 h-4 text-purple-600" />
            <span>Industry Structure Impact</span>
          </div>
          <p className="text-xs text-slate-800 leading-relaxed font-medium">
            {activeScenario.industry}
          </p>
        </div>
      </div>

      {/* Cautionary Guidance Note */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5 text-slate-600">
          <Info className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
          Scenarios model trajectory continuations based on current hiring rates. They serve as foresight advisories, not deterministic outcomes.
        </span>
        <span className="font-mono text-slate-400 font-semibold">{horizonLabels[selectedHorizon]}</span>
      </div>
    </div>
  );
};
