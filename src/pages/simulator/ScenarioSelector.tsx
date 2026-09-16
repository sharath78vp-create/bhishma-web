import type { FC } from 'react';
import { Sparkles, Cpu, Car, Layers, MapPin, Sliders } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { SimulationScenario } from '../../types';

interface ScenarioSelectorProps {
  scenarios: SimulationScenario[];
  selectedScenarioId: string;
  onSelectScenario: (scenario: SimulationScenario) => void;
}

export const ScenarioSelector: FC<ScenarioSelectorProps> = ({
  scenarios,
  selectedScenarioId,
  onSelectScenario
}) => {
  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="default" size="sm" className="font-mono text-xs">
            {scenarios.length} SCENARIOS LOADED
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Select Policy Intervention Scenario</CardTitle>
            <CardDescription>
              Choose a pre-configured macroeconomic intervention scenario to simulate curriculum and capacity shifts
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {scenarios.map((scenario) => {
            const isSelected = scenario.id === selectedScenarioId;
            const isHero = scenario.id === 'SIM-SCENARIO-03';

            let Icon = Layers;
            let region = 'National & Regional Hubs';
            let policyLink = 'POL-301';
            let targetCurriculum = 'CURR-101 (VLSI)';

            if (scenario.id === 'SIM-SCENARIO-03') {
              Icon = Sparkles;
              region = 'Hyderabad Innovation Corridor (Telangana)';
              policyLink = 'POL-304';
              targetCurriculum = 'CURR-104 (BI & Analytics)';
            } else if (scenario.id === 'SIM-SCENARIO-01') {
              Icon = Cpu;
              region = 'Dholera-Sanand & Bengaluru-Mysuru';
              policyLink = 'POL-301';
              targetCurriculum = 'CURR-101 (ECE-402 VLSI)';
            } else if (scenario.id === 'SIM-SCENARIO-02') {
              Icon = Car;
              region = 'Pune-Chakan & Chennai-Hosur Belts';
              policyLink = 'POL-302';
              targetCurriculum = 'CURR-103 (ME-418 Automotive)';
            }

            return (
              <div
                key={scenario.id}
                onClick={() => onSelectScenario(scenario)}
                className={`group cursor-pointer rounded-xl border p-4 flex flex-col justify-between transition-all duration-200 relative ${
                  isSelected
                    ? isHero
                      ? 'border-brand-500 bg-slate-900 ring-1 ring-brand-500/50 shadow-sm'
                      : 'border-cyan-500 bg-slate-900 ring-1 ring-cyan-500/50 shadow-sm'
                    : 'border-slate-800 bg-slate-950/40 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                {/* Active check indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 text-xs font-mono font-bold text-brand-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-400 animate-pulse" />
                    <span>ACTIVE</span>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`p-2 rounded-lg border ${
                        isSelected
                          ? isHero
                            ? 'bg-brand-500/20 text-brand-400 border-brand-500/30'
                            : 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30'
                          : 'bg-slate-800 text-slate-400 border-slate-700'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono text-slate-400 font-semibold">
                          {scenario.id}
                        </span>
                        {isHero && (
                          <Badge variant="critical" size="sm" className="font-mono text-[9px] uppercase">
                            HERO
                          </Badge>
                        )}
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {policyLink}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-white leading-tight mt-0.5">
                        {scenario.name}
                      </h4>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {scenario.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-[11px]">
                    <div className="flex items-center justify-between text-slate-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-brand-400" />
                        <span>Region:</span>
                      </span>
                      <span className="font-medium text-slate-200 truncate max-w-[170px]">
                        {region.split('(')[0].trim()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-slate-400">
                      <span>Curriculum Focus:</span>
                      <span className="font-mono text-slate-200">
                        {targetCurriculum}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Scenario Parameter Chips */}
                <div className="mt-4 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-500 block">Cap. Expansion:</span>
                    <span className="font-semibold text-emerald-400">
                      +{scenario.parameters.trainingCapacityExpansionPct}%
                    </span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-900 border border-slate-800/80">
                    <span className="text-slate-500 block">Syllabus Lag:</span>
                    <span className="font-semibold text-amber-400">
                      {scenario.parameters.curriculumRevisionLagMonths} Mos
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
