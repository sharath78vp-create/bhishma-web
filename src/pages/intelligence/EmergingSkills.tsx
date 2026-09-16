import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { mockEmergingSkills } from '../../mock/skillBridgeData';
import { Sparkles, TrendingUp, Clock, Building2, CheckCircle2 } from 'lucide-react';

export const EmergingSkills: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Emerging Skills Radar
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Empirical identification of high-velocity skills backed by parsed job requisitions.
          </p>
        </div>
        <Badge variant="neutral" size="md">
          {mockEmergingSkills.length} Tracked Clusters
        </Badge>
      </div>

      {/* Grid of Emerging Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockEmergingSkills.map((item) => (
          <Card key={item.name} padding="md" className="flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-slate-900 leading-tight">
                    {item.name}
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold block mt-0.5">
                    +{item.growthRatePct}% YoY Hiring Surge
                  </span>
                </div>
                <Badge
                  variant={item.growthStatus === 'Rapidly growing' ? 'danger' : 'purple'}
                  size="sm"
                >
                  {item.growthStatus}
                </Badge>
              </div>

              {/* Empirical Evidence Box */}
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Telemetry Evidence:</span>
                </div>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  {item.evidence}
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                <Clock className="w-3.5 h-3.5" />
                <span>Observation Window: {item.timePeriod}</span>
              </div>

              <div className="flex flex-wrap items-center gap-1">
                <span className="text-slate-400 text-[11px] mr-1">Sectors:</span>
                {item.relevantIndustries.map(ind => (
                  <span key={ind} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-medium border border-slate-200">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
