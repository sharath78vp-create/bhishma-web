import { useMemo } from 'react';
import type { FC } from 'react';
import { MapContainer, TileLayer, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { RegionalGap, RegionalSeverity } from '../../types';
import { mockDistrictJobs } from '../../mock';
import { getGeoapifyTileUrl, GEOAPIFY_ATTRIBUTION } from '../../config/maps';

interface RegionalMapProps {
  markers?: RegionalGap[];
  selectedRegionId?: string;
  onSelectRegion?: (region: RegionalGap) => void;
  height?: string;
  className?: string;
}

const severityConfig: Record<RegionalSeverity, { fill: string; stroke: string; label: string; glow: string }> = {
  critical: { fill: '#f43f5e', stroke: '#be123c', label: 'Critical Deficit', glow: 'rgba(244,63,94,0.4)' },
  high:     { fill: '#FF9B51', stroke: '#c97320', label: 'High Deficit',     glow: 'rgba(255,155,81,0.4)' },
  moderate: { fill: '#06b6d4', stroke: '#0369a1', label: 'Moderate Deficit', glow: 'rgba(6,182,212,0.4)' },
  low:      { fill: '#10b981', stroke: '#047857', label: 'Low Deficit',      glow: 'rgba(16,185,129,0.4)' },
};

function createPinIcon(
  severity: RegionalSeverity,
  jobCount: number,
  isSelected: boolean
): L.DivIcon {
  const cfg = severityConfig[severity] || severityConfig.moderate;
  const size = isSelected ? 52 : 44;
  const pulse = isSelected
    ? `<div style="
        position:absolute;top:50%;left:50%;
        transform:translate(-50%,-65%);
        width:${size + 18}px;height:${size + 18}px;
        border-radius:50%;
        background:${cfg.glow};
        animation:pulseRing 1.8s ease-out infinite;
        pointer-events:none;
      "></div>`
    : '';

  const countLabel =
    jobCount >= 1000
      ? `${(jobCount / 1000).toFixed(1)}k`
      : String(jobCount);

  const html = `
    <div style="position:relative;width:${size}px;height:${size * 1.25}px;cursor:pointer;filter:drop-shadow(0 4px 8px ${cfg.glow});">
      ${pulse}
      <svg viewBox="0 0 44 55" width="${size}" height="${size * 1.25}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="pin-g-${severity}" cx="40%" cy="30%">
            <stop offset="0%" stop-color="${cfg.fill}" stop-opacity="1"/>
            <stop offset="100%" stop-color="${cfg.stroke}" stop-opacity="1"/>
          </radialGradient>
        </defs>
        <path d="M22 0C10.402 0 1 9.402 1 21c0 15.5 21 34 21 34s21-18.5 21-34C43 9.402 33.598 0 22 0z"
          fill="url(#pin-g-${severity})" stroke="${isSelected ? '#fff' : cfg.stroke}" stroke-width="${isSelected ? 2 : 1.5}"/>
        <circle cx="22" cy="21" r="12" fill="rgba(255,255,255,0.92)"/>
        <text x="22" y="25"
          text-anchor="middle"
          font-size="${countLabel.length > 3 ? 7 : 8}"
          font-weight="800"
          fill="${cfg.stroke}"
          font-family="Inter,system-ui,sans-serif"
          letter-spacing="-0.5">${countLabel}</text>
      </svg>
    </div>
  `;

  return L.divIcon({
    html,
    className: '',
    iconSize: [size, size * 1.25],
    iconAnchor: [size / 2, size * 1.25],
    tooltipAnchor: [0, -(size * 1.25)],
  });
}

export const RegionalMap: FC<RegionalMapProps> = ({
  markers = [],
  selectedRegionId,
  onSelectRegion,
  height = '380px',
  className = ''
}) => {
  const centerPosition: [number, number] = [20.5, 78.9629];

  // Pre-compute icons per marker – memoized so they only rebuild on selection change
  const icons = useMemo(() => {
    return markers.reduce<Record<string, L.DivIcon>>((acc, item) => {
      const severity = (item.severity || 'moderate') as RegionalSeverity;
      const districtData = mockDistrictJobs[item.id];
      const jobCount = districtData?.totalOpenings ?? Math.round(item.demandIndex * 180);
      acc[item.id] = createPinIcon(severity, jobCount, selectedRegionId === item.id);
      return acc;
    }, {});
  }, [markers, selectedRegionId]);

  return (
    <>
      {/* Pulse ring keyframe injected once */}
      <style>{`
        @keyframes pulseRing {
          0%   { transform: translate(-50%,-65%) scale(0.85); opacity: 0.8; }
          70%  { transform: translate(-50%,-65%) scale(1.6);  opacity: 0; }
          100% { transform: translate(-50%,-65%) scale(1.6);  opacity: 0; }
        }
      `}</style>

      <div
        className={`w-full rounded-xl overflow-hidden border border-[#BFC9D1] bg-[#EAEFEF] relative shadow-sm ${className}`}
        style={{ height }}
      >
        <MapContainer
          center={centerPosition}
          zoom={4.8}
          scrollWheelZoom={false}
          zoomControl={true}
          className="w-full h-full"
        >
          {/* Carto Voyager — clean, modern, works beautifully with light palette */}
          <TileLayer
            attribution={GEOAPIFY_ATTRIBUTION}
            url={getGeoapifyTileUrl('osm-bright-smooth')}
            maxZoom={20}
          />

          {markers.map((item) => {
            const severity = (item.severity || 'moderate') as RegionalSeverity;
            const cfg = severityConfig[severity];
            const districtData = mockDistrictJobs[item.id];
            const totalOpenings = districtData?.totalOpenings ?? 0;
            const isSelected = selectedRegionId === item.id;

            return (
              <Marker
                key={item.id}
                position={item.coordinates}
                icon={icons[item.id]}
                eventHandlers={{
                  click: () => onSelectRegion?.(item),
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -8]}
                  opacity={1}
                  permanent={false}
                >
                  <div style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    minWidth: 180,
                    padding: '8px 10px',
                    background: '#25343F',
                    borderRadius: 8,
                    color: '#EAEFEF',
                    fontSize: 12,
                    lineHeight: 1.4,
                  }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                      {item.region}
                    </div>
                    <div style={{ color: '#BFC9D1', fontSize: 11 }}>{item.state}</div>
                    <div style={{
                      marginTop: 6,
                      display: 'flex',
                      gap: 12,
                      borderTop: '1px solid rgba(191,201,209,0.2)',
                      paddingTop: 6,
                    }}>
                      <span>
                        <span style={{ color: '#BFC9D1', fontSize: 10 }}>Open Jobs</span>
                        <br />
                        <span style={{ fontWeight: 700, color: '#FF9B51' }}>
                          {totalOpenings.toLocaleString()}
                        </span>
                      </span>
                      <span>
                        <span style={{ color: '#BFC9D1', fontSize: 10 }}>Deficit</span>
                        <br />
                        <span style={{ fontWeight: 700, color: cfg.fill }}>
                          +{item.netDeficit} pts
                        </span>
                      </span>
                      <span>
                        <span style={{ color: '#BFC9D1', fontSize: 10 }}>Severity</span>
                        <br />
                        <span style={{ fontWeight: 700, color: cfg.fill, textTransform: 'capitalize' }}>
                          {severity}
                        </span>
                      </span>
                    </div>
                    {isSelected && (
                      <div style={{
                        marginTop: 6,
                        fontSize: 10,
                        color: '#FF9B51',
                        fontWeight: 600,
                      }}>
                        ✓ Selected — See analytics →
                      </div>
                    )}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Map Legend */}
        <div style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          zIndex: 900,
          background: 'rgba(37,52,63,0.92)',
          backdropFilter: 'blur(8px)',
          borderRadius: 10,
          padding: '8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: 5,
          fontSize: 11,
          color: '#BFC9D1',
          border: '1px solid rgba(191,201,209,0.2)',
        }}>
          <div style={{ fontWeight: 700, color: '#EAEFEF', marginBottom: 2, fontSize: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
            Skill Deficit
          </div>
          {(Object.keys(severityConfig) as RegionalSeverity[]).map((sev) => (
            <div key={sev} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{
                width: 10, height: 10, borderRadius: '50%',
                background: severityConfig[sev].fill,
                display: 'inline-block', flexShrink: 0,
              }} />
              <span style={{ textTransform: 'capitalize' }}>{sev}</span>
            </div>
          ))}
          <div style={{
            marginTop: 4,
            paddingTop: 4,
            borderTop: '1px solid rgba(191,201,209,0.2)',
            fontSize: 10,
            color: '#BFC9D1',
          }}>
            Pin labels = total open jobs
          </div>
        </div>
      </div>
    </>
  );
};
