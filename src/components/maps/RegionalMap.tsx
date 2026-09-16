import type { FC } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import type { RegionalGap, RegionalSeverity } from '../../types';

interface RegionalMapProps {
  markers?: RegionalGap[];
  selectedRegionId?: string;
  onSelectRegion?: (region: RegionalGap) => void;
  height?: string;
  className?: string;
}

const severityConfig: Record<RegionalSeverity, { fill: string; stroke: string; label: string; radius: number }> = {
  critical: { fill: '#f43f5e', stroke: '#be123c', label: 'Critical Deficit', radius: 11 },
  high: { fill: '#f59e0b', stroke: '#b45309', label: 'High Deficit', radius: 9 },
  moderate: { fill: '#06b6d4', stroke: '#0369a1', label: 'Moderate Deficit', radius: 8 },
  low: { fill: '#10b981', stroke: '#047857', label: 'Low Deficit', radius: 7 }
};

export const RegionalMap: FC<RegionalMapProps> = ({
  markers = [],
  selectedRegionId,
  onSelectRegion,
  height = '380px',
  className = ''
}) => {
  // Center coordinates over India
  const centerPosition: [number, number] = [21.0, 78.9629];

  return (
    <div
      className={`w-full rounded-xl overflow-hidden border border-slate-800 bg-slate-950 relative ${className}`}
      style={{ height }}
    >
      <MapContainer
        center={centerPosition}
        zoom={4.6}
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers.map((item) => {
          const severity = (item.severity || 'moderate') as RegionalSeverity;
          const config = severityConfig[severity] || severityConfig.moderate;
          const isHero = item.id === 'REG-05'; // Hyderabad
          const isSelected = selectedRegionId === item.id;

          return (
            <div key={item.id}>
              {/* Pulsing outer halo for hero or selected region */}
              {(isHero || isSelected) && (
                <CircleMarker
                  center={item.coordinates}
                  radius={isHero ? 20 : 16}
                  pathOptions={{
                    color: isHero ? '#f43f5e' : '#6366f1',
                    fillColor: 'transparent',
                    weight: 2,
                    dashArray: '4, 4',
                    opacity: 0.85
                  }}
                />
              )}

              {/* Primary Data Circle Marker */}
              <CircleMarker
                center={item.coordinates}
                radius={isSelected ? config.radius + 3 : config.radius}
                pathOptions={{
                  color: isSelected ? '#ffffff' : config.stroke,
                  fillColor: config.fill,
                  fillOpacity: isSelected ? 1 : 0.85,
                  weight: isSelected ? 2.5 : 1.5
                }}
                eventHandlers={{
                  click: () => onSelectRegion?.(item)
                }}
              >
                {/* Hover Tooltip */}
                <Tooltip direction="top" offset={[0, -10]} opacity={0.95}>
                  <div className="text-xs font-sans">
                    <span className="font-bold">{item.region}</span>
                    <span className="block text-[10px] text-slate-300">
                      Deficit: <strong className="text-rose-300">+{item.netDeficit} pts</strong> ({config.label})
                    </span>
                  </div>
                </Tooltip>

                {/* Click Detail Popup */}
                <Popup>
                  <div className="p-1.5 text-slate-100 font-sans min-w-[200px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-700/80 pb-1.5 mb-2">
                      <div>
                        <p className="font-bold text-sm text-white">{item.region}</p>
                        <p className="text-[11px] text-slate-400">{item.state}</p>
                      </div>
                      {isHero && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
                          HERO NODE
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 text-center my-2 bg-slate-900/80 p-1.5 rounded border border-slate-800">
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Demand</span>
                        <span className="text-xs font-bold text-slate-200">{item.demandIndex}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-slate-400 uppercase">Capacity</span>
                        <span className="text-xs font-bold text-slate-200">{item.trainingCapacityIndex}</span>
                      </div>
                      <div>
                        <span className="block text-[10px] text-rose-400 uppercase font-semibold">Deficit</span>
                        <span className="text-xs font-bold text-rose-400">+{item.netDeficit}</span>
                      </div>
                    </div>

                    <div className="mt-2">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                        Priority Sectors in Demand:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.topSectorsInDemand.map((sector) => (
                          <span
                            key={sector}
                            className="text-[10px] bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300"
                          >
                            {sector}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                      <span>Vocational Institutes:</span>
                      <span className="font-semibold text-slate-200">{item.vocationalInstitutesCount}</span>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>
    </div>
  );
};

