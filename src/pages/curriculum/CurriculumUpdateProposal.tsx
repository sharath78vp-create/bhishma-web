import type { FC } from 'react';
import { Sparkles, CheckCircle2, Terminal, Code, Cpu, Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { CurriculumAudit } from '../../types';

interface CurriculumUpdateProposalProps {
  course: CurriculumAudit;
}

export const CurriculumUpdateProposal: FC<CurriculumUpdateProposalProps> = ({ course }) => {
  const isHero = course.id === 'CURR-104';

  const heroModuleIcons = [Database, Terminal, Code, Cpu];

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm">
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px] uppercase">
            {course.recommendedModules.length} Modern Replacement Modules
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <CardTitle>Proposed Curriculum Overhaul Modules</CardTitle>
        </div>
        <CardDescription>
          Curated modular replacements designed to supersede deprecated topics and restore industry syllabus parity
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {course.recommendedModules.map((moduleName, idx) => {
            const Icon = isHero ? heroModuleIcons[idx % heroModuleIcons.length] : Sparkles;

            return (
              <div
                key={moduleName}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:border-slate-700 transition-all flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold text-brand-400">
                      MODULE {String(idx + 1).padStart(2, '0')}
                    </span>
                    <Badge variant="info" size="sm" className="text-[9px] py-0">
                      Credit Compatible
                    </Badge>
                  </div>

                  <div className="flex items-start gap-2 mt-2">
                    <div className="p-1.5 rounded-md bg-brand-500/10 text-brand-300 border border-brand-500/30 shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <h5 className="text-xs font-bold text-white leading-snug">
                      {moduleName}
                    </h5>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Replaces Obsolete Content
                  </span>
                  <span className="font-mono text-slate-300">Lab Hands-On</span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
