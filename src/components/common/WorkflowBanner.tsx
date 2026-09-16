import type { FC } from 'react';
import {
  TrendingUp,
  BrainCircuit,
  BarChart3,
  Target,
  Building2,
  GraduationCap,
  UserCheck,
  CheckCircle2,
  Briefcase,
  RotateCcw,
  BookOpen
} from 'lucide-react';

const pipelineSteps = [
  { label: 'Industry Data', icon: TrendingUp },
  { label: 'Skill Intelligence', icon: BrainCircuit },
  { label: 'Skill Demand', icon: BarChart3 },
  { label: 'Skill Gap', icon: Target },
  { label: 'Institute', icon: Building2 },
  { label: 'Training', icon: GraduationCap },
  { label: 'Student', icon: UserCheck },
  { label: 'Assessment', icon: CheckCircle2 },
  { label: 'Placement', icon: Briefcase },
  { label: 'Feedback', icon: RotateCcw },
  { label: 'Curriculum Action', icon: BookOpen }
];

export const WorkflowBanner: FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-card ${className}`}>
      <div className="flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-600 animate-pulse" />
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            System Closed-Loop Architecture (Continuous Talent Calibration)
          </h4>
        </div>
        <span className="text-[11px] text-slate-500 font-medium hidden sm:inline">
          Continuous Feedback Loop
        </span>
      </div>

      {/* Horizontal step flow with clean arrows */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        {pipelineSteps.map((step, idx) => {
          const Icon = step.icon;
          const isLast = idx === pipelineSteps.length - 1;

          return (
            <div key={step.label} className="flex items-center shrink-0">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 hover:border-brand-300 hover:bg-brand-50/50 hover:text-brand-700 transition-colors">
                <Icon className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                <span className="font-medium whitespace-nowrap text-[11px]">{step.label}</span>
              </div>
              {!isLast && (
                <span className="text-slate-300 mx-1 select-none font-bold text-xs">&rarr;</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
