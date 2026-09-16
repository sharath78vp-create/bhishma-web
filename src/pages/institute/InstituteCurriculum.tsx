import { useState } from 'react';
import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { BookMarked, CheckCircle2, AlertTriangle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import type { CurriculumCourseItem } from '../../types/skillbridge';

export const InstituteCurriculum: FC = () => {
  const {
    curriculumCourses,
    heroRecommendation,
    acceptRecommendationByInstitute
  } = useSkillBridge();

  const [selectedCourse, setSelectedCourse] = useState<CurriculumCourseItem | null>(null);
  const isAccepted = heroRecommendation.status === 'accepted_by_institute';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookMarked className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curriculum Alignment &amp; Audit
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Connect institutional academic syllabi with live industry requirements.
          </p>
        </div>
      </div>

      {/* 1. Suggested Curriculum Changes (Institute in Control) */}
      <Card
        padding="lg"
        className={`border transition-all ${
          isAccepted ? 'border-emerald-300 bg-emerald-50/20' : 'border-purple-300 bg-purple-50/30 shadow-xs'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-lg bg-purple-100 text-purple-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Suggested Curriculum Change &bull; Action Pending
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              {heroRecommendation.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              <strong>Reason:</strong> Industry job demand has increased by 34% while institutional student proficiency remains at 42% (below the required 75% baseline).
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span>Target Course: <strong className="text-slate-900">{heroRecommendation.targetCourse}</strong></span>
              <span>&bull;</span>
              <span>Impact: <strong className="text-rose-600">High Deficit Reduction</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {isAccepted ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Recommendation Accepted &bull; Course Modernized</span>
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    const c = curriculumCourses.find(c => c.courseCode === 'CS-405');
                    if (c) setSelectedCourse(c);
                  }}
                  className="px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  Review
                </button>
                <button
                  onClick={acceptRecommendationByInstitute}
                  className="px-4 py-2 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept Recommendation</span>
                </button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* 2. Current Curriculum Table */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-slate-900">
          Current Monitored Curriculum
        </h2>

        <Card padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-5">Code &amp; Course</th>
                  <th className="py-3 px-5">Degree Program</th>
                  <th className="py-3 px-5 text-center">Current Relevance</th>
                  <th className="py-3 px-5 text-center">Industry Demand</th>
                  <th className="py-3 px-5 text-center">Syllabus Alignment</th>
                  <th className="py-3 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {curriculumCourses.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5">
                      <span className="font-bold text-slate-900 block">{c.title}</span>
                      <span className="text-[11px] text-slate-400 font-mono">{c.courseCode}</span>
                    </td>
                    <td className="py-3.5 px-5 text-slate-600">
                      {c.program}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <Badge
                        variant={c.currentRelevance === 'High' ? 'success' : c.currentRelevance === 'Medium' ? 'warning' : 'danger'}
                        size="sm"
                      >
                        {c.currentRelevance}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <Badge variant={c.industryDemand === 'Very High' ? 'danger' : 'neutral'} size="sm">
                        {c.industryDemand}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="font-bold text-slate-900 tabular-nums">
                        {c.alignmentPct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => setSelectedCourse(c)}
                        className="text-xs font-semibold text-purple-700 hover:text-purple-800 hover:underline"
                      >
                        Audit Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Course Audit Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`${selectedCourse.courseCode}: ${selectedCourse.title}`}
          subtitle={selectedCourse.program}
          footer={
            <button
              onClick={() => setSelectedCourse(null)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Done
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-500 block">Syllabus Alignment</span>
                <span className="text-base font-bold text-slate-900">{selectedCourse.alignmentPct}%</span>
              </div>
              <div>
                <span className="text-slate-500 block">Market Demand</span>
                <span className="text-base font-bold text-slate-900">{selectedCourse.industryDemand}</span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-rose-800 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Outdated Topics Identified for Phase-Out</span>
              </h4>
              <div className="p-3 bg-rose-50/50 rounded-xl border border-rose-200 space-y-1">
                {selectedCourse.outdatedModules.map(m => (
                  <div key={m} className="text-rose-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-emerald-800 mb-1.5 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Recommended Modern Replacements</span>
              </h4>
              <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200 space-y-1">
                {selectedCourse.modernReplacements.map(m => (
                  <div key={m} className="text-emerald-900 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
