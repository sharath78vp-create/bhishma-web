import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { mockInstituteInsights } from '../../mock/skillBridgeData';
import { Building2, ArrowRight, AlertTriangle, CheckCircle2, AlertCircle } from 'lucide-react';

export const InstituteInsights: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Institute Insights &amp; Alignment Audits
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Compare higher education institution student outcomes directly with regional hiring demand.
          </p>
        </div>
      </div>

      {/* Institute Comparative Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockInstituteInsights.map((inst) => {
          const isHighGap = inst.gapLevel === 'High';
          const isLowGap = inst.gapLevel === 'Low';

          return (
            <Card
              key={inst.instituteName}
              padding="md"
              className={`flex flex-col justify-between space-y-4 border ${
                isHighGap ? 'border-rose-200 bg-rose-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {inst.instituteName}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                      <span>{inst.tier}</span>
                      <span>&bull;</span>
                      <span>{inst.totalStudents.toLocaleString()} Students</span>
                    </div>
                  </div>

                  <Badge variant={isHighGap ? 'danger' : isLowGap ? 'success' : 'warning'} size="sm">
                    {inst.gapLevel} Gap
                  </Badge>
                </div>

                {/* Demand vs Proficiency Comparison Block */}
                <div className="grid grid-cols-2 gap-2 p-3 rounded-lg bg-white border border-slate-200 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Industry Demand</span>
                    <span className="font-bold text-slate-900">{inst.industryDemandSkill} &bull; High</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Student Proficiency</span>
                    <span className={`font-bold ${isHighGap ? 'text-rose-600' : isLowGap ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {inst.studentProficiency} Level
                    </span>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="space-y-1 text-xs">
                  <span className="font-semibold text-slate-700 block">Identified Recommendation:</span>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    {inst.recommendation}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-400">Audited via AICTE Telemetry</span>
                <span className="font-semibold text-emerald-700">Detailed Report Available</span>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
