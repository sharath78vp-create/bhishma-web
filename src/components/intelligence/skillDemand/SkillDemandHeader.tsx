import React from 'react';
import type { FC } from 'react';
import {
  Search,
  Filter,
  RotateCcw,
  Calendar,
  Briefcase,
  Layers,
  Building2,
  Sparkles
} from 'lucide-react';
import {
  timePeriodOptions,
  industryOptions,
  categoryOptions,
  institutionTypeOptions,
  type FilterOptions
} from '../../../mock/skillDemandIntelligenceData';

interface SkillDemandHeaderProps {
  filters: FilterOptions;
  onFilterChange: <K extends keyof FilterOptions>(key: K, value: FilterOptions[K]) => void;
  onResetFilters: () => void;
  totalSkillsCount: number;
  filteredCount: number;
}

export const SkillDemandHeader: FC<SkillDemandHeaderProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalSkillsCount,
  filteredCount
}) => {
  const isFiltered =
    filters.industry !== 'all' ||
    filters.skillCategory !== 'all' ||
    filters.institutionType !== 'all' ||
    filters.timePeriod !== '12m' ||
    filters.searchQuery !== '';

  return (
    <div className="space-y-4">
      {/* Top Title & Subtitle Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white shadow-sm ring-1 ring-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Skill Demand Intelligence
            </h1>
            <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Workforce Analytics
            </span>
          </div>
          <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
            Compare student interest, curriculum coverage, and industry demand to identify workforce skill shortages.
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              value={filters.searchQuery}
              onChange={(e) => onFilterChange('searchQuery', e.target.value)}
              placeholder="Search skills, categories, industries..."
              className="w-full pl-9 pr-4 py-2 bg-white rounded-xl border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-xs transition-all"
            />
            {filters.searchQuery && (
              <button
                onClick={() => onFilterChange('searchQuery', '')}
                className="absolute right-2.5 top-2.5 text-xs text-slate-400 hover:text-slate-600 p-0.5"
                title="Clear search"
              >
                &times;
              </button>
            )}
          </div>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Compact Filters Row */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-500 font-semibold shrink-0">
            <Filter className="w-3.5 h-3.5 text-blue-600" />
            <span className="uppercase text-[11px] tracking-wider text-slate-700">Intelligence Filters:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 flex-1 justify-start sm:justify-end">
            {/* 1. Time Period */}
            <div className="relative inline-flex items-center">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.timePeriod}
                onChange={(e) => onFilterChange('timePeriod', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-slate-400 transition-colors cursor-pointer"
              >
                {timePeriodOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 2. Industry */}
            <div className="relative inline-flex items-center">
              <Briefcase className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.industry}
                onChange={(e) => onFilterChange('industry', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-slate-400 transition-colors cursor-pointer"
              >
                {industryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 3. Skill Category */}
            <div className="relative inline-flex items-center">
              <Layers className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.skillCategory}
                onChange={(e) => onFilterChange('skillCategory', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-slate-400 transition-colors cursor-pointer"
              >
                {categoryOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 4. Institution Type */}
            <div className="relative inline-flex items-center">
              <Building2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
              <select
                value={filters.institutionType}
                onChange={(e) => onFilterChange('institutionType', e.target.value)}
                className="pl-8 pr-7 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 font-medium text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs hover:border-slate-400 transition-colors cursor-pointer"
              >
                {institutionTypeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Filter telemetry status */}
        <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>
            Displaying <strong className="text-slate-800">{filteredCount}</strong> of{' '}
            <strong className="text-slate-800">{totalSkillsCount}</strong> monitored workforce skills
          </span>
          <span className="text-slate-400">
            Source: Unified Industry Requisitions &amp; State Curriculum Registry (Live)
          </span>
        </div>
      </div>
    </div>
  );
};
