import type { FC } from 'react';
import { Database, Cpu, Filter, BarChart3, TrendingUp, AlertTriangle, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const SkillIntelligencePipeline: FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Job Ingestion',
      subtitle: 'Multi-portal requisitions',
      desc: 'Raw job postings ingested via public APIs and employment telemetries.',
      icon: Database,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10'
    },
    {
      step: '02',
      title: 'NLP Extraction',
      subtitle: 'Entity & token parsing',
      desc: 'Transformer-based token extraction identifies raw candidate skill mentions.',
      icon: Cpu,
      color: 'text-brand-400',
      border: 'border-brand-500/30',
      bg: 'bg-brand-500/10'
    },
    {
      step: '03',
      title: 'Normalization',
      subtitle: 'Taxonomy mapping',
      desc: 'Maps disparate job descriptions to standardized 14 national competency nodes.',
      icon: Filter,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10'
    },
    {
      step: '04',
      title: 'Aggregation',
      subtitle: 'Corridor grouping',
      desc: 'Volume aggregation across regional hubs (e.g., Hyderabad, Bengaluru, Pune).',
      icon: BarChart3,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10'
    },
    {
      step: '05',
      title: 'Trend Detection',
      subtitle: '12-month momentum',
      desc: 'Time-series algorithms detect rapid growth trajectories or legacy contractions.',
      icon: TrendingUp,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10'
    },
    {
      step: '06',
      title: 'Gap Analysis',
      subtitle: 'Syllabi vs demand',
      desc: 'Direct cross-referencing with AICTE curriculum audits to compute net deficits.',
      icon: AlertTriangle,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10'
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px] uppercase tracking-wider">
            Prototype Intelligence Pipeline
          </Badge>
        }
      >
        <CardTitle className="text-sm sm:text-base">
          How BHISHMA Derives Skill Intelligence
        </CardTitle>
        <CardDescription>
          Methodological architecture: transforming unstructured employment postings into normalized skill signals and curriculum deficits
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="relative p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      STEP {s.step}
                    </span>
                    <div className={`p-1 rounded ${s.bg} ${s.border} border`}>
                      <Icon className={`w-3 h-3 ${s.color}`} />
                    </div>
                  </div>

                  <h5 className="text-xs font-bold text-white mt-2 truncate">{s.title}</h5>
                  <span className="text-[10px] text-slate-400 font-medium block">{s.subtitle}</span>

                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1.5">
                    {s.desc}
                  </p>
                </div>

                {idx < steps.length - 1 && (
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
