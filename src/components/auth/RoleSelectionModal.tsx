import { useState } from 'react';
import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { 
  X, 
  GraduationCap, 
  Users, 
  Building2, 
  BrainCircuit, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import type { UserRole } from '../../types/skillbridge';

interface RoleSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: 'login' | 'register';
}

export const RoleSelectionModal: FC<RoleSelectionModalProps> = ({
  isOpen,
  onClose,
  mode = 'register'
}) => {
  const navigate = useNavigate();
  const { setRole } = useSkillBridge();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');

  if (!isOpen) return null;

  const roles = [
    {
      id: 'student' as UserRole,
      title: 'Learner / Participant',
      tagline: 'Students, Job Seekers & Professionals',
      description: 'Learn from verified skill courses, map competencies, find skill pathways, and unlock global career opportunities.',
      icon: GraduationCap,
      color: 'brand',
      targetPath: '/student',
      demoUser: 'Rahul Kumar (Data Science)',
      stats: '63+ Skills & Certifications'
    },
    {
      id: 'trainer' as UserRole,
      title: 'Trainer / Instructor',
      tagline: 'Faculty, Mentors & Evaluators',
      description: 'Deliver modern skill programs, assess candidate competencies, conduct evaluation labs, and track cohort mastery.',
      icon: Users,
      color: 'amber',
      targetPath: '/trainer',
      demoUser: 'Prof. Arjun Rao (Applied AI)',
      stats: '180+ Active Students Assigned'
    },
    {
      id: 'institute' as UserRole,
      title: 'Institute / Academy',
      tagline: 'Universities, Training Centers & Partners',
      description: 'Learning partner, manage training centers, verify curriculum alignment, track faculty workloads, and manage placements.',
      icon: Building2,
      color: 'purple',
      targetPath: '/institute',
      demoUser: 'Apex Institute of Technology',
      stats: '4,820 Enrolled Students'
    },
    {
      id: 'intelligence' as UserRole,
      title: 'Admin / Intelligence Officer',
      tagline: 'Restricted Officer Access',
      description: 'Internal analytical & management portal for designated administrators and skill intelligence officers.',
      icon: BrainCircuit,
      color: 'emerald',
      targetPath: '/intelligence',
      demoUser: 'Admin & Skill Intelligence Cell',
      stats: 'Restricted Portal Access'
    }
  ];

  const handleProceed = () => {
    setRole(selectedRole);
    onClose();
    if (selectedRole === 'student') navigate('/student');
    else if (selectedRole === 'trainer') navigate('/trainer');
    else if (selectedRole === 'institute') navigate('/institute');
    else if (selectedRole === 'intelligence') navigate('/intelligence');
  };

  const handleDirectSelect = (role: UserRole) => {
    setSelectedRole(role);
    setRole(role);
    onClose();
    if (role === 'student') navigate('/student');
    else if (role === 'trainer') navigate('/trainer');
    else if (role === 'institute') navigate('/institute');
    else if (role === 'intelligence') navigate('/intelligence');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div 
        className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              DH
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Welcome to Digital Skill Hub
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-orange-800 border border-orange-200">
                  Verified Ecosystem
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Unified platform to access skilling courses, faculty tools, institutional accreditation, and intelligence.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Role Cards */}
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {mode === 'register' ? 'Select Your Account Type to Register' : 'Choose Your Portal to Sign In'}
            </span>
            <span className="text-[11px] text-brand-700 font-semibold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              Instant Role Switch Enabled
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {roles.map((r) => {
              const isSelected = selectedRole === r.id;
              const Icon = r.icon;

              return (
                <div
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  onDoubleClick={() => handleDirectSelect(r.id)}
                  className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer select-none flex flex-col justify-between text-left group ${
                    isSelected
                      ? 'border-brand-600 bg-brand-50/40 shadow-sm ring-1 ring-brand-500/30'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/60 bg-white'
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'bg-brand-600 text-white border-brand-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-slate-900 leading-snug">
                            {r.title}
                          </h3>
                          <span className="text-[11px] text-slate-500 font-medium block">
                            {r.tagline}
                          </span>
                        </div>
                      </div>

                      {/* Custom Radio checkmark */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                          isSelected
                            ? 'border-brand-600 bg-brand-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {r.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                    <span className="font-medium text-slate-500">
                      {r.stats}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDirectSelect(r.id);
                      }}
                      className="text-brand-700 hover:text-brand-900 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Enter &rarr;</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            By choosing to continue, you agree to accept all applicable{' '}
            <span className="text-brand-700 font-semibold cursor-pointer hover:underline">
              Terms &amp; Conditions
            </span>{' '}
            and{' '}
            <span className="text-brand-700 font-semibold cursor-pointer hover:underline">
              Privacy Policy
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/50 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleProceed}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-colors"
            >
              <span>Continue as {selectedRole.toUpperCase()}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
