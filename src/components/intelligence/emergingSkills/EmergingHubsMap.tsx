import { useState } from 'react';
import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { MapPin, Users, AlertTriangle, Sparkles, Activity } from 'lucide-react';
import { mockRegionalHubsDemand, type HubDemandInfo } from '../../../mock/emergingSkillsIntelligenceData';

export const EmergingHubsMap: FC = () => {
  const [selectedHubName, setSelectedHubName] = useState<string>(mockRegionalHubsDemand[0].hub);

  const currentHub: HubDemandInfo =
    mockRegionalHubsDemand.find((h: HubDemandInfo) => h.hub === selectedHubName) || mockRegionalHubsDemand[0];

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-emerald-50 text-emerald-700">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Geographic Intelligence: Where Are Emerging Skills Growing?
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Regional concentration of high-velocity skill hiring across major Indian technology corridors
            </p>
          </div>
        </div>

        <Badge variant="neutral" size="sm">
          {mockRegionalHubsDemand.length} Technology Hubs Tracked
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-4">
        {/* Hubs Heatmap List / Selectors */}
        <div className="lg:col-span-6 space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-1 px-1">
            <span>Tech Corridors & Demand Intensity</span>
            <span>YoY Hiring Surge</span>
          </div>

          <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1">
            {mockRegionalHubsDemand.map((hub: HubDemandInfo) => {
              const isSelected = hub.hub === currentHub.hub;

              return (
                <button
                  key={hub.hub}
                  onClick={() => setSelectedHubName(hub.hub)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-800 shadow-md ring-2 ring-orange-500/50'
                      : 'bg-slate-50 hover:bg-slate-100/80 border-slate-200 text-slate-800'
                  }`}
                >
                  <div className="space-y-1.5 flex-1 pr-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MapPin
                          className={`w-3.5 h-3.5 ${
                            isSelected ? 'text-orange-400' : 'text-slate-500'
                          }`}
                        />
                        <span className="font-bold text-xs">{hub.hub}</span>
                      </div>
                      <span
                        className={`text-[11px] font-bold ${
                          isSelected ? 'text-emerald-400' : 'text-emerald-700'
                        }`}
                      >
                        +{hub.growthPct}% YoY
                      </span>
                    </div>

                    {/* Demand Intensity Bar */}
                    <div className="flex items-center gap-2">
                      <div className={`flex-1 h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-slate-700' : 'bg-slate-200'}`}>
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          style={{ width: `${hub.demandIntensity}%` }}
                        />
                      </div>
                      <span className={`text-[10px] font-medium ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                        {hub.demandIntensity}/100
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Hub Deep-Dive Panel */}
        <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Hub Header */}
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900">{currentHub.hub}</h3>
                  <Badge variant="purple" size="sm">
                    {currentHub.activePostings.toLocaleString()} Active Openings
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Regional talent supply & emerging skill absorption analysis
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">
                  Shortage Risk
                </span>
                <Badge
                  variant={
                    currentHub.shortageRisk === 'High'
                      ? 'danger'
                      : currentHub.shortageRisk === 'Moderate'
                      ? 'warning'
                      : 'success'
                  }
                  size="sm"
                >
                  {currentHub.shortageRisk} Risk
                </Badge>
              </div>
            </div>

            {/* Quick Hub Metrics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                  <Activity className="w-3.5 h-3.5 text-orange-500" />
                  <span>Demand Velocity</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-slate-900">+{currentHub.growthPct}%</span>
                  <span className="text-[10px] text-slate-500">annual hiring</span>
                </div>
              </div>

              <div className="p-3 bg-white border border-slate-200 rounded-lg">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                  <Users className="w-3.5 h-3.5 text-sky-500" />
                  <span>Local Talent Supply</span>
                </div>
                <span className="text-lg font-black text-slate-900">
                  {currentHub.talentAvailability}
                </span>
              </div>
            </div>

            {/* Top Emerging Skills in this Hub */}
            <div>
              <span className="text-xs font-bold text-slate-700 block mb-2">
                Top Emerging Skills in {currentHub.hub}:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentHub.topSkills.map((skill: string) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 text-xs font-semibold bg-white border border-slate-300 text-slate-800 px-2.5 py-1 rounded-md shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-orange-500" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Advisory */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-start gap-2 text-xs text-slate-600 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200/60">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] leading-relaxed text-amber-900">
              <strong>Corridor Assessment:</strong> In {currentHub.hub}, rapid industry demand in {currentHub.topSkills[0]} outpaces regional student certifications. Prioritize partnership initiatives with local technical institutions.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
