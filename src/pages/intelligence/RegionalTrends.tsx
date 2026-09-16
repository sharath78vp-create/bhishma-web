import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { InteractiveIntelligenceMap } from '../../components/intelligence/InteractiveIntelligenceMap';
import {
  stateList,
  stateDistrictsData,
  getDistrictData,
  type MapClusterMarker
} from '../../mock/intelligenceCommandData';
import { MapPin, Building2, TrendingUp, Sparkles, Users, Briefcase, AlertTriangle } from 'lucide-react';

export const RegionalTrends: FC = () => {
  const [selectedStateName, setSelectedStateName] = useState('Telangana');
  const [selectedDistrictName, setSelectedDistrictName] = useState('Hyderabad');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedCluster, setSelectedCluster] = useState<MapClusterMarker | null>(null);

  const activeState = stateList.find(s => s.name === selectedStateName) || stateList[0];
  const activeDistrict = getDistrictData(selectedStateName, selectedDistrictName);

  const handleStateChange = (newState: string) => {
    setSelectedStateName(newState);
    const districts = stateDistrictsData[newState];
    if (districts && districts.length > 0) {
      setSelectedDistrictName(districts[0].name);
    } else {
      setSelectedDistrictName('All Districts');
    }
    setSelectedCluster(null);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in pb-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Regional Trends &amp; Spatial Intelligence
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Identify geographic concentrations of skill demand, regional industries, student supply, and workforce gaps.
          </p>
        </div>

        {/* State and District Selectors */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <select
            value={selectedStateName}
            onChange={(e) => handleStateChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {stateList.map(s => (
              <option key={s.id} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDistrictName}
            onChange={(e) => {
              setSelectedDistrictName(e.target.value);
              setSelectedCluster(null);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-900 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All Districts">All Districts</option>
            {(stateDistrictsData[selectedStateName] || []).map(d => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Selected Regional Hub Summary Banner */}
      <Card padding="lg" className="border-blue-200 bg-blue-50/25">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                Spatial Node Telemetry
              </span>
              <Badge variant="brand" size="sm">
                Active Node
              </Badge>
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              {activeDistrict.name} District &bull; {selectedStateName}
            </h2>
            <p className="text-xs text-slate-600">
              {activeDistrict.demandLabel} &bull; {activeDistrict.gapLabel} &bull; {activeDistrict.activeIndustriesCount} Monitored Industrial Clusters
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3 bg-white rounded-xl border border-blue-200 text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Active Job Demand</span>
              <span className="text-xl font-extrabold text-blue-700 tabular-nums">
                {activeDistrict.jobDemand.toLocaleString()}
              </span>
            </div>

            <div className="p-3 bg-white rounded-xl border border-rose-200 text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Talent Deficit</span>
              <span className="text-xl font-black text-rose-600 tabular-nums">
                +{activeDistrict.netGapPoints} pts
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Interactive Map */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-slate-800">
          Geographic Cluster Map ({selectedStateName} &rarr; {selectedDistrictName})
        </h3>
        <InteractiveIntelligenceMap
          activeState={activeState}
          activeDistrict={activeDistrict}
          selectedDistrictName={selectedDistrictName}
          onSelectDistrict={(d) => setSelectedDistrictName(d)}
          selectedClusterId={selectedCluster?.id || null}
          onSelectCluster={(c) => setSelectedCluster(c)}
          industryFilter={selectedIndustry}
        />
      </div>

      {/* Regional Skills in Demand Breakdown */}
      <div className="space-y-3">
        <h3 className="text-base font-bold text-slate-900">
          Top Skills in Demand across {activeDistrict.name}
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {activeDistrict.topSkillsComparison.slice(0, 4).map((s) => (
            <Card key={s.skill} padding="md" className="border-slate-200">
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-900">{s.skill}</span>
                <Badge variant={s.priority === 'CRITICAL' ? 'danger' : 'brand'} size="sm">
                  {s.priority} Priority
                </Badge>
              </div>
              <div className="mt-3 space-y-1 text-[11px] text-slate-600">
                <div className="flex justify-between">
                  <span>Industry Demand:</span>
                  <strong className="text-blue-700">{s.industryDemandPct}%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Student Proficiency:</span>
                  <strong className="text-slate-800">{s.studentProficiencyPct}%</strong>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-100 text-rose-600 font-bold">
                  <span>Net Gap:</span>
                  <span>+{s.gapPoints} pts</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
