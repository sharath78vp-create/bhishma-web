import type { FC } from 'react';
import { MapPin, Cpu, UserCheck } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import {
  OverviewKPIs,
  DemandTrendSection,
  RegionalIntelligenceSection,
  SkillSignalsSection,
  CurriculumAlignmentSection,
  PriorityActionSection,
  EarlyWarningSection,
  DecisionFlowSection,
  DataProvenanceFooter
} from './overview/index';

export const Overview: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header with Prototype Badge & Hero Context Selectors */}
      <PageHeader
        title="Labour Market Intelligence"
        description="Labour Market → Skill Gap → Curriculum → Policy Decision Intelligence System. Bridging workforce demand signals with collegiate curriculum modernization."
        badge="PROTOTYPE &bull; SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/70 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Region:</span>
              <span className="font-semibold text-white">Telangana</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/70 text-xs shadow-sm">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-slate-400">Sector:</span>
              <span className="font-semibold text-white">AI &amp; Data</span>
            </div>
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-700/70 text-xs shadow-sm">
              <UserCheck className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-slate-400">Focus Role:</span>
              <span className="font-semibold text-white">Data Analyst</span>
            </div>
          </div>
        }
      />

      {/* 2. Executive KPI Strip (5 StatCards computed from mock data) */}
      <section aria-label="Executive KPI Overview">
        <OverviewKPIs />
      </section>

      {/* 3. Market Demand Trend (12-month Recharts trajectory + analytical insight) */}
      <section aria-label="Labour Demand Trajectory">
        <DemandTrendSection />
      </section>

      {/* 4. Regional Demand-Capacity Intelligence (Geospatial Deficit Map + Regional Ranking Table) */}
      <section aria-label="Regional Demand and Capacity Intelligence">
        <RegionalIntelligenceSection />
      </section>

      {/* 5. Skill Movement & Curriculum Alignment Dual Analytical Stream */}
      <section aria-label="Skill Signals and Curriculum Alignment">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillSignalsSection />
          <CurriculumAlignmentSection />
        </div>
      </section>

      {/* 6. Priority Policy Action (Hero POL-304 Telangana Modern Data Analytics Initiative) */}
      <section aria-label="Priority Policy Action">
        <PriorityActionSection />
      </section>

      {/* 7. Early Warnings & Decision Intelligence Flow */}
      <section aria-label="Early Warnings and Decision Intelligence Flow">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-5 flex flex-col">
            <EarlyWarningSection />
          </div>
          <div className="lg:col-span-7 flex flex-col">
            <DecisionFlowSection />
          </div>
        </div>
      </section>

      {/* 8. Data Provenance and Trust Footer */}
      <DataProvenanceFooter />
    </div>
  );
};
