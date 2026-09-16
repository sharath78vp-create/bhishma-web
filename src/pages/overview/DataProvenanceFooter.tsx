import type { FC } from 'react';
import { Database, ShieldCheck, FileCheck, CheckCircle } from 'lucide-react';
import { Badge } from '../../components/ui/Badge';
import { mockEvidenceRecords } from '../../mock';

export const DataProvenanceFooter: FC = () => {
  // Calculate average confidence from mock evidence records
  const avgConfidence = (
    mockEvidenceRecords.reduce((acc, curr) => acc + curr.confidenceScore, 0) /
    mockEvidenceRecords.length
  ).toFixed(1);

  return (
    <footer className="mt-8 pt-6 pb-8 border-t border-slate-800/80 text-xs text-slate-400">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Left: Provenance and Institutional context */}
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2">
            <Badge variant="default" size="sm" className="font-mono text-[10px] tracking-wider uppercase">
              PROTOTYPE &bull; BENCHMARK MODEL SEPT 2026
            </Badge>
            <span className="text-slate-600">&bull;</span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Curated Prototype Benchmark
            </span>
            <span className="text-slate-600">&bull;</span>
            <span className="text-[11px] font-mono text-slate-300">
              Avg Source Confidence: <strong>{avgConfidence}%</strong>
            </span>
          </div>
          <p className="text-[11px] text-slate-400 leading-normal">
            Demonstration dataset &mdash; calibrated for SIH 2026 prototype exploration and policy simulation, not a live production feed. Benchmark indicators reflect sample surveys from NSSO (PLFS Q4 2025), AICTE Model Curriculum Audits, and multi-portal job requisitions.
          </p>
        </div>

        {/* Right: Sources Badges */}
        <div className="flex flex-wrap items-center gap-2 shrink-0 text-[11px]">
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <Database className="w-3 h-3 text-brand-400" />
            <span>NSSO / PLFS Data</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <FileCheck className="w-3 h-3 text-indigo-400" />
            <span>AICTE Syllabi Registry</span>
          </div>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <CheckCircle className="w-3 h-3 text-emerald-400" />
            <span>{mockEvidenceRecords.length} Active Evidentiary Records</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
