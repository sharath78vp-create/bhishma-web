import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip, useMap } from 'react-leaflet';
import {
  Layers,
  MapPin,
  Briefcase,
  Building2,
  AlertTriangle,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Maximize2
} from 'lucide-react';
import type { JobMarkerPin } from '../../mock/officerMarketData';
import { districtCoordinates } from '../../mock/officerMarketData';
import {
  getGeoapifyTileUrl,
  GEOAPIFY_ATTRIBUTION,
  type GeoapifyMapStyle
} from '../../config/maps';

interface OfficerInteractiveMapProps {
  pins: JobMarkerPin[];
  selectedDistrict: string;
  selectedState: string;
  onSelectDistrict: (districtName: string) => void;
  onSelectJobRole: (jobTitle: string, district?: string) => void;
}

// Controller component to smoothly pan/zoom map on selection changes
const MapViewController: FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom, { animate: true, duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const OfficerInteractiveMap: FC<OfficerInteractiveMapProps> = ({
  pins,
  selectedDistrict,
  selectedState,
  onSelectDistrict,
  onSelectJobRole
}) => {
  // Tile Theme Style with user's Geoapify API key
  const [mapStyle, setMapStyle] = useState<GeoapifyMapStyle>('osm-bright-smooth');

  // Layer visibility toggles as per Section 7 Map Legend
  const [layers, setLayers] = useState({
    job_demand: true,
    industry: true,
    skill_gap: false,
    institute: false,
    emerging: false
  });

  // Calculate center and zoom based on selected district or state
  const targetLocation = districtCoordinates[selectedDistrict] || districtCoordinates['All Districts'];
  const center = targetLocation.center;
  const zoom = targetLocation.zoom;

  // Filter pins based on active layer toggles
  const visiblePins = pins.filter((pin) => {
    if (layers[pin.category]) return true;
    // Always show if it's the selected district's pin and job demand is on
    if (layers.job_demand && (pin.district === selectedDistrict || selectedDistrict === 'All Districts')) {
      return true;
    }
    return false;
  });

  // Marker sizing and styling by demand level
  const getMarkerVisuals = (demand: 'Low' | 'Medium' | 'High', isSelected: boolean) => {
    switch (demand) {
      case 'High':
        return {
          radius: isSelected ? 22 : 18,
          pulseRadius: isSelected ? 34 : 28,
          fillColor: '#FF9B51', // Accent brand orange
          borderColor: '#25343F',
          weight: isSelected ? 3 : 2,
          fillOpacity: 0.95
        };
      case 'Medium':
        return {
          radius: isSelected ? 16 : 13,
          pulseRadius: isSelected ? 24 : 0,
          fillColor: '#25343F', // Deep navy
          borderColor: '#FFFFFF',
          weight: 2,
          fillOpacity: 0.9
        };
      case 'Low':
      default:
        return {
          radius: isSelected ? 12 : 9,
          pulseRadius: 0,
          fillColor: '#14746F', // Deep teal
          borderColor: '#FFFFFF',
          weight: 1.5,
          fillOpacity: 0.85
        };
    }
  };

  return (
    <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl overflow-hidden border border-[#BFC9D1] shadow-md bg-white">
      {/* 1. Map Viewport */}
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={false}
        className="w-full h-full z-10"
      >
        <MapViewController center={center} zoom={zoom} />

        {/* Geoapify Vector/Raster Tiles powered by Officer Portal API Key */}
        <TileLayer
          key={mapStyle}
          attribution={GEOAPIFY_ATTRIBUTION}
          url={getGeoapifyTileUrl(mapStyle)}
          maxZoom={20}
        />

        {/* Selected District Highlight Halo (when a specific district is active) */}
        {selectedDistrict !== 'All Districts' && (
          <CircleMarker
            center={center}
            radius={55}
            pathOptions={{
              color: '#FF9B51',
              fillColor: '#FF9B51',
              fillOpacity: 0.12,
              weight: 2,
              dashArray: '5 5'
            }}
          />
        )}

        {/* Job Demand Location Markers */}
        {visiblePins.map((pin) => {
          const isSelected = pin.district === selectedDistrict;
          const visuals = getMarkerVisuals(pin.demandLevel, isSelected);

          return (
            <div key={pin.id}>
              {/* Pulsing indicator for High demand clusters */}
              {visuals.pulseRadius > 0 && (
                <CircleMarker
                  center={pin.coordinates}
                  radius={visuals.pulseRadius}
                  pathOptions={{
                    color: '#FF9B51',
                    fillColor: 'transparent',
                    weight: 1.5,
                    dashArray: '3 4',
                    opacity: 0.7
                  }}
                />
              )}

              {/* Main Sized Marker */}
              <CircleMarker
                center={pin.coordinates}
                radius={visuals.radius}
                pathOptions={{
                  color: visuals.borderColor,
                  fillColor: visuals.fillColor,
                  fillOpacity: visuals.fillOpacity,
                  weight: visuals.weight
                }}
                eventHandlers={{
                  click: () => {
                    if (pin.district !== selectedDistrict) {
                      onSelectDistrict(pin.district);
                    }
                  }
                }}
              >
                {/* Hover Tooltip */}
                <Tooltip direction="top" offset={[0, -12]} opacity={0.95}>
                  <div className="font-sans text-xs p-0.5">
                    <span className="font-bold text-[#25343F] block">{pin.jobTitle}</span>
                    <span className="text-[11px] text-slate-600 block">
                      📍 {pin.locationName} &bull; <strong className="text-[#FF9B51]">{pin.openPositions} Jobs</strong>
                    </span>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block mt-0.5">
                      Demand: {pin.demandLevel.toUpperCase()}
                    </span>
                  </div>
                </Tooltip>

                {/* Job Marker Popup matching Section 8 of Spec */}
                <Popup className="custom-officer-popup">
                  <div className="p-2.5 font-sans min-w-[240px] space-y-3">
                    {/* Header */}
                    <div className="border-b border-[#BFC9D1]/50 pb-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black tracking-wider text-[#25343F] uppercase">
                          {pin.jobTitle}
                        </span>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            pin.demandLevel === 'High'
                              ? 'bg-[#FF9B51]/20 text-[#D96B1E]'
                              : pin.demandLevel === 'Medium'
                              ? 'bg-blue-100 text-[#25343F]'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {pin.demandLevel.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-600 mt-1">
                        <MapPin className="w-3 h-3 text-[#FF9B51]" />
                        <span>{pin.locationName}</span>
                      </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#EAEFEF]/60 p-2 rounded-lg border border-[#BFC9D1]/30">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Open Positions</span>
                        <span className="text-sm font-black text-[#25343F]">{pin.openPositions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Industry</span>
                        <span className="text-xs font-bold text-[#25343F] truncate block">{pin.industry}</span>
                      </div>
                    </div>

                    {/* Required Skills Pills */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                        Required Skills
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {pin.requiredSkills.map((sk) => (
                          <span
                            key={sk}
                            className="px-2 py-0.5 bg-white rounded border border-[#BFC9D1] text-[10px] font-semibold text-[#25343F]"
                          >
                            {sk}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => {
                        onSelectDistrict(pin.district);
                        onSelectJobRole(pin.jobTitle, pin.district);
                      }}
                      className="w-full mt-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-bold text-white bg-[#25343F] hover:bg-[#FF9B51] transition-all shadow-xs cursor-pointer"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </Popup>
              </CircleMarker>
            </div>
          );
        })}
      </MapContainer>

      {/* 2. Top-Left Scope Indicator Overlay */}
      <div className="absolute top-4 left-4 z-[400] bg-white/95 backdrop-blur-sm px-3.5 py-2 rounded-xl border border-[#BFC9D1] shadow-sm flex items-center gap-2 text-xs">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF9B51] animate-pulse" />
        <span className="font-bold text-[#25343F]">
          {selectedState} &rarr; <span className="text-[#FF9B51]">{selectedDistrict}</span>
        </span>
        <span className="text-[10px] text-slate-500 hidden sm:inline">
          ({visiblePins.length} Active Hubs)
        </span>
      </div>

      {/* 3. Floating Map Legend Overlay (Section 7 in Spec) */}
      <div className="absolute bottom-4 right-4 z-[400] bg-white/95 backdrop-blur-sm p-3.5 rounded-xl border border-[#BFC9D1] shadow-md text-xs w-64 space-y-3">
        {/* Layer Checkboxes */}
        <div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-1.5 mb-2">
            <span className="font-black text-[11px] text-[#25343F] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#FF9B51]" />
              MAP LAYERS
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Toggle</span>
          </div>

          <div className="space-y-1.5 font-medium text-slate-700 text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer hover:text-[#25343F] transition-colors">
              <input
                type="checkbox"
                checked={layers.job_demand}
                onChange={(e) => setLayers((prev) => ({ ...prev, job_demand: e.target.checked }))}
                className="rounded border-[#BFC9D1] text-[#FF9B51] focus:ring-[#FF9B51] w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1.5">
                <Briefcase className="w-3 h-3 text-[#FF9B51]" />
                <span>Job Demand</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#25343F] transition-colors">
              <input
                type="checkbox"
                checked={layers.industry}
                onChange={(e) => setLayers((prev) => ({ ...prev, industry: e.target.checked }))}
                className="rounded border-[#BFC9D1] text-[#25343F] focus:ring-[#25343F] w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1.5">
                <Building2 className="w-3 h-3 text-[#25343F]" />
                <span>Industries</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#25343F] transition-colors">
              <input
                type="checkbox"
                checked={layers.skill_gap}
                onChange={(e) => setLayers((prev) => ({ ...prev, skill_gap: e.target.checked }))}
                className="rounded border-[#BFC9D1] text-rose-600 focus:ring-rose-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-rose-500" />
                <span>Skill Gap</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#25343F] transition-colors">
              <input
                type="checkbox"
                checked={layers.institute}
                onChange={(e) => setLayers((prev) => ({ ...prev, institute: e.target.checked }))}
                className="rounded border-[#BFC9D1] text-purple-600 focus:ring-purple-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3 text-purple-500" />
                <span>Training Institutes</span>
              </span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer hover:text-[#25343F] transition-colors">
              <input
                type="checkbox"
                checked={layers.emerging}
                onChange={(e) => setLayers((prev) => ({ ...prev, emerging: e.target.checked }))}
                className="rounded border-[#BFC9D1] text-indigo-600 focus:ring-indigo-500 w-3.5 h-3.5"
              />
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-indigo-500" />
                <span>Emerging Skills</span>
              </span>
            </label>
          </div>
        </div>

        {/* Job Demand Legend */}
        <div className="border-t border-slate-200 pt-2">
          <span className="font-black text-[10px] text-[#25343F] uppercase tracking-wider block mb-1.5">
            JOB DEMAND SCALE
          </span>
          <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#14746F] inline-block" />
              <span>Low</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-full bg-[#25343F] inline-block" />
              <span>Medium</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-4 h-4 rounded-full bg-[#FF9B51] inline-block shadow-xs" />
              <span>High</span>
            </span>
          </div>
        </div>

        {/* Geoapify Style Selector with Live API Badge */}
        <div className="border-t border-slate-200 pt-2">
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-black text-[10px] text-[#25343F] uppercase tracking-wider">
              MAP ENGINE
            </span>
            <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              GEOAPIFY ACTIVE
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => setMapStyle('osm-bright-smooth')}
              className={`px-1.5 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                mapStyle === 'osm-bright-smooth'
                  ? 'bg-[#25343F] text-white shadow-2xs'
                  : 'bg-[#EAEFEF] text-slate-700 hover:bg-[#BFC9D1]/50'
              }`}
            >
              Bright
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('positron')}
              className={`px-1.5 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                mapStyle === 'positron'
                  ? 'bg-[#25343F] text-white shadow-2xs'
                  : 'bg-[#EAEFEF] text-slate-700 hover:bg-[#BFC9D1]/50'
              }`}
            >
              Clean BI
            </button>
            <button
              type="button"
              onClick={() => setMapStyle('osm-carto')}
              className={`px-1.5 py-1 rounded text-[10px] font-bold transition-colors cursor-pointer ${
                mapStyle === 'osm-carto'
                  ? 'bg-[#25343F] text-white shadow-2xs'
                  : 'bg-[#EAEFEF] text-slate-700 hover:bg-[#BFC9D1]/50'
              }`}
            >
              Detailed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
