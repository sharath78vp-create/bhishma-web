import type { FC } from 'react';
import { Cpu, FileText, CheckCircle2, ChevronRight, Gauge } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';

export const CurriculumMethodology: FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Industry Skill Extraction',
      desc: 'Aggregates required technical competencies from live employer requisitions.',
      icon: Cpu,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10',
      border: 'border-indigo-500/30'
    },
    {
      num: '02',
      title: 'Syllabus Topic Parsing',
      desc: 'NLP keyword & taxonomy extraction over university course syllabus PDFs.',
      icon: FileText,
      color: 'text-brand-400',
      bg: 'bg-brand-500/10',
      border: 'border-brand-500/30'
    },
    {
      num: '03',
      title: 'Domain Relevance Weight',
      desc: 'Applies hiring volume and time-to-fill velocity weights to each competency.',
      icon: Gauge,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10',
      border: 'border-cyan-500/30'
    },
    {
      num: '04',
      title: 'Alignment Index Output',
      desc: 'Normalized 0–100% parity score identifying missing vs baseline coverage.',
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30'
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px] uppercase">
            Prototype Alignment Methodology
          </Badge>
        }
      >
        <CardTitle className="text-sm sm:text-base">
          How BHISHMA Calculates Curriculum Alignment
        </CardTitle>
        <CardDescription>
          Mathematical formulation: comparing accredited university learning outcomes against real-world industrial demand weights
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative p-3.5 rounded-lg bg-slate-950/60 border border-slate-800/80 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-500">
                      PHASE {step.num}
                    </span>
                    <div className={`p-1 rounded ${step.bg} ${step.border} border`}>
                      <Icon className={`w-3 h-3 ${step.color}`} />
                    </div>
                  </div>

                  <h5 className="text-xs font-bold text-white mt-2 truncate">{step.title}</h5>

                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    {step.desc}
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
