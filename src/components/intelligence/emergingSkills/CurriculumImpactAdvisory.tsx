import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { BookOpen, FileText, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface CurriculumImpactAdvisoryProps {
  skills: EmergingSkillIntelligenceItem[];
  onOpenAdvisoryModal: (skill: EmergingSkillIntelligenceItem) => void;
}

export const CurriculumImpactAdvisory: FC<CurriculumImpactAdvisoryProps> = ({
  skills,
  onOpenAdvisoryModal
}) => {
  // Focus on skills that have curriculum advisories
  const advisorySkills = skills.filter((s) => s.curriculumAdvisory);

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-purple-50 text-purple-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Curriculum Impact Advisory (Officer Recommendations)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Evidence-based syllabus review suggestions to assist academic councils in maintaining industry alignment
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-purple-800 bg-purple-50 px-2.5 py-1 rounded-full font-semibold border border-purple-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Advisory Mode: Officer Decides</span>
        </div>
      </div>

      <div className="space-y-3 mt-4">
        {advisorySkills.map((skill) => {
          const adv = skill.curriculumAdvisory;
          const isHigh = adv.priority === 'High';

          return (
            <div
              key={skill.id}
              className="p-4 bg-slate-50 hover:bg-slate-100/70 border border-slate-200 hover:border-slate-300 rounded-xl transition-all space-y-3"
            >
              {/* Top Row: Skill Name, Priority, Evidence */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{skill.name}</span>
                  <Badge variant={isHigh ? 'danger' : 'warning'} size="sm">
                    {adv.priority} Priority Advisory
                  </Badge>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>
                    Observed Trend: <strong className="text-slate-800">{adv.observedTrend}</strong>
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    Evidence Grade: <strong className="text-emerald-700">{adv.evidenceLevel}</strong>
                  </span>
                </div>
              </div>

              {/* Middle Row: Implication text */}
              <div className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200/60 space-y-1">
                <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider">
                  Suggested Curriculum Consideration:
                </span>
                <p className="text-slate-600 italic">
                  "{adv.implication}"
                </p>
              </div>

              {/* Bottom Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 font-medium">Target Syllabus Area:</span>
                  <span className="font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                    {adv.suggestedReviewArea}
                  </span>
                </div>

                {/* Advisory Review Trigger Button (Does NOT auto-change anything) */}
                <button
                  onClick={() => onOpenAdvisoryModal(skill)}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white hover:bg-orange-50 border border-orange-300 hover:border-orange-500 text-orange-700 hover:text-orange-800 font-bold rounded-lg transition-all shadow-2xs cursor-pointer text-xs"
                >
                  <FileText className="w-3.5 h-3.5 text-orange-600" />
                  <span>Review Curriculum Advisory</span>
                  <ArrowRight className="w-3.5 h-3.5 text-orange-600" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strict Administrative Integrity Notice */}
      <div className="mt-4 p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-start gap-2 text-xs text-slate-600">
        <AlertCircle className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong>Administrative Protocol:</strong> SkillBridge generates curriculum impact advisories strictly as evidentiary input. The system does not execute automated syllabus modifications or academic policy determinations. All adjustments remain at the sole discretion of the Academic Board of Studies and State Higher Education Officers.
        </p>
      </div>
    </Card>
  );
};
