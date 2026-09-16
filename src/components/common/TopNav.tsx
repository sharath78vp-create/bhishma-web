import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Menu, User, CheckCircle2, LogOut, ShieldCheck } from 'lucide-react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Badge } from './Badge';
import type { BadgeVariant } from './Badge';
import type { UserRole } from '../../types/skillbridge';
import { GlobalSearchInput } from './GlobalSearchInput';

interface TopNavProps {
  onMenuToggle: () => void;
}

export const TopNav: FC<TopNavProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const { currentRole, logout, student, trainer, notification } = useSkillBridge();

  const roleMeta: Record<UserRole, { label: string; userText: string; badgeVariant: BadgeVariant }> = {
    student: {
      label: 'Learner Portal',
      userText: student.name,
      badgeVariant: 'brand'
    },
    trainer: {
      label: 'Trainer & Faculty Portal',
      userText: trainer.name,
      badgeVariant: 'warning'
    },
    institute: {
      label: 'Institute & Partner Portal',
      userText: 'Apex Institute of Tech & Science',
      badgeVariant: 'purple'
    },
    intelligence: {
      label: 'Admin & Skill Intelligence Portal',
      userText: 'Admin & Skill Intelligence Cell',
      badgeVariant: 'success'
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const currentMeta = roleMeta[currentRole] || roleMeta.student;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-2xs">
      {/* Toast Notification Banner */}
      {notification && (
        <div className="bg-brand-600 text-white px-4 py-2 text-xs font-medium flex items-center justify-between shadow-xs animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-brand-200" />
            <span>{notification}</span>
          </div>
          <span className="text-[11px] text-brand-200 font-mono">Real-time Session Locked</span>
        </div>
      )}

      <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
        {/* Left: Mobile hamburger & Active role title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden focus-visible:ring-2 focus-visible:ring-brand-500"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-sm sm:text-base font-bold text-slate-900 truncate">
              {currentMeta.label}
            </span>
            <Badge variant={currentMeta.badgeVariant} size="sm" className="hidden sm:inline-flex">
              Session Active
            </Badge>
          </div>
        </div>

        {/* Center: Global Intelligent Search Bar */}
        <div className="hidden md:flex flex-1 max-w-md mx-2">
          <GlobalSearchInput />
        </div>

        {/* Right: User Profile & Session Lock Logout */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          {/* User Profile Pill */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-brand-50 border border-brand-200 text-brand-700 flex items-center justify-center font-semibold text-xs">
              <User className="w-4 h-4" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                {currentMeta.userText}
              </span>
              <span className="text-[10px] text-slate-400 capitalize">
                {currentRole} Session Locked
              </span>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            title="End Session & Logout"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
