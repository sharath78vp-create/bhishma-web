import type { LabourSignal } from '../types';

export const mockLabourSignals: LabourSignal[] = [
  {
    id: 'LS-001',
    sector: 'Semiconductors & VLSI',
    subSector: 'Silicon Design & Fabrication',
    roleTitle: 'Physical Design Engineer',
    activePostings: 18450,
    yoyGrowthPct: 42.6,
    topSkillsRequired: ['Verilog', 'SystemVerilog', 'ASIC Flow', 'Timing Closure (STA)', 'Synopsys EDA'],
    medianSalaryLakhs: 22.5,
    hiringVelocityScore: 94,
    regionalDemandHotspots: ['Bengaluru', 'Hyderabad', 'Noida', 'Gandhinagar']
  },
  {
    id: 'LS-002',
    sector: 'Artificial Intelligence & Data',
    subSector: 'Generative AI & LLM Systems',
    roleTitle: 'LLM Systems Architect',
    activePostings: 29800,
    yoyGrowthPct: 68.3,
    topSkillsRequired: ['PyTorch', 'Distributed Training', 'vLLM/Triton', 'RAG Pipelines', 'Quantization'],
    medianSalaryLakhs: 28.0,
    hiringVelocityScore: 98,
    regionalDemandHotspots: ['Bengaluru', 'Hyderabad', 'Pune', 'Gurugram']
  },
  {
    id: 'LS-003',
    sector: 'Renewable Energy & EV',
    subSector: 'Battery Management Systems',
    roleTitle: 'BMS Firmware Specialist',
    activePostings: 14200,
    yoyGrowthPct: 35.8,
    topSkillsRequired: ['Embedded C', 'MATLAB Simulink', 'CAN bus', 'Thermal Runaway Modeling', 'AUTOSAR'],
    medianSalaryLakhs: 16.2,
    hiringVelocityScore: 86,
    regionalDemandHotspots: ['Pune', 'Chennai', 'Hosur', 'Ahmedabad']
  },
  {
    id: 'LS-004',
    sector: 'Robotics & Advanced Mechatronics',
    subSector: 'Industrial Automation',
    roleTitle: 'Robotics Control Systems Engineer',
    activePostings: 11200,
    yoyGrowthPct: 29.4,
    topSkillsRequired: ['ROS2', 'Kinematics Modeling', 'PLC Programming', 'Computer Vision (OpenCV)', 'C++'],
    medianSalaryLakhs: 15.0,
    hiringVelocityScore: 81,
    regionalDemandHotspots: ['Coimbatore', 'Pune', 'Gurugram', 'Chennai']
  },
  {
    id: 'LS-005',
    sector: 'Cybersecurity & Critical Infrastructure',
    subSector: 'OT & Industrial IoT Security',
    roleTitle: 'Critical Infrastructure Security Analyst',
    activePostings: 16750,
    yoyGrowthPct: 38.1,
    topSkillsRequired: ['SCADA Security', 'Zero Trust Architecture', 'Threat Hunting', 'SIEM/SOAR', 'Reverse Engineering'],
    medianSalaryLakhs: 19.8,
    hiringVelocityScore: 89,
    regionalDemandHotspots: ['New Delhi', 'Mumbai', 'Bengaluru', 'Hyderabad']
  },
  {
    id: 'LS-006',
    sector: 'Artificial Intelligence & Data',
    subSector: 'Enterprise Intelligence & Decision Systems',
    roleTitle: 'Enterprise Data Analyst & Analytics Engineer',
    activePostings: 34200,
    yoyGrowthPct: 38.5,
    topSkillsRequired: ['Advanced SQL', 'Python (Pandas/Polars)', 'Power BI & Tableau', 'Cloud Data Warehousing (Snowflake)', 'Generative AI Prompt Analytics'],
    medianSalaryLakhs: 14.8,
    hiringVelocityScore: 92,
    regionalDemandHotspots: ['Hyderabad', 'Bengaluru', 'Pune', 'Gurugram']
  }
];

