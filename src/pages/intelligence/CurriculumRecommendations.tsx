import { useState } from 'react';
import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Lightbulb, Send, CheckCircle2, Sparkles, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

export const CurriculumRecommendations: FC = () => {
  const {
    heroRecommendation,
    sendRecommendationToInstitute
  } = useSkillBridge();

  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);

  const isSent = heroRecommendation.status === 'sent_to_institute';
  const isAccepted = heroRecommendation.status === 'accepted_by_institute';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curriculum Intelligence &amp; Recommendations
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Formulate evidence-backed curriculum advisories to send to higher education institutions.
          </p>
        </div>
      </div>

      {/* Governance Model Notice */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-slate-900">Institutional Autonomy &amp; Governance Flow</span>
          <p className="text-slate-600 leading-relaxed">
            The Skill Intelligence Team does not directly modify an institute&apos;s curriculum. It aggregates labor market data, diagnoses gaps, and dispatches actionable recommendations. Institutes retain full control to review, customize, and accept proposals.
          </p>
        </div>
      </div>

      {/* Hero Recommendation Card (Step 2 & Step 3 of Demo) */}
      <Card padding="lg" className="border-emerald-200 bg-white shadow-card">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-100">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded-md bg-emerald-100 text-emerald-700">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Curriculum Recommendation &bull; Rec-2026-Cloud
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900">
                {heroRecommendation.title}
              </h2>
              <p className="text-xs text-slate-500">
                Target Syllabus: <strong className="text-slate-800">{heroRecommendation.targetCourse}</strong>
              </p>
            </div>

            <Badge
              variant={isAccepted ? 'success' : isSent ? 'brand' : 'warning'}
              size="md"
            >
              {isAccepted
                ? 'Accepted by Institute'
                : isSent
                ? 'Dispatched to Institute'
                : 'Ready to Dispatch'}
            </Badge>
          </div>

          {/* Evidence Narrative */}
          <div className="space-y-2 text-xs">
            <h4 className="font-semibold text-slate-800">
              Analyzed Job-Market Evidence:
            </h4>
            <p className="text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
              {heroRecommendation.evidence}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Student Proficiency</span>
                <span className="text-xl font-bold text-rose-600 tabular-nums">
                  {heroRecommendation.currentProficiencyPct}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Tier-2 state average</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Industry Required Baseline</span>
                <span className="text-xl font-bold text-emerald-600 tabular-nums">
                  {heroRecommendation.industryRequiredPct}%
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Entry-level benchmark</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Projected Placement Impact</span>
                <span className="text-xl font-bold text-brand-600">
                  {heroRecommendation.impact}
                </span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Estimated +26 pts readiness</span>
              </div>
            </div>
          </div>

          {/* Recommended Action */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs space-y-1">
            <span className="font-bold text-emerald-900 block">
              Recommended Action Plan for Institutes:
            </span>
            <p className="text-emerald-800 leading-relaxed">
              {heroRecommendation.recommendedAction}
            </p>
          </div>

          {/* Actions: Review Evidence / Send to Institute */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              onClick={() => setIsEvidenceModalOpen(true)}
              className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-colors w-full sm:w-auto"
            >
              Review Evidence Details
            </button>

            {/* STEP 3 Demo Trigger */}
            <div className="w-full sm:w-auto">
              {isSent || isAccepted ? (
                <div className="flex items-center gap-2 text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-4 py-2 rounded-lg">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {isAccepted
                      ? 'Advisory Accepted & Lab Created in Institute Portal'
                      : 'Recommendation Dispatched & Available in Institute Inbox'}
                  </span>
                </div>
              ) : (
                <button
                  onClick={sendRecommendationToInstitute}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <Send className="w-4 h-4" />
                  <span>Send to Institute (Demo Step 3)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Review Evidence Modal */}
      {isEvidenceModalOpen && (
        <Modal
          isOpen={isEvidenceModalOpen}
          onClose={() => setIsEvidenceModalOpen(false)}
          title="Empirical Evidence & Telemetry Source"
          subtitle="Audit trail supporting Recommendation REC-2026-CLOUD"
          footer={
            <button
              onClick={() => setIsEvidenceModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold"
            >
              Close Audit
            </button>
          }
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">Dataset Sample</span>
              <p className="text-slate-600">
                Extracted from 128,450 job requisitions across Naukri, LinkedIn, and Foundit, audited across Q1-Q2 2026.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">Collegiate Syllabus Audit</span>
              <p className="text-slate-600">
                Comparative keyword extraction across 42 state engineering colleges in Telangana showed that 76% of curricula still rely on legacy server configuration with 0% containerization labs.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
              <span className="font-semibold text-slate-800 block">Employer Validation</span>
              <p className="text-slate-600">
                88% of tech recruiters surveyed in Hyderabad and Bengaluru confirmed that candidates with verified AWS/Docker hands-on project portfolios are granted immediate interview shortlisting.
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
