import type { EarlyWarningAlert } from '../types';

export const mockEarlyWarnings: EarlyWarningAlert[] = [
  {
    id: 'EW-901',
    severity: 'critical',
    title: 'Severe VLSI Tapeout Engineer Shortage for Advanced Semiconductor Clusters',
    sector: 'Semiconductors',
    affectedRoles: ['RTL Design Engineer', 'Verification Engineer', 'EDA Tool Specialist'],
    predictedImpactHorizon: '3 - 6 Months',
    description: 'Upcoming commercial fabrication facilities project a shortfall of 24,000 qualified fabrication and verification engineers by Q3 2027.',
    recommendedImmediateAction: 'Mandate fast-track 6-month semiconductor finishing programs in 40 accredited technical academies.',
    timestamp: '2026-09-10T08:30:00Z'
  },
  {
    id: 'EW-902',
    severity: 'critical',
    title: 'Surplus of Basic Manual IT Support & Data Entry Graduates',
    sector: 'Information Technology Services',
    affectedRoles: ['Manual QA Analyst', 'L1 Helpdesk Associate', 'Basic Content Moderator'],
    predictedImpactHorizon: 'Immediate (0 - 3 Months)',
    description: 'Autonomous AI workflow agents have reduced campus recruitment quotas for generic entry-level QA and back-office roles by 44% across major IT service hubs.',
    recommendedImmediateAction: 'Transition university curricula toward AI agent oversight, prompt engineering, and API integration.',
    timestamp: '2026-09-08T14:15:00Z'
  },
  {
    id: 'EW-903',
    severity: 'warning',
    title: 'Battery Cell Chemistry & High Voltage Technician Deficit',
    sector: 'Electric Vehicles & Clean Energy',
    affectedRoles: ['Battery Pack Assembler', 'High Voltage Safety Inspector', 'BMS Calibrator'],
    predictedImpactHorizon: '6 - 12 Months',
    description: 'Expanding Gigafactories report lack of certified technicians adhering to global high-voltage safety standards.',
    recommendedImmediateAction: 'Partner with technical academy network to launch standardized High-Voltage Safety and Cell Quality certification.',
    timestamp: '2026-09-05T11:45:00Z'
  }
];
