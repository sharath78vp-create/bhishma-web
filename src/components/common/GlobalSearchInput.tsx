import { useState, useRef, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Brain,
  Briefcase,
  Building2,
  MapPin,
  GraduationCap,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  category: 'skills' | 'jobs' | 'industries' | 'regions' | 'institutes' | 'recommendations';
  title: string;
  subtitle: string;
  path: string;
  stateContext?: {
    stateName?: string;
    districtName?: string;
    skillName?: string;
    jobTitle?: string;
    industryName?: string;
  };
}

const searchableDatabase: SearchResultItem[] = [
  // SKILLS
  { id: 's1', category: 'skills', title: 'Cloud Computing (AWS/Azure)', subtitle: 'High Deficit (-33 pts) • 1,840 Requisitions in Hyderabad', path: '/intelligence', stateContext: { skillName: 'Cloud Computing (AWS/Azure)', districtName: 'Hyderabad' } },
  { id: 's2', category: 'skills', title: 'Python', subtitle: 'Primary Tech Skill • 82% Market Demand • Hyderabad & Bengaluru', path: '/intelligence', stateContext: { skillName: 'Python', districtName: 'Hyderabad' } },
  { id: 's3', category: 'skills', title: 'Data Engineering & ETL', subtitle: 'Critical Gap (-22 pts) • 980 Requisitions', path: '/intelligence', stateContext: { skillName: 'Data Engineering (ETL/Pipelines)', districtName: 'Hyderabad' } },
  { id: 's4', category: 'skills', title: 'Power BI & Visual Analytics', subtitle: 'Moderate Gap (-14 pts) • 1,240 Data Analyst openings', path: '/intelligence', stateContext: { skillName: 'Power BI & Visual Analytics', districtName: 'Hyderabad' } },
  { id: 's5', category: 'skills', title: 'VLSI RTL Verification', subtitle: 'Critical Shortage (-51 pts) • Semiconductor Hubs', path: '/intelligence/emerging-skills', stateContext: { skillName: 'VLSI Verification' } },
  { id: 's6', category: 'skills', title: 'Cybersecurity Architecture', subtitle: 'High Deficit (-24 pts) • Financial District Hub', path: '/intelligence/skill-demand', stateContext: { skillName: 'Cybersecurity' } },

  // JOBS
  { id: 'j1', category: 'jobs', title: 'Data Analyst', subtitle: '1,240 Openings in Hyderabad • High Demand for Power BI & SQL', path: '/intelligence', stateContext: { jobTitle: 'Data Analyst', districtName: 'Hyderabad' } },
  { id: 'j2', category: 'jobs', title: 'Cloud Solutions Engineer', subtitle: '1,840 Openings in Hyderabad • AWS/Azure & Docker', path: '/intelligence', stateContext: { jobTitle: 'Cloud Solutions Engineer', districtName: 'Hyderabad' } },
  { id: 'j3', category: 'jobs', title: 'Data Engineer (Big Data & ETL)', subtitle: '980 Openings • PySpark & SQL Optimization', path: '/intelligence', stateContext: { jobTitle: 'Data Engineer (Big Data & ETL)', districtName: 'Hyderabad' } },
  { id: 'j4', category: 'jobs', title: 'VLSI RTL Design & Verification Engineer', subtitle: '680 Openings • SystemVerilog & UVM testbenches', path: '/intelligence', stateContext: { jobTitle: 'VLSI RTL Design & Verification Engineer', districtName: 'Hyderabad' } },
  { id: 'j5', category: 'jobs', title: 'EV Powertrain & BMS Engineer', subtitle: '540 Openings • High Voltage & Battery Safety', path: '/intelligence', stateContext: { jobTitle: 'EV Powertrain & BMS Engineer', districtName: 'Hyderabad' } },

  // INDUSTRIES
  { id: 'i1', category: 'industries', title: 'Information Technology & Software', subtitle: '428 Active Industries • 12,480 Total Jobs in Hyderabad', path: '/intelligence', stateContext: { industryName: 'Information Technology', districtName: 'Hyderabad' } },
  { id: 'i2', category: 'industries', title: 'FinTech & Enterprise Analytics', subtitle: 'Nanakramguda Financial District Cluster', path: '/intelligence', stateContext: { industryName: 'FinTech', districtName: 'Hyderabad' } },
  { id: 'i3', category: 'industries', title: 'Semiconductors & VLSI Design', subtitle: 'High growth cluster • 68 regional firms', path: '/intelligence', stateContext: { industryName: 'Semiconductors', districtName: 'Hyderabad' } },
  { id: 'i4', category: 'industries', title: 'Electric Vehicles & Clean Mobility', subtitle: '54 firms across southern industrial corridor', path: '/intelligence', stateContext: { industryName: 'Electric Vehicles', districtName: 'Hyderabad' } },

  // REGIONS
  { id: 'r1', category: 'regions', title: 'Hyderabad District (Telangana)', subtitle: '12,480 Jobs • 34 Institutes • Top Skill: Python (82%)', path: '/intelligence', stateContext: { stateName: 'Telangana', districtName: 'Hyderabad' } },
  { id: 'r2', category: 'regions', title: 'Rangareddy District (Telangana)', subtitle: '14,200 Jobs • Very High Demand / High Gap • Hardware Park', path: '/intelligence', stateContext: { stateName: 'Telangana', districtName: 'Rangareddy' } },
  { id: 'r3', category: 'regions', title: 'Warangal District (Telangana)', subtitle: '3,120 Jobs • Kakatiya IT Incubation Center', path: '/intelligence', stateContext: { stateName: 'Telangana', districtName: 'Warangal' } },
  { id: 'r4', category: 'regions', title: 'Bengaluru Urban (Karnataka)', subtitle: '28,400 Jobs • Electronic City & Whitefield', path: '/intelligence', stateContext: { stateName: 'Karnataka', districtName: 'Bengaluru Urban' } },
  { id: 'r5', category: 'regions', title: 'Pune (Maharashtra)', subtitle: '16,800 Jobs • Hinjewadi Infotech Park', path: '/intelligence', stateContext: { stateName: 'Maharashtra', districtName: 'Pune' } },

  // INSTITUTES
  { id: 'inst1', category: 'institutes', title: 'Apex Technical Institute & Engineering College', subtitle: '4,820 Enrolled Students • HITEC City Node', path: '/intelligence/institutes' },
  { id: 'inst2', category: 'institutes', title: 'IIIT Hyderabad Research Campus', subtitle: 'Premier AI & Machine Learning Lab Node', path: '/intelligence/institutes' },
  { id: 'inst3', category: 'institutes', title: 'Osmania University College of Engineering', subtitle: '3,400 Students • Public University Technical Faculty', path: '/intelligence/institutes' },

  // RECOMMENDATIONS
  { id: 'rec1', category: 'recommendations', title: 'Cloud Computing Curriculum Upgrade (40h Lab)', subtitle: 'High Priority Recommendation • Addresses 33-pt Deficit in Hyderabad', path: '/intelligence/curriculum' },
  { id: 'rec2', category: 'recommendations', title: 'Data Engineering & PySpark Elective Addition', subtitle: 'Semester 6 Syllabus Expansion for Big Data Pipelines', path: '/intelligence/curriculum' },
  { id: 'rec3', category: 'recommendations', title: 'Power BI Practical Capstone Project Standard', subtitle: 'Data Analyst Role Requisition Alignment', path: '/intelligence/curriculum' },
  { id: 'rec4', category: 'recommendations', title: 'VLSI SystemVerilog & UVM Verification Certification', subtitle: 'Semiconductor Tapeout Workforce Deficit Response', path: '/intelligence/curriculum' }
];

export const GlobalSearchInput: FC = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter items matching query across title, category, or subtitle
  const cleanQuery = query.trim().toLowerCase();
  const filteredResults = cleanQuery.length === 0
    ? []
    : searchableDatabase.filter((item) => {
        return (
          item.title.toLowerCase().includes(cleanQuery) ||
          item.subtitle.toLowerCase().includes(cleanQuery) ||
          item.category.toLowerCase().includes(cleanQuery)
        );
      });

  // Group by category
  const groupedResults = {
    skills: filteredResults.filter((r) => r.category === 'skills'),
    jobs: filteredResults.filter((r) => r.category === 'jobs'),
    industries: filteredResults.filter((r) => r.category === 'industries'),
    regions: filteredResults.filter((r) => r.category === 'regions'),
    institutes: filteredResults.filter((r) => r.category === 'institutes'),
    recommendations: filteredResults.filter((r) => r.category === 'recommendations')
  };

  const handleSelectResult = (item: SearchResultItem) => {
    setIsOpen(false);
    setQuery('');

    // Dispatches custom event for the intelligence command center to auto-select matching filters
    if (item.stateContext) {
      window.dispatchEvent(
        new CustomEvent('intelligence-search-navigate', {
          detail: item.stateContext
        })
      );
    }

    navigate(item.path);
  };

  const categoryMeta: Record<string, { label: string; icon: any; color: string }> = {
    skills: { label: 'Skills & Competencies', icon: Brain, color: 'text-blue-600' },
    jobs: { label: 'Job Roles & Demand', icon: Briefcase, color: 'text-indigo-600' },
    industries: { label: 'Industries & Sectors', icon: Building2, color: 'text-purple-600' },
    regions: { label: 'Districts & Regions', icon: MapPin, color: 'text-emerald-600' },
    institutes: { label: 'Institutes & Academies', icon: GraduationCap, color: 'text-amber-600' },
    recommendations: { label: 'Curriculum Recommendations', icon: Lightbulb, color: 'text-rose-600' }
  };

  const hasResults = filteredResults.length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      {/* WhatsApp / Spotlight Style Search Box */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder="Search skills, jobs, industries, districts, institutes..."
          className="w-full pl-9 pr-8 py-2 text-xs rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400 shadow-2xs"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="p-1 rounded-full text-slate-400 hover:text-slate-600 absolute right-2.5"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Instant Intelligent Search Dropdown */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 max-h-[420px] overflow-y-auto animate-fade-in divide-y divide-slate-100">
          {!hasResults && (
            <div className="p-6 text-center text-xs text-slate-500 space-y-1">
              <Search className="w-6 h-6 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-700">No matching intelligence records found</p>
              <p className="text-[11px] text-slate-400">
                Try searching for "Cloud", "Data Analyst", "Hyderabad", "Python", or "Curriculum"
              </p>
            </div>
          )}

          {hasResults && (
            <>
              {Object.entries(groupedResults).map(([catKey, items]) => {
                if (items.length === 0) return null;
                const meta = categoryMeta[catKey] || { label: catKey, icon: Search, color: 'text-slate-500' };
                const IconComp = meta.icon;

                return (
                  <div key={catKey} className="p-2.5">
                    {/* Category Header */}
                    <div className="flex items-center gap-1.5 px-2 py-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                      <IconComp className={`w-3.5 h-3.5 ${meta.color}`} />
                      <span>{meta.label}</span>
                      <span className="ml-auto text-[9px] font-bold text-slate-400">
                        {items.length}
                      </span>
                    </div>

                    {/* Result Items */}
                    <div className="space-y-1 mt-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => handleSelectResult(item)}
                          className="px-3 py-2 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200/60 cursor-pointer transition-all flex items-center justify-between group select-none"
                        >
                          <div className="min-w-0 pr-2">
                            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors truncate">
                              {item.title}
                            </div>
                            <div className="text-[11px] text-slate-500 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
};
