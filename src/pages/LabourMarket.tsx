import { useState } from 'react';
import type { FC } from 'react';
import { MapPin, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/ui/PageHeader';
import { RegionalMap } from '../components/maps/RegionalMap';
import {
  RegionalKPIs,
  RegionalDemandCapacity,
  RegionalTable,
  HyderabadDrilldown,
  RegionalSectorDistribution,
  RegionalPolicySignal
} from './regional/index';
import { mockRegionalGaps } from '../mock';
import type { RegionalGap } from '../types';

export const LabourMarket: FC = () => {
  // Hero region default: Hyderabad Innovation Corridor (REG-05)
  const defaultRegion = mockRegionalGaps.find((r) => r.id === 'REG-05') || mockRegionalGaps[0];
  const [selectedRegion, setSelectedRegion] = useState<RegionalGap>(defaultRegion);

  const handleSelectRegion = (region: RegionalGap) => {
    setSelectedRegion(region);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header */}
      <PageHeader
        title="Regional Intelligence"
        description="Identify geographic mismatches between workforce demand, training capacity and emerging skill requirements."
        badge="PROTOTYPE &bull; SEPT 2026"
        badgeVariant="default"
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-brand-400" />
              <span className="text-slate-400">Geospatial Scope:</span>
              <span className="font-semibold text-white">National &rarr; Telangana &rarr; Hyderabad</span>
            </div>
            {selectedRegion.id === 'REG-05' && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Hero Focus Active</span>
              </div>
            )}
          </div>
        }
      />

      {/* 2. Regional KPI Strip (4 StatCards) */}
      <section aria-label="Regional Performance Metrics">
        <RegionalKPIs />
      </section>

      {/* 3. Primary Visual Section: Geospatial Intelligence Map + Hero/Regional Drilldown */}
      <section aria-label="Regional Geospatial Deficit Map and Drilldown">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Interactive India Regional Intelligence Map (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <span>Geospatial Demand–Capacity Radar</span>
                  <span className="text-[11px] font-normal text-slate-400 font-mono">(10 Monitored Belts)</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Severity-coded markers representing collegiate supply deficits. Click any node to inspect telemetry.
                </p>
              </div>

              {/* Map Legend */}
              <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Critical
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> High
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Moderate
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Low
                </span>
              </div>
            </div>

            <RegionalMap
              markers={mockRegionalGaps}
              selectedRegionId={selectedRegion.id}
              onSelectRegion={handleSelectRegion}
              height="460px"
            />
          </div>

          {/* Right: Selected Region Drilldown & Policy Signal (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <HyderabadDrilldown region={selectedRegion} />
            <RegionalPolicySignal region={selectedRegion} />
          </div>
        </div>
      </section>

      {/* 4. Demand vs Capacity Analytical Visualization (Recharts) */}
      <section aria-label="Demand vs Training Capacity Disparity">
        <RegionalDemandCapacity
          selectedRegionId={selectedRegion.id}
          onSelectRegion={handleSelectRegion}
        />
      </section>

      {/* 5. Ranked Regional Deficit Table */}
      <section aria-label="Ranked Regional Deficit Table">
        <RegionalTable
          selectedRegionId={selectedRegion.id}
          onSelectRegion={handleSelectRegion}
        />
      </section>

      {/* 6. Regional Sector Distribution */}
      <section aria-label="Regional Sector Demand Distribution">
        <RegionalSectorDistribution />
      </section>
    </div>
  );
};
