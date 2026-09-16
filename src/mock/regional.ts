import type { RegionalGap } from '../types';

export const mockRegionalGaps: RegionalGap[] = [
  {
    id: 'REG-01',
    state: 'Karnataka',
    region: 'Bengaluru-Mysuru Tech Corridor',
    coordinates: [12.9716, 77.5946],
    demandIndex: 96,
    trainingCapacityIndex: 78,
    netDeficit: 18,
    severity: 'high',
    topSectorsInDemand: ['Generative AI', 'Semiconductor EDA', 'Aerospace Avionics'],
    vocationalInstitutesCount: 142
  },
  {
    id: 'REG-02',
    state: 'Gujarat',
    region: 'Dholera-Sanand Industrial Node',
    coordinates: [22.2587, 71.1924],
    demandIndex: 92,
    trainingCapacityIndex: 44,
    netDeficit: 48,
    severity: 'critical',
    topSectorsInDemand: ['Semiconductor Fab', 'Green Hydrogen', 'Heavy Chemicals'],
    vocationalInstitutesCount: 64
  },
  {
    id: 'REG-03',
    state: 'Tamil Nadu',
    region: 'Chennai-Hosur EV Belt',
    coordinates: [13.0827, 80.2707],
    demandIndex: 89,
    trainingCapacityIndex: 68,
    netDeficit: 21,
    severity: 'high',
    topSectorsInDemand: ['EV Battery Assembly', 'Precision Machining', 'SaaS'],
    vocationalInstitutesCount: 186
  },
  {
    id: 'REG-04',
    state: 'Maharashtra',
    region: 'Pune-Chakan Auto Cluster',
    coordinates: [18.5204, 73.8567],
    demandIndex: 88,
    trainingCapacityIndex: 74,
    netDeficit: 14,
    severity: 'moderate',
    topSectorsInDemand: ['Industrial IoT', 'Autonomous Mechatronics', 'Fintech'],
    vocationalInstitutesCount: 135
  },
  {
    id: 'REG-05',
    state: 'Telangana',
    region: 'Hyderabad Innovation Corridor',
    coordinates: [17.3850, 78.4867],
    demandIndex: 95,
    trainingCapacityIndex: 69,
    netDeficit: 26,
    severity: 'critical',
    topSectorsInDemand: ['AI & Data', 'Cloud Data Warehousing', 'VLSI Design'],
    vocationalInstitutesCount: 124
  },
  {
    id: 'REG-06',
    state: 'Delhi NCR',
    region: 'Delhi NCR Cyber & Electronics Hub',
    coordinates: [28.6139, 77.2090],
    demandIndex: 91,
    trainingCapacityIndex: 75,
    netDeficit: 16,
    severity: 'moderate',
    topSectorsInDemand: ['Enterprise AI & SaaS', 'OT Cybersecurity', 'Consumer Electronics'],
    vocationalInstitutesCount: 195
  },
  {
    id: 'REG-07',
    state: 'Maharashtra',
    region: 'Mumbai-Navi Mumbai Financial Tech Zone',
    coordinates: [19.0760, 72.8777],
    demandIndex: 89,
    trainingCapacityIndex: 76,
    netDeficit: 13,
    severity: 'moderate',
    topSectorsInDemand: ['Fintech & Algorithmic Trading', 'Cloud Data Centers', 'Enterprise IT'],
    vocationalInstitutesCount: 160
  },
  {
    id: 'REG-08',
    state: 'Gujarat',
    region: 'Ahmedabad-Sanand Industrial & Chemical Belt',
    coordinates: [23.0225, 72.5714],
    demandIndex: 83,
    trainingCapacityIndex: 61,
    netDeficit: 22,
    severity: 'high',
    topSectorsInDemand: ['Industrial Automation', 'Bio-Informatics', 'Renewable Energy'],
    vocationalInstitutesCount: 98
  },
  {
    id: 'REG-09',
    state: 'West Bengal',
    region: 'Kolkata-Rajarhat IT & Emerging Technologies',
    coordinates: [22.5726, 88.3639],
    demandIndex: 78,
    trainingCapacityIndex: 66,
    netDeficit: 12,
    severity: 'low',
    topSectorsInDemand: ['Fullstack Engineering', 'Data Analytics', 'Animation & Game Tech'],
    vocationalInstitutesCount: 110
  },
  {
    id: 'REG-10',
    state: 'Kerala',
    region: 'Kochi-Infopark Electronics & Marine Tech Node',
    coordinates: [9.9312, 76.2673],
    demandIndex: 80,
    trainingCapacityIndex: 71,
    netDeficit: 9,
    severity: 'low',
    topSectorsInDemand: ['Marine Embedded Systems', 'Cloud DevOps', 'Agritech IoT'],
    vocationalInstitutesCount: 88
  }
];
