import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import {
  Building2,
  Briefcase,
  GraduationCap,
  AlertTriangle,
  Users,
  CheckCircle2,
  Layers,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  X,
  Target,
  Sparkles
} from 'lucide-react';
import type {
  DistrictIntelligence,
  MapClusterMarker,
  StateIntelligence
} from '../../mock/intelligenceCommandData';
import { getGeoapifyTileUrl, GEOAPIFY_ATTRIBUTION } from '../../config/maps';

interface InteractiveIntelligenceMapProps {
  activeState: StateIntelligence;
  activeDistrict: DistrictIntelligence;
  selectedDistrictName: string;
  onSelectDistrict: (districtName: string) => void;
  selectedClusterId: string | null;
  onSelectCluster: (cluster: MapClusterMarker | null) => void;
  industryFilter: string;
}

// Controller component to smoothly pan/zoom map on selection changes
const MapController: FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1 });
  }, [center, zoom, map]);
  return null;
};

export const InteractiveIntelligenceMap: FC<InteractiveIntelligenceMapProps> = ({
  activeState,
  activeDistrict,
  selectedDistrictName,
  onSelectDistrict,
  selectedClusterId,
  onSelectCluster,
  industryFilter
}) => {
  // Layer visibility toggles
  const [layers, setLayers] = useState({
    industry: true,
    job_demand: true,
    institute: true,
    skill_gap: true,
    student_supply: false
  });

  const isStateView = selectedDistrictName === 'All Districts';

  // Determine current map center and zoom
  const currentCenter: [number, number] = isStateView
    ? activeState.centerCoordinates
    : activeDistrict.coordinates;

  const currentZoom = isStateView ? activeState.zoomLevel : 12;

  // Filter district clusters based on selected layers and optional industry filter
  const visibleClusters = isStateView
    ? []
    : activeDistrict.clusters.filter((cluster) => {
        if (!layers[cluster.category]) return false;
        if (industryFilter !== 'All Industries' && !cluster.industryType.toLowerCase().includes(industryFilter.toLowerCase())) {
          return false;
        }
        return true;
      });

  const selectedCluster = activeDistrict.clusters.find((c) => c.id === selectedClusterId) || null;

  const categoryVisuals: Record<string, { color: string; fill: string; icon: any; label: string; radius: number }> = {
    industry: { color: '#1d4ed8', fill: '#3b82f6', icon: Building2, label: 'Industry Cluster', radius: 10 },
    job_demand: { color: '#4338ca', fill: '#6366f1', icon: Briefcase, label: 'Job Demand Hub', radius: 11 },
    institute: { color: '#6b21a8', fill: '#a855f7', icon: GraduationCap, label: 'Accredited Institute', radius: 9 },
    skill_gap: { color: '#b91c1c', fill: '#ef4444', icon: AlertTriangle, label: 'Critical Skill Gap', radius: 12 },
    student_supply: { color: '#047857', fill: '#10b981', icon: Users, label: 'Student Talent Supply', radius: 9 }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
      {/* 1. Map Top Utility Bar with Layers Control */}
      <div className="p-3 sm:px-5 sm:py-3 border-b border-slate-200 bg-slate-50/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-600" />
          <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
            Map Layers:
          </span>
        </div>

        {/* Checkbox Layer Controls */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-medium text-slate-700">
          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-blue-600 transition-colors">
            <input
              type="checkbox"
              checked={layers.industry}
              onChange={(e) => setLayers((prev) => ({ ...prev, industry: e.target.checked }))}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span>Industries</span>
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-indigo-600 transition-colors">
            <input
              type="checkbox"
              checked={layers.job_demand}
              onChange={(e) => setLayers((prev) => ({ ...prev, job_demand: e.target.checked }))}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
            />
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Job Demand</span>
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-purple-600 transition-colors">
            <input
              type="checkbox"
              checked={layers.institute}
              onChange={(e) => setLayers((prev) => ({ ...prev, institute: e.target.checked }))}
              className="rounded text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
            />
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-500" />
              <span>Institutes</span>
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-rose-600 transition-colors">
            <input
              type="checkbox"
              checked={layers.skill_gap}
              onChange={(e) => setLayers((prev) => ({ ...prev, skill_gap: e.target.checked }))}
              className="rounded text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
            />
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span>Skill Gaps</span>
            </span>
          </label>

          <label className="inline-flex items-center gap-1.5 cursor-pointer hover:text-emerald-600 transition-colors">
            <input
              type="checkbox"
              checked={layers.student_supply}
              onChange={(e) => setLayers((prev) => ({ ...prev, student_supply: e.target.checked }))}
              className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
            />
            <span className="inline-flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Student Supply</span>
            </span>
          </label>
        </div>

        {/* Mode Indicator Badge */}
        <div className="text-[11px] font-semibold text-slate-500">
          {isStateView ? (
            <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-800">
              State View ({activeState.name})
            </span>
          ) : (
            <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-bold">
              District Focus ({activeDistrict.name})
            </span>
          )}
        </div>
      </div>

      {/* 2. Map Viewport Container */}
      <div className="relative w-full h-[460px] sm:h-[500px]">
        <MapContainer
          center={currentCenter}
          zoom={currentZoom}
          scrollWheelZoom={false}
          className="w-full h-full z-10"
        >
          <MapController center={currentCenter} zoom={currentZoom} />

          <TileLayer
            attribution={GEOAPIFY_ATTRIBUTION}
            url={getGeoapifyTileUrl('osm-bright-smooth')}
            maxZoom={20}
          />

          {/* STATE VIEW: Render District Centers with Intelligence Indicators */}
          {isStateView &&
            activeState.districts.map((district) => {
              const isSelected = district.name === activeDistrict.name;
              const isCritical = district.severity === 'critical';
              const isHigh = district.severity === 'high';

              return (
                <div key={district.id}>
                  {/* Outer pulse indicator for high demand/gap */}
                  {(isCritical || isHigh) && (
                    <CircleMarker
                      center={district.coordinates}
                      radius={isCritical ? 24 : 18}
                      pathOptions={{
                        color: isCritical ? '#ef4444' : '#f59e0b',
                        fillColor: 'transparent',
                        weight: 2,
                        dashArray: '4 4',
                        opacity: 0.7
                      }}
                    />
                  )}

                  <CircleMarker
                    center={district.coordinates}
                    radius={isCritical ? 14 : 11}
                    pathOptions={{
                      color: isSelected ? '#ffffff' : isCritical ? '#b91c1c' : '#1e3a8a',
                      fillColor: isCritical ? '#ef4444' : isHigh ? '#f59e0b' : '#3b82f6',
                      fillOpacity: 0.9,
                      weight: 2
                    }}
                    eventHandlers={{
                      click: () => onSelectDistrict(district.name)
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={0.95} permanent={false}>
                      <div className="font-sans text-xs">
                        <span className="font-bold text-slate-900 block">{district.name} District</span>
                        <span className="text-[11px] text-slate-600 block">{district.demandLabel} &bull; {district.gapLabel}</span>
                        <span className="text-[10px] text-blue-600 font-bold mt-0.5 block">
                          Jobs: {district.jobDemand.toLocaleString()} | Deficit: +{district.netGapPoints} pts
                        </span>
                      </div>
                    </Tooltip>

                    <Popup>
                      <div className="p-1 font-sans text-xs min-w-[200px] space-y-2">
                        <div className="flex items-center justify-between border-b pb-1">
                          <span className="font-bold text-sm text-slate-900">{district.name}</span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
                            {district.demandLabel}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-600">
                          <div>Jobs: <strong className="text-slate-900">{district.jobDemand.toLocaleString()}</strong></div>
                          <div>Deficit: <strong className="text-rose-600">+{district.netGapPoints} pts</strong></div>
                          <div>Top: <strong className="text-slate-900">{district.topSkill}</strong></div>
                          <div>Institutes: <strong className="text-slate-900">{district.institutesCount}</strong></div>
                        </div>
                        <button
                          type="button"
                          onClick={() => onSelectDistrict(district.name)}
                          className="w-full mt-1 py-1 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Zoom into {district.name} Intelligence</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </Popup>
                  </CircleMarker>
                </div>
              );
            })}

          {/* DISTRICT FOCUS VIEW: Render Detailed Industry/Job/Institute Cluster Markers */}
          {!isStateView &&
            visibleClusters.map((cluster) => {
              const visual = categoryVisuals[cluster.category] || categoryVisuals.industry;
              const isSelected = selectedClusterId === cluster.id;
              const isHeroCluster = cluster.id === 'HYD-HITEC';

              return (
                <div key={cluster.id}>
                  {/* Outer animated halo for selected or hero cluster */}
                  {(isSelected || isHeroCluster) && (
                    <CircleMarker
                      center={cluster.coordinates}
                      radius={visual.radius + 12}
                      pathOptions={{
                        color: visual.color,
                        fillColor: 'transparent',
                        weight: 2,
                        dashArray: '4 4',
                        opacity: 0.8
                      }}
                    />
                  )}

                  <CircleMarker
                    center={cluster.coordinates}
                    radius={isSelected ? visual.radius + 3 : visual.radius}
                    pathOptions={{
                      color: isSelected ? '#ffffff' : visual.color,
                      fillColor: visual.fill,
                      fillOpacity: isSelected ? 1 : 0.85,
                      weight: isSelected ? 3 : 1.5
                    }}
                    eventHandlers={{
                      click: () => onSelectCluster(cluster)
                    }}
                  >
                    <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                      <div className="font-sans text-xs">
                        <span className="font-bold text-slate-900 block">{cluster.name}</span>
                        <span className="text-[10px] text-slate-500 font-semibold block">{visual.label}</span>
                        {cluster.activeJobDemand > 0 && (
                          <span className="text-[10px] text-blue-700 font-bold block">
                            Active Jobs: {cluster.activeJobDemand.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </Tooltip>

                    <Popup>
                      <div className="p-1 font-sans text-xs min-w-[220px] space-y-2">
                        <div className="border-b pb-1">
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                            {visual.label}
                          </span>
                          <span className="font-bold text-sm text-slate-900 block leading-tight">
                            {cluster.name}
                          </span>
                        </div>

                        <div className="space-y-1 text-[11px] text-slate-600">
                          <div>Industry: <strong className="text-slate-800">{cluster.industryType}</strong></div>
                          {cluster.activeJobDemand > 0 && (
                            <div>Active Jobs: <strong className="text-blue-700">{cluster.activeJobDemand.toLocaleString()}</strong></div>
                          )}
                          {cluster.studentSupply > 0 && (
                            <div>Student Supply: <strong className="text-slate-800">{cluster.studentSupply.toLocaleString()}</strong></div>
                          )}
                        </div>

                        <div className="pt-1 border-t border-slate-100 flex items-center justify-between text-[11px]">
                          <span className="text-slate-500 font-semibold">Top Skills:</span>
                          <span className="font-bold text-slate-800">{cluster.topSkills.slice(0, 2).join(', ')}</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => onSelectCluster(cluster)}
                          className="w-full mt-1 py-1 px-2 rounded bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Open Full Intelligence Panel</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </Popup>
                  </CircleMarker>
                </div>
              );
            })}
        </MapContainer>

        {/* 3. Floating Quick Info Overlay Panel (Opens when clicking any marker) */}
        {selectedCluster && (
          <div className="absolute top-3 right-3 z-20 w-80 sm:w-96 max-h-[90%] bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200 p-4 overflow-y-auto space-y-3 animate-fade-in text-xs">
            <div className="flex items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
              <div>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                  <Building2 className="w-3 h-3" />
                  {selectedCluster.industryType}
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                  {selectedCluster.name}
                </h4>
              </div>
              <button
                onClick={() => onSelectCluster(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title="Close Info Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Job Demand</span>
                <span className="text-base font-extrabold text-blue-700 tabular-nums">
                  {selectedCluster.activeJobDemand.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Student Supply</span>
                <span className="text-base font-extrabold text-slate-800 tabular-nums">
                  {selectedCluster.studentSupply.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Top Required Skills */}
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                Top Required Skills:
              </span>
              <div className="flex flex-wrap gap-1">
                {selectedCluster.topSkills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Skill Gaps Breakdown */}
            {selectedCluster.skillGaps.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Identified Skill Gaps:
                </span>
                <div className="space-y-1">
                  {selectedCluster.skillGaps.map((gap, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between text-[11px] px-2 py-1 rounded bg-rose-50 border border-rose-100 text-rose-900"
                    >
                      <span className="font-semibold">{gap.skill}</span>
                      <span className="font-bold">
                        {gap.gapLevel} Gap (-{gap.gapPoints} pts)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Current Curriculum Coverage */}
            {selectedCluster.curriculumCoverage.length > 0 && (
              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                  Current Curriculum Coverage:
                </span>
                <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                  {selectedCluster.curriculumCoverage.map((cov, i) => (
                    <div
                      key={i}
                      className="px-2 py-1 rounded bg-slate-100 border border-slate-200 flex items-center justify-between"
                    >
                      <span className="truncate text-slate-700">{cov.skill}</span>
                      <span
                        className={`font-bold ml-1 ${
                          cov.coverage === 'Good'
                            ? 'text-emerald-700'
                            : cov.coverage === 'Partial'
                            ? 'text-amber-700'
                            : 'text-rose-700'
                        }`}
                      >
                        {cov.coverage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Node ID: {selectedCluster.id}</span>
              <button
                type="button"
                onClick={() => onSelectCluster(null)}
                className="text-xs text-blue-600 font-bold hover:underline"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* 4. Bottom Map Legend Bar */}
        <div className="absolute bottom-2 left-3 z-20 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm text-[11px] text-slate-700 flex flex-wrap items-center gap-3">
          <span className="font-bold uppercase tracking-wider text-[10px] text-slate-400">Legend:</span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
            <span>Industry Corridor</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <span>Job Hub</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
            <span>Institute</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
            <span>Critical Gap</span>
          </span>
        </div>
      </div>
    </div>
  );
};
