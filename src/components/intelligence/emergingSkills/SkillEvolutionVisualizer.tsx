import { useState } from 'react';
import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { GitCommit, ArrowRight, Layers, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { mockSkillEvolutionPathways, type SkillEvolutionPathway } from '../../../mock/emergingSkillsIntelligenceData';

export const SkillEvolutionVisualizer: FC = () => {
  const [activePathwayId, setActivePathwayId] = useState<string>(mockSkillEvolutionPathways[0].id);

  const selectedPathway: SkillEvolutionPathway =
    mockSkillEvolutionPathways.find((p: SkillEvolutionPathway) => p.id === activePathwayId) || mockSkillEvolutionPathways[0];

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-sky-50 text-sky-700">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Skill Evolution & Transition Pathways
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Visualizing how foundational competencies transform into modern specializations rather than becoming obsolete
            </p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
          4 Structural Transition Tracks
        </span>
      </div>

      {/* Pathway Selector Pills */}
      <div className="flex flex-wrap gap-2 my-3 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
        {mockSkillEvolutionPathways.map((path: SkillEvolutionPathway) => {
          const isActive = path.id === selectedPathway.id;
          return (
            <button
              key={path.id}
              onClick={() => setActivePathwayId(path.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-white text-navy-900 shadow-sm border border-slate-300 text-slate-900 ring-1 ring-orange-500'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <GitCommit className={`w-3.5 h-3.5 ${isActive ? 'text-orange-500' : 'text-slate-400'}`} />
              <span>{path.title}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Pathway Description */}
      <div className="p-3 bg-sky-50/60 border border-sky-200/80 rounded-lg text-xs text-sky-900 flex items-start gap-2 mb-6">
        <Sparkles className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-sky-950">Track Focus: </span>
          <span>{selectedPathway.description}</span>
        </div>
      </div>

      {/* Transition Stepper / Flow Diagram */}
      <div className="relative">
        {/* Step Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {selectedPathway.steps.map((step, idx: number) => {
            const isLast = idx === selectedPathway.steps.length - 1;

            return (
              <div
                key={step.stage}
                className="flex flex-col justify-between bg-slate-50/80 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-4 transition-all relative group"
              >
                <div>
                  {/* Step Header */}
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-black text-slate-400 tracking-wider uppercase">
                      {step.stage}
                    </span>
                    <Badge
                      variant={
                        step.status === 'Future Frontier'
                          ? 'purple'
                          : step.status === 'Emerging'
                          ? 'success'
                          : step.status === 'Current Core'
                          ? 'neutral'
                          : 'warning'
                      }
                      size="sm"
                    >
                      {step.status}
                    </Badge>
                  </div>

                  {/* Step Title */}
                  <h4 className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {step.title}
                  </h4>

                  {/* Timeframe Indicator */}
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mt-1 mb-2.5">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{step.timeframe}</span>
                  </div>

                  {/* Step Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Footer Transition Indicator */}
                {!isLast && (
                  <div className="hidden md:flex items-center justify-end pt-3 mt-3 border-t border-slate-200/60 text-slate-400 group-hover:text-orange-500">
                    <span className="text-[10px] font-semibold mr-1">Evolves into</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
                {isLast && (
                  <div className="flex items-center justify-start pt-3 mt-3 border-t border-slate-200/60 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Next-Gen Target State</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Officer Advisory Footnote */}
      <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
        <span>
          💡 <strong>Curriculum Takeaway:</strong> Transition pathways demonstrate that faculty should integrate bridge modules rather than discarding foundational curricula.
        </span>
      </div>
    </Card>
  );
};
