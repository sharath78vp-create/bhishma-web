import { useState, useMemo } from 'react';
import type { FC } from 'react';
import {
  initialEmergingSkillsData,
  filterEmergingSkills,
  computeEmergingKpis,
  type EmergingSkillsFilterOptions,
  type EmergingSkillIntelligenceItem
} from '../../mock/emergingSkillsIntelligenceData';

// Sub-components for all 17 intelligence sections
import { EmergingSkillsHeader } from '../../components/intelligence/emergingSkills/EmergingSkillsHeader';
import { EmergingSkillsKpis } from '../../components/intelligence/emergingSkills/EmergingSkillsKpis';
import { SkillMomentumChart } from '../../components/intelligence/emergingSkills/SkillMomentumChart';
import { RisingVsDecliningPanels } from '../../components/intelligence/emergingSkills/RisingVsDecliningPanels';
import { WhySkillIsRisingPanel } from '../../components/intelligence/emergingSkills/WhySkillIsRisingPanel';
import { FutureImpactScenario } from '../../components/intelligence/emergingSkills/FutureImpactScenario';
import { FutureSkillForecastChart } from '../../components/intelligence/emergingSkills/FutureSkillForecastChart';
import { SkillEvolutionVisualizer } from '../../components/intelligence/emergingSkills/SkillEvolutionVisualizer';
import { IndustryDriversChart } from '../../components/intelligence/emergingSkills/IndustryDriversChart';
import { PotentialShortagesPanel } from '../../components/intelligence/emergingSkills/PotentialShortagesPanel';
import { CurriculumImpactAdvisory } from '../../components/intelligence/emergingSkills/CurriculumImpactAdvisory';
import { EarlyWarningSignalsTable } from '../../components/intelligence/emergingSkills/EarlyWarningSignalsTable';
import { EmergingSkillMatrixQuadrant } from '../../components/intelligence/emergingSkills/EmergingSkillMatrixQuadrant';
import { EmergingSkillsTable } from '../../components/intelligence/emergingSkills/EmergingSkillsTable';
import { DataSourcesConfidence } from '../../components/intelligence/emergingSkills/DataSourcesConfidence';
import { OfficerActionPanel } from '../../components/intelligence/emergingSkills/OfficerActionPanel';
import { CurriculumAdvisoryModal } from '../../components/intelligence/emergingSkills/CurriculumAdvisoryModal';

const defaultFilters: EmergingSkillsFilterOptions = {
  timeRange: '12m',
  industry: 'all',
  hub: 'all',
  educationLevel: 'all',
  skillCategory: 'all',
  experienceLevel: 'all',
  searchQuery: ''
};

export const EmergingSkills: FC = () => {
  const [filters, setFilters] = useState<EmergingSkillsFilterOptions>(defaultFilters);
  const [selectedSkillId, setSelectedSkillId] = useState<string>('gen-ai');
  const [isAdvisoryModalOpen, setIsAdvisoryModalOpen] = useState<boolean>(false);
  const [advisoryTargetSkill, setAdvisoryTargetSkill] = useState<EmergingSkillIntelligenceItem | null>(null);

  // Compute filtered dataset
  const filteredSkills = useMemo(() => {
    return filterEmergingSkills(initialEmergingSkillsData, filters);
  }, [filters]);

  // Selected skill instance
  const selectedSkill = useMemo(() => {
    return (
      initialEmergingSkillsData.find((s) => s.id === selectedSkillId) ||
      initialEmergingSkillsData[0]
    );
  }, [selectedSkillId]);

  // Calculated Overview KPIs
  const computedKpis = useMemo(() => {
    return computeEmergingKpis(filteredSkills);
  }, [filteredSkills]);

  // Handlers
  const handleSelectSkill = (id: string) => {
    setSelectedSkillId(id);
    const el = document.getElementById('skill-deep-dive-panel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectSkillByName = (name: string) => {
    const found = initialEmergingSkillsData.find(
      (s) => s.name.toLowerCase() === name.toLowerCase() || s.name.toLowerCase().includes(name.toLowerCase())
    );
    if (found) {
      handleSelectSkill(found.id);
    }
  };

  const handleOpenAdvisoryModal = (skill: EmergingSkillIntelligenceItem) => {
    setAdvisoryTargetSkill(skill);
    setIsAdvisoryModalOpen(true);
  };

  const handleOpenGeneralAdvisory = () => {
    setAdvisoryTargetSkill(selectedSkill);
    setIsAdvisoryModalOpen(true);
  };

  const handleFilterChange = <K extends keyof EmergingSkillsFilterOptions>(
    key: K,
    value: EmergingSkillsFilterOptions[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* SECTION 1: Page Header with Meta Indicators, Date Range & Compact Filters */}
      <EmergingSkillsHeader
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        kpis={computedKpis}
      />

      {/* SECTION 2: Emerging Skills Overview (KPIs) */}
      <EmergingSkillsKpis kpis={computedKpis} />

      {/* SECTION 3: Skill Demand Momentum Chart */}
      <SkillMomentumChart
        skills={filteredSkills.length > 0 ? filteredSkills : initialEmergingSkillsData}
        selectedSkillId={selectedSkillId}
        onSelectSkill={setSelectedSkillId}
      />

      {/* SECTION 4: Rising vs. Declining Skills Side-by-Side Comparison */}
      <RisingVsDecliningPanels
        skills={initialEmergingSkillsData}
        selectedSkillId={selectedSkillId}
        onSelectSkill={handleSelectSkill}
      />

      {/* SECTION 5: Why is the Skill Rising? (Deep-Dive Intelligence & Demand Signals) */}
      <div id="skill-deep-dive-panel">
        <WhySkillIsRisingPanel
          skill={selectedSkill}
        />
      </div>

      {/* SECTION 6: What Happens if Demand Continues? (Future Impact Scenarios) */}
      <FutureImpactScenario skill={selectedSkill} />

      {/* SECTION 7: Future Skill Demand Forecast (2024 - 2029 Autoregressive Projection) */}
      <FutureSkillForecastChart
        skills={initialEmergingSkillsData}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkillId}
      />

      {/* SECTION 8: Skill Evolution & Transition Pathways */}
      <SkillEvolutionVisualizer />

      {/* SECTION 9: Industry Drivers Breakdown */}
      <IndustryDriversChart
        skills={initialEmergingSkillsData}
        selectedSkill={selectedSkill}
        onSelectSkill={setSelectedSkillId}
      />

      {/* SECTION 11: Potential Future Skill Shortages (Supply vs. Demand Deficit) */}
      <PotentialShortagesPanel
        skills={initialEmergingSkillsData}
        onSelectSkill={handleSelectSkill}
      />

      {/* SECTION 12: Curriculum Impact Advisory (Officer Recommendations) */}
      <CurriculumImpactAdvisory
        skills={initialEmergingSkillsData}
        onOpenAdvisoryModal={handleOpenAdvisoryModal}
      />

      {/* SECTION 13: Emerging Skill Early-Warning Radar Signals */}
      <EarlyWarningSignalsTable
        onSelectSkillByName={handleSelectSkillByName}
      />

      {/* SECTION 14: Emerging Skill Strategic Matrix (2D Demand vs. Velocity Quadrant) */}
      <EmergingSkillMatrixQuadrant
        skills={initialEmergingSkillsData}
        selectedSkillId={selectedSkillId}
        onSelectSkill={handleSelectSkill}
      />

      {/* SECTION 15: Comprehensive Emerging Skills Intelligence Table */}
      <EmergingSkillsTable
        skills={filteredSkills}
        selectedSkillId={selectedSkillId}
        onSelectSkill={handleSelectSkill}
      />

      {/* SECTION 16: Data Sources & Telemetry Confidence Validation */}
      <DataSourcesConfidence selectedSkill={selectedSkill} />

      {/* SECTION 17: Officer Intelligence Brief & Strategic Recommendations */}
      <OfficerActionPanel
        onOpenAdvisoryModalForGeneral={handleOpenGeneralAdvisory}
      />

      {/* Advisory Detail Modal (Consultative Decision Support) */}
      <CurriculumAdvisoryModal
        isOpen={isAdvisoryModalOpen}
        onClose={() => setIsAdvisoryModalOpen(false)}
        skill={advisoryTargetSkill}
      />
    </div>
  );
};
