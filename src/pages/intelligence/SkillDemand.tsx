import React, { useState, useMemo } from 'react';
import type { FC } from 'react';
import {
  initialSkillDemandIntelligenceData,
  filterSkillDemandData,
  computeDashboardMetrics,
  type FilterOptions,
  type SkillDemandIntelligenceItem
} from '../../mock/skillDemandIntelligenceData';
import { SkillDemandHeader } from '../../components/intelligence/skillDemand/SkillDemandHeader';
import { SkillDemandKpis } from '../../components/intelligence/skillDemand/SkillDemandKpis';
import { StudentInterestVsDemandChart } from '../../components/intelligence/skillDemand/StudentInterestVsDemandChart';
import { SkillDemandHeatmap } from '../../components/intelligence/skillDemand/SkillDemandHeatmap';
import { CurriculumAlignmentSection } from '../../components/intelligence/skillDemand/CurriculumAlignmentSection';
import { StudentInterestScatterQuadrant } from '../../components/intelligence/skillDemand/StudentInterestScatterQuadrant';
import { SkillShortageWatchlist } from '../../components/intelligence/skillDemand/SkillShortageWatchlist';
import { EmergingDemandSignals } from '../../components/intelligence/skillDemand/EmergingDemandSignals';
import { SkillDemandInsightPanel } from '../../components/intelligence/skillDemand/SkillDemandInsightPanel';
import { SkillDetailModal } from '../../components/intelligence/skillDemand/SkillDetailModal';
import { SkillCompareModal } from '../../components/intelligence/skillDemand/SkillCompareModal';
import { Scale } from 'lucide-react';

export const SkillDemand: FC = () => {
  // -------------------------------------------------------------------------
  // 1. FILTER & VIEW STATES
  // -------------------------------------------------------------------------
  const [filters, setFilters] = useState<FilterOptions>({
    timePeriod: '12m',
    industry: 'all',
    skillCategory: 'all',
    region: 'all',
    institutionType: 'all',
    searchQuery: '',
    sortBy: 'demand'
  });

  // -------------------------------------------------------------------------
  // 2. MODAL & INTERACTION STATES
  // -------------------------------------------------------------------------
  const [selectedSkill, setSelectedSkill] = useState<SkillDemandIntelligenceItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [compareList, setCompareList] = useState<SkillDemandIntelligenceItem[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // -------------------------------------------------------------------------
  // 3. COMPUTED DATA & METRICS
  // -------------------------------------------------------------------------
  const filteredSkills = useMemo(() => {
    return filterSkillDemandData(initialSkillDemandIntelligenceData, filters);
  }, [filters]);

  const dashboardMetrics = useMemo(() => {
    return computeDashboardMetrics(filteredSkills);
  }, [filteredSkills]);

  // -------------------------------------------------------------------------
  // 4. HANDLERS
  // -------------------------------------------------------------------------
  const handleFilterChange = <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      timePeriod: '12m',
      industry: 'all',
      skillCategory: 'all',
      region: 'all',
      institutionType: 'all',
      searchQuery: '',
      sortBy: 'demand'
    });
  };

  const handleOpenDetail = (skill: SkillDemandIntelligenceItem) => {
    setSelectedSkill(skill);
    setIsDetailModalOpen(true);
  };

  const handleToggleCompare = (skill: SkillDemandIntelligenceItem) => {
    setCompareList((prev) => {
      const exists = prev.some((s) => s.id === skill.id);
      if (exists) {
        return prev.filter((s) => s.id !== skill.id);
      }
      if (prev.length >= 3) {
        // Keep max 3 for clean side-by-side comparison
        return [...prev.slice(1), skill];
      }
      return [...prev, skill];
    });
  };

  const handleRemoveCompareSkill = (skillId: string) => {
    setCompareList((prev) => prev.filter((s) => s.id !== skillId));
  };

  const handleClearCompare = () => {
    setCompareList([]);
  };

  return (
    <div className="space-y-7 pb-16 animate-fade-in font-sans">
      {/* ====================================================================
          SECTION 1 — PAGE HEADER & FILTERS
      ==================================================================== */}
      <section aria-label="Skill Demand Header and Filters">
        <SkillDemandHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          totalSkillsCount={initialSkillDemandIntelligenceData.length}
          filteredCount={filteredSkills.length}
        />
      </section>

      {/* Floating Compare Tray Banner (Appears when items are queued for comparison) */}
      {compareList.length > 0 && (
        <div className="sticky top-4 z-40 bg-slate-900 text-white p-3 sm:p-4 rounded-2xl shadow-xl border border-slate-700 flex items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-400/30">
              <Scale className="w-4 h-4" />
            </span>
            <div className="text-xs">
              <span className="font-bold text-white">
                {compareList.length} Skills Selected for Comparison
              </span>
              <p className="text-slate-400 text-[11px]">
                {compareList.map((s) => s.skill).join(' vs. ')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={handleClearCompare}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition-colors"
              title="Clear compare tray"
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* ====================================================================
          SECTION 2 — KEY METRICS (5 KPI CARDS)
      ==================================================================== */}
      <section aria-label="Workforce Readiness Key Performance Indicators">
        <SkillDemandKpis metrics={dashboardMetrics} />
      </section>

      {/* ====================================================================
          SECTION 3 — MAIN VISUALIZATION: STUDENT INTEREST VS INDUSTRY DEMAND
      ==================================================================== */}
      <section aria-label="Student Interest vs Industry Demand Comparison">
        <StudentInterestVsDemandChart
          skills={filteredSkills}
          onSelectSkill={handleOpenDetail}
          selectedSkillId={selectedSkill?.id}
        />
      </section>

      {/* ====================================================================
          SECTION 4 — SKILL DEMAND & SUPPLY HEATMAP
      ==================================================================== */}
      <section aria-label="Cross-Dimensional Skill Heatmap Matrix">
        <SkillDemandHeatmap
          skills={filteredSkills}
          onSelectSkill={handleOpenDetail}
        />
      </section>

      {/* ====================================================================
          SECTION 5 — CURRICULUM VS INDUSTRY DEMAND (CURRICULUM ALIGNMENT)
      ==================================================================== */}
      <section aria-label="Curriculum Alignment and Coverage Diagnosis">
        <CurriculumAlignmentSection
          skills={filteredSkills}
          onSelectSkill={handleOpenDetail}
        />
      </section>

      {/* ====================================================================
          SECTION 6 — STUDENT INTEREST VS ACTUAL MARKET DEMAND (QUADRANT CHART)
      ==================================================================== */}
      <section aria-label="Workforce Quadrant Analysis Matrix">
        <StudentInterestScatterQuadrant
          skills={filteredSkills}
          onSelectSkill={handleOpenDetail}
        />
      </section>

      {/* ====================================================================
          SECTION 7 & 8 — SKILL SHORTAGE WATCHLIST & EMERGING DEMAND SIGNALS
      ==================================================================== */}
      <div className="space-y-6">
        {/* Section 7: Skill Shortage Watchlist */}
        <section aria-label="Skill Shortage Watchlist">
          <SkillShortageWatchlist
            skills={filteredSkills}
            onSelectSkill={handleOpenDetail}
          />
        </section>

        {/* Section 8: Emerging Demand Signals */}
        <section aria-label="Emerging Demand Signals and Momentum Trajectories">
          <EmergingDemandSignals
            skills={filteredSkills}
            onSelectSkill={handleOpenDetail}
          />
        </section>
      </div>

      {/* ====================================================================
          SECTION 9 — SKILL DEMAND INSIGHT PANEL (INTELLIGENT SUMMARY CARD)
      ==================================================================== */}
      <section aria-label="Dynamic Skill Demand Intelligence Synthesis">
        <SkillDemandInsightPanel
          metrics={dashboardMetrics}
          activeIndustry={filters.industry}
        />
      </section>

      {/* ====================================================================
          SECTION 11 — INTERACTION: SKILL DETAIL & COMPARISON MODALS
      ==================================================================== */}
      <SkillDetailModal
        skill={selectedSkill}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onAddToCompare={handleToggleCompare}
        isCompared={selectedSkill ? compareList.some((s) => s.id === selectedSkill.id) : false}
      />

      <SkillCompareModal
        skills={compareList}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveSkill={handleRemoveCompareSkill}
        onClearAll={handleClearCompare}
      />
    </div>
  );
};
export default SkillDemand;
