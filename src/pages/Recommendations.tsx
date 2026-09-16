import { useState } from 'react';
import type { FC } from 'react';
import { Sparkles, MapPin, ShieldCheck } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { mockPolicyInterventions } from '../mock';
import type { PolicyIntervention } from '../types';
import {
  RecommendationKPIs,
  RecommendationTable,
  HeroRecommendation,
  ReasoningChain,
  EvidencePanel,
  EvidenceDrawer,
  PolicyImpact,
  ReviewWorkflow,
  RecommendationLifecycle,
  RecommendationPolicySignal
} from './recommendations/index';

export const Recommendations: FC = () => {
  // Hero policy default: POL-304 (Telangana Collegiate Modern Data Analytics & Cloud Co-op Initiative)
  const defaultPolicy =
    mockPolicyInterventions.find((p) => p.id === 'POL-304') || mockPolicyInterventions[0];
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyIntervention>(defaultPolicy);
  const [isEvidenceDrawerOpen, setIsEvidenceDrawerOpen] = useState(false);

  const handleSelectPolicy = (policy: PolicyIntervention) => {
    setSelectedPolicy(policy);
  };

  const handleOpenEvidence = () => {
    setIsEvidenceDrawerOpen(true);
  };

  const handleCloseEvidence = () => {
    setIsEvidenceDrawerOpen(false);
  };

  const handleScrollToReview = () => {
    const el = document.getElementById('policy-review-workflow');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isHero = selectedPolicy.id === 'POL-304';

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header with Hero Context & Prototype Badge */}
      <PageHeader
        title="Policy Recommendations & Evidence"
        description="Actionable, evidence-backed interventions bridging industry demand with university curricula and regional infrastructure."
        badge="PROTOTYPE • SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Context:</span>
              <span className="font-semibold text-white">Telangana &rarr; AI &amp; Data &rarr; Data Analyst</span>
            </div>

            {isHero && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hero Policy Active</span>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenEvidence}
              className="gap-1.5 text-xs text-brand-400 border-brand-500/30 hover:bg-brand-500/10"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Evidence Drawer</span>
            </Button>
          </div>
        }
      />

      {/* 2. Key Performance Indicators Strip */}
      <section aria-label="Recommendation Metrics Summary">
        <RecommendationKPIs />
      </section>

      {/* 3. Hero Policy Recommendation Spotlight & Policy Impact Overview */}
      <section aria-label="Hero Policy Recommendation and Impact">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Hero Recommendation Card (7 cols) */}
          <div className="lg:col-span-7">
            <HeroRecommendation
              policy={selectedPolicy}
              onOpenEvidence={handleOpenEvidence}
              onScrollToReview={handleScrollToReview}
            />
          </div>

          {/* Policy Impact Breakdown (5 cols) */}
          <div className="lg:col-span-5">
            <PolicyImpact policy={selectedPolicy} />
          </div>
        </div>
      </section>

      {/* 4. Algorithmic Reasoning Chain (Why this recommendation?) */}
      <section aria-label="Reasoning Chain and Explainability">
        <ReasoningChain policy={selectedPolicy} />
      </section>

      {/* 5. Empirical Evidence Foundation Panel */}
      <section aria-label="Empirical Evidentiary Sources">
        <EvidencePanel
          policy={selectedPolicy}
          onOpenEvidence={handleOpenEvidence}
        />
      </section>

      {/* 6. Human-in-the-Loop Governance & Review Workflow Console */}
      <section id="policy-review-workflow" aria-label="Human in the Loop Review">
        <ReviewWorkflow policy={selectedPolicy} />
      </section>

      {/* 7. Comprehensive Policy Interventions Portfolio Table */}
      <section aria-label="Policy Interventions Portfolio">
        <RecommendationTable
          selectedPolicyId={selectedPolicy.id}
          onSelectPolicy={handleSelectPolicy}
        />
      </section>

      {/* 8. End-to-End Governance Lifecycle Tracker */}
      <section aria-label="Intervention Lifecycle Governance">
        <RecommendationLifecycle />
      </section>

      {/* 9. Policy Signal & Next Phase Hand-Off (What-If Simulator) */}
      <section aria-label="Counterfactual Policy Simulation">
        <RecommendationPolicySignal />
      </section>

      {/* 10. Slide-Over Evidence & Provenance Drawer */}
      <EvidenceDrawer
        isOpen={isEvidenceDrawerOpen}
        onClose={handleCloseEvidence}
        policy={selectedPolicy}
      />
    </div>
  );
};
