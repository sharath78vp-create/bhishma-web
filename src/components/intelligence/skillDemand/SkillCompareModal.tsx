import React from 'react';
import type { FC } from 'react';
import { X, Scale, Trash2 } from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface SkillCompareModalProps {
  skills: SkillDemandIntelligenceItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveSkill: (skillId: string) => void;
  onClearAll: () => void;
}

export const SkillCompareModal: FC<SkillCompareModalProps> = ({
  skills,
  isOpen,
  onClose,
  onRemoveSkill,
  onClearAll
}) => {
  if (!isOpen || skills.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-5xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-indigo-50 text-indigo-700 border border-indigo-200">
              <Scale className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Side-by-Side Skill Comparison
              </h2>
              <p className="text-xs text-slate-500">
                Comparing {skills.length} competencies across demand, supply, curriculum coverage, and market trajectory.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClearAll}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors"
            >
              Clear Comparison
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto">
          <div className={`grid grid-cols-1 md:grid-cols-${Math.min(skills.length, 3)} gap-5`}>
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4 relative flex flex-col justify-between"
              >
                <div>
                  {/* Skill Header */}
                  <div className="flex items-start justify-between gap-2 border-b border-slate-200/80 pb-3">
                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                        {skill.category}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-0.5">
                        {skill.skill}
                      </h3>
                    </div>
                    <button
                      onClick={() => onRemoveSkill(skill.id)}
                      className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove from compare"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Metrics Comparison */}
                  <div className="mt-3 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/80">
                      <span className="text-slate-600">Industry Demand:</span>
                      <strong className="text-blue-600 font-extrabold">{skill.industryDemand}%</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/80">
                      <span className="text-slate-600">Student Interest:</span>
                      <strong className="text-indigo-600 font-extrabold">{skill.studentInterest}%</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/80">
                      <span className="text-slate-600">Curriculum Coverage:</span>
                      <strong className="text-emerald-600 font-extrabold">{skill.curriculumCoverage}%</strong>
                    </div>

                    <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-200/80">
                      <span className="text-slate-600">Student Supply:</span>
                      <strong className="text-slate-800 font-extrabold">{skill.studentSupply}%</strong>
                    </div>

                    <div className="flex justify-between items-center bg-rose-50 p-2 rounded-lg border border-rose-200 text-rose-800 font-bold">
                      <span>Demand-Supply Gap:</span>
                      <span>+{skill.demandSupplyGap}%</span>
                    </div>

                    <div className="flex justify-between items-center bg-teal-50 p-2 rounded-lg border border-teal-200 text-teal-800 font-bold">
                      <span>YoY Growth:</span>
                      <span>+{skill.yoyGrowth}%</span>
                    </div>
                  </div>

                  {/* Requisition stats */}
                  <div className="mt-3 pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p>
                      <strong>Active Postings:</strong> {skill.activeJobPostings.toLocaleString()}
                    </p>
                    <p>
                      <strong>Avg Package:</strong> ₹{skill.avgStartingSalaryLPA} LPA
                    </p>
                    <p>
                      <strong>Top Sectors:</strong> {skill.industries.slice(0, 2).join(', ')}
                    </p>
                  </div>
                </div>

                {/* Curriculum note */}
                <div className="mt-3 p-3 rounded-lg bg-emerald-50 text-[11px] text-emerald-900 border border-emerald-200">
                  <strong>Curriculum Action:</strong>
                  <p className="mt-1 line-clamp-3">{skill.curriculumRecommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-slate-100 bg-slate-50 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold"
          >
            Close Comparison
          </button>
        </div>
      </div>
    </div>
  );
};
