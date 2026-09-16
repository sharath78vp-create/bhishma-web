import type { FC } from 'react';
import { TrendingUp, BrainCircuit, AlertTriangle, Lightbulb, CheckCircle2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';

export const DecisionFlowSection: FC = () => {
  const steps = [
    {
      step: '01',
      label: 'DEMAND',
      title: 'Industry Signals',
      desc: 'Curated telemetry benchmark tracking 99.8K national requisitions and hiring velocity.',
      icon: TrendingUp,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10'
    },
    {
      step: '02',
      label: 'SKILLS',
      title: 'Required Capabilities',
      desc: 'NLP extraction of competencies like dbt, cloud data lakes, and prompt analytics.',
      icon: BrainCircuit,
      color: 'text-brand-400',
      border: 'border-brand-500/30',
      bg: 'bg-brand-500/10'
    },
    {
      step: '03',
      label: 'GAP',
      title: 'Training Mismatch',
      desc: 'Curriculum audits revealing 46% syllabus alignment in collegiate programs.',
      icon: AlertTriangle,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10'
    },
    {
      step: '04',
      label: 'ACTION',
      title: 'Policy Intervention',
      desc: 'Formulation of POL-304: ₹145 Cr cloud co-op sandbox across 45 engineering colleges.',
      icon: Lightbulb,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10'
    },
    {
      step: '05',
      label: 'OUTCOME',
      title: 'Feedback Loop',
      desc: 'Continuous tracking to compress graduate retraining lags and measure absorption.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10'
    }
  ];

  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="text-sm">Decision Intelligence Loop</CardTitle>
        <CardDescription>
          How BHISHMA transforms raw labour-market telemetry into evidence-backed state policy interventions
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="relative p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500 tracking-wider">
                      {item.step}
                    </span>
                    <span className={`text-[10px] font-mono font-bold tracking-wider px-1.5 py-0.2 rounded ${item.bg} ${item.color}`}>
                      {item.label}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2">
                    <div className={`p-1.5 rounded-md ${item.bg} ${item.border} border shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                    </div>
                    <span className="text-xs font-semibold text-white truncate">
                      {item.title}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">
                    {item.desc}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
