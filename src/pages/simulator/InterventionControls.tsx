import type { FC } from 'react';
import { Sliders, RotateCcw, Zap, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export interface SimulatorParameters {
  trainingCapacityExpansionPct: number;
  curriculumRevisionLagMonths: number;
  automationAdoptionRatePct: number;
  fdiInflowIncreasePct: number;
  coOpMandateEnabled: boolean;
}

interface InterventionControlsProps {
  parameters: SimulatorParameters;
  baselineParameters: SimulatorParameters;
  isModified: boolean;
  onChange: (params: SimulatorParameters) => void;
  onReset: () => void;
}

export const InterventionControls: FC<InterventionControlsProps> = ({
  parameters,
  baselineParameters,
  isModified,
  onChange,
  onReset
}) => {
  const handleChange = <K extends keyof SimulatorParameters>(
    key: K,
    value: SimulatorParameters[K]
  ) => {
    onChange({
      ...parameters,
      [key]: value
    });
  };

  const handleMaxPreset = () => {
    onChange({
      ...parameters,
      trainingCapacityExpansionPct: 85,
      curriculumRevisionLagMonths: 4,
      coOpMandateEnabled: true
    });
  };

  return (
    <Card className="border-slate-800 bg-slate-900/60">
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            {isModified && (
              <Badge variant="warning" size="sm" className="font-mono text-xs">
                MODIFIED
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={handleMaxPreset}
              className="gap-1.5 text-xs text-brand-400 border-brand-500/30 hover:bg-brand-500/10"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Fast-Track Preset</span>
            </Button>
            {isModified && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="gap-1 text-xs text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </Button>
            )}
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Policy Intervention Parameters</CardTitle>
            <CardDescription>
              Adjust counterfactual funding, curriculum speed, and apprenticeship mandates to test gap elasticity
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Training Capacity Expansion */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Collegiate Training Capacity Expansion
                </label>
                <span className="text-[11px] text-slate-400">
                  Funded lab seats &amp; faculty cohort expansion
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-emerald-400">
                  +{parameters.trainingCapacityExpansionPct}%
                </span>
                <span className="text-[10px] block font-mono text-slate-500">
                  Baseline: +{baselineParameters.trainingCapacityExpansionPct}%
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={parameters.trainingCapacityExpansionPct}
              onChange={(e) =>
                handleChange('trainingCapacityExpansionPct', Number(e.target.value))
              }
              className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0% (Status Quo)</span>
              <span>+50% (Standard)</span>
              <span>+100% (Maximum Aggressive)</span>
            </div>
          </div>

          {/* 2. Curriculum Revision Lag Months */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Curriculum Revision Lag
                </label>
                <span className="text-[11px] text-slate-400">
                  Time required to ratify modern syllabus modules
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-amber-400">
                  {parameters.curriculumRevisionLagMonths} Mos
                </span>
                <span className="text-[10px] block font-mono text-slate-500">
                  Baseline: {baselineParameters.curriculumRevisionLagMonths} Mos
                </span>
              </div>
            </div>

            <input
              type="range"
              min="3"
              max="24"
              step="1"
              value={parameters.curriculumRevisionLagMonths}
              onChange={(e) =>
                handleChange('curriculumRevisionLagMonths', Number(e.target.value))
              }
              className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>3 Mos (Autonomous Agility)</span>
              <span>12 Mos (Academic Cycle)</span>
              <span>24 Mos (Bureaucratic Lag)</span>
            </div>
          </div>

          {/* 3. Automation Adoption Rate */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Industry Automation &amp; AI Adoption
                </label>
                <span className="text-[11px] text-slate-400">
                  Velocity of enterprise automation shifting skill standards
                </span>
              </div>
              <div className="text-right">
                <span className="text-lg font-mono font-bold text-cyan-400">
                  {parameters.automationAdoptionRatePct}%
                </span>
                <span className="text-[10px] block font-mono text-slate-500">
                  Baseline: {baselineParameters.automationAdoptionRatePct}%
                </span>
              </div>
            </div>

            <input
              type="range"
              min="10"
              max="80"
              step="5"
              value={parameters.automationAdoptionRatePct}
              onChange={(e) =>
                handleChange('automationAdoptionRatePct', Number(e.target.value))
              }
              className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />

            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>10% (Slow)</span>
              <span>45% (Projected Baseline)</span>
              <span>80% (Hyper-Automation)</span>
            </div>
          </div>

          {/* 4. Capital Inflow & Co-op Mandate */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-semibold text-white block">
                  Industry Co-Op &amp; Sandbox Mandate
                </label>
                <span className="text-[11px] text-slate-400">
                  Statutory 6-month industry apprenticeship semester
                </span>
              </div>
              <Button
                variant={parameters.coOpMandateEnabled ? 'primary' : 'outline'}
                size="sm"
                onClick={() =>
                  handleChange('coOpMandateEnabled', !parameters.coOpMandateEnabled)
                }
                className="gap-1.5 text-xs"
              >
                {parameters.coOpMandateEnabled ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Mandate Active</span>
                  </>
                ) : (
                  <span>Mandate Disabled</span>
                )}
              </Button>
            </div>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Public-Private Co-Funding:</span>
              <span className="font-mono text-brand-400 font-semibold">
                +{parameters.fdiInflowIncreasePct}% Capital FDI
              </span>
            </div>

            <input
              type="range"
              min="10"
              max="100"
              step="5"
              value={parameters.fdiInflowIncreasePct}
              onChange={(e) =>
                handleChange('fdiInflowIncreasePct', Number(e.target.value))
              }
              className="w-full accent-brand-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
