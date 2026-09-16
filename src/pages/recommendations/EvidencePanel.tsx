import type { FC } from 'react';
import { ShieldCheck, FileCheck, ExternalLink, Database, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { mockEvidenceRecords } from '../../mock';
import type { PolicyIntervention } from '../../types';

interface EvidencePanelProps {
  policy: PolicyIntervention;
  onOpenEvidence: () => void;
}

export const EvidencePanel: FC<EvidencePanelProps> = ({ policy, onOpenEvidence }) => {
  // Filter evidence records linked to this policy
  const linkedEvidence = mockEvidenceRecords.filter(
    (ev) => ev.relatedRecommendationId === policy.id
  );

  const displayRecords = linkedEvidence.length > 0 ? linkedEvidence : mockEvidenceRecords.slice(0, 4);

  return (
    <Card>
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-mono text-[10px] uppercase">
              Prototype Demonstration Data
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={onOpenEvidence}
              className="text-xs text-brand-400 hover:text-brand-300 p-0"
            >
              <ExternalLink className="w-3.5 h-3.5 mr-1" />
              <span>Full Provenance Drawer</span>
            </Button>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <CardTitle>Evidentiary Foundation &amp; Telemetry Audits</CardTitle>
        </div>
        <CardDescription>
          Empirical documentation and confidence scoring supporting {policy.id} ({displayRecords.length} linked validation records)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3.5">
        {/* Institutional disclaimer banner */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 leading-normal flex items-start gap-2">
          <Database className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
          <span>
            <strong>Provenance Notice:</strong> Evidentiary records displayed are demonstration benchmarks calibrated for prototype evaluation, not a live production feed. Displayed data reflects sample surveys from NSSO (PLFS Q4 2025), AICTE syllabi audits, and job ingestion APIs.
          </span>
        </div>

        {/* Evidence Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {displayRecords.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                {/* Header: Source, Type, Confidence */}
                <div className="flex items-start justify-between gap-2 border-b border-slate-800 pb-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs font-bold text-brand-400">{item.id}</span>
                      <span className="text-slate-600">&bull;</span>
                      <Badge variant="default" size="sm" className="text-[9px] py-0">
                        {item.sourceType}
                      </Badge>
                    </div>
                    <h5 className="text-xs font-bold text-white mt-1 line-clamp-1">
                      {item.source}
                    </h5>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-[9px] uppercase font-mono text-slate-400 block">Confidence</span>
                    <span className="font-mono text-xs font-bold text-emerald-400">
                      {item.confidenceScore}%
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                  {item.description}
                </p>

                {/* Key Metric Highlight */}
                {item.keyMetricHighlight && (
                  <div className="mt-2.5 p-2 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-1.5 text-[11px] text-amber-300">
                    <FileCheck className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="font-medium">{item.keyMetricHighlight}</span>
                  </div>
                )}
              </div>

              {/* Footer: Sample Size, Date, Relevance */}
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
                <span>Sample: <strong className="text-slate-200">{item.sampleSize}</strong></span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  Verified: {item.verifiedDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
