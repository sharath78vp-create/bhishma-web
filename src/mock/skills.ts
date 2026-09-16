import type { SkillMetric } from '../types';

export const mockSkills: SkillMetric[] = [
  {
    id: 'SK-01',
    name: 'LLM Fine-Tuning & Quantization',
    category: 'Technical',
    status: 'critical-shortage',
    demandIndex: 96,
    supplyIndex: 28,
    gapScore: 68,
    growthRatePct: 142.5,
    topEmergingSectors: ['AI & Data', 'Fintech', 'SaaS', 'EdTech'],
    description: 'Ability to adapt open weights models with LoRA/QLoRA and deploy using Triton and vLLM.'
  },
  {
    id: 'SK-02',
    name: 'VLSI RTL Design & STA',
    category: 'Domain Specific',
    status: 'critical-shortage',
    demandIndex: 91,
    supplyIndex: 34,
    gapScore: 57,
    growthRatePct: 58.2,
    topEmergingSectors: ['Semiconductors', 'Aerospace', 'Defence'],
    description: 'Hardware description languages, timing constraints, logic synthesis, and parasitic extraction.'
  },
  {
    id: 'SK-03',
    name: 'EV Powertrain & Cell Chemistry',
    category: 'Domain Specific',
    status: 'emerging',
    demandIndex: 84,
    supplyIndex: 40,
    gapScore: 44,
    growthRatePct: 49.0,
    topEmergingSectors: ['Automotive', 'Renewable Energy', 'Logistics'],
    description: 'Solid-state and LFP battery modeling, state-of-charge algorithms, and high-voltage inverter design.'
  },
  {
    id: 'SK-04',
    name: 'Fullstack Cloud Native (Go/Rust/K8s)',
    category: 'Technical',
    status: 'stable',
    demandIndex: 82,
    supplyIndex: 72,
    gapScore: 10,
    growthRatePct: 18.5,
    topEmergingSectors: ['Cloud Platforms', 'Telecom 5G', 'Finance'],
    description: 'High-concurrency microservices, Kubernetes operators, and distributed observability.'
  },
  {
    id: 'SK-05',
    name: 'Manual Software QA & Scripting',
    category: 'Foundational',
    status: 'declining',
    demandIndex: 32,
    supplyIndex: 88,
    gapScore: -56,
    growthRatePct: -38.4,
    topEmergingSectors: ['Legacy Enterprise IT'],
    description: 'Traditional manual test plan creation is being automated by synthetic test generators and agentic testing.'
  },
  {
    id: 'SK-06',
    name: 'Monolithic PHP / CMS Maintenance',
    category: 'Technical',
    status: 'declining',
    demandIndex: 24,
    supplyIndex: 78,
    gapScore: -54,
    growthRatePct: -45.0,
    topEmergingSectors: ['Legacy Web'],
    description: 'Legacy web maintenance roles are experiencing sharp contraction across tier-1 and tier-2 IT hubs.'
  },
  {
    id: 'SK-07',
    name: 'Advanced SQL & Analytics Engineering (dbt)',
    category: 'Technical',
    status: 'critical-shortage',
    demandIndex: 94,
    supplyIndex: 48,
    gapScore: 46,
    growthRatePct: 44.5,
    topEmergingSectors: ['AI & Data', 'Fintech', 'HealthTech', 'E-Commerce'],
    description: 'Complex CTEs, window functions, data transformation pipelines, and semantic data modeling for analytics.'
  },
  {
    id: 'SK-08',
    name: 'BI & Predictive Dashboards (Power BI/Tableau)',
    category: 'Analytical',
    status: 'stable',
    demandIndex: 89,
    supplyIndex: 64,
    gapScore: 25,
    growthRatePct: 22.0,
    topEmergingSectors: ['Enterprise IT', 'Retail Analytics', 'Banking', 'Supply Chain'],
    description: 'Data modeling (DAX), storytelling, executive reporting, and integration with live data lakes.'
  },
  {
    id: 'SK-09',
    name: 'Cloud Data Warehousing (Snowflake/BigQuery)',
    category: 'Technical',
    status: 'emerging',
    demandIndex: 91,
    supplyIndex: 42,
    gapScore: 49,
    growthRatePct: 62.4,
    topEmergingSectors: ['Cloud Platforms', 'AI & Data', 'SaaS'],
    description: 'Distributed query optimization, columnar storage architecture, data lakehouse integration, and role-based access governance.'
  },
  {
    id: 'SK-10',
    name: 'Generative AI Prompt & Agentic Analytics',
    category: 'Technical',
    status: 'emerging',
    demandIndex: 95,
    supplyIndex: 22,
    gapScore: 73,
    growthRatePct: 156.0,
    topEmergingSectors: ['AI & Data', 'Enterprise Automation', 'Customer Ops'],
    description: 'Automated SQL generation, LLM agent tool calling for data synthesis, and RAG-based business intelligence.'
  },
  {
    id: 'SK-11',
    name: 'Cloud Infrastructure & Kubernetes Orchestration',
    category: 'Technical',
    status: 'stable',
    demandIndex: 86,
    supplyIndex: 68,
    gapScore: 18,
    growthRatePct: 28.5,
    topEmergingSectors: ['Cloud Platforms', 'Telecom 5G', 'BFSI'],
    description: 'Container lifecycle management, GitOps deployments, microservice traffic routing, and cluster scaling.'
  },
  {
    id: 'SK-12',
    name: 'OT & Critical Infrastructure Cybersecurity',
    category: 'Domain Specific',
    status: 'critical-shortage',
    demandIndex: 89,
    supplyIndex: 36,
    gapScore: 53,
    growthRatePct: 52.0,
    topEmergingSectors: ['Cybersecurity', 'Smart Grid', 'Manufacturing'],
    description: 'Industrial control protocol security, SCADA monitoring, zero-trust network segmentation, and hardware threat detection.'
  },
  {
    id: 'SK-13',
    name: 'Embedded Firmware & AUTOSAR EV Standards',
    category: 'Domain Specific',
    status: 'emerging',
    demandIndex: 85,
    supplyIndex: 38,
    gapScore: 47,
    growthRatePct: 48.0,
    topEmergingSectors: ['EV & Mobility', 'Aerospace', 'Defence'],
    description: 'Real-time operating systems (RTOS), CAN/LIN bus diagnostics, battery controller firmware, and ISO 26262 functional safety.'
  },
  {
    id: 'SK-14',
    name: 'Legacy COBOL / Mainframe Batch Processing',
    category: 'Foundational',
    status: 'declining',
    demandIndex: 19,
    supplyIndex: 74,
    gapScore: -55,
    growthRatePct: -42.0,
    topEmergingSectors: ['Legacy Banking Maintenance'],
    description: 'Legacy batch jobs are undergoing continuous migration toward cloud-native microservices and modern relational pipelines.'
  }
];

