import type { FC } from 'react';
import { Layers, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import type { SimulationScenario } from '../../types';

interface ScenarioComparisonProps {
  scenarios: SimulationScenario[];
  selectedScenarioId: string;
  onSelectScenario: (scenario: SimulationScenario) => void;
}

export const ScenarioComparison: FC<ScenarioComparisonProps> = ({
  scenarios,
  selectedScenarioId,
  onSelectScenario
}) => {
  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <Badge variant="outline" size="sm" className="font-mono text-xs">
            MULTI-SCENARIO MATRIX
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Cross-Scenario Decision Comparison</CardTitle>
            <CardDescription>
              Comparative evaluation of macroeconomic assumptions, capital deployment, and deficit mitigation across sectors
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Scenario &amp; Policy Link</th>
                <th className="py-3 px-4">Sector Focus</th>
                <th className="py-3 px-4">Cap. Expansion</th>
                <th className="py-3 px-4">Demand Shift</th>
                <th className="py-3 px-4">Modeled Deficit Delta</th>
                <th className="py-3 px-4">Suggested Mitigation</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {scenarios.map((sc) => {
                const isSelected = sc.id === selectedScenarioId;
                const isHero = sc.id === 'SIM-SCENARIO-03';
                const isDeficitRelieved = sc.projectedSkillDeficitDelta < 0;

                let policyCode = 'POL-301';
                if (sc.id === 'SIM-SCENARIO-03') policyCode = 'POL-304';
                else if (sc.id === 'SIM-SCENARIO-02') policyCode = 'POL-302';

                return (
                  <tr
                    key={sc.id}
                    onClick={() => onSelectScenario(sc)}
                    className={`cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-brand-500/10 hover:bg-brand-500/15'
                        : 'hover:bg-slate-800/30'
                    }`}
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-brand-400">
                          {sc.id}
                        </span>
                        <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                          {policyCode}
                        </span>
                        {isHero && (
                          <Badge variant="critical" size="sm" className="font-mono text-[9px]">
                            HERO
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs font-semibold text-white mt-1">
                        {sc.name}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-300">
                      {sc.sectorFocus}
                    </td>

                    <td className="py-3.5 px-4 font-mono text-emerald-400 font-semibold">
                      +{sc.parameters.trainingCapacityExpansionPct}%
                    </td>

                    <td className="py-3.5 px-4 font-mono text-cyan-400">
                      +{sc.projectedDemandShiftPct}%
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          isDeficitRelieved
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        }`}
                      >
                        {sc.projectedSkillDeficitDelta > 0 ? `+${sc.projectedSkillDeficitDelta}` : sc.projectedSkillDeficitDelta} pts
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-xs truncate">
                      {sc.suggestedMitigation}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold text-brand-400">
                          <Check className="w-3.5 h-3.5" />
                          <span>ACTIVE</span>
                        </span>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectScenario(sc);
                          }}
                          className="text-xs text-slate-400 hover:text-white"
                        >
                          Select
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
