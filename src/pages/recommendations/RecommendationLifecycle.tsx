import type { FC } from 'react';
import { 
  Radar, 
  Cpu, 
  FileCheck2, 
  UserCheck, 
  Landmark, 
  Activity, 
  CheckCircle2, 
  Clock, 
  CircleDot
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

interface Step {
  id: string;
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  timestamp?: string;
  actor: string;
  icon: typeof Radar;
}

const LIFECYCLE_STEPS: Step[] = [
  {
    id: 'step-1',
    stepNumber: '01',
    title: 'Signal Ingestion',
    subtitle: 'Automated Triangulation',
    description: 'Ingestion of 99.8K job postings, PLFS survey logs, and AICTE placement figures across Telangana.',
    status: 'completed',
    timestamp: 'Aug 28, 2026',
    actor: 'BHISHMA Data Harvester',
    icon: Radar
  },
  {
    id: 'step-2',
    stepNumber: '02',
    title: 'Deficit Synthesis',
    subtitle: 'Algorithmic Cross-Matching',
    description: 'Cross-tabulation reveals +46 point skill gap in dbt/SQL and +26 index regional deficit in Hyderabad.',
    status: 'completed',
    timestamp: 'Sep 02, 2026',
    actor: 'Gap Engine v2.4',
    icon: Cpu
  },
  {
    id: 'step-3',
    stepNumber: '03',
    title: 'Policy Formulation',
    subtitle: 'Intervention Synthesis',
    description: 'Generation of POL-304 with ₹145 Cr budget, 24,000 graduate target, and 91%–98% evidentiary confidence.',
    status: 'completed',
    timestamp: 'Sep 08, 2026',
    actor: 'Recommendation Matrix',
    icon: FileCheck2
  },
  {
    id: 'step-4',
    stepNumber: '04',
    title: 'Human-in-the-Loop',
    subtitle: 'Committee Review (Active)',
    description: 'State Skill Development Council evaluation, budget adjustments, and legislative alignment.',
    status: 'active',
    timestamp: 'In Progress (Active Session)',
    actor: 'Principal Secretary / User',
    icon: UserCheck
  },
  {
    id: 'step-5',
    stepNumber: '05',
    title: 'Executive Ratification',
    subtitle: 'Cabinet Clearance',
    description: 'Final sign-off by Finance & Higher Education departments; budget gazette release.',
    status: 'upcoming',
    timestamp: 'Scheduled Q4 2026',
    actor: 'Cabinet Committee on Skills',
    icon: Landmark
  },
  {
    id: 'step-6',
    stepNumber: '06',
    title: 'Continuous Feedback',
    subtitle: 'Outcome Monitoring',
    description: 'Post-launch cohort tracking measuring 6-month placement rates and employer salary increments.',
    status: 'upcoming',
    timestamp: 'Post-Intervention 2027',
    actor: 'Telemetry Stream',
    icon: Activity
  }
];

export const RecommendationLifecycle: FC = () => {
  return (
    <Card className="border-slate-800 bg-slate-900/60 backdrop-blur">
      <CardHeader
        action={
          <Badge variant="warning" size="sm" className="font-mono text-xs">
            STAGE 4 OF 6 ACTIVE
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Policy Intervention Governance Lifecycle</CardTitle>
            <CardDescription>
              End-to-end audit trail from autonomous telemetry detection to ministerial ratification and outcome monitoring
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {/* Horizontal Timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 relative">
          {LIFECYCLE_STEPS.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.status === 'completed';
            const isActive = step.status === 'active';
            const isUpcoming = step.status === 'upcoming';

            return (
              <div
                key={step.id}
                className={`relative rounded-xl border p-4 flex flex-col justify-between transition-all ${
                  isActive
                    ? 'border-amber-500/50 bg-gradient-to-b from-amber-500/10 to-slate-900/80 shadow-lg shadow-amber-500/5 ring-1 ring-amber-500/30'
                    : isCompleted
                    ? 'border-emerald-500/30 bg-slate-900/80'
                    : 'border-slate-800 bg-slate-950/40 opacity-60'
                }`}
              >
                <div>
                  {/* Top row: step number + status icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      STEP {step.stepNumber}
                    </span>

                    {isCompleted && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    {isActive && (
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                        <CircleDot className="w-4 h-4 text-amber-400" />
                      </div>
                    )}
                    {isUpcoming && (
                      <Clock className="w-4 h-4 text-slate-500" />
                    )}
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className={`p-1.5 rounded-lg ${
                        isActive
                          ? 'bg-amber-500/20 text-amber-300'
                          : isCompleted
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white leading-tight">
                        {step.title}
                      </h4>
                      <p className="text-[11px] font-mono text-slate-400">
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-3">
                    {step.description}
                  </p>
                </div>

                {/* Footer metadata */}
                <div className="pt-2 border-t border-slate-800/80 mt-2 text-[10px] font-mono">
                  <div className="text-slate-400 truncate">
                    <span className="text-slate-500">Actor:</span> {step.actor}
                  </div>
                  <div className={isActive ? 'text-amber-400 font-semibold' : 'text-slate-400'}>
                    {step.timestamp}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Context Banner */}
        <div className="mt-4 p-3 rounded-lg border border-slate-800 bg-slate-950/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>
              <strong className="text-white">Explainability Assurance:</strong> Every policy intervention generated by BHISHMA maintains full provenance back to demonstration benchmark records.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            System Compliance: SIH-26134 Rule Engine
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
