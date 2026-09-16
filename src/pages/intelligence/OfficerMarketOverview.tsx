import { useState, useMemo, useRef } from 'react';
import type { FC } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Building2,
  Brain,
  AlertTriangle,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Send,
  Cloud,
  Shield,
  Layers,
  Filter,
  Eye,
  Info,
  ExternalLink,
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';

import { OfficerInteractiveMap } from '../../components/intelligence/OfficerInteractiveMap';
import {
  filterOptions,
  initialMapPins,
  districtKPIData,
  openJobRolesData,
  allJobRolesExtended,
  industryVsStudentData,
  skillGapList,
  skillDemandTrendData,
  emergingSkillsList,
  industryDistributionData,
  districtComparisonData,
  type OpenJobRole,
  type SkillGapItem
} from '../../mock/officerMarketData';
import { useSkillBridge } from '../../context/SkillBridgeContext';

export const OfficerMarketOverview: FC = () => {
  const { setNotification, sendRecommendationToInstitute } = useSkillBridge();

  // ------------------------------------------------------------------------
  // 1. FILTER CONTROLS STATE (Section 4)
  // ------------------------------------------------------------------------
  const [selectedState, setSelectedState] = useState<string>('Telangana');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Hyderabad');
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All Industries');
  const [selectedJobRoleFilter, setSelectedJobRoleFilter] = useState<string>('All Job Roles');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('1 Year (Last 12 Months)');

  // ------------------------------------------------------------------------
  // 2. DRILL-DOWN / ACTIVE SELECTION STATE (Sections 11, 12, 14, 15)
  // ------------------------------------------------------------------------
  const [selectedJob, setSelectedJob] = useState<OpenJobRole>(openJobRolesData[1]); // Default: Data Analyst
  const [selectedSkill, setSelectedSkill] = useState<string>('Power BI');
  const [showAllJobs, setShowAllJobs] = useState<boolean>(false);
  const [activeRecommendationModal, setActiveRecommendationModal] = useState<SkillGapItem | null>(null);

  // Skill Demand Trend Lines Toggle State (Section 17)
  const [trendLineToggles, setTrendLineToggles] = useState<Record<string, boolean>>({
    Python: true,
    SQL: true,
    Cloud: false,
    'AI/ML': true,
    Cybersecurity: false
  });

  // Section reference for smooth scroll
  const drilldownSectionRef = useRef<HTMLDivElement>(null);

  // ------------------------------------------------------------------------
  // 3. DERIVED DATA & COMPUTATIONS
  // ------------------------------------------------------------------------
  // District KPI based on selection
  const currentKPI = districtKPIData[selectedDistrict] || districtKPIData['Hyderabad'];

  // Available districts for chosen state
  const availableDistricts = filterOptions.districtsByState[selectedState] || ['All Districts'];

  // Filtered map pins based on state, district, and industry filters
  const filteredPins = useMemo(() => {
    return initialMapPins.filter((pin) => {
      if (selectedState !== 'Telangana' && pin.state !== selectedState) return false;
      if (selectedDistrict !== 'All Districts' && pin.district !== selectedDistrict) return false;
      if (selectedIndustry !== 'All Industries' && !pin.industry.toLowerCase().includes(selectedIndustry.toLowerCase())) {
        return false;
      }
      if (selectedJobRoleFilter !== 'All Job Roles' && !pin.jobTitle.toLowerCase().includes(selectedJobRoleFilter.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [selectedState, selectedDistrict, selectedIndustry, selectedJobRoleFilter]);

  // Active Skill Gap details for Curriculum Alignment (Section 15)
  const activeSkillGap = useMemo(() => {
    return (
      skillGapList.find((g) => g.skill.toLowerCase().includes(selectedSkill.toLowerCase())) ||
      skillGapList[0] // Power BI
    );
  }, [selectedSkill]);

  // Active Job Roles list (standard vs extended)
  const currentJobRolesList = showAllJobs ? allJobRolesExtended : openJobRolesData;

  // ------------------------------------------------------------------------
  // 4. ACTION HANDLERS
  // ------------------------------------------------------------------------
  const handleResetFilters = () => {
    setSelectedState('Telangana');
    setSelectedDistrict('Hyderabad');
    setSelectedIndustry('All Industries');
    setSelectedJobRoleFilter('All Job Roles');
    setSelectedPeriod('1 Year (Last 12 Months)');
    setSelectedJob(openJobRolesData[1]);
    setSelectedSkill('Power BI');
    setNotification('Filters have been reset to default state.');
  };

  const handleDistrictSelect = (districtName: string) => {
    setSelectedDistrict(districtName);
    // Auto-update job selection based on district's major role
    if (districtName === 'Medchal-Malkajgiri') {
      setSelectedJob(openJobRolesData[4]); // Cybersecurity / Manufacturing
    } else if (districtName === 'Rangareddy') {
      setSelectedJob(openJobRolesData[2]); // Cloud Engineer
    } else {
      setSelectedJob(openJobRolesData[1]); // Data Analyst
    }
  };

  const handleJobSelectFromMap = (jobTitle: string, district?: string) => {
    if (district && district !== selectedDistrict) {
      setSelectedDistrict(district);
    }
    const found = allJobRolesExtended.find((j) => j.title.toLowerCase().includes(jobTitle.toLowerCase()));
    if (found) {
      setSelectedJob(found);
      if (found.requiredSkills.length > 0) {
        setSelectedSkill(found.requiredSkills[0].skill);
      }
    }
    // Scroll down to analytics section smoothly
    setTimeout(() => {
      drilldownSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleDispatchCurriculumRecommendation = (item: SkillGapItem) => {
    sendRecommendationToInstitute();
    setNotification(`Curriculum Policy Dispatched: "${item.recommendedModule}" sent to State Technical Education Board & Apex Universities.`);
    setActiveRecommendationModal(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-16">
      {/* ------------------------------------------------------------------ */}
      {/* 1. PAGE HEADER (Enterprise Government BI Platform)                 */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[#BFC9D1]/60 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-[#25343F] text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5 text-[#FF9B51]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#25343F] tracking-tight">
                  MARKET OVERVIEW
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#FF9B51]/20 text-[#D96B1E] border border-[#FF9B51]/40">
                  Officer Portal
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                Geospatial telemetry connecting employer requisitions, student proficiencies, skill gaps, and curriculum interventions.
              </p>
            </div>
          </div>
        </div>

        {/* Live Status Indicators */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-[#BFC9D1] shadow-2xs text-xs font-semibold text-[#25343F]">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Live Telemetry Active</span>
            <span className="text-slate-400 font-normal">|</span>
            <span className="text-[11px] text-slate-500">Q1 2026 Feed</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 2. TOP FILTER BAR (Directly above map, Section 4 of Spec)          */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-4 rounded-2xl bg-white border border-[#BFC9D1] shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#25343F]">
            <Filter className="w-4 h-4 text-[#FF9B51]" />
            <span>Regional &amp; Labour Intelligence Filter Bar</span>
          </div>

          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-slate-600 hover:text-[#25343F] bg-[#EAEFEF] hover:bg-[#BFC9D1]/50 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-[#FF9B51]" />
            <span>Reset Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
          {/* State Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              State
            </label>
            <select
              value={selectedState}
              onChange={(e) => {
                const newState = e.target.value;
                setSelectedState(newState);
                const nextDistricts = filterOptions.districtsByState[newState] || ['All Districts'];
                setSelectedDistrict(nextDistricts[1] || 'All Districts');
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#BFC9D1] bg-[#EAEFEF]/40 font-bold text-[#25343F] focus:outline-none focus:ring-2 focus:ring-[#FF9B51] cursor-pointer"
            >
              {filterOptions.states.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {/* District Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              District
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => handleDistrictSelect(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#BFC9D1] bg-[#EAEFEF]/40 font-bold text-[#25343F] focus:outline-none focus:ring-2 focus:ring-[#FF9B51] cursor-pointer"
            >
              {availableDistricts.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Industry Sector
            </label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#BFC9D1] bg-[#EAEFEF]/40 font-semibold text-[#25343F] focus:outline-none focus:ring-2 focus:ring-[#FF9B51] cursor-pointer"
            >
              {filterOptions.industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          {/* Job Role Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Job Role
            </label>
            <select
              value={selectedJobRoleFilter}
              onChange={(e) => {
                const val = e.target.value;
                setSelectedJobRoleFilter(val);
                if (val !== 'All Job Roles') {
                  const match = allJobRolesExtended.find((j) => j.title.toLowerCase() === val.toLowerCase());
                  if (match) setSelectedJob(match);
                }
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#BFC9D1] bg-[#EAEFEF]/40 font-semibold text-[#25343F] focus:outline-none focus:ring-2 focus:ring-[#FF9B51] cursor-pointer"
            >
              {filterOptions.jobRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>

          {/* Time Period Filter */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
              Time Period
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-[#BFC9D1] bg-[#EAEFEF]/40 font-semibold text-[#25343F] focus:outline-none focus:ring-2 focus:ring-[#FF9B51] cursor-pointer"
            >
              {filterOptions.periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 3. MAIN MAP SECTION (Real Interactive Map, Sections 5-9)          */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF9B51]" />
            <h2 className="text-base font-extrabold text-[#25343F] tracking-tight">
              GEOSPATIAL JOB DEMAND MAP &bull; {selectedState} ({selectedDistrict})
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Click any pin to inspect job requisitions &bull; Click district boundaries or pins to zoom in
          </span>
        </div>

        <OfficerInteractiveMap
          pins={filteredPins}
          selectedDistrict={selectedDistrict}
          selectedState={selectedState}
          onSelectDistrict={handleDistrictSelect}
          onSelectJobRole={handleJobSelectFromMap}
        />
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 4. PROGRESSIVE DISCLOSURE INTELLIGENCE PIPELINE TRACKER            */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-3.5 rounded-xl bg-white border border-[#BFC9D1] shadow-2xs">
        <div className="flex items-center justify-between border-b border-[#BFC9D1]/40 pb-2 mb-2.5">
          <span className="text-[11px] font-black uppercase tracking-wider text-[#25343F] flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF9B51]" />
            Progressive Intelligence Flow (Answering Key Questions Step-by-Step)
          </span>
          <span className="text-[11px] font-bold text-[#FF9B51]">
            Active Target: {selectedDistrict} &rarr; {selectedJob.title} &rarr; {selectedSkill}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          <div className="p-2 rounded-lg bg-[#EAEFEF] border border-[#BFC9D1] text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">1. WHERE JOBS ARE</span>
            <span className="font-extrabold text-[#25343F] truncate block">{selectedDistrict}</span>
          </div>
          <div className="p-2 rounded-lg bg-[#EAEFEF] border border-[#BFC9D1] text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">2. WHAT JOBS</span>
            <span className="font-extrabold text-[#25343F] truncate block">{selectedJob.title}</span>
          </div>
          <div className="p-2 rounded-lg bg-[#EAEFEF] border border-[#BFC9D1] text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">3. WHAT SKILLS</span>
            <span className="font-extrabold text-[#25343F] truncate block">{selectedSkill}</span>
          </div>
          <div className="p-2 rounded-lg bg-[#EAEFEF] border border-[#BFC9D1] text-center">
            <span className="text-[10px] text-slate-500 block uppercase font-bold">4. LEARNING SUPPLY</span>
            <span className="font-extrabold text-[#25343F] block">28% Coverage</span>
          </div>
          <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-center">
            <span className="text-[10px] text-rose-600 block uppercase font-bold">5. SKILL GAP</span>
            <span className="font-extrabold text-rose-700 block">44% Deficit</span>
          </div>
          <div className="p-2 rounded-lg bg-[#FF9B51]/20 border border-[#FF9B51]/40 text-center">
            <span className="text-[10px] text-[#D96B1E] block uppercase font-bold">6. CURRICULUM</span>
            <span className="font-extrabold text-[#25343F] block">Action Recommended</span>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 5. DISTRICT KPI CARDS (Section 10 of Spec)                         */}
      {/* ------------------------------------------------------------------ */}
      <div ref={drilldownSectionRef} className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#25343F]" />
            <h2 className="text-base font-extrabold text-[#25343F] tracking-tight">
              DISTRICT INTELLIGENCE &bull; {selectedDistrict.toUpperCase()}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Telemetry metrics updated in real-time
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Open Jobs */}
          <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs flex flex-col justify-between space-y-3 hover:border-[#FF9B51] transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>OPEN JOBS</span>
              <Briefcase className="w-4 h-4 text-[#FF9B51]" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#25343F] tabular-nums tracking-tight">
                {currentKPI.openJobs.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{currentKPI.openJobsChange} YoY</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Verified employer requisitions
            </div>
          </div>

          {/* Card 2: Industries */}
          <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs flex flex-col justify-between space-y-3 hover:border-[#FF9B51] transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>INDUSTRIES</span>
              <Building2 className="w-4 h-4 text-[#25343F]" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#25343F] tabular-nums tracking-tight">
                {currentKPI.industriesCount.toLocaleString()}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{currentKPI.industriesChange} YoY</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Active corporate recruitment nodes
            </div>
          </div>

          {/* Card 3: High-Demand Skills */}
          <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs flex flex-col justify-between space-y-3 hover:border-[#FF9B51] transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>HIGH-DEMAND SKILLS</span>
              <Brain className="w-4 h-4 text-indigo-600" />
            </div>
            <div>
              <div className="text-3xl font-black text-[#25343F] tabular-nums tracking-tight">
                {currentKPI.highDemandSkillsCount}
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>{currentKPI.highDemandSkillsChange} YoY</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Emerging &amp; critical competencies
            </div>
          </div>

          {/* Card 4: Skill Gap */}
          <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs flex flex-col justify-between space-y-3 hover:border-rose-400 transition-all">
            <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase tracking-wider">
              <span>SKILL GAP</span>
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            </div>
            <div>
              <div className="text-3xl font-black text-rose-600 tabular-nums tracking-tight">
                {currentKPI.skillGapPct}%
              </div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>{currentKPI.skillGapChange} narrowing trend</span>
              </div>
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              Net deficit between requisitions and supply
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 6. OPEN JOB POSITIONS & REQUIRED SKILLS (Sections 11 & 12)         */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 11: Open Job Positions (Horizontal Bar Chart) */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#BFC9D1]/50 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
                OPEN JOB POSITIONS
              </h3>
              <p className="text-xs text-slate-500">
                Click any role to inspect required skills profile in {selectedDistrict}
              </p>
            </div>
            <button
              onClick={() => setShowAllJobs((prev) => !prev)}
              className="text-xs font-bold text-[#FF9B51] hover:text-[#D96B1E] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>{showAllJobs ? 'Show top roles' : 'View all job roles →'}</span>
            </button>
          </div>

          <div className="space-y-3 pt-1">
            {currentJobRolesList.map((job) => {
              const isSelected = selectedJob.id === job.id;
              const maxOpenings = 450;
              const widthPct = Math.min(100, Math.round((job.openings / maxOpenings) * 100));

              return (
                <div
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job);
                    if (job.requiredSkills.length > 0) {
                      setSelectedSkill(job.requiredSkills[0].skill);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FF9B51] bg-[#FF9B51]/10 shadow-xs ring-1 ring-[#FF9B51]/30'
                      : 'border-[#BFC9D1]/60 hover:border-[#BFC9D1] bg-slate-50/50 hover:bg-slate-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#25343F]">{job.title}</span>
                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#25343F] text-white">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold text-[#25343F] tabular-nums">
                      {job.openings} Openings
                    </span>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="h-2.5 w-full bg-[#EAEFEF] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSelected ? 'bg-[#FF9B51]' : 'bg-[#25343F]'
                      }`}
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>{job.industry}</span>
                    <span className="font-semibold text-slate-700">{job.salaryRange}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 12: Required Skills (Interactive Bars) */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#BFC9D1]/50 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
                {selectedJob.title.toUpperCase()} — REQUIRED SKILLS
              </h3>
              <p className="text-xs text-slate-500">
                Click any skill bar to trigger Skill Intelligence &amp; Curriculum alignment
              </p>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAEFEF] text-[#25343F] border border-[#BFC9D1]">
              {selectedJob.requiredSkills.length} Core Skills
            </span>
          </div>

          <div className="space-y-3 pt-1">
            {selectedJob.requiredSkills.map((sk) => {
              const isSelected = selectedSkill.toLowerCase() === sk.skill.toLowerCase();

              return (
                <div
                  key={sk.skill}
                  onClick={() => setSelectedSkill(sk.skill)}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#25343F] bg-[#25343F] text-white shadow-xs'
                      : 'border-[#BFC9D1]/60 hover:border-[#BFC9D1] bg-slate-50/50 hover:bg-slate-100/50 text-[#25343F]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">{sk.skill}</span>
                      {isSelected && (
                        <span className="px-1.5 py-0.2 rounded text-[10px] font-black bg-[#FF9B51] text-[#25343F]">
                          INSPECTING
                        </span>
                      )}
                    </div>
                    <span className="font-extrabold tabular-nums">
                      {sk.importancePct}% Requisite
                    </span>
                  </div>

                  {/* Visual Bar */}
                  <div className={`h-2.5 w-full rounded-full overflow-hidden ${isSelected ? 'bg-slate-700' : 'bg-[#EAEFEF]'}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isSelected ? 'bg-[#FF9B51]' : 'bg-[#14746F]'
                      }`}
                      style={{ width: `${sk.importancePct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-[#EAEFEF]/60 border border-[#BFC9D1] text-xs text-slate-600 flex items-center justify-between">
            <span className="font-medium">Selected Skill for Policy Inspection:</span>
            <strong className="text-[#25343F] font-black">{selectedSkill}</strong>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 7. INDUSTRY DEMAND VS CURRENT STUDENT LEARNING (Section 13)       */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#BFC9D1]/50 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-800">
                Core Intelligence
              </span>
              <h3 className="text-sm sm:text-base font-black uppercase tracking-wider text-[#25343F]">
                INDUSTRY DEMAND vs CURRENT STUDENT LEARNING
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Comparative benchmark exposing the delta between industrial job requisitions and academic enrollment/mastery
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-[#25343F]">
              <span className="w-3 h-3 rounded bg-[#25343F] inline-block" />
              <span>Industry Demand (%)</span>
            </span>
            <span className="flex items-center gap-1.5 text-[#FF9B51]">
              <span className="w-3 h-3 rounded bg-[#FF9B51] inline-block" />
              <span>Student Coverage (%)</span>
            </span>
          </div>
        </div>

        {/* Grouped Bar Chart */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={industryVsStudentData}
              margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEFEF" />
              <XAxis
                dataKey="skill"
                tick={{ fill: '#25343F', fontSize: 12, fontWeight: 700 }}
              />
              <YAxis
                unit="%"
                tick={{ fill: '#64748b', fontSize: 11 }}
                domain={[0, 100]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#BFC9D1',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}
                formatter={(val: any, name: any) => [`${val}%`, name]}
              />
              <Legend verticalAlign="top" height={36} />
              <Bar
                dataKey="industryDemand"
                name="Industry Demand"
                fill="#25343F"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="studentCoverage"
                name="Student Coverage"
                fill="#FF9B51"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 8. SKILL GAP ANALYSIS & CURRICULUM ALIGNMENT (Sections 14 & 15)    */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Section 14: Skill Gap Analysis */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#BFC9D1]/50 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
                SKILL GAP ANALYSIS
              </h3>
              <p className="text-xs text-slate-500">
                Quantified competency deficits with explicit statutory severity ratings
              </p>
            </div>
            <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
              5 Critical Deficits
            </span>
          </div>

          <div className="space-y-3.5 pt-1">
            {skillGapList.map((gap) => {
              const isSelected = activeSkillGap.skill === gap.skill;

              // Severity badge color mapping
              const badgeStyle =
                gap.severity === 'CRITICAL GAP'
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : gap.severity === 'HIGH GAP'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-blue-100 text-blue-900 border-blue-300';

              return (
                <div
                  key={gap.skill}
                  onClick={() => setSelectedSkill(gap.skill)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#FF9B51] bg-[#FF9B51]/10 shadow-xs ring-1 ring-[#FF9B51]/30'
                      : 'border-[#BFC9D1]/60 hover:border-[#BFC9D1] bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-[#25343F]">{gap.skill}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider border ${badgeStyle}`}>
                        {gap.severity}
                      </span>
                    </div>
                    <span className="font-black text-rose-600 tabular-nums">
                      {gap.gapPct}% Deficit
                    </span>
                  </div>

                  {/* Dual Segment Progress Bar: Gap vs Current Coverage */}
                  <div className="h-3 w-full bg-[#EAEFEF] rounded-full overflow-hidden flex">
                    <div
                      className="h-full bg-[#25343F] transition-all"
                      style={{ width: `${gap.currentCoverage}%` }}
                      title={`Current Coverage: ${gap.currentCoverage}%`}
                    />
                    <div
                      className="h-full bg-rose-500 transition-all opacity-85"
                      style={{ width: `${gap.gapPct}%` }}
                      title={`Skill Gap: ${gap.gapPct}%`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                    <span>Industry Need: <strong>{gap.industryDemand}%</strong></span>
                    <span>Curriculum Coverage: <strong>{gap.currentCoverage}%</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 15: Curriculum Alignment Action Panel */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs flex flex-col justify-between space-y-4">
          <div className="border-b border-[#BFC9D1]/50 pb-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FF9B51]/20 text-[#D96B1E]">
                Intervention Panel
              </span>
              <span className="text-xs font-bold text-slate-500">
                Action-Oriented Policy
              </span>
            </div>
            <h3 className="text-base font-black text-[#25343F] mt-1">
              CURRICULUM ALIGNMENT &bull; {activeSkillGap.skill.toUpperCase()}
            </h3>
          </div>

          {/* Metric Triad */}
          <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-[#EAEFEF] border border-[#BFC9D1]/60">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Industry Demand</span>
              <span className="text-lg font-black text-[#25343F]">{activeSkillGap.industryDemand}%</span>
            </div>
            <div className="border-x border-[#BFC9D1]/50">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Coverage</span>
              <span className="text-lg font-black text-slate-700">{activeSkillGap.currentCoverage}%</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase block">Net Gap</span>
              <span className="text-lg font-black text-rose-600">{activeSkillGap.gapPct}%</span>
            </div>
          </div>

          {/* Recommended Change Card */}
          <div className="p-4 rounded-xl bg-slate-50 border border-[#BFC9D1] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                RECOMMENDED CHANGE
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                Priority: {activeSkillGap.priorityLevel}
              </span>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-[#25343F] leading-snug">
                {activeSkillGap.recommendedModule}
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                <strong>Reason:</strong> {activeSkillGap.reason}
              </p>
            </div>

            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-200">
              <span className="text-slate-500">
                Suggested Duration: <strong className="text-[#25343F]">{activeSkillGap.suggestedHours}</strong>
              </span>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase block mb-1">
                Target Degree Programs:
              </span>
              <div className="flex flex-wrap gap-1">
                {activeSkillGap.degreePrograms.map((deg) => (
                  <span
                    key={deg}
                    className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-semibold text-slate-700"
                  >
                    {deg}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex gap-2">
              <button
                onClick={() => handleDispatchCurriculumRecommendation(activeSkillGap)}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-bold text-white bg-[#25343F] hover:bg-[#FF9B51] transition-colors shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send to Academic Board</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 9. CURRICULUM ALIGNMENT FLOW DIAGRAM (Section 16 of Spec)         */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
        <div className="border-b border-[#BFC9D1]/50 pb-3">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
            CURRICULUM ALIGNMENT FLOW (INTELLIGENCE TO ACTION PIPELINE)
          </h3>
          <p className="text-xs text-slate-500">
            Automated statutory translation from regional employer requisitions to accredited university syllabus amendments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-[#EAEFEF] border border-[#BFC9D1] text-center space-y-2 relative">
            <span className="w-6 h-6 rounded-full bg-[#25343F] text-white text-xs font-black inline-flex items-center justify-center">
              1
            </span>
            <h4 className="text-xs font-black uppercase text-[#25343F]">
              INDUSTRY REQUIREMENT
            </h4>
            <p className="text-[11px] text-slate-600">
              12,450 Live requisitions scanned across 820 employers
            </p>
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-[#EAEFEF] border border-[#BFC9D1] text-center space-y-2 relative">
            <span className="w-6 h-6 rounded-full bg-[#25343F] text-white text-xs font-black inline-flex items-center justify-center">
              2
            </span>
            <h4 className="text-xs font-black uppercase text-[#25343F]">
              REQUIRED SKILLS
            </h4>
            <p className="text-[11px] text-slate-600">
              Python (92%), SQL (88%), Power BI (72%) identified
            </p>
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-[#EAEFEF] border border-[#BFC9D1] text-center space-y-2 relative">
            <span className="w-6 h-6 rounded-full bg-[#25343F] text-white text-xs font-black inline-flex items-center justify-center">
              3
            </span>
            <h4 className="text-xs font-black uppercase text-[#25343F]">
              CURRENT CURRICULUM
            </h4>
            <p className="text-[11px] text-slate-600">
              Analyzed syllabus across 42 universities &amp; polytechnics
            </p>
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-300 text-center space-y-2 relative">
            <span className="w-6 h-6 rounded-full bg-rose-600 text-white text-xs font-black inline-flex items-center justify-center">
              4
            </span>
            <h4 className="text-xs font-black uppercase text-rose-800">
              SKILL GAP
            </h4>
            <p className="text-[11px] text-rose-700 font-semibold">
              Power BI: 44% Deficit &bull; Cloud: 43% Deficit
            </p>
          </div>

          {/* Node 5 */}
          <div className="p-4 rounded-xl bg-[#FF9B51]/20 border border-[#FF9B51] text-center space-y-2 relative shadow-xs">
            <span className="w-6 h-6 rounded-full bg-[#FF9B51] text-[#25343F] text-xs font-black inline-flex items-center justify-center">
              5
            </span>
            <h4 className="text-xs font-black uppercase text-[#25343F]">
              RECOMMENDED CHANGE
            </h4>
            <p className="text-[11px] text-[#25343F] font-bold">
              20–30hr Practical Lab Module &amp; Certification
            </p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 10. SKILL DEMAND TREND — LAST 12 MONTHS (Section 17 of Spec)       */}
      {/* ------------------------------------------------------------------ */}
      <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#BFC9D1]/50 pb-3">
          <div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
              SKILL DEMAND — LAST 12 MONTHS (HISTORICAL &amp; PREDICTIVE TREND)
            </h3>
            <p className="text-xs text-slate-500">
              Monthly requisitions volume index across regional employer feeds
            </p>
          </div>

          {/* Skill Toggles */}
          <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700">
            {['Python', 'SQL', 'Cloud', 'AI/ML', 'Cybersecurity'].map((sk) => (
              <label key={sk} className="flex items-center gap-1.5 cursor-pointer hover:text-[#25343F]">
                <input
                  type="checkbox"
                  checked={trendLineToggles[sk]}
                  onChange={(e) =>
                    setTrendLineToggles((prev) => ({ ...prev, [sk]: e.target.checked }))
                  }
                  className="rounded border-[#BFC9D1] text-[#FF9B51] focus:ring-[#FF9B51] w-3.5 h-3.5"
                />
                <span>{sk}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Line Chart */}
        <div className="w-full h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skillDemandTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAEFEF" />
              <XAxis dataKey="month" tick={{ fill: '#25343F', fontSize: 12, fontWeight: 700 }} />
              <YAxis unit=" pts" tick={{ fill: '#64748b', fontSize: 11 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#ffffff',
                  borderColor: '#BFC9D1',
                  borderRadius: '12px'
                }}
              />
              <Legend verticalAlign="top" height={36} />
              {trendLineToggles.Python && (
                <Line type="monotone" dataKey="Python" stroke="#25343F" strokeWidth={3} dot={{ r: 3 }} />
              )}
              {trendLineToggles.SQL && (
                <Line type="monotone" dataKey="SQL" stroke="#FF9B51" strokeWidth={2.5} dot={{ r: 3 }} />
              )}
              {trendLineToggles.Cloud && (
                <Line type="monotone" dataKey="Cloud" stroke="#14746F" strokeWidth={2} dot={{ r: 3 }} />
              )}
              {trendLineToggles['AI/ML'] && (
                <Line type="monotone" dataKey="AI/ML" stroke="#7C3AED" strokeWidth={2.5} dot={{ r: 3 }} />
              )}
              {trendLineToggles.Cybersecurity && (
                <Line type="monotone" dataKey="Cybersecurity" stroke="#E11D48" strokeWidth={2} dot={{ r: 3 }} />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 11. EMERGING SKILLS (Section 18 of Spec)                           */}
      {/* ------------------------------------------------------------------ */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
            EMERGING SKILLS &bull; HIGH VELOCITY REQUISITIONS
          </h3>
          <span className="text-xs text-slate-500 font-medium">
            Sectors with steepest YoY requisition growth
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {emergingSkillsList.map((skill) => (
            <div
              key={skill.id}
              className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs hover:border-[#FF9B51] transition-all space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="w-8 h-8 rounded-lg bg-[#EAEFEF] flex items-center justify-center text-[#25343F]">
                    {skill.iconType === 'cloud' && <Cloud className="w-4 h-4 text-[#14746F]" />}
                    {skill.iconType === 'ai' && <Brain className="w-4 h-4 text-purple-600" />}
                    {skill.iconType === 'cyber' && <Shield className="w-4 h-4 text-rose-600" />}
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                    Demand &uarr; {skill.growthPct}%
                  </span>
                </div>

                <h4 className="text-sm font-black text-[#25343F] mt-2">
                  {skill.name}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Across {skill.industriesCount} regional industry verticals
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400">
                  {skill.topRoles[0]}
                </span>
                <button
                  onClick={() => {
                    setSelectedSkill(skill.name.split(' ')[0]);
                    drilldownSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-bold text-[#FF9B51] hover:text-[#D96B1E] flex items-center gap-1 cursor-pointer"
                >
                  <span>View Skill &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 12. INDUSTRY DISTRIBUTION & DISTRICT COMPARISON (Sections 19 & 20) */}
      {/* ------------------------------------------------------------------ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Section 19: Industry Distribution */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4 lg:col-span-1">
          <div className="border-b border-[#BFC9D1]/50 pb-3">
            <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
              JOB DEMAND BY INDUSTRY
            </h3>
            <p className="text-xs text-slate-500">
              Sectoral distribution of employer requisitions
            </p>
          </div>

          <div className="space-y-3 pt-1">
            {industryDistributionData.map((ind) => (
              <div key={ind.industry} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#25343F]">{ind.industry}</span>
                  <span className="font-extrabold text-slate-800 tabular-nums">
                    {ind.sharePct}% ({ind.jobCount.toLocaleString()})
                  </span>
                </div>
                <div className="h-2 w-full bg-[#EAEFEF] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${ind.sharePct}%`, backgroundColor: ind.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 20: District Comparison Table */}
        <div className="p-5 rounded-2xl bg-white border border-[#BFC9D1] shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-[#BFC9D1]/50 pb-3">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-[#25343F]">
                DISTRICT COMPARISON
              </h3>
              <p className="text-xs text-slate-500">
                Cross-regional benchmark. Click any district to zoom map &amp; load analytics.
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-500">
              {districtComparisonData.length} Tracked Nodes
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#BFC9D1]/60 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <th className="py-2.5 px-3">District</th>
                  <th className="py-2.5 px-3">Open Jobs</th>
                  <th className="py-2.5 px-3">Skill Gap</th>
                  <th className="py-2.5 px-3">Industries</th>
                  <th className="py-2.5 px-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#BFC9D1]/30">
                {districtComparisonData.map((d) => {
                  const isSelected = selectedDistrict === d.district;

                  return (
                    <tr
                      key={d.district}
                      onClick={() => handleDistrictSelect(d.district)}
                      className={`transition-colors cursor-pointer ${
                        isSelected ? 'bg-[#FF9B51]/10 font-bold' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-[#25343F]">{d.district}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF9B51]" />
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-3 font-extrabold text-[#25343F] tabular-nums">
                        {d.jobs.toLocaleString()}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded text-[10px] font-black bg-rose-100 text-rose-800">
                          {d.skillGap}
                        </span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-700">
                        {d.industries}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-xs font-bold text-[#FF9B51] hover:underline flex items-center gap-1">
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
