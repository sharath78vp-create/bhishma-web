import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { StatCard } from '../../components/common/StatCard';
import { InteractiveIntelligenceMap } from '../../components/intelligence/InteractiveIntelligenceMap';
import {
  stateList,
  stateDistrictsData,
  getDistrictData,
  type DistrictIntelligence,
  type MapClusterMarker,
  type JobRoleDrilldown,
  type CurriculumRecommendationItem
} from '../../mock/intelligenceCommandData';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import {
  TrendingUp,
  Brain,
  Building2,
  AlertTriangle,
  GraduationCap,
  Users,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  FileText,
  Clock,
  ShieldCheck,
  ChevronRight,
  Filter,
  Eye,
  Send,
  X
} from 'lucide-react';

export const LabourMarketCommandCenter: FC = () => {
  const { setNotification, sendRecommendationToInstitute } = useSkillBridge();

  // 1. Regional Selectors State
  const [selectedStateName, setSelectedStateName] = useState('Telangana');
  const [selectedDistrictName, setSelectedDistrictName] = useState('Hyderabad');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('Last 12 Months');

  // 2. Selected Map Cluster & Drill-down state
  const [selectedCluster, setSelectedCluster] = useState<MapClusterMarker | null>(null);
  const [selectedJobId, setSelectedJobId] = useState<string>('JOB-IT-01');
  const [activeEvidenceModal, setActiveEvidenceModal] = useState<CurriculumRecommendationItem | null>(null);

  // Active state & district data objects
  const activeState = stateList.find(s => s.name === selectedStateName) || stateList[0];
  const activeDistrict = getDistrictData(selectedStateName, selectedDistrictName);

  // Selected job for Industry → Job → Skill connection
  const selectedJob = activeDistrict.jobsList.find(j => j.id === selectedJobId) || activeDistrict.jobsList[0];

  // Listen to Global Search selection events
  useEffect(() => {
    const handleGlobalSearchNavigate = (e: any) => {
      const detail = e.detail;
      if (detail.stateName && stateList.some(s => s.name === detail.stateName)) {
        setSelectedStateName(detail.stateName);
      }
      if (detail.districtName) {
        setSelectedDistrictName(detail.districtName);
      }
      if (detail.industryName) {
        setSelectedIndustry(detail.industryName);
      }
      if (detail.jobTitle) {
        const foundJob = activeDistrict.jobsList.find(j => j.title.toLowerCase().includes(detail.jobTitle.toLowerCase()));
        if (foundJob) setSelectedJobId(foundJob.id);
      }
    };

    window.addEventListener('intelligence-search-navigate', handleGlobalSearchNavigate);
    return () => window.removeEventListener('intelligence-search-navigate', handleGlobalSearchNavigate);
  }, [activeDistrict]);

  // When state changes, default district to the first district in that state
  const handleStateChange = (newState: string) => {
    setSelectedStateName(newState);
    const districts = stateDistrictsData[newState];
    if (districts && districts.length > 0) {
      setSelectedDistrictName(districts[0].name);
    } else {
      setSelectedDistrictName('All Districts');
    }
    setSelectedCluster(null);
  };

  const handleRecommendAction = (rec: CurriculumRecommendationItem) => {
    sendRecommendationToInstitute();
    setNotification(`Recommendation dispatched: "${rec.title}" sent to Apex Institute of Technology Academic Board.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-12">
      {/* 1. Header & Live Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Labour Market Intelligence Command Center
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Real-time regional telemetry connecting industry job requisitions, student competencies, skill deficits, and curriculum intervention.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Badge variant="success" size="md" className="py-1 px-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping mr-1" />
            Active Regional Telemetry Feed
          </Badge>
        </div>
      </div>

      {/* 2. Universal Regional Selectors Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Geographic &amp; Sector Scope:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs w-full sm:w-auto">
          {/* State Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">State:</span>
            <select
              value={selectedStateName}
              onChange={(e) => handleStateChange(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {stateList.map(s => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* District Selector */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">District:</span>
            <select
              value={selectedDistrictName}
              onChange={(e) => {
                setSelectedDistrictName(e.target.value);
                setSelectedCluster(null);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Districts">All Districts (State View)</option>
              {(stateDistrictsData[selectedStateName] || []).map(d => (
                <option key={d.id} value={d.name}>
                  {d.name} ({d.demandLabel})
                </option>
              ))}
            </select>
          </div>

          {/* Industry Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Industry:</span>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="All Industries">All Industries</option>
              <option value="Information Technology">Information Technology &amp; Cloud</option>
              <option value="FinTech">FinTech &amp; Analytics</option>
              <option value="Semiconductors">Semiconductors &amp; VLSI</option>
              <option value="Electric Vehicles">Electric Vehicles &amp; Auto</option>
              <option value="Life Sciences">Healthcare &amp; Bio-Pharma</option>
            </select>
          </div>

          {/* Time Period */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Time:</span>
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-50 font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="Last 12 Months">Last 12 Months</option>
              <option value="Last 6 Months">Last 6 Months</option>
              <option value="Q1 2026 Live Feed">Q1 2026 Live Feed</option>
            </select>
          </div>
        </div>
      </div>

      {/* 3. Key Intelligence Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Job Demand</span>
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {activeDistrict.jobDemand.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-emerald-600">+14.2% YoY</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Top Skill</span>
            <Brain className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-xl font-extrabold text-slate-900 truncate">
            {activeDistrict.topSkill}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">82% Requisitions</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Skill Gap</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-rose-600 tabular-nums">
            +{activeDistrict.netGapPoints} pts
          </div>
          <div className="text-[11px] font-semibold text-rose-700">Critical Deficit</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Industries</span>
            <Building2 className="w-3.5 h-3.5 text-purple-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {activeDistrict.activeIndustriesCount}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">IT, Semi, EV, Fin</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Institutes</span>
            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {activeDistrict.institutesCount}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">Accredited Nodes</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
            <span>Students Analyzed</span>
            <Users className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 tabular-nums">
            {activeDistrict.studentsAnalyzedCount.toLocaleString()}
          </div>
          <div className="text-[11px] font-semibold text-slate-500">Verified Portfolios</div>
        </div>
      </div>

      {/* 4. Centerpiece: Interactive Intelligence Map */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Interactive Regional Telemetry Map &bull; {selectedStateName} &rarr; {selectedDistrictName}
            </h2>
          </div>
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">
            Click markers to inspect industrial demand, institutes, and curriculum gaps
          </span>
        </div>

        <InteractiveIntelligenceMap
          activeState={activeState}
          activeDistrict={activeDistrict}
          selectedDistrictName={selectedDistrictName}
          onSelectDistrict={(distName) => setSelectedDistrictName(distName)}
          selectedClusterId={selectedCluster?.id || null}
          onSelectCluster={(cluster) => setSelectedCluster(cluster)}
          industryFilter={selectedIndustry}
        />
      </div>

      {/* 5. Interactive Industry → Job → Skill → Gap → Curriculum Chain */}
      <Card padding="lg" className="border-slate-200">
        <div className="space-y-5">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                  Closed-Loop Chain
                </span>
                <h3 className="text-base font-extrabold text-slate-900">
                  Industry &rarr; Job &rarr; Skill &rarr; Gap &rarr; Curriculum Workflow
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Drill down into verified regional employer requisitions and inspect how specific skill shortages generate curricular recommendations.
              </p>
            </div>

            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-lg border border-blue-200/60 self-start">
              Selected: {selectedJob.title}
            </span>
          </div>

          {/* Step 1: Select Job Category from Active District */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Step 1: Select Job Role to Inspect ({activeDistrict.name}):
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
              {activeDistrict.jobsList.map((job) => {
                const isSelected = selectedJobId === job.id;
                return (
                  <button
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        {job.industry}
                      </span>
                      <h4 className="text-xs font-bold text-slate-900 mt-0.5 leading-snug">
                        {job.title}
                      </h4>
                    </div>
                    <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                      <span className="font-extrabold text-blue-700">{job.activeOpenings} Jobs</span>
                      <span className="text-slate-400 font-semibold">{job.growthYoY}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Compare Industry Demand vs Student Availability for this Job */}
          <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Required Competency Profile for <span className="text-blue-700">{selectedJob.title}</span>
                </h4>
                <p className="text-xs text-slate-500">
                  Evaluated across {selectedJob.activeOpenings} live employer openings in {activeDistrict.name}
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Industry Requirement</span>
                </span>
                <span className="flex items-center gap-1.5 font-medium text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Student Proficiency</span>
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {selectedJob.requiredSkills.map((sk) => {
                const isDeficit = sk.gapPoints > 15;

                return (
                  <div key={sk.name} className="p-3 bg-white rounded-xl border border-slate-200/80 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{sk.name}</span>
                        <span
                          className={`px-2 py-0.2 rounded text-[10px] font-bold ${
                            sk.gapStatus === 'Critical Gap'
                              ? 'bg-rose-100 text-rose-800'
                              : sk.gapStatus === 'High Gap'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {sk.gapStatus} (-{sk.gapPoints} pts)
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-[11px]">
                        <span className="text-slate-500">
                          Curriculum Coverage: <strong className="text-slate-800">{sk.curriculumCoverage}</strong>
                        </span>
                        <span className="font-bold text-slate-900 tabular-nums">
                          Req: {sk.industryDemand}% vs Supply: {sk.studentAvailability}%
                        </span>
                      </div>
                    </div>

                    {/* Dual Comparative Progress Bar */}
                    <div className="space-y-1">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                        {/* Industry Requirement Bar */}
                        <div
                          className="h-full bg-blue-600 rounded-full absolute left-0 top-0"
                          style={{ width: `${sk.industryDemand}%` }}
                        />
                        {/* Student Proficiency Overlay */}
                        <div
                          className="h-full bg-emerald-500 rounded-full absolute left-0 top-0 opacity-80"
                          style={{ width: `${sk.studentAvailability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Direct Actionable Recommendation Trigger */}
            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-blue-900 block">
                    Synthesized Recommendation for {selectedJob.title}:
                  </span>
                  <p className="text-blue-800 mt-0.5">
                    {selectedJob.primaryRecommendation}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setNotification(`Curriculum intervention package generated for ${selectedJob.title}.`);
                }}
                className="px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-bold transition-all shrink-0 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <span>Trigger Academic Recommendation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* 6. Top Skills Required vs. Student Skill Supply (Direct Benchmark Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Top Skills Comparison Bar Chart */}
        <div className="lg:col-span-7">
          <Card padding="lg" className="border-slate-200">
            <CardHeader
              title={`Top Skills Required in ${activeDistrict.name}`}
              subtitle="Industry Requisition Benchmark vs. Evaluated Student Competency Level"
            />

            <div className="space-y-3.5 pt-2">
              {activeDistrict.topSkillsComparison.map((item) => (
                <div key={item.skill} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">{item.skill}</span>
                    <div className="flex items-center gap-3 text-[11px] tabular-nums">
                      <span className="text-blue-700 font-semibold">Demand: {item.industryDemandPct}%</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-emerald-700 font-semibold">Student: {item.studentProficiencyPct}%</span>
                      <span className="text-slate-400">|</span>
                      <span className="text-rose-600 font-bold">Gap: {item.gapPoints} pts</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-0.5">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${item.industryDemandPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block text-right">Industry Requirement</span>
                    </div>

                    <div className="space-y-0.5">
                      <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full"
                          style={{ width: `${item.studentProficiencyPct}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block text-right">Student Proficiency</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Critical Regional Skill Gaps Priority Table */}
        <div className="lg:col-span-5">
          <Card padding="lg" className="border-slate-200">
            <CardHeader
              title="Critical Skill Gaps"
              subtitle={`Highest priority intervention areas identified in ${activeDistrict.name}`}
            />

            <div className="space-y-3 pt-2">
              {activeDistrict.topSkillsComparison
                .filter(s => s.priority === 'CRITICAL' || s.priority === 'HIGH')
                .map((gap) => (
                  <div
                    key={gap.skill}
                    className="p-3.5 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{gap.skill}</h4>
                        <span className="text-[11px] text-slate-500 font-medium">Category: {gap.category}</span>
                      </div>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          gap.priority === 'CRITICAL'
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : 'bg-amber-100 text-amber-800 border border-amber-200'
                        }`}
                      >
                        {gap.priority} PRIORITY
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs bg-slate-50 p-2 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Industry</span>
                        <span className="font-extrabold text-blue-700">{gap.industryDemandPct}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-semibold block">Student</span>
                        <span className="font-extrabold text-slate-800">{gap.studentProficiencyPct}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-rose-500 uppercase font-semibold block">Net Gap</span>
                        <span className="font-extrabold text-rose-600">+{gap.gapPoints} pts</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>Curriculum Status:</span>
                      <span className={`font-bold ${gap.curriculumCoverage === 'Low' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {gap.curriculumCoverage} Coverage
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </div>
      </div>

      {/* 7. Curriculum Intelligence & Recommended Actions */}
      <Card padding="lg" className="border-slate-200">
        <div className="space-y-6">
          <div className="border-b border-slate-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Curriculum Intelligence &amp; Recommended Changes ({activeDistrict.name})
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Connecting empirical industry skill shortages with actionable recommendations for higher education boards.
              </p>
            </div>

            <Badge variant="brand" size="md">
              Institutional Advisory Engine
            </Badge>
          </div>

          {/* Recommendations Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeDistrict.curriculumRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-5 rounded-2xl border border-slate-200 bg-white hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800">
                          {rec.targetSkill}
                        </span>
                        <span className="text-[11px] font-bold text-rose-600">
                          Gap: +{rec.gapPoints} pts
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 leading-snug">
                        {rec.title}
                      </h4>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 ${
                        rec.priority === 'CRITICAL'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {rec.priority}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong className="text-slate-800 font-semibold">Suggested Action: </strong>
                    {rec.suggestedAction}
                  </p>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>Reason:</span>
                      <span className="font-semibold text-slate-800">Supply vs Demand Disparity</span>
                    </div>
                    <p className="text-[11px] text-slate-600 italic">
                      "{rec.justification}"
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveEvidenceModal(rec)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-500" />
                    <span>View Evidence</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleRecommendAction(rec)}
                    className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <Send className="w-3 h-3" />
                    <span>Recommend to Institutes</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 8. Evidence Drawer / Modal */}
      {activeEvidenceModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div
            className="relative bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between border-b border-slate-100 pb-3">
              <div className="space-y-1">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wider">
                  Algorithmic Proof &amp; Ingestion Records
                </span>
                <h3 className="text-base font-bold text-slate-900">
                  {activeEvidenceModal.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveEvidenceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Primary Telemetry Source</span>
                <span className="font-bold text-slate-900 text-sm block">{activeEvidenceModal.evidenceSource}</span>
                <p className="text-slate-600 leading-relaxed mt-1">
                  {activeEvidenceModal.evidenceDetails}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Industry Requirement</span>
                  <span className="text-lg font-black text-blue-700">{activeEvidenceModal.industryRequirement}%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Proficiency</span>
                  <span className="text-lg font-black text-slate-800">{activeEvidenceModal.studentProficiency}%</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-rose-500 block">Net Gap Points</span>
                  <span className="text-lg font-black text-rose-600">+{activeEvidenceModal.gapPoints}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Impacted Academic Programs:</span>
                <div className="flex flex-wrap gap-1.5">
                  {activeEvidenceModal.affectedDegreePrograms.map((prog) => (
                    <span key={prog} className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-800 font-semibold text-[11px]">
                      {prog}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveEvidenceModal(null)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleRecommendAction(activeEvidenceModal);
                  setActiveEvidenceModal(null);
                }}
                className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Approve &amp; Send to Institutes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
