import React from 'react';
import type { FC } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  Calendar,
  Briefcase,
  Layers,
  GraduationCap,
  Users,
  TrendingUp,
  TrendingDown,
  Clock,
  RotateCcw
} from 'lucide-react';
import {
  emergingIndustryOptions,
  emergingCategoryOptions,
  educationLevelOptions,
  experienceLevelOptions,
  type EmergingSkillsFilterOptions,
  type ComputedEmergingKpis
} from '../../../mock/emergingSkillsIntelligenceData';

interface EmergingSkillsHeaderProps {
  filters: EmergingSkillsFilterOptions;
  onFilterChange: <K extends keyof EmergingSkillsFilterOptions>(key: K, value: EmergingSkillsFilterOptions[K]) => void;
  onResetFilters: () => void;
  kpis: ComputedEmergingKpis;
}

export const EmergingSkillsHeader: FC<EmergingSkillsHeaderProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  kpis
}) => {
  const isFiltered =
    filters.industry !== 'all' ||
    filters.hub !== 'all' ||
    filters.skillCategory !== 'all' ||
    filters.educationLevel !== 'all' ||
    filters.experienceLevel !== 'all' ||
    filters.timeRange !== '12m' ||
    filters.searchQuery !== '';

  return (
    <div className="space-y-4">
      {/* Top Banner: Title & Metadata Pills */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm ring-1 ring-orange-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Emerging Skills Intelligence
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-orange-50 text-orange-700 border border-orange-200">
              Strategic Radar
            </span>
          </div>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Monitor fast-changing skill demand, identify future workforce needs, and understand the factors driving skill transitions.
          </p>

          {/* Telemetry Metadata Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-semibold border border-slate-200">
              <strong>{kpis.totalMonitored}</strong> Skills Monitored
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +{kpis.risingSkillsCount} Rising
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 font-semibold border border-rose-200 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> -{kpis.decliningSkillsCount} Declining
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-700 font-semibold border border-purple-200">
              <strong>{kpis.highFuturePotentialCount}</strong> High Future Potential
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-500 font-mono text-[11px] border border-slate-200 flex items-center gap-1">
              <Clock className="w-3 h-3 text-slate-400" /> Live Telemetry &bull; Sep 2026
            </span>
          </div>
        </div>

        {/* Global Search & Time Range Selector */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              placeholder="Search emerging skills, drivers..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 shadow-2xs"
            />
          </div>

          {/* Time Range Selector */}
          <div className="inline-flex rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-semibold shrink-0">
            {(['6m', '12m', '24m', 'custom'] as const).map((range) => {
              const labels = {
                '6m': '6 Months',
                '12m': '12 Months',
                '24m': '24 Months',
                'custom': 'Custom'
              };
              return (
                <button
                  key={range}
                  onClick={() => onFilterChange('timeRange', range)}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    filters.timeRange === range
                      ? 'bg-white text-slate-900 shadow-2xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {labels[range]}
                </button>
              );
            })}
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Compact Filters Row */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-semibold shrink-0">
            <Filter className="w-3.5 h-3.5 text-orange-600" />
            <span className="uppercase text-[11px] tracking-wider text-slate-700 font-bold">
              Radar Filters:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-1 justify-start sm:justify-end">
            {/* 1. Industry */}
            <div className="relative inline-flex items-center">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.industry}
                onChange={(e) => onFilterChange('industry', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
              >
                {emergingIndustryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Skill Category */}
            <div className="relative inline-flex items-center">
              <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.skillCategory}
                onChange={(e) => onFilterChange('skillCategory', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
              >
                {emergingCategoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Education Level */}
            <div className="relative inline-flex items-center">
              <GraduationCap className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.educationLevel}
                onChange={(e) => onFilterChange('educationLevel', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
              >
                {educationLevelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 5. Experience Level */}
            <div className="relative inline-flex items-center">
              <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.experienceLevel}
                onChange={(e) => onFilterChange('experienceLevel', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer shadow-2xs"
              >
                {experienceLevelOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
