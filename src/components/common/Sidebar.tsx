import type { FC, ComponentType } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Brain,
  BookOpen,
  CheckCircle2,
  Target,
  Briefcase,
  User,
  Users,
  GraduationCap,
  Layers,
  Award,
  BookMarked,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Sparkles,
  MapPin,
  Building2,
  Database,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings,
  X
} from 'lucide-react';
import { useSkillBridge } from '../../context/SkillBridgeContext';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

interface NavItemConfig {
  label: string;
  path: string;
  icon: ComponentType<{ className?: string }>;
  badge?: string;
}

export const Sidebar: FC<SidebarProps> = ({
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile
}) => {
  const { currentRole, logout, heroRecommendation } = useSkillBridge();
  const navigate = useNavigate();

  // Role-specific navigation items
  const studentNav: NavItemConfig[] = [
    { label: 'Overview', path: '/student', icon: LayoutDashboard },
    { label: 'My Skills', path: '/student/skills', icon: Brain },
    { label: 'Learning', path: '/student/learning', icon: BookOpen },
    { label: 'Assessments', path: '/student/assessments', icon: CheckCircle2 },
    { label: 'Skill Gap', path: '/student/skill-gap', icon: Target },
    { label: 'Opportunities', path: '/student/opportunities', icon: Briefcase },
    { label: 'Profile', path: '/student/profile', icon: User }
  ];

  const instituteNav: NavItemConfig[] = [
    { label: 'Overview', path: '/institute', icon: LayoutDashboard },
    { label: 'Students', path: '/institute/students', icon: Users },
    { label: 'Trainers', path: '/institute/trainers', icon: GraduationCap },
    { label: 'Training Programs', path: '/institute/programs', icon: Layers },
    { label: 'Skill Gaps', path: '/institute/skill-gaps', icon: Target },
    { label: 'Assessments', path: '/institute/assessments', icon: Award },
    { label: 'Placements', path: '/institute/placements', icon: Briefcase },
    { label: 'Curriculum', path: '/institute/curriculum', icon: BookMarked },
    {
      label: 'Recommendations',
      path: '/institute/recommendations',
      icon: Lightbulb,
      badge: heroRecommendation.status === 'sent_to_institute' ? '1 New' : undefined
    }
  ];

  const trainerNav: NavItemConfig[] = [
    { label: 'Trainer Dashboard', path: '/trainer', icon: LayoutDashboard },
    { label: 'Assigned Programs', path: '/trainer/programs', icon: Layers },
    { label: 'Student Cohorts', path: '/trainer/students', icon: Users },
    { label: 'Assessment Grading', path: '/trainer/assessments', icon: Award },
    { label: 'Skill Gap Alerts', path: '/trainer/skill-gaps', icon: Target },
    { label: 'Faculty Upskilling', path: '/trainer/upskilling', icon: Sparkles }
  ];

  const intelligenceNav: NavItemConfig[] = [
    { label: 'Market Overview', path: '/intelligence', icon: TrendingUp },
    { label: 'Skill Demand', path: '/intelligence/skill-demand', icon: BarChart3 },
    { label: 'Emerging Skills', path: '/intelligence/emerging-skills', icon: Sparkles },
    { label: 'Regional Trends', path: '/intelligence/regional-trends', icon: MapPin },
    { label: 'Skill Gaps', path: '/intelligence/skill-gaps', icon: Target },
    { label: 'Institute Insights', path: '/intelligence/institutes', icon: Building2 },
    { label: 'Curriculum Recommendations', path: '/intelligence/curriculum', icon: Lightbulb },
    { label: 'Data Sources', path: '/intelligence/data-sources', icon: Database }
  ];

  const activeNavItems =
    currentRole === 'student'
      ? studentNav
      : currentRole === 'trainer'
      ? trainerNav
      : currentRole === 'institute'
      ? instituteNav
      : intelligenceNav;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen bg-white border-r border-slate-200 transition-all duration-300 ease-in-out flex flex-col ${
          collapsed ? 'lg:w-20' : 'lg:w-64'
        } ${mobileOpen ? 'w-64 translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-brand-600 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
              SB
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-sm text-slate-900 tracking-tight leading-tight">
                  SkillBridge
                </span>
                <span className="text-[10px] text-slate-400 truncate">
                  Skills &bull; Training &bull; Jobs
                </span>
              </div>
            )}
          </div>

          {mobileOpen && (
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 lg:hidden"
              aria-label="Close navigation"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Role Switcher Pill in Sidebar when Expanded */}
        {(!collapsed || mobileOpen) && (
          <div className="px-4 pt-3 pb-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Portal Navigation
            </div>
          </div>
        )}

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          {activeNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/student' || item.path === '/institute' || item.path === '/intelligence'}
                onClick={() => {
                  if (mobileOpen) onCloseMobile();
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-colors group select-none ${
                    isActive
                      ? 'bg-brand-50 text-brand-700 font-semibold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  } ${collapsed && !mobileOpen ? 'justify-center px-2' : ''}`
                }
                title={collapsed && !mobileOpen ? item.label : undefined}
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-105" />
                {(!collapsed || mobileOpen) && (
                  <span className="truncate flex-1">{item.label}</span>
                )}
                {(!collapsed || mobileOpen) && item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="p-3 border-t border-slate-100 shrink-0 space-y-1 bg-slate-50/50">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors ${
              collapsed && !mobileOpen ? 'justify-center px-2' : ''
            }`}
            title="Logout"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {(!collapsed || mobileOpen) && <span>Logout</span>}
          </button>

          {/* Desktop collapse toggle */}
          <button
            onClick={onToggle}
            className="w-full hidden lg:flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>
      </aside>
    </>
  );
};
