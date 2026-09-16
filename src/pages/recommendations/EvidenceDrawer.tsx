import type { FC } from 'react';
import { FileCheck, Database, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Drawer } from '../../components/ui/Drawer';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockEvidenceRecords } from '../../mock';
import type { PolicyIntervention } from '../../types';

interface EvidenceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  policy: PolicyIntervention;
}

export const EvidenceDrawer: FC<EvidenceDrawerProps> = ({
  isOpen,
  onClose,
  policy
}) => {
  const linkedEvidence = mockEvidenceRecords.filter(
    (ev) => ev.relatedRecommendationId === policy.id
  );

  const displayRecords = linkedEvidence.length > 0 ? linkedEvidence : mockEvidenceRecords.slice(0, 4);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Evidentiary Provenance: ${policy.id}`}
      description={policy.title}
      size="xl"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-[11px] text-slate-500 font-mono">
            Prototype Data Benchmark &bull; Sept 2026
          </span>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
            <Link to="/what-if-simulator">
              <Button variant="primary" size="sm" className="inline-flex items-center gap-1.5">
                <span>Test in Simulator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Core Rationale Summary */}
        <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-brand-400">
              Decision Signal Formulation
            </span>
            <Badge variant="info" size="sm" className="text-[9px] uppercase font-mono">
              {policy.priority} Priority
            </Badge>
          </div>
          <h4 className="text-sm font-bold text-white leading-snug">{policy.title}</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            {policy.rationale}
          </p>
        </div>

        {/* Explainability Chain */}
        <div className="space-y-3">
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Algorithmic Decision Trace
          </h5>
          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2.5">
              <span className="font-mono text-indigo-400 font-bold">01.</span>
              <div>
                <strong className="text-white">Active Industry Requisitions:</strong>
                <p className="text-slate-300 mt-0.5">
                  NLP parsing flagged {policy.targetSector} demand spike with 34,200 active postings in {policy.targetRegion}.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2.5">
              <span className="font-mono text-rose-400 font-bold">02.</span>
              <div>
                <strong className="text-white">Curricular Syllabus Obsolescence:</strong>
                <p className="text-slate-300 mt-0.5">
                  AICTE course audits revealed 54% deficit in modern cloud analytics and 0% hands-on data lakehouse training.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-950/50 border border-slate-800 flex items-start gap-2.5">
              <span className="font-mono text-emerald-400 font-bold">03.</span>
              <div>
                <strong className="text-white">Intervention Calibration:</strong>
                <p className="text-slate-300 mt-0.5">
                  ₹{policy.estimatedCostCr} Cr capital investment projected to generate {policy.projectedTalentOutput.toLocaleString()} job-ready graduates in {policy.implementationTimeMonths} months.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Evidence Records */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Supporting Demonstration Evidence Records ({displayRecords.length})
            </h5>
            <span className="text-[10px] text-emerald-400 font-mono">
              Avg Confidence: {(displayRecords.reduce((acc, r) => acc + r.confidenceScore, 0) / displayRecords.length).toFixed(0)}%
            </span>
          </div>

          <div className="space-y-3">
            {displayRecords.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2 border-b border-slate-800/80 pb-2">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-brand-400">{item.id}</span>
                      <span className="text-slate-600">&bull;</span>
                      <Badge variant="default" size="sm" className="text-[9px] py-0">
                        {item.sourceType}
                      </Badge>
                    </div>
                    <span className="text-xs font-bold text-white block mt-0.5">{item.source}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">Confidence</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {item.confidenceScore}%
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {item.keyMetricHighlight && (
                  <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item.keyMetricHighlight}</span>
                  </div>
                )}

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Sample: {item.sampleSize}</span>
                  <span>Verified: {item.verifiedDate}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Data Provenance & Trust Notice */}
        <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-2">
          <Database className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-300">Data Integrity Notice:</strong> These evidentiary records reflect benchmark datasets modeled after industry skill demand and technical education studies.
          </div>
        </div>
      </div>
    </Drawer>
  );
};
