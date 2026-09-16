import type { FC, ComponentType } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  TrendingUp,
  BrainCircuit,
  GraduationCap,
  AlertTriangle,
  Lightbulb,
  Sliders,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  X
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
  badgeVariant?: 'rose' | 'amber' | 'indigo';
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    title: 'Core Intelligence',
    items: [
      { label: 'Overview', path: '/', icon: LayoutDashboard },
      { label: 'Labour Market', path: '/labour-market', icon: TrendingUp },
      { label: 'Skill Intelligence', path: '/skill-intelligence', icon: BrainCircuit },
      { label: 'Curriculum Alignment', path: '/curriculum-alignment', icon: GraduationCap },
    ]
  },
  {
    title: 'Policy & Foresight',
    items: [
      { label: 'Early Warnings', path: '/early-warnings', icon: AlertTriangle, badge: '3', badgeVariant: 'rose' },
      { label: 'Recommendations', path: '/recommendations', icon: Lightbulb },
      { label: 'What-If Simulator', path: '/what-if-simulator', icon: Sliders },
    ]
  }
];

export const Sidebar: FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen = false,
  onCloseMobile
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Aside */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out border-r border-slate-800/90 bg-slate-950 flex flex-col ${
          collapsed ? 'md:w-20' : 'md:w-64'
        } ${
          mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Institutional Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-700 flex items-center justify-center shrink-0 border border-brand-500/30 shadow-sm">
              <span className="font-extrabold text-white text-base tracking-wider font-sans">भ</span>
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-sm tracking-wider text-white">BHISHMA</span>
                  <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
                    v2.4 Live
                  </span>
                </div>
                <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider truncate">
                  Labour Market Intelligence
                </span>
              </div>
            )}
          </div>

          {/* Mobile Close Button */}
          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-lg text-slate-400 hover:text-white md:hidden"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Navigation items grouped by domain */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              {(!collapsed || mobileOpen) && (
                <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {group.title}
                </p>
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (mobileOpen && onCloseMobile) {
                        onCloseMobile();
                      }
                    }}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-150 group select-none ${
                        isActive
                          ? 'bg-brand-600/15 text-white border-l-2 border-brand-500 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                      } ${collapsed && !mobileOpen ? 'justify-center px-2' : ''}`
                    }
                    title={collapsed && !mobileOpen ? item.label : undefined}
                  >
                    <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                    {(!collapsed || mobileOpen) && (
                      <span className="truncate flex-1">{item.label}</span>
                    )}
                    {(!collapsed || mobileOpen) && item.badge && (
                      <span
                        className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          item.badgeVariant === 'rose'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : 'bg-brand-500/20 text-brand-300 border border-brand-500/30'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>

        {/* Institutional Node Status & Collapse Toggle */}
        <div className="p-3 border-t border-slate-800/80 shrink-0 flex items-center justify-between bg-slate-950/40">
          {(!collapsed || mobileOpen) && (
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-[11px] font-medium truncate">Telemetry: Benchmark</span>
            </div>
          )}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors mx-auto hidden md:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            title={collapsed ? 'Expand navigation' : 'Collapse navigation'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};

