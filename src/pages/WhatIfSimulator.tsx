import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { mockSimulationScenarios } from '../mock';
import type { SimulationScenario } from '../types';
import {
  SimulatorHeader,
  SimulationDisclaimer,
  ScenarioSelector,
  BaselineState,
  InterventionControls,
  type SimulatorParameters,
  SimulationOutcome,
  BeforeAfterComparison,
  SkillImpact,
  CurriculumImpact,
  RegionalImpact,
  ScenarioComparison,
  SimulationInterpretation,
  DecisionSensitivity,
  RecommendationHandoff
} from './simulator/index';

export const WhatIfSimulator: FC = () => {
  // Hero scenario default: SIM-SCENARIO-03 (Telangana Modern Analytics POL-304)
  const defaultScenario =
    mockSimulationScenarios.find((s) => s.id === 'SIM-SCENARIO-03') ||
    mockSimulationScenarios[0];

  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(defaultScenario);

  // Helper to construct baseline parameters for a given scenario
  const getBaselineParams = (scenario: SimulationScenario): SimulatorParameters => ({
    trainingCapacityExpansionPct: scenario.parameters.trainingCapacityExpansionPct,
    curriculumRevisionLagMonths: scenario.parameters.curriculumRevisionLagMonths,
    automationAdoptionRatePct: scenario.parameters.automationAdoptionRatePct,
    fdiInflowIncreasePct: scenario.parameters.fdiInflowIncreasePct,
    coOpMandateEnabled: scenario.id === 'SIM-SCENARIO-03'
  });

  const [parameters, setParameters] = useState<SimulatorParameters>(
    getBaselineParams(defaultScenario)
  );

  const baselineParameters = useMemo(
    () => getBaselineParams(selectedScenario),
    [selectedScenario]
  );

  const isModified = useMemo(() => {
    return (
      parameters.trainingCapacityExpansionPct !== baselineParameters.trainingCapacityExpansionPct ||
      parameters.curriculumRevisionLagMonths !== baselineParameters.curriculumRevisionLagMonths ||
      parameters.automationAdoptionRatePct !== baselineParameters.automationAdoptionRatePct ||
      parameters.fdiInflowIncreasePct !== baselineParameters.fdiInflowIncreasePct ||
      parameters.coOpMandateEnabled !== baselineParameters.coOpMandateEnabled
    );
  }, [parameters, baselineParameters]);

  const handleSelectScenario = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setParameters(getBaselineParams(scenario));
  };

  const handleReset = () => {
    setParameters(getBaselineParams(selectedScenario));
  };

  // Deterministic calculation of simulated deltas
  const isHero = selectedScenario.id === 'SIM-SCENARIO-03';
  const isSemi = selectedScenario.id === 'SIM-SCENARIO-01';

  // Baseline figures based on scenario focus
  const baselineSkillGap = isHero ? 46 : isSemi ? 57 : 44;
  const baselineRegionalDeficit = isHero ? 26 : isSemi ? 48 : 21;
  const baselineCurriculumAlignment = isHero ? 46 : isSemi ? 54 : 38;

  // Parameter shift sensitivities
  const capacityShift =
    (parameters.trainingCapacityExpansionPct - baselineParameters.trainingCapacityExpansionPct) *
    (isHero ? 0.15 : 0.12);

  const lagShift =
    (baselineParameters.curriculumRevisionLagMonths - parameters.curriculumRevisionLagMonths) *
    (isHero ? 0.8 : 0.6);

  const coOpPenalty =
    isHero && !parameters.coOpMandateEnabled ? 8.0 : 0.0;

  // Net deficit delta under current parameters
  const netDeficitDelta =
    selectedScenario.projectedSkillDeficitDelta - capacityShift - lagShift + coOpPenalty;

  const simulatedSkillGap = Math.max(
    0,
    Number((baselineSkillGap + netDeficitDelta).toFixed(1))
  );

  const regionalShift = Math.round(netDeficitDelta * (isHero ? 0.77 : 0.75));
  const simulatedRegionalDeficit = Math.max(
    0,
    baselineRegionalDeficit + regionalShift
  );

  // Curriculum alignment modeling (unmodeled for fleet operations SIM-SCENARIO-02)
  const simulatedCurriculumAlignment =
    selectedScenario.id === 'SIM-SCENARIO-02'
      ? null
      : Math.min(
          95,
          Math.max(
            baselineCurriculumAlignment,
            Math.round(
              baselineCurriculumAlignment + Math.abs(netDeficitDelta) * (isHero ? 1.08 : 1.1)
            )
          )
        );

  const curriculumDelta =
    simulatedCurriculumAlignment !== null
      ? simulatedCurriculumAlignment - baselineCurriculumAlignment
      : null;

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Page Header */}
      <SimulatorHeader
        isHero={isHero}
        isModified={isModified}
        onReset={handleReset}
      />

      {/* 2. Prominent Heuristic Disclaimer Banner */}
      <SimulationDisclaimer />

      {/* 3. Scenario Selector Cards */}
      <section aria-label="Scenario Selector">
        <ScenarioSelector
          scenarios={mockSimulationScenarios}
          selectedScenarioId={selectedScenario.id}
          onSelectScenario={handleSelectScenario}
        />
      </section>

      {/* 4. Current-State Baseline */}
      <section aria-label="Current Baseline">
        <BaselineState scenario={selectedScenario} />
      </section>

      {/* 5. Interactive Intervention Parameter Sliders */}
      <section aria-label="Intervention Parameters">
        <InterventionControls
          parameters={parameters}
          baselineParameters={baselineParameters}
          isModified={isModified}
          onChange={setParameters}
          onReset={handleReset}
        />
      </section>

      {/* 6. High-Level Simulated Outcome Panel */}
      <section aria-label="Simulated Outcome">
        <SimulationOutcome
          scenario={selectedScenario}
          parameters={parameters}
          simulatedSkillGap={simulatedSkillGap}
          baselineSkillGap={baselineSkillGap}
          simulatedRegionalDeficit={simulatedRegionalDeficit}
          baselineRegionalDeficit={baselineRegionalDeficit}
          simulatedCurriculumAlignment={simulatedCurriculumAlignment}
          baselineCurriculumAlignment={baselineCurriculumAlignment}
          netDeficitDelta={netDeficitDelta}
        />
      </section>

      {/* 7. Before vs After Side-by-Side Comparison Matrix */}
      <section aria-label="Before vs After Comparison">
        <BeforeAfterComparison
          baselineSkillGap={baselineSkillGap}
          simulatedSkillGap={simulatedSkillGap}
          baselineRegionalDeficit={baselineRegionalDeficit}
          simulatedRegionalDeficit={simulatedRegionalDeficit}
          baselineCurriculumAlignment={baselineCurriculumAlignment}
          simulatedCurriculumAlignment={simulatedCurriculumAlignment}
          curriculumRevisionLagMonths={parameters.curriculumRevisionLagMonths}
        />
      </section>

      {/* 8 & 9. Granular Skill Gap and Curriculum Alignment Shifts */}
      <section aria-label="Skill and Curriculum Shift">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6">
            <SkillImpact
              scenario={selectedScenario}
              netDeficitDelta={netDeficitDelta}
            />
          </div>

          <div className="lg:col-span-6">
            <CurriculumImpact
              scenario={selectedScenario}
              simulatedCurriculumAlignment={simulatedCurriculumAlignment}
              baselineCurriculumAlignment={baselineCurriculumAlignment}
            />
          </div>
        </div>
      </section>

      {/* 10. Regional Capacity & Deficit Shift */}
      <section aria-label="Regional Impact">
        <RegionalImpact
          scenario={selectedScenario}
          simulatedRegionalDeficit={simulatedRegionalDeficit}
          baselineRegionalDeficit={baselineRegionalDeficit}
        />
      </section>

      {/* 11. Cross-Scenario Comparison Table */}
      <section aria-label="Cross-Scenario Comparison">
        <ScenarioComparison
          scenarios={mockSimulationScenarios}
          selectedScenarioId={selectedScenario.id}
          onSelectScenario={handleSelectScenario}
        />
      </section>

      {/* 12. Decision Support Guidance & Interpretation */}
      <section aria-label="Simulation Guidance">
        <SimulationInterpretation
          scenario={selectedScenario}
          parameters={parameters}
          netDeficitDelta={netDeficitDelta}
          regionalDelta={simulatedRegionalDeficit - baselineRegionalDeficit}
          curriculumDelta={curriculumDelta}
        />
      </section>

      {/* 13. Decision Sensitivity Spectrum */}
      <section aria-label="Decision Sensitivity">
        <DecisionSensitivity
          scenario={selectedScenario}
          baselineDeficitDelta={selectedScenario.projectedSkillDeficitDelta}
        />
      </section>

      {/* 14. Actionable Return Hand-Off */}
      <section aria-label="Policy Hand-off">
        <RecommendationHandoff />
      </section>
    </div>
  );
};
