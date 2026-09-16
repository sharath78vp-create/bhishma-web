import { useState } from 'react';
import type { FC } from 'react';
import { Badge } from '../../common/Badge';
import {
  X,
  BookOpen,
  CheckCircle2,
  FileSpreadsheet,
  AlertTriangle,
  Cpu,
  Layers,
  Sparkles,
  Download,
  Send,
  ShieldCheck
} from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface CurriculumAdvisoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  skill: EmergingSkillIntelligenceItem | null;
}

export const CurriculumAdvisoryModal: FC<CurriculumAdvisoryModalProps> = ({
  isOpen,
  onClose,
  skill
}) => {
  const [officerNote, setOfficerNote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen || !skill) return null;

  const advisory = skill.curriculumAdvisory;

  const handleSaveNote = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-orange-100 text-orange-700">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-900">
                  Curriculum Advisory Review Dossier
                </h3>
                <Badge
                  variant={advisory.priority === 'High' ? 'danger' : 'warning'}
                  size="sm"
                >
                  {advisory.priority} Priority
                </Badge>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Target Competency: <strong className="text-slate-800">{skill.name}</strong> ({skill.category})
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto">
          {/* Non-prescriptive Guidance Banner */}
          <div className="p-3.5 bg-sky-50 border border-sky-200 rounded-xl flex items-start gap-2.5 text-xs text-sky-950">
            <ShieldCheck className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              <strong>Advisory Nature:</strong> This document offers evidence-based intelligence derived from parsed enterprise hiring requisitions. It serves as consultative input for Academic Board of Studies deliberations and does not modify approved curriculum regulations.
            </p>
          </div>

          {/* Section 1: Overview & Evidence */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Observed Market Dynamic
              </span>
              <p className="text-xs font-bold text-slate-900">{advisory.observedTrend}</p>
              <span className="text-[11px] text-slate-600 block">
                Evidence Grade: <strong className="text-emerald-700">{advisory.evidenceLevel}</strong>
              </span>
            </div>

            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Recommended Syllabus Review Track
              </span>
              <p className="text-xs font-bold text-indigo-900">{advisory.suggestedReviewArea}</p>
              <span className="text-[11px] text-slate-600 block">
                Hiring Surge Velocity: <strong className="text-emerald-700">+{skill.growthYoY}% YoY</strong>
              </span>
            </div>
          </div>

          {/* Section 2: Core Implication */}
          <div className="p-4 bg-amber-50/50 border border-amber-200/70 rounded-xl space-y-1.5">
            <span className="text-xs font-extrabold text-amber-900 block">
              Curriculum Implication & Assessment:
            </span>
            <p className="text-xs text-slate-700 leading-relaxed italic">
              "{advisory.implication}"
            </p>
          </div>

          {/* Section 3: Recommended Topics & Sandboxes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Suggested Elective / Practical Topics */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Layers className="w-4 h-4 text-orange-600" />
                <span>Recommended Laboratory / Elective Units</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advisory.detailedTopics.map((topic, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sandboxes & Infrastructure */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                <Cpu className="w-4 h-4 text-indigo-600" />
                <span>Recommended Sandbox & Tooling</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {advisory.recommendedSandboxTools.map((tool, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-1.5 mr-0.5"></span>
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600">
                <strong className="text-slate-800">Faculty Upskilling:</strong> {advisory.facultyUpskillingNeed}
              </div>
            </div>
          </div>

          {/* Section 4: Officer Decision Support Notes */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
            <span className="text-xs font-bold text-slate-800 block">
              Officer Review Notes & Action Log:
            </span>
            <textarea
              rows={2}
              value={officerNote}
              onChange={(e) => setOfficerNote(e.target.value)}
              placeholder="Record notes for Board of Studies meeting (e.g., 'Discussed with NIT Warangal CS department regarding prompt engineering lab module')..."
              className="w-full p-2.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Notes are persisted in your local officer review session.
              </span>
              <button
                onClick={handleSaveNote}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-md text-xs transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Send className="w-3 h-3" />
                <span>{isSaved ? 'Note Saved!' : 'Save Note'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Print / Export Brief</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                alert(`Advisory for "${skill.name}" marked as reviewed in officer dashboard.`);
                onClose();
              }}
              className="px-4 py-1.5 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg transition-colors shadow-2xs cursor-pointer"
            >
              Mark Advisory as Reviewed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
