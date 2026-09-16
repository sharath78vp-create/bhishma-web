import { useState } from 'react';
import type { FC } from 'react';
import { Sparkles, MapPin, Cpu } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import {
  SkillKPIs,
  SkillMovementOverview,
  SkillDemandTrajectory,
  SkillGapRanking,
  SkillTaxonomyTable,
  HeroSkillDrilldown,
  SkillEvolutionMatrix,
  EmergingSkillSignal,
  SkillIntelligencePipeline,
  SkillPolicySignal
} from './skills/index';
import { mockSkills } from '../mock';
import type { SkillMetric } from '../types';

export const SkillIntelligence: FC = () => {
  // Hero skill default: SK-07 (Advanced SQL & Analytics Engineering (dbt))
  const defaultSkill = mockSkills.find((s) => s.id === 'SK-07') || mockSkills[0];
  const [selectedSkill, setSelectedSkill] = useState<SkillMetric>(defaultSkill);

  const handleSelectSkill = (skill: SkillMetric) => {
    setSelectedSkill(skill);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header with Hero Context & Preset Filters */}
      <PageHeader
        title="Skill Intelligence"
        description="Track emerging capabilities, demand trajectories and critical workforce skill shortages."
        badge="PROTOTYPE &bull; SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Context:</span>
              <span className="font-semibold text-white">National &rarr; Telangana &rarr; AI &amp; Data</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Role Focus:</span>
              <span className="font-semibold text-white">Data Analyst</span>
            </div>
            {selectedSkill.id === 'SK-07' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hero Skill Active</span>
              </div>
            )}
          </div>
        }
      />

      {/* 2. Skill Intelligence KPI Strip */}
      <section aria-label="Skill Intelligence Key Performance Indicators">
        <SkillKPIs />
      </section>

      {/* 3. Skill Market Movement Distribution Architecture */}
      <section aria-label="Skill Market Movement Overview">
        <SkillMovementOverview
          onSelectSkill={handleSelectSkill}
          selectedSkillId={selectedSkill.id}
        />
      </section>

      {/* 4. Trajectory vs Hero Skill Drilldown (Split 7 / 5 Grid) */}
      <section aria-label="Skill Demand Trajectory and Drilldown">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Recharts 12-Month Line Chart (7 cols) */}
          <div className="lg:col-span-7">
            <SkillDemandTrajectory />
          </div>

          {/* Right: Selected Skill / Hero Drilldown (5 cols) */}
          <div className="lg:col-span-5">
            <HeroSkillDrilldown skill={selectedSkill} />
          </div>
        </div>
      </section>

      {/* 5. Critical Skill Gap Disparities (Dual Progress Bar Analysis) */}
      <section aria-label="Critical Skill Gaps">
        <SkillGapRanking
          onSelectSkill={handleSelectSkill}
          selectedSkillId={selectedSkill.id}
        />
      </section>

      {/* 6. Skill Evolution & Velocity Matrix (4-Quadrant Model) */}
      <section aria-label="Skill Evolution Matrix">
        <SkillEvolutionMatrix
          onSelectSkill={handleSelectSkill}
          selectedSkillId={selectedSkill.id}
        />
      </section>

      {/* 7. Standardized National Skill Taxonomy Table (All 14 Skills) */}
      <section aria-label="Skill Taxonomy Registry">
        <SkillTaxonomyTable
          onSelectSkill={handleSelectSkill}
          selectedSkillId={selectedSkill.id}
        />
      </section>

      {/* 8. Emerging Skill Radar Signal */}
      <section aria-label="Emerging Skill Signal">
        <EmergingSkillSignal />
      </section>

      {/* 9. Methodology: How BHISHMA Derives Skill Intelligence */}
      <section aria-label="Skill Intelligence Architecture Pipeline">
        <SkillIntelligencePipeline />
      </section>

      {/* 10. Curricular Policy Nexus and Next Step CTA */}
      <section aria-label="Curriculum Policy Signal">
        <SkillPolicySignal />
      </section>
    </div>
  );
};
