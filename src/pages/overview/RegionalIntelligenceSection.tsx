import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { RegionalMap } from '../../components/maps/RegionalMap';
import { mockRegionalGaps } from '../../mock';
import type { RegionalGap, RegionalSeverity } from '../../types';
import { MapPin, Sparkles } from 'lucide-react';

export const RegionalIntelligenceSection: FC = () => {
  // Default selection on our hero node: Hyderabad
  const [selectedRegionId, setSelectedRegionId] = useState<string>('REG-05');

  // Sort regions by net deficit descending to identify critical bottlenecks first
  const sortedRegions = [...mockRegionalGaps].sort((a, b) => b.netDeficit - a.netDeficit);

  const columns: Column<RegionalGap>[] = [
    {
      key: 'region',
      header: 'Corridor / Node',
      render: (item) => {
        const isHero = item.id === 'REG-05';
        const isSelected = item.id === selectedRegionId;
        return (
          <div className="flex flex-col min-w-0 py-0.5">
            <div className="flex items-center gap-1.5">
              <span className={`font-semibold text-xs truncate ${isSelected ? 'text-brand-300' : 'text-slate-100'}`}>
                {item.region.split(' ')[0]} {item.region.split(' ')[1] ?? ''}
              </span>
              {isHero && (
                <span className="flex items-center gap-0.5 px-1 py-0.2 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 shrink-0">
                  <Sparkles className="w-2.5 h-2.5 text-rose-400" />
                  HERO
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-400 truncate">{item.state}</span>
          </div>
        );
      }
    },
    {
      key: 'demandIndex',
      header: 'Demand',
      align: 'right',
      width: '65px',
      render: (item) => (
        <span className="font-mono text-xs text-slate-200 tabular-nums">
          {item.demandIndex}
        </span>
      )
    },
    {
      key: 'trainingCapacityIndex',
      header: 'Capacity',
      align: 'right',
      width: '65px',
      render: (item) => (
        <span className="font-mono text-xs text-slate-300 tabular-nums">
          {item.trainingCapacityIndex}
        </span>
      )
    },
    {
      key: 'netDeficit',
      header: 'Deficit',
      align: 'right',
      width: '75px',
      render: (item) => (
        <span className={`font-mono text-xs font-bold tabular-nums ${item.netDeficit >= 20 ? 'text-rose-400' : item.netDeficit >= 14 ? 'text-amber-400' : 'text-emerald-400'}`}>
          +{item.netDeficit} pts
        </span>
      )
    },
    {
      key: 'severity',
      header: 'Status',
      align: 'center',
      width: '85px',
      render: (item) => {
        const sev = (item.severity || 'moderate') as RegionalSeverity;
        const variantMap: Record<RegionalSeverity, 'critical' | 'warning' | 'info' | 'success'> = {
          critical: 'critical',
          high: 'warning',
          moderate: 'info',
          low: 'success',
        };
        return (
          <Badge variant={variantMap[sev]} size="sm" className="capitalize text-[10px]">
            {sev}
          </Badge>
        );
      }
    }
  ];

  return (
    <Card className="overflow-hidden">
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="hidden sm:inline-flex text-[10px]">
              10 Verified Industrial Clusters
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-brand-400" />
          <CardTitle>Regional Demand–Capacity Intelligence</CardTitle>
        </div>
        <CardDescription>
          Geospatial deficit analysis comparing industrial talent demand against collegiate training capacity across key technology clusters
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Geospatial Map Visualizer */}
          <div className="lg:col-span-7 flex flex-col space-y-3">
            <RegionalMap
              markers={mockRegionalGaps}
              selectedRegionId={selectedRegionId}
              onSelectRegion={(reg) => setSelectedRegionId(reg.id)}
              height="410px"
            />

            {/* Severity Legend */}
            <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400">
              <span className="font-semibold text-slate-300">Deficit Scale:</span>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Critical (&gt;25 pts)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <span>High (18–24 pts)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>Moderate (12–17 pts)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Low (&lt;12 pts)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Regional Ranked Deficit Table */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Corridor Deficit Rankings
              </span>
              <span className="text-[10px] text-slate-400">Click node to inspect</span>
            </div>

            <DataTable<RegionalGap>
              columns={columns}
              data={sortedRegions}
              compact
              keyExtractor={(r) => r.id}
              onRowClick={(r) => setSelectedRegionId(r.id)}
              className="max-h-[365px]"
            />

            {/* Selected Region Insight Pill */}
            {selectedRegionId === 'REG-05' && (
              <div className="p-3 rounded-lg border border-rose-500/30 bg-rose-950/20 text-xs text-slate-300">
                <span className="font-bold text-rose-300 block mb-0.5">
                  ★ Hero Node Diagnostic: Hyderabad Innovation Corridor
                </span>
                Net skill deficit of <strong className="text-white">+26 pts</strong> with Demand index at{' '}
                <strong className="text-white">95</strong> vs Training Capacity index at only{' '}
                <strong className="text-white">69</strong>. Driven by severe supply shortage for Data Analysts and Analytics Engineers.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
