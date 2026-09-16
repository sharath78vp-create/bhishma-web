import type { FC } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Bell, Database, Menu, MapPin } from 'lucide-react';
import { Badge } from '../components/ui/Badge';

const routeTitleMap: Record<string, { title: string; subtitle: string; scope: string }> = {
  '/': {
    title: 'National Overview',
    subtitle: 'Macro labour signals, aggregate skill shortages, and regional indices',
    scope: 'National Aggregate'
  },
  '/labour-market': {
    title: 'Regional Intelligence',
    subtitle: 'Geospatial demand vs training capacity, net regional deficits, and state node telemetry',
    scope: 'National + State Nodes'
  },
  '/skill-intelligence': {
    title: 'Skill Intelligence Engine',
    subtitle: 'Emerging vs declining skills taxonomy and talent deficit scores',
    scope: 'Cross-Sector Taxonomy'
  },
  '/curriculum-alignment': {
    title: 'Curriculum Alignment & Audit',
    subtitle: 'Higher education syllabus relevance, obsolete modules, and gap diagnostics',
    scope: 'Collegiate Tier 1-3'
  },
  '/early-warnings': {
    title: 'Early Warning Radar',
    subtitle: 'Predictive redundancy risks and critical talent supply bottlenecks',
    scope: 'High-Risk Sectors'
  },
  '/recommendations': {
    title: 'Policy Interventions & Recommendations',
    subtitle: 'Evidence-backed training mandates, funding allocations, and co-ops',
    scope: 'Institutional Playbooks'
  },
  '/what-if-simulator': {
    title: 'What-If Policy Simulator',
    subtitle: 'Scenario modeling for industrial policy shifts and curriculum revisions',
    scope: 'Multi-Year Projections'
  },
};

interface HeaderProps {
  onMenuToggle?: () => void;
}

export const Header: FC<HeaderProps> = ({ onMenuToggle }) => {
  const location = useLocation();
  const currentRoute = routeTitleMap[location.pathname] || {
    title: 'BHISHMA Intelligence Platform',
    subtitle: 'AI-Powered Labour Market Intelligence & Curriculum Alignment',
    scope: 'National Telemetry'
  };

  return (
    <header className="h-16 border-b border-slate-800/90 bg-slate-950/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between gap-3">
      {/* Mobile Hamburger & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuToggle}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 border border-slate-800 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
              {currentRoute.title}
            </h1>
            <Badge variant="default" className="hidden sm:inline-flex text-[10px] uppercase font-bold py-0 px-2 text-slate-300">
              {currentRoute.scope}
            </Badge>
          </div>
          <p className="text-[11px] text-slate-400 hidden lg:block truncate max-w-xl">
            {currentRoute.subtitle}
          </p>
        </div>
      </div>

      {/* Institutional Metadata & Action Area */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Prototype Scope Badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
          <span>Scope: National + Telangana Cluster</span>
        </div>

        {/* Prototype Model Indicator */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-900/90 border border-slate-800 text-[11px] text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-slate-400">Benchmark:</span>
          <span className="font-semibold text-slate-200">Sep 2026 Model</span>
        </div>

        {/* Dataset Indicator */}
        <div
          className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
          title="Data sources: PLFS, AICTE Syllabi, Job Ingestion APIs"
          aria-label="Data benchmark sources synced"
        >
          <Database className="w-4 h-4 text-slate-400" />
        </div>

        {/* Alert Indicator */}
        <Link
          to="/early-warnings"
          className="relative p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200 transition-colors block"
          title="3 active early warning notifications"
          aria-label="Early warning alerts"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-slate-950"></span>
        </Link>
      </div>
    </header>
  );
};

