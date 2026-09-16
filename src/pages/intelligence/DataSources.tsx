import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { mockDataSources } from '../../mock/skillBridgeData';
import { Database, ShieldCheck, CheckCircle2, Clock } from 'lucide-react';

export const DataSources: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Data Ingestion Sources &amp; Credibility
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Verified telemetry streams feeding the SkillBridge algorithmic recommendation engine.
          </p>
        </div>
      </div>

      {/* Credibility Notice */}
      <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-start gap-3 text-xs">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-slate-900 block">Algorithmic Transparency Guarantee</span>
          <p className="text-slate-600 leading-relaxed mt-0.5">
            SkillBridge generates recommendations strictly from empirical, triangulated datasets—including live API job requisitions, national household surveys (PLFS), institutional assessments, and post-hire recruiter feedback.
          </p>
        </div>
      </div>

      {/* Data Sources Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Telemetry Stream / Source</th>
                <th className="py-3 px-5">Last Synchronized</th>
                <th className="py-3 px-5 text-center">Records Ingested</th>
                <th className="py-3 px-5 text-center">Confidence Score</th>
                <th className="py-3 px-5 text-right">Pipeline Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {mockDataSources.map((s) => (
                <tr key={s.source} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {s.source}
                  </td>
                  <td className="py-3.5 px-5 text-slate-500">
                    {s.lastUpdated}
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-800 tabular-nums">
                    {s.recordsCount}
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold tabular-nums">
                      {s.confidenceScore}%
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge variant={s.status === 'Active' ? 'success' : 'neutral'} size="sm">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{s.status}</span>
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
