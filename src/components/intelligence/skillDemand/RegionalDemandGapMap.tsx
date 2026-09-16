import React, { useState } from 'react';
import type { FC } from 'react';
import { MapPin } from 'lucide-react';
import {
  mockRegionalDemandGaps,
  type RegionalDemandGapRecord
} from '../../../mock/skillDemandIntelligenceData';

interface RegionalDemandGapMapProps {
  onSelectRegion?: (regionName: string) => void;
  selectedRegion?: string;
}

export const RegionalDemandGapMap: FC<RegionalDemandGapMapProps> = ({
  onSelectRegion,
  selectedRegion = 'all'
}) => {
  const [activeRegion, setActiveRegion] = useState<RegionalDemandGapRecord>(
    mockRegionalDemandGaps.find((r) => r.region === selectedRegion) || mockRegionalDemandGaps[0]
  );
  const [hoveredRegion, setHoveredRegion] = useState<RegionalDemandGapRecord | null>(null);

  const displayRegion = hoveredRegion || activeRegion;

  const handleRegionClick = (region: RegionalDemandGapRecord) => {
    setActiveRegion(region);
    if (onSelectRegion) {
      onSelectRegion(region.region);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-rose-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Regional Skill Demand Gap
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Geographic distribution of talent shortages and high-intensity hiring demand across Indian states.
          </p>
        </div>

        {/* Heat Legend */}
        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-600">
          <span className="text-slate-400 uppercase tracking-wider text-[10px]">Gap Severity:</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-700" />
            <span>Acute (&gt;45%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span>High (30-45%)</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Moderate</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span>Low (&lt;20%)</span>
          </div>
        </div>
      </div>

      {/* Main Visual Map & Telemetry Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Interactive India Map Visualizer */}
        <div className="lg:col-span-7 relative bg-slate-950 rounded-2xl p-6 overflow-hidden border border-slate-800 shadow-inner flex flex-col items-center justify-center min-h-[440px]">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

          {/* Map Title Overlay */}
          <div className="absolute top-4 left-4 z-10 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-slate-900/90 text-slate-300 font-mono text-[10px] border border-slate-700">
              PAN-INDIA SPATIAL TELEMETRY
            </span>
          </div>

          {/* SVG Map Container of India */}
          <div className="relative w-full max-w-[420px] aspect-[4/5] my-auto">
            <svg
              viewBox="0 0 100 120"
              className="w-full h-full drop-shadow-2xl"
              style={{ filter: 'drop-shadow(0 0 16px rgba(59, 130, 246, 0.15))' }}
            >
              {/* Stylized Geo-Polygon Outline of India */}
              <defs>
                <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="100%" stopColor="#0f172a" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="1.5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* India Silhouette Shape */}
              <path
                d="M32 10 L44 8 L50 14 L55 18 L50 24 L56 30 L66 32 L78 30 L88 38 L94 44 L88 52 L76 50 L68 54 L62 62 L56 70 L48 84 L44 98 L40 106 L36 94 L32 82 L26 72 L20 60 L14 48 L22 36 L26 28 Z"
                fill="url(#mapGradient)"
                stroke="#334155"
                strokeWidth="1.2"
                className="transition-colors"
              />

              {/* Internal Geo Regions & Boundaries */}
              <path
                d="M26 28 L40 34 L56 30 M32 46 L50 48 L68 54 M20 60 L44 64 L62 62 M32 82 L48 84 L56 70 M36 94 L44 98"
                fill="none"
                stroke="#1e293b"
                strokeWidth="0.8"
                strokeDasharray="1.5 1.5"
              />

              {/* State Interactive Radar Nodes */}
              {mockRegionalDemandGaps.map((region) => {
                const isSelected = activeRegion.id === region.id;
                const isHovered = hoveredRegion?.id === region.id;
                const radius = isSelected ? 4 : isHovered ? 3.5 : 2.6;

                return (
                  <g
                    key={region.id}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => handleRegionClick(region)}
                  >
                    {/* Pulsing Outer Ping Ring for High Gaps */}
                    {region.demandSupplyGap > 35 && (
                      <circle
                        cx={region.mapCoords.x}
                        cy={region.mapCoords.y}
                        r={radius * 2.2}
                        fill={region.colorIntensity}
                        opacity={isSelected ? 0.35 : 0.2}
                        className="animate-pulse"
                      />
                    )}

                    {/* Node Core */}
                    <circle
                      cx={region.mapCoords.x}
                      cy={region.mapCoords.y}
                      r={radius}
                      fill={region.colorIntensity}
                      stroke={isSelected ? '#ffffff' : '#0f172a'}
                      strokeWidth={isSelected ? 1.5 : 0.8}
                    />

                    {/* Region Label Code */}
                    <text
                      x={region.mapCoords.x}
                      y={region.mapCoords.y - 3.8}
                      textAnchor="middle"
                      fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                      fontSize="3.2"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      fontFamily="monospace"
                      className="pointer-events-none drop-shadow-md select-none"
                    >
                      {region.code}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Floating Live Hover Tooltip */}
            {hoveredRegion && (
              <div
                className="absolute z-30 pointer-events-none bg-slate-900/95 text-white p-3 rounded-xl border border-slate-700 shadow-2xl text-[11px] space-y-1.5 w-48 backdrop-blur-md transition-all"
                style={{
                  left: `${Math.min(hoveredRegion.mapCoords.x + 4, 60)}%`,
                  top: `${Math.max(hoveredRegion.mapCoords.y - 20, 5)}%`
                }}
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <span className="font-bold text-white uppercase">{hoveredRegion.region}</span>
                  <span className="text-[10px] text-emerald-400 font-mono">+{hoveredRegion.yoyGrowth}%</span>
                </div>
                <div className="space-y-0.5 text-slate-300">
                  <p>
                    <span className="text-slate-400">Top Skill:</span>{' '}
                    <strong className="text-white">{hoveredRegion.topSkill}</strong>
                  </p>
                  <p>
                    <span className="text-slate-400">Demand:</span>{' '}
                    <strong className="text-blue-400">{hoveredRegion.industryDemand}%</strong> |{' '}
                    <span className="text-slate-400">Supply:</span>{' '}
                    <strong className="text-slate-300">{hoveredRegion.studentSupply}%</strong>
                  </p>
                  <p className="text-rose-400 font-bold">
                    Skill Gap: +{hoveredRegion.demandSupplyGap}%
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Footer Note */}
          <div className="absolute bottom-3 text-center text-[10px] font-mono text-slate-400">
            Hover or click on state nodes to inspect localized skill deficits
          </div>
        </div>

        {/* Right Column: Selected Region Detail Card & Leaderboard */}
        <div className="lg:col-span-5 space-y-4">
          {/* Active Region Spotlight Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white shadow-md border border-slate-700 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <div>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest font-mono">
                  ACTIVE REGIONAL TELEMETRY
                </span>
                <h3 className="text-xl font-bold text-white mt-0.5">
                  {displayRegion.region}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                +{displayRegion.demandSupplyGap}% Gap
              </span>
            </div>

            {/* Key Regional Skill Telemetry */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Top Demanded Skill
                </span>
                <strong className="text-sm text-blue-300 font-bold block">
                  {displayRegion.topSkill}
                </strong>
                <span className="text-[10px] text-slate-400">
                  {displayRegion.primarySector}
                </span>
              </div>

              <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-1">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                  Requisitions Volume
                </span>
                <strong className="text-sm text-emerald-400 font-bold block">
                  {displayRegion.activePostings.toLocaleString()} Openings
                </strong>
                <span className="text-[10px] text-slate-400">
                  Across {displayRegion.hubsCount} Industrial Hubs
                </span>
              </div>
            </div>

            {/* Metrics Breakdown Bars */}
            <div className="space-y-2 pt-1 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Industry Demand:</span>
                <strong className="text-white font-bold">{displayRegion.industryDemand}%</strong>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full"
                  style={{ width: `${displayRegion.industryDemand}%` }}
                />
              </div>

              <div className="flex justify-between text-slate-300 pt-1">
                <span>Student Supply:</span>
                <strong className="text-white font-bold">{displayRegion.studentSupply}%</strong>
              </div>
              <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${displayRegion.studentSupply}%` }}
                />
              </div>

              <div className="flex items-center justify-between pt-2 text-[11px] text-slate-300 border-t border-slate-700/60">
                <span>YoY Hiring Acceleration:</span>
                <span className="font-bold text-teal-400">+{displayRegion.yoyGrowth}%</span>
              </div>
            </div>
          </div>

          {/* Quick Regional State Selector List */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
              Regional Skill Shortage Rankings
            </span>
            <div className="space-y-1.5 max-h-[160px] overflow-y-auto pr-1">
              {[...mockRegionalDemandGaps]
                .sort((a, b) => b.demandSupplyGap - a.demandSupplyGap)
                .map((r) => {
                  const isSelected = activeRegion.id === r.id;
                  return (
                    <button
                      key={r.id}
                      onClick={() => handleRegionClick(r)}
                      className={`w-full flex items-center justify-between p-2 rounded-xl text-xs text-left transition-all ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold shadow-xs'
                          : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-2 h-2 rounded-full ${
                            r.demandSupplyGap > 45
                              ? 'bg-rose-500'
                              : r.demandSupplyGap > 30
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                          }`}
                        />
                        <span>{r.region}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                          {r.topSkill.split(' ')[0]}
                        </span>
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                            isSelected
                              ? 'bg-blue-700 text-white'
                              : 'bg-slate-100 text-rose-600'
                          }`}
                        >
                          +{r.demandSupplyGap}% Gap
                        </span>
                      </div>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
