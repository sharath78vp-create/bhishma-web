import type { FC } from 'react';
import { Layers, CheckCircle2, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { mockRegionalGaps } from '../../mock';

export const RegionalSectorDistribution: FC = () => {
  // Aggregate sectors across all 10 regions
  const sectorCountMap: Record<string, { count: number; regions: string[] }> = {};

  mockRegionalGaps.forEach((r) => {
    r.topSectorsInDemand.forEach((sector) => {
      if (!sectorCountMap[sector]) {
        sectorCountMap[sector] = { count: 0, regions: [] };
      }
      sectorCountMap[sector].count += 1;
      sectorCountMap[sector].regions.push(r.region.split(' ')[0]);
    });
  });

  // Hero sectors in Hyderabad
  const hyderabadSectors = ['AI & Data', 'Cloud Data Warehousing', 'VLSI Design'];

  const allSectors = Object.entries(sectorCountMap).sort((a, b) => b[1].count - a[1].count);

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="info" className="font-mono text-[10px]">
            {allSectors.length} Industry Sectors
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-brand-400" />
          <CardTitle>Regional Sector Demand Distribution</CardTitle>
        </div>
        <CardDescription>
          Critical industrial domains driving workforce requisitions across monitored regional nodes (Derived from official regional profiles)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Hyderabad Hero Drivers Banner */}
        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold text-white block">
                Hyderabad Innovation Corridor Drivers
              </span>
              <span className="text-[11px] text-slate-300">
                Identified as primary catalysts for the regional +26 skill deficit
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5 shrink-0">
            {hyderabadSectors.map((sec) => (
              <span
                key={sec}
                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 border border-brand-500/40"
              >
                <CheckCircle2 className="w-3 h-3 text-brand-400" />
                {sec}
              </span>
            ))}
          </div>
        </div>

        {/* National Corridors Sector Tags Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {allSectors.map(([sectorName, meta]) => {
            const isHyderabadDriver = hyderabadSectors.includes(sectorName);

            return (
              <div
                key={sectorName}
                className={`p-2.5 rounded-lg border transition-all ${
                  isHyderabadDriver
                    ? 'border-brand-500/40 bg-slate-900'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className={`text-xs font-semibold truncate ${isHyderabadDriver ? 'text-brand-300' : 'text-white'}`}>
                    {sectorName}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">
                    {meta.count} {meta.count === 1 ? 'node' : 'nodes'}
                  </span>
                </div>
                <div className="mt-1 text-[10px] text-slate-400 truncate">
                  Corridors: {meta.regions.slice(0, 2).join(', ')}{meta.regions.length > 2 ? '...' : ''}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
