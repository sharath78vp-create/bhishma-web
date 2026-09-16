import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Lightbulb, CheckCircle2, ArrowRight, Sparkles, Building2, Clock } from 'lucide-react';

export const InstituteRecommendations: FC = () => {
  const {
    heroRecommendation,
    acceptRecommendationByInstitute
  } = useSkillBridge();

  const isSent = heroRecommendation.status === 'sent_to_institute';
  const isAccepted = heroRecommendation.status === 'accepted_by_institute';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Curriculum Recommendations Inbox
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Formal directives and evidence-backed advisories dispatched from the Skill Intelligence Team.
          </p>
        </div>
        <Badge variant={isSent ? 'danger' : isAccepted ? 'success' : 'neutral'} size="md">
          {isSent ? '1 Action Required' : isAccepted ? 'All Actions Completed' : 'Up to Date'}
        </Badge>
      </div>

      {/* Hero Recommendation Card */}
      <Card
        padding="lg"
        className={`border transition-all ${
          isSent
            ? 'border-purple-300 bg-purple-50/20 shadow-md ring-2 ring-purple-500/20'
            : isAccepted
            ? 'border-emerald-300 bg-emerald-50/20'
            : 'border-slate-200'
        }`}
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Badge variant={isAccepted ? 'success' : isSent ? 'danger' : 'neutral'} size="sm">
                  {isAccepted ? 'Accepted & Implemented' : isSent ? 'New Inbound Advisory' : 'Draft Advisory'}
                </Badge>
                <span className="text-xs text-slate-400 font-mono">{heroRecommendation.id}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                {heroRecommendation.title}
              </h2>
              <p className="text-xs text-slate-500">
                Targeted Program: <strong className="text-slate-800">{heroRecommendation.targetCourse}</strong>
              </p>
            </div>

            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{heroRecommendation.timestamp}</span>
            </span>
          </div>

          {/* Evidence Narrative */}
          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
            <h4 className="font-semibold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              <span>Empirical Evidence from Job Market Telemetry</span>
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {heroRecommendation.evidence}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase">Current Student Level</span>
                <span className="text-sm font-bold text-rose-600">{heroRecommendation.currentProficiencyPct}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase">Industry Required</span>
                <span className="text-sm font-bold text-emerald-600">{heroRecommendation.industryRequiredPct}%</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 col-span-2 sm:col-span-1">
                <span className="text-slate-400 block text-[10px] uppercase">Projected Impact</span>
                <span className="text-sm font-bold text-purple-700">{heroRecommendation.impact}</span>
              </div>
            </div>
          </div>

          {/* Recommended Action & Trigger */}
          <div className="p-4 rounded-xl bg-purple-50/50 border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="font-bold text-purple-900 block mb-0.5">Recommended Institutional Action:</span>
              <p className="text-purple-800 leading-relaxed">
                {heroRecommendation.recommendedAction}
              </p>
            </div>

            <div className="shrink-0">
              {isAccepted ? (
                <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-100 text-emerald-800 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Program Active</span>
                </div>
              ) : (
                <button
                  onClick={acceptRecommendationByInstitute}
                  className="px-4 py-2.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Accept &amp; Deploy Lab Program</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
