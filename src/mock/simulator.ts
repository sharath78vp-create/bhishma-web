import type { SimulationScenario } from '../types';
export { mockRegionalGaps } from './regional';


export const mockSimulationScenarios: SimulationScenario[] = [
  {
    id: 'SIM-SCENARIO-01',
    name: 'Rapid Semiconductor Fab Ramp (2026 - 2028)',
    description: 'Models a 50% increase in domestic silicon fabrication FDI combined with accelerated factory commissioning.',
    sectorFocus: 'Semiconductors',
    parameters: {
      automationAdoptionRatePct: 40,
      fdiInflowIncreasePct: 55,
      curriculumRevisionLagMonths: 6,
      trainingCapacityExpansionPct: 75
    },
    projectedDemandShiftPct: 64.5,
    projectedSkillDeficitDelta: -12.4, // Reduced deficit due to interventions
    suggestedMitigation: 'Establish 12 specialized Cleanroom Training Centres across state polytechnics.'
  },
  {
    id: 'SIM-SCENARIO-02',
    name: '100% Commercial Fleet EV Mandate',
    description: 'Simulates statutory shift requiring zero-emission delivery and transit fleets by 2029.',
    sectorFocus: 'Electric Vehicles',
    parameters: {
      automationAdoptionRatePct: 35,
      fdiInflowIncreasePct: 30,
      curriculumRevisionLagMonths: 12,
      trainingCapacityExpansionPct: 45
    },
    projectedDemandShiftPct: 48.0,
    projectedSkillDeficitDelta: 8.5,
    suggestedMitigation: 'Convert conventional IC engine mechanics into certified high-voltage battery technicians.'
  },
  {
    id: 'SIM-SCENARIO-03',
    name: 'Telangana Analytics & Cloud Co-op Initiative (POL-304)',
    description: 'Simulates mandatory 6-month industry data co-ops, university cloud sandbox grants, and faculty upskilling across 45 Tier-2 colleges in Hyderabad.',
    sectorFocus: 'Artificial Intelligence & Data',
    parameters: {
      automationAdoptionRatePct: 45,
      fdiInflowIncreasePct: 60,
      curriculumRevisionLagMonths: 9,
      trainingCapacityExpansionPct: 65
    },
    projectedDemandShiftPct: 40.2,
    projectedSkillDeficitDelta: -26.0,
    suggestedMitigation: 'Deploy university cloud sandboxes (Snowflake, dbt) and mandate a 6-month industry analytics co-op across 45 Tier-2 colleges in Hyderabad.'
  }
];
