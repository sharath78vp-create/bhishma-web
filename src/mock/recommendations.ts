import type { PolicyIntervention } from '../types';

export const mockPolicyInterventions: PolicyIntervention[] = [
  {
    id: 'POL-301',
    title: 'National AI Hardware & VLSI Apprenticeship Mandate',
    targetSector: 'Semiconductors',
    targetRegion: 'National (Gujarat, Karnataka, Telangana)',
    priority: 'high',
    interventionType: 'Curriculum Overhaul',
    estimatedCostCr: 450,
    projectedTalentOutput: 32000,
    implementationTimeMonths: 12,
    rationale: 'Subsidize EDA tool licenses for Tier-2 engineering colleges and integrate a 6-month industry co-op semester into the 4th year curriculum.'
  },
  {
    id: 'POL-302',
    title: 'Automotive Cluster EV Powertrain Reskilling Program',
    targetSector: 'Automotive & Clean Energy',
    targetRegion: 'Western & Southern Corridors (Pune-Chennai)',
    priority: 'high',
    interventionType: 'Faculty Upskilling',
    estimatedCostCr: 120,
    projectedTalentOutput: 18500,
    implementationTimeMonths: 8,
    rationale: 'Upgrade polytechnic laboratory infrastructure to include high-voltage dyno test benches and BMS simulation rigs.'
  },
  {
    id: 'POL-303',
    title: 'Autonomous Robotics & Agri-Tech Drone Operator Certification',
    targetSector: 'Precision Agriculture & Logistics',
    targetRegion: 'Northern & Central India (Punjab, Haryana, MP)',
    priority: 'medium',
    interventionType: 'Infrastructure Grant',
    estimatedCostCr: 85,
    projectedTalentOutput: 14000,
    implementationTimeMonths: 6,
    rationale: 'Establish 50 regional drone testing fields and sensor calibration labs in agricultural colleges.'
  },
  {
    id: 'POL-304',
    title: 'Telangana Collegiate Modern Data Analytics & Cloud Co-op Initiative',
    targetSector: 'Artificial Intelligence & Data',
    targetRegion: 'Hyderabad Innovation Corridor (Telangana)',
    priority: 'high',
    interventionType: 'Industry Co-op',
    estimatedCostCr: 145,
    projectedTalentOutput: 24000,
    implementationTimeMonths: 9,
    rationale: 'Establish subsidized university cloud sandbox environments (Snowflake, BigQuery, dbt, Power BI) and mandate a 6-month industry analytics co-op across 45 Tier-2 engineering colleges in Hyderabad, directly closing the 54% syllabus alignment gap.',
    relatedCourseIds: ['CURR-102', 'CURR-104'],
    relatedSkillIds: ['SK-07', 'SK-08', 'SK-09', 'SK-10']
  }
];

