// Emerging Skills Intelligence Mock Data & Type Definitions
// Structured cleanly for direct replacement with backend REST/GraphQL API telemetry responses

export type TrendDirection = 'rising' | 'declining' | 'stable';
export type FuturePotentialLevel = 'Very High' | 'High' | 'Moderate' | 'Low';
export type ShortageRiskLevel = 'High' | 'Moderate' | 'Low';
export type AdvisoryPriority = 'High' | 'Medium' | 'Low';
export type WarningSignalStatus = 'Watch' | 'Emerging' | 'High Alert';

export interface DemandSignalMetric {
  name: string;
  change: string;
  direction: 'up' | 'down' | 'neutral';
  score: number; // 0 - 100
  evidence: string;
}

export interface DetailedDriver {
  title: string;
  description: string;
  impactScore: number; // 0 - 100
}

export interface FutureImpactTimeline {
  year1: {
    workforce: string;
    education: string;
    industry: string;
  };
  year3: {
    workforce: string;
    education: string;
    industry: string;
  };
  year5: {
    workforce: string;
    education: string;
    industry: string;
  };
}

export interface ForecastPoint {
  year: string;
  historical?: number;
  projected: number;
  confidenceLower: number;
  confidenceUpper: number;
}

export interface IndustryDriverShare {
  industry: string;
  sharePct: number;
}

export interface HubDemandInfo {
  hub: string;
  growthPct: number;
  demandIntensity: number; // 0 - 100
  topSkills: string[];
  activePostings: number;
  talentAvailability: 'High' | 'Medium' | 'Low';
  shortageRisk: 'High' | 'Moderate' | 'Low';
}

export interface CurriculumAdvisoryData {
  observedTrend: string;
  implication: string;
  priority: AdvisoryPriority;
  evidenceLevel: 'Strong' | 'Moderate' | 'Preliminary';
  suggestedReviewArea: string;
  detailedTopics: string[];
  recommendedSandboxTools: string[];
  facultyUpskillingNeed: string;
}

export interface EarlyWarningSignal {
  id: string;
  skill: string;
  category: string;
  signalType: string;
  changePct: number;
  confidence: 'High' | 'Medium' | 'Low';
  timeDetected: string;
  status: WarningSignalStatus;
  evidenceSummary: string;
}

export interface EmergingSkillIntelligenceItem {
  id: string;
  name: string;
  category: string;
  trendType: TrendDirection;
  currentDemandIndex: number; // 0 - 100
  growth6M: number; // %
  growth12M: number; // %
  growthYoY: number; // %
  futurePotential: FuturePotentialLevel;
  mainDriver: string;
  displacementRisk?: 'Very High' | 'High' | 'Medium' | 'Low';
  possibleReason?: string;
  detailedDrivers: DetailedDriver[];
  demandSignals: {
    jobPostings: DemandSignalMetric;
    industryAdoption: DemandSignalMetric;
    trainingDemand: DemandSignalMetric;
    investment: DemandSignalMetric;
    salaryPremium: DemandSignalMetric;
  };
  futureImpact: FutureImpactTimeline;
  forecastConfidence: 'High' | 'Medium' | 'Moderate';
  forecastPoints: ForecastPoint[];
  industryDistribution: IndustryDriverShare[];
  regionalBreakdown: { [hub: string]: number }; // percentage share
  talentSupplyLevel: 'High' | 'Moderate' | 'Low' | 'Very Low';
  supplyDemandGap: 'Large Deficit' | 'Moderate Deficit' | 'Balanced' | 'Surplus';
  shortageRiskLevel: ShortageRiskLevel;
  shortageTimeHorizon: string;
  curriculumAdvisory: CurriculumAdvisoryData;
  activeJobPostings: number;
  avgStartingSalaryLPA: number;
  monthlyMomentum: { month: string; demand: number }[];
  evidenceSources: {
    jobPostingsSample: number;
    employersTracked: number;
    trainingEnrollmentsSample: number;
    confidenceGrade: 'High' | 'Medium';
  };
}

export interface SkillEvolutionPathway {
  id: string;
  title: string;
  description: string;
  category: string;
  steps: {
    stage: string;
    title: string;
    timeframe: string;
    description: string;
    status: 'Legacy' | 'Current Core' | 'Emerging' | 'Future Frontier';
    statusColor: string;
  }[];
}

export interface EmergingSkillsFilterOptions {
  timeRange: '6m' | '12m' | '24m' | 'custom';
  industry: string;
  hub: string;
  educationLevel: string;
  skillCategory: string;
  experienceLevel: string;
  searchQuery: string;
}

// --------------------------------------------------------------------------
// MOCK DATASET: Emerging, Rising & Declining Skills Telemetry
// --------------------------------------------------------------------------

export const initialEmergingSkillsData: EmergingSkillIntelligenceItem[] = [
  {
    id: 'gen-ai',
    name: 'Generative AI & LLM Systems',
    category: 'Artificial Intelligence',
    trendType: 'rising',
    currentDemandIndex: 94,
    growth6M: 28,
    growth12M: 48,
    growthYoY: 48,
    futurePotential: 'Very High',
    mainDriver: 'Enterprise AI automation & foundation model deployments',
    detailedDrivers: [
      {
        title: 'Enterprise AI Adoption',
        description: 'Over 68% of enterprise IT and SaaS companies are actively integrating LLM APIs and RAG workflows into production software.',
        impactScore: 96
      },
      {
        title: 'Demand for Agentic Automation',
        description: 'Rapid shift from standalone chatbots to autonomous multi-agent systems and function calling pipelines.',
        impactScore: 91
      },
      {
        title: 'Cloud AI Infrastructure Scaling',
        description: 'Hyperscalers (AWS, Azure, GCP) investing heavily in dedicated AI accelerators and GPU cluster provisioning.',
        impactScore: 88
      },
      {
        title: 'Domain-Specific Model Fine-Tuning',
        description: 'Rising BFSI and Healthcare requirements for private SLMs (Small Language Models) trained on proprietary data.',
        impactScore: 84
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '+48%', direction: 'up', score: 96, evidence: '28,450 new job requisitions requiring prompt engineering & RAG pipelines.' },
      industryAdoption: { name: 'Industry Adoption', change: '+62%', direction: 'up', score: 92, evidence: 'Enterprise adoption surging across BFSI, SaaS, and Healthcare IT.' },
      trainingDemand: { name: 'Student & Professional Upskilling', change: '+84%', direction: 'up', score: 94, evidence: 'Most enrolled technical elective across autonomous engineering colleges.' },
      investment: { name: 'R&D & VC Capital Inflow', change: '+115%', direction: 'up', score: 98, evidence: 'Primary sector driving global and domestic venture capital funding.' },
      salaryPremium: { name: 'Compensation Premium', change: '+38%', direction: 'up', score: 90, evidence: 'Starting compensation averaging ₹14.5 LPA vs ₹8.2 LPA for generic software roles.' }
    },
    futureImpact: {
      year1: {
        workforce: 'Surging demand for AI Prompt Engineers and RAG pipeline builders; acute junior talent deficit.',
        education: 'Elective introduction in Semesters 7 & 8; high student enrollment in ad-hoc bootcamps.',
        industry: 'Early customer support and code assistant deployments across IT service firms.'
      },
      year3: {
        workforce: 'AI integration becomes a baseline expectation for 60% of all software developer roles.',
        education: 'Core curriculum restructuring: LangChain, vector DBs, and LLMOps embedded in Semester 5 CS tracks.',
        industry: 'Autonomous multi-agent workflows executing end-to-end analytical and testing tasks.'
      },
      year5: {
        workforce: 'Transformation into Specialized AI Systems Architects and Safety/Compliance Officers.',
        education: 'Full degree specializations in Cognitive Computing and Foundation Model Engineering.',
        industry: 'AI-first enterprise operations with ubiquitous automated decision systems.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 42, projected: 42, confidenceLower: 40, confidenceUpper: 44 },
      { year: '2025', historical: 68, projected: 68, confidenceLower: 65, confidenceUpper: 71 },
      { year: '2026', historical: 94, projected: 94, confidenceLower: 90, confidenceUpper: 98 },
      { year: '2027', projected: 118, confidenceLower: 108, confidenceUpper: 128 },
      { year: '2028', projected: 142, confidenceLower: 126, confidenceUpper: 158 },
      { year: '2029', projected: 165, confidenceLower: 140, confidenceUpper: 190 }
    ],
    industryDistribution: [
      { industry: 'IT & SaaS Platforms', sharePct: 38 },
      { industry: 'BFSI & FinTech', sharePct: 24 },
      { industry: 'Healthcare & PharmaTech', sharePct: 16 },
      { industry: 'E-commerce & Retail', sharePct: 12 },
      { industry: 'Automotive & Core Engineering', sharePct: 10 }
    ],
    regionalBreakdown: {
      'Bengaluru': 36,
      'Hyderabad': 28,
      'Delhi NCR': 16,
      'Pune': 10,
      'Chennai': 6,
      'Mumbai': 4
    },
    talentSupplyLevel: 'Very Low',
    supplyDemandGap: 'Large Deficit',
    shortageRiskLevel: 'High',
    shortageTimeHorizon: '1–3 Years',
    curriculumAdvisory: {
      observedTrend: 'Sustained exponential requisition growth (+48% YoY) coupled with acute collegiate supply bottleneck (31% readiness).',
      implication: 'Consider reviewing whether CSE/IT curricula provide sufficient exposure to RAG architecture, vector search, and LLMOps.',
      priority: 'High',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Department of Computer Science & AI Electives',
      detailedTopics: [
        'Retrieval Augmented Generation (RAG) Architecture & Vector Embeddings',
        'LangChain & LlamaIndex Application Frameworks',
        'Fine-Tuning Small Language Models (LoRA, QLoRA)',
        'LLM Security, Prompt Injection & Guardrails',
        'Evaluating Hallucination Metrics & Vector Database Indexing (Pinecone/Milvus/Chroma)'
      ],
      recommendedSandboxTools: ['Hugging Face Hub', 'Ollama Local Sandbox', 'ChromaDB', 'Weights & Biases'],
      facultyUpskillingNeed: 'Urgent: Facilitate 40-hour hands-on faculty workshops on generative AI architectures.'
    },
    activeJobPostings: 28450,
    avgStartingSalaryLPA: 14.5,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 62 },
      { month: 'Nov 25', demand: 68 },
      { month: 'Dec 25', demand: 73 },
      { month: 'Jan 26', demand: 78 },
      { month: 'Feb 26', demand: 84 },
      { month: 'Mar 26', demand: 88 },
      { month: 'Apr 26', demand: 90 },
      { month: 'May 26', demand: 92 },
      { month: 'Jun 26', demand: 94 },
      { month: 'Jul 26', demand: 95 },
      { month: 'Aug 26', demand: 95 },
      { month: 'Sep 26', demand: 96 }
    ],
    evidenceSources: {
      jobPostingsSample: 142000,
      employersTracked: 1850,
      trainingEnrollmentsSample: 45000,
      confidenceGrade: 'High'
    }
  },
  {
    id: 'cloud-security',
    name: 'Cloud Security & DevSecOps',
    category: 'Cybersecurity & Cloud',
    trendType: 'rising',
    currentDemandIndex: 86,
    growth6M: 20,
    growth12M: 36,
    growthYoY: 36,
    futurePotential: 'Very High',
    mainDriver: 'Zero-Trust compliance mandates & multi-cloud security posture',
    detailedDrivers: [
      {
        title: 'Regulatory Data Mandates',
        description: 'RBI and international compliance frameworks requiring strict cloud security posture and continuous auditing.',
        impactScore: 92
      },
      {
        title: 'CI/CD Pipeline Security Integration',
        description: 'Transition from isolated security audits to automated shifting-left container security (SAST/DAST).',
        impactScore: 89
      },
      {
        title: 'Identity & Access Management (IAM) Modernization',
        description: 'Zero-Trust network architecture adoption across distributed hybrid enterprise workforces.',
        impactScore: 85
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '+36%', direction: 'up', score: 88, evidence: '19,800 active postings in BFSI, defense tech, and healthcare IT.' },
      industryAdoption: { name: 'Industry Adoption', change: '+44%', direction: 'up', score: 86, evidence: 'Mandated DevSecOps practices across 74% of enterprise software releases.' },
      trainingDemand: { name: 'Student Upskilling', change: '+52%', direction: 'up', score: 82, evidence: 'High demand for AWS Certified Security and Kubernetes CKS certifications.' },
      investment: { name: 'Corporate Budget Allocation', change: '+68%', direction: 'up', score: 89, evidence: 'Cybersecurity budgets increased by 22% on average in FY26.' },
      salaryPremium: { name: 'Compensation Premium', change: '+30%', direction: 'up', score: 87, evidence: 'Average package ₹12.8 LPA for DevSecOps certified graduates.' }
    },
    futureImpact: {
      year1: {
        workforce: 'High demand for container security and IAM posture specialists.',
        education: 'Integration of basic OWASP Top 10 web security into CSE labs.',
        industry: 'Automated vulnerability scanning enforced in standard Git PR flows.'
      },
      year3: {
        workforce: 'DevSecOps competencies become mandatory for all DevOps and Backend positions.',
        education: 'Dedicated 3-credit course on Cloud Security & Compliance Engineering.',
        industry: 'Zero-trust runtime protection standard across all production microservices.'
      },
      year5: {
        workforce: 'AI-automated threat detection analysts and sovereign cloud security managers.',
        education: 'Full cybersecurity degree tracks with live SOC war-room emulators.',
        industry: 'Self-healing cloud infrastructure and automated cryptographic key rotation.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 54, projected: 54, confidenceLower: 51, confidenceUpper: 57 },
      { year: '2025', historical: 68, projected: 68, confidenceLower: 65, confidenceUpper: 71 },
      { year: '2026', historical: 86, projected: 86, confidenceLower: 82, confidenceUpper: 90 },
      { year: '2027', projected: 104, confidenceLower: 96, confidenceUpper: 112 },
      { year: '2028', projected: 122, confidenceLower: 110, confidenceUpper: 134 },
      { year: '2029', projected: 138, confidenceLower: 120, confidenceUpper: 156 }
    ],
    industryDistribution: [
      { industry: 'BFSI & FinTech', sharePct: 34 },
      { industry: 'Cloud Platforms & SaaS', sharePct: 28 },
      { industry: 'Healthcare IT', sharePct: 18 },
      { industry: 'E-commerce', sharePct: 12 },
      { industry: 'Telecom', sharePct: 8 }
    ],
    regionalBreakdown: {
      'Hyderabad': 32,
      'Bengaluru': 28,
      'Mumbai': 18,
      'Delhi NCR': 14,
      'Pune': 8
    },
    talentSupplyLevel: 'Low',
    supplyDemandGap: 'Moderate Deficit',
    shortageRiskLevel: 'Moderate',
    shortageTimeHorizon: '1–2 Years',
    curriculumAdvisory: {
      observedTrend: 'Continuous demand surge (+36% YoY) fueled by compliance standards and multi-cloud adoption.',
      implication: 'Consider adding practical vulnerability scanning, Docker/K8s security, and IAM configuration labs.',
      priority: 'High',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Information Security & Cloud Infrastructure Tracks',
      detailedTopics: [
        'Shift-Left Security & CI/CD Pipeline Scanning (SonarQube/Trivy)',
        'Kubernetes Cluster Security & RBAC Configuration',
        'Cloud IAM & Multi-Factor Zero-Trust Policies',
        'OWASP Top 10 API Security Testing',
        'Cloud Security Posture Management (CSPM)'
      ],
      recommendedSandboxTools: ['Trivy', 'HashiCorp Vault', 'OWASP ZAP', 'AWS IAM Sandbox'],
      facultyUpskillingNeed: 'Conduct faculty bootcamps on hands-on cloud vulnerability mitigation.'
    },
    activeJobPostings: 19800,
    avgStartingSalaryLPA: 12.8,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 70 },
      { month: 'Nov 25', demand: 72 },
      { month: 'Dec 25', demand: 75 },
      { month: 'Jan 26', demand: 78 },
      { month: 'Feb 26', demand: 80 },
      { month: 'Mar 26', demand: 82 },
      { month: 'Apr 26', demand: 83 },
      { month: 'May 26', demand: 84 },
      { month: 'Jun 26', demand: 85 },
      { month: 'Jul 26', demand: 85 },
      { month: 'Aug 26', demand: 86 },
      { month: 'Sep 26', demand: 86 }
    ],
    evidenceSources: {
      jobPostingsSample: 98000,
      employersTracked: 1200,
      trainingEnrollmentsSample: 32000,
      confidenceGrade: 'High'
    }
  },
  {
    id: 'data-engineering',
    name: 'Data Engineering & Streaming Analytics',
    category: 'Data & Analytics',
    trendType: 'rising',
    currentDemandIndex: 82,
    growth6M: 16,
    growth12M: 29,
    growthYoY: 29,
    futurePotential: 'Very High',
    mainDriver: 'Real-time event streaming & modern data stack modernization',
    detailedDrivers: [
      {
        title: 'Streaming Data Architecture Growth',
        description: 'Companies transitioning from static batch ETL to real-time event streaming with Apache Kafka and Flink.',
        impactScore: 90
      },
      {
        title: 'Modern Analytics Engineering (dbt)',
        description: 'Widespread adoption of modular SQL transformation pipelines with dbt and Snowflake/BigQuery.',
        impactScore: 86
      },
      {
        title: 'AI Pipeline Data Preparation',
        description: 'High corporate requirement for clean feature stores and vector data pipelines powering LLM applications.',
        impactScore: 84
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '+29%', direction: 'up', score: 84, evidence: '24,500 active requisitions requiring Kafka, Spark, and dbt.' },
      industryAdoption: { name: 'Industry Adoption', change: '+38%', direction: 'up', score: 83, evidence: 'Modern data stack adoption reached 62% in mid-to-large tech firms.' },
      trainingDemand: { name: 'Student Upskilling', change: '+46%', direction: 'up', score: 80, evidence: 'Increased demand for Apache Spark and Data Warehousing electives.' },
      investment: { name: 'Data Infrastructure Budget', change: '+55%', direction: 'up', score: 85, evidence: 'Cloud data warehouse spending increased by 28% YoY.' },
      salaryPremium: { name: 'Compensation Premium', change: '+26%', direction: 'up', score: 82, evidence: 'Starting compensation ₹13.0 LPA for verified Spark/Kafka engineers.' }
    },
    futureImpact: {
      year1: {
        workforce: 'High demand for Analytics Engineers and PySpark ETL developers.',
        education: 'Supplementing standard SQL labs with cloud data warehouse basics.',
        industry: 'Migration of legacy on-prem Hadoop clusters to Snowflake/Databricks.'
      },
      year3: {
        workforce: 'Unified Data & AI Engineers building real-time feature streaming stores.',
        education: 'Mandatory 4-credit course on Distributed Data Processing & Streaming.',
        industry: 'Sub-second real-time streaming analytics powering algorithmic customer decisions.'
      },
      year5: {
        workforce: 'Autonomous data pipeline maintainers and decentralized Data Mesh orchestrators.',
        education: 'End-to-end data platform engineering integrated across all CSE degrees.',
        industry: 'Self-optimizing data fabrics with zero-copy analytics.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 58, projected: 58, confidenceLower: 55, confidenceUpper: 61 },
      { year: '2025', historical: 68, projected: 68, confidenceLower: 65, confidenceUpper: 71 },
      { year: '2026', historical: 82, projected: 82, confidenceLower: 78, confidenceUpper: 86 },
      { year: '2027', projected: 98, confidenceLower: 90, confidenceUpper: 106 },
      { year: '2028', projected: 114, confidenceLower: 102, confidenceUpper: 126 },
      { year: '2029', projected: 128, confidenceLower: 112, confidenceUpper: 144 }
    ],
    industryDistribution: [
      { industry: 'E-commerce & Logistics', sharePct: 30 },
      { industry: 'FinTech & Banking', sharePct: 28 },
      { industry: 'SaaS & Enterprise IT', sharePct: 22 },
      { industry: 'Telecom', sharePct: 12 },
      { industry: 'Healthcare', sharePct: 8 }
    ],
    regionalBreakdown: {
      'Bengaluru': 34,
      'Hyderabad': 26,
      'Delhi NCR': 20,
      'Pune': 12,
      'Chennai': 8
    },
    talentSupplyLevel: 'Low',
    supplyDemandGap: 'Moderate Deficit',
    shortageRiskLevel: 'High',
    shortageTimeHorizon: '1–2 Years',
    curriculumAdvisory: {
      observedTrend: 'Robust steady demand (+29% YoY) with low candidate readiness on modern streaming tools.',
      implication: 'Consider shifting curricula from basic relational schemas to distributed big data processing and dbt transformations.',
      priority: 'High',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Data Science & Database Systems Track',
      detailedTopics: [
        'Real-time Streaming with Apache Kafka & Event-Driven Architecture',
        'Distributed Data Processing with PySpark & Delta Lake',
        'Data Transformation with dbt & Cloud Data Warehouses (BigQuery/Snowflake)',
        'Data Orchestration with Apache Airflow',
        'Data Quality & Data Mesh Governance Fundamentals'
      ],
      recommendedSandboxTools: ['Apache Kafka', 'PySpark', 'dbt Core', 'DuckDB'],
      facultyUpskillingNeed: 'Provide training on modern cloud data pipelines and distributed compute architectures.'
    },
    activeJobPostings: 24500,
    avgStartingSalaryLPA: 13.0,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 68 },
      { month: 'Nov 25', demand: 70 },
      { month: 'Dec 25', demand: 73 },
      { month: 'Jan 26', demand: 75 },
      { month: 'Feb 26', demand: 77 },
      { month: 'Mar 26', demand: 79 },
      { month: 'Apr 26', demand: 80 },
      { month: 'May 26', demand: 81 },
      { month: 'Jun 26', demand: 81 },
      { month: 'Jul 26', demand: 82 },
      { month: 'Aug 26', demand: 82 },
      { month: 'Sep 26', demand: 82 }
    ],
    evidenceSources: {
      jobPostingsSample: 110000,
      employersTracked: 1400,
      trainingEnrollmentsSample: 38000,
      confidenceGrade: 'High'
    }
  },
  {
    id: 'agentic-ai',
    name: 'Agentic AI & Workflow Orchestration',
    category: 'Artificial Intelligence',
    trendType: 'rising',
    currentDemandIndex: 78,
    growth6M: 38,
    growth12M: 64,
    growthYoY: 64,
    futurePotential: 'Very High',
    mainDriver: 'Autonomous multi-agent orchestration replacing static scripts',
    detailedDrivers: [
      {
        title: 'Multi-Agent Framework Adoption',
        description: 'Widespread commercial exploration of CrewAI, AutoGen, and LangGraph for enterprise automation.',
        impactScore: 94
      },
      {
        title: 'Autonomous Code & Logic Generation',
        description: 'Shift from single-turn chatbot prompting to self-correcting autonomous multi-step execution loops.',
        impactScore: 88
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '+64%', direction: 'up', score: 86, evidence: 'Fastest growing specialized keyword in senior AI engineer job postings.' },
      industryAdoption: { name: 'Industry Adoption', change: '+78%', direction: 'up', score: 84, evidence: '48% of enterprise AI pilots focusing on agentic automation.' },
      trainingDemand: { name: 'Developer Interest', change: '+120%', direction: 'up', score: 92, evidence: 'Highest star growth in open-source GitHub agent repositories.' },
      investment: { name: 'Venture Capital Focus', change: '+140%', direction: 'up', score: 96, evidence: 'Over $2.8B global venture funding allocated to autonomous agent startups in 2026.' },
      salaryPremium: { name: 'Compensation Premium', change: '+44%', direction: 'up', score: 92, evidence: 'Premium compensation reaching ₹16.5 LPA for demonstrated agentic pipeline projects.' }
    },
    futureImpact: {
      year1: {
        workforce: 'Demand for Agent Orchestration Engineers with strong Python and asynchronous systems skills.',
        education: 'Workshops on LangGraph, AutoGen, and Tool Calling paradigms.',
        industry: 'Autonomous IT ticketing, automated financial research, and automated lead generation.'
      },
      year3: {
        workforce: 'Agentic workflows standard in 70% of enterprise software development pipelines.',
        education: 'Elective on Multi-Agent Autonomous Systems in 4th year CSE/AI tracks.',
        industry: 'Self-healing production microservices managed by supervisory AI agents.'
      },
      year5: {
        workforce: 'AI Orchestration Supervisors and Ethics/Safety Alignment Engineers.',
        education: 'Comprehensive degree tracks in Human-AI Collaborative Computing.',
        industry: 'End-to-end enterprise workflows executed autonomously under human oversight.'
      }
    },
    forecastConfidence: 'Medium',
    forecastPoints: [
      { year: '2024', historical: 15, projected: 15, confidenceLower: 12, confidenceUpper: 18 },
      { year: '2025', historical: 42, projected: 42, confidenceLower: 38, confidenceUpper: 46 },
      { year: '2026', historical: 78, projected: 78, confidenceLower: 70, confidenceUpper: 86 },
      { year: '2027', projected: 110, confidenceLower: 94, confidenceUpper: 126 },
      { year: '2028', projected: 138, confidenceLower: 114, confidenceUpper: 162 },
      { year: '2029', projected: 164, confidenceLower: 130, confidenceUpper: 198 }
    ],
    industryDistribution: [
      { industry: 'AI & SaaS Products', sharePct: 44 },
      { industry: 'FinTech & Banking', sharePct: 22 },
      { industry: 'Consulting & Enterprise IT', sharePct: 18 },
      { industry: 'HealthTech', sharePct: 10 },
      { industry: 'E-commerce', sharePct: 6 }
    ],
    regionalBreakdown: {
      'Bengaluru': 42,
      'Hyderabad': 30,
      'Delhi NCR': 16,
      'Pune': 8,
      'Mumbai': 4
    },
    talentSupplyLevel: 'Very Low',
    supplyDemandGap: 'Large Deficit',
    shortageRiskLevel: 'High',
    shortageTimeHorizon: '1–3 Years',
    curriculumAdvisory: {
      observedTrend: 'Emerging breakout trend (+64% YoY) representing the next major paradigm in applied AI.',
      implication: 'Consider introducing multi-agent paradigms and state machine graph workflows into advanced AI electives.',
      priority: 'Medium',
      evidenceLevel: 'Moderate',
      suggestedReviewArea: 'Advanced AI Electives & Project Capstones',
      detailedTopics: [
        'Stateful Multi-Agent Orchestration with LangGraph',
        'Autonomous Tool Calling, Function Execution & JSON Schema Generation',
        'Self-Reflection, Memory Caching & Error Correction Loops in Agents',
        'Guardrails, Deterministic Boundaries & Security in Agentic Workflows'
      ],
      recommendedSandboxTools: ['LangGraph', 'CrewAI', 'AutoGen', 'LiteLLM'],
      facultyUpskillingNeed: 'Introduce faculty workshops on multi-agent software engineering.'
    },
    activeJobPostings: 12400,
    avgStartingSalaryLPA: 16.5,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 48 },
      { month: 'Nov 25', demand: 52 },
      { month: 'Dec 25', demand: 57 },
      { month: 'Jan 26', demand: 62 },
      { month: 'Feb 26', demand: 66 },
      { month: 'Mar 26', demand: 70 },
      { month: 'Apr 26', demand: 73 },
      { month: 'May 26', demand: 75 },
      { month: 'Jun 26', demand: 76 },
      { month: 'Jul 26', demand: 77 },
      { month: 'Aug 26', demand: 78 },
      { month: 'Sep 26', demand: 78 }
    ],
    evidenceSources: {
      jobPostingsSample: 45000,
      employersTracked: 620,
      trainingEnrollmentsSample: 16000,
      confidenceGrade: 'Medium'
    }
  },
  {
    id: 'rust-systems',
    name: 'Rust & Memory-Safe Systems',
    category: 'Software Engineering',
    trendType: 'rising',
    currentDemandIndex: 68,
    growth6M: 22,
    growth12M: 38,
    growthYoY: 38,
    futurePotential: 'High',
    mainDriver: 'Memory safety mandates & high-performance backend infrastructure',
    detailedDrivers: [
      {
        title: 'Cybersecurity White House & CISA Guidance',
        description: 'International mandates recommending migration from C/C++ to memory-safe languages (Rust).',
        impactScore: 92
      },
      {
        title: 'High-Throughput Cloud & Crypto Engines',
        description: 'Adoption by Cloudflare, Microsoft, Amazon, and fintech platforms for zero-overhead performance.',
        impactScore: 86
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '+38%', direction: 'up', score: 76, evidence: '9,800 active postings in systems programming, browser engines, and high-frequency trading.' },
      industryAdoption: { name: 'Industry Adoption', change: '+42%', direction: 'up', score: 78, evidence: 'Core Linux kernel and Windows OS components rewritten in Rust.' },
      trainingDemand: { name: 'Student Interest', change: '+65%', direction: 'up', score: 82, evidence: 'Consistently ranked most loved programming language by developers.' },
      investment: { name: 'Open Source & Corporate Backing', change: '+50%', direction: 'up', score: 84, evidence: 'Rust Foundation backed by AWS, Google, Microsoft, and Meta.' },
      salaryPremium: { name: 'Compensation Premium', change: '+32%', direction: 'up', score: 88, evidence: 'Average package ₹16.0 LPA due to acute shortage of production Rust developers.' }
    },
    futureImpact: {
      year1: {
        workforce: 'Specialized roles in systems infrastructure, distributed databases, and blockchain protocols.',
        education: 'Elective introduction in Systems Programming for 3rd year CSE.',
        industry: 'Rewriting performance-critical microservices from Python/Node to Rust.'
      },
      year3: {
        workforce: 'Rust becomes the default language for new operating system and networking components.',
        education: 'Rust taught alongside C/C++ in core Operating Systems and Compilers courses.',
        industry: 'Significant reduction in CVE memory safety vulnerabilities across production web platforms.'
      },
      year5: {
        workforce: 'Universal memory-safe systems standard across automotive, aerospace, and finance.',
        education: 'Core foundational language for undergraduate systems programming.',
        industry: 'Zero-downtime high-concurrency cloud infrastructure standard.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 38, projected: 38, confidenceLower: 35, confidenceUpper: 41 },
      { year: '2025', historical: 52, projected: 52, confidenceLower: 49, confidenceUpper: 55 },
      { year: '2026', historical: 68, projected: 68, confidenceLower: 64, confidenceUpper: 72 },
      { year: '2027', projected: 84, confidenceLower: 76, confidenceUpper: 92 },
      { year: '2028', projected: 98, confidenceLower: 88, confidenceUpper: 108 },
      { year: '2029', projected: 112, confidenceLower: 98, confidenceUpper: 126 }
    ],
    industryDistribution: [
      { industry: 'Cloud & CDN Infrastructure', sharePct: 36 },
      { industry: 'FinTech & High-Frequency Trading', sharePct: 26 },
      { industry: 'Cybersecurity & OS', sharePct: 20 },
      { industry: 'Web3 & Distributed Systems', sharePct: 12 },
      { industry: 'Automotive Embedded', sharePct: 6 }
    ],
    regionalBreakdown: {
      'Bengaluru': 40,
      'Hyderabad': 26,
      'Delhi NCR': 18,
      'Pune': 10,
      'Chennai': 6
    },
    talentSupplyLevel: 'Very Low',
    supplyDemandGap: 'Large Deficit',
    shortageRiskLevel: 'High',
    shortageTimeHorizon: '1–3 Years',
    curriculumAdvisory: {
      observedTrend: 'Strong upward trajectory (+38% YoY) driven by global memory-safety compliance and performance needs.',
      implication: 'Consider adding Rust language fundamentals (ownership, borrowing, concurrency) as an advanced systems elective.',
      priority: 'Medium',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Systems Programming & Operating Systems Curricula',
      detailedTopics: [
        'Memory Safety, Ownership, Lifetimes & Borrow Checker Paradigms',
        'Fearless Concurrency & Asynchronous Programming with Tokio',
        'Systems Interoperability with C FFI (Foreign Function Interface)',
        'Building High-Throughput REST/gRPC Microservices with Actix/Axum'
      ],
      recommendedSandboxTools: ['Cargo & Clippy', 'Tokio Sandbox', 'Rust Playground'],
      facultyUpskillingNeed: 'Organize faculty training on teaching memory safety and Rust systems idioms.'
    },
    activeJobPostings: 9800,
    avgStartingSalaryLPA: 16.0,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 50 },
      { month: 'Nov 25', demand: 53 },
      { month: 'Dec 25', demand: 56 },
      { month: 'Jan 26', demand: 59 },
      { month: 'Feb 26', demand: 62 },
      { month: 'Mar 26', demand: 64 },
      { month: 'Apr 26', demand: 65 },
      { month: 'May 26', demand: 66 },
      { month: 'Jun 26', demand: 67 },
      { month: 'Jul 26', demand: 67 },
      { month: 'Aug 26', demand: 68 },
      { month: 'Sep 26', demand: 68 }
    ],
    evidenceSources: {
      jobPostingsSample: 42000,
      employersTracked: 580,
      trainingEnrollmentsSample: 19000,
      confidenceGrade: 'High'
    }
  },
  // DECLINING / DISPLACEMENT RISK SKILLS
  {
    id: 'legacy-manual-qa',
    name: 'Legacy Manual Testing & Basic QA',
    category: 'Software Testing & QA',
    trendType: 'declining',
    currentDemandIndex: 28,
    growth6M: -9,
    growth12M: -18,
    growthYoY: -18,
    futurePotential: 'Low',
    mainDriver: 'AI-assisted test generation & automated CI/CD validation pipelines',
    displacementRisk: 'High',
    possibleReason: 'Corporate migration to automated testing frameworks (Playwright, Cypress) and AI test generation.',
    detailedDrivers: [
      {
        title: 'Automated CI/CD Test Pipelines',
        description: 'IT firms replacing manual test script execution with automated pull-request validation pipelines.',
        impactScore: 88
      },
      {
        title: 'Generative AI Test Generation',
        description: 'AI tools generating unit, integration, and E2E test cases automatically from code commits.',
        impactScore: 84
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '-18%', direction: 'down', score: 32, evidence: 'Job postings exclusively requiring manual testing contracted by 18% YoY.' },
      industryAdoption: { name: 'Hiring Shift', change: '-24%', direction: 'down', score: 30, evidence: 'IT service vendors requiring SDET (Software Development Engineer in Test) skillsets.' },
      trainingDemand: { name: 'Enrollment Shift', change: '-35%', direction: 'down', score: 38, evidence: 'Students shifting to Full-Stack Automation and DevOps testing.' },
      investment: { name: 'Tooling Budget', change: '-40%', direction: 'down', score: 25, evidence: 'Budget shifted to automated regression testing suites.' },
      salaryPremium: { name: 'Compensation', change: '-8%', direction: 'down', score: 28, evidence: 'Starting packages stagnating around ₹3.8 - ₹4.2 LPA with limited career growth.' }
    },
    futureImpact: {
      year1: {
        workforce: 'Reduced hiring for standalone manual QA roles; demand shifting to QA Automation Engineers.',
        education: 'Phasing out manual test case writing in software engineering course modules.',
        industry: 'Automated test suites executing 80%+ of regression testing in top IT firms.'
      },
      year3: {
        workforce: 'Manual testing roles largely displaced or merged into product management/QA hybrid roles.',
        education: 'Mandatory SDET (Selenium/Playwright/API testing) labs in undergraduate CS.',
        industry: 'AI-driven synthetic user testing and continuous autonomous load validation.'
      },
      year5: {
        workforce: 'Only niche exploratory usability and compliance auditing roles remain manual.',
        education: 'Autonomous verification & automated formal methods standard in CS syllabi.',
        industry: 'Zero-human manual regression testing across 95% of software release pipelines.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 52, projected: 52, confidenceLower: 49, confidenceUpper: 55 },
      { year: '2025', historical: 40, projected: 40, confidenceLower: 37, confidenceUpper: 43 },
      { year: '2026', historical: 28, projected: 28, confidenceLower: 25, confidenceUpper: 31 },
      { year: '2027', projected: 18, confidenceLower: 14, confidenceUpper: 22 },
      { year: '2028', projected: 12, confidenceLower: 8, confidenceUpper: 16 },
      { year: '2029', projected: 8, confidenceLower: 4, confidenceUpper: 12 }
    ],
    industryDistribution: [
      { industry: 'Legacy IT Outsourcing', sharePct: 45 },
      { industry: 'Maintenance Projects', sharePct: 30 },
      { industry: 'Government IT Contracts', sharePct: 25 }
    ],
    regionalBreakdown: {
      'Hyderabad': 30,
      'Chennai': 28,
      'Delhi NCR': 22,
      'Bengaluru': 20
    },
    talentSupplyLevel: 'High',
    supplyDemandGap: 'Surplus',
    shortageRiskLevel: 'Low',
    shortageTimeHorizon: 'N/A (Oversupply Risk)',
    curriculumAdvisory: {
      observedTrend: 'Sustained reduction in hiring demand (-18% YoY) with high graduate oversupply.',
      implication: 'Consider modernizing QA modules to focus on automated test engineering (Playwright/Cypress/API testing).',
      priority: 'High',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Software Testing & Quality Assurance Coursework',
      detailedTopics: [
        'E2E Web Automation with Playwright & Cypress',
        'API Testing & Contract Testing (Postman/Newman/REST Assured)',
        'Performance & Load Testing with k6 / JMeter',
        'AI-Assisted Test Generation & Synthetic Test Data Modeling'
      ],
      recommendedSandboxTools: ['Playwright', 'Cypress', 'k6', 'Postman'],
      facultyUpskillingNeed: 'Train testing faculty on modern JavaScript/Python automated test frameworks.'
    },
    activeJobPostings: 7200,
    avgStartingSalaryLPA: 4.2,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 42 },
      { month: 'Nov 25', demand: 40 },
      { month: 'Dec 25', demand: 38 },
      { month: 'Jan 26', demand: 35 },
      { month: 'Feb 26', demand: 33 },
      { month: 'Mar 26', demand: 31 },
      { month: 'Apr 26', demand: 30 },
      { month: 'May 26', demand: 29 },
      { month: 'Jun 26', demand: 29 },
      { month: 'Jul 26', demand: 28 },
      { month: 'Aug 26', demand: 28 },
      { month: 'Sep 26', demand: 28 }
    ],
    evidenceSources: {
      jobPostingsSample: 65000,
      employersTracked: 900,
      trainingEnrollmentsSample: 48000,
      confidenceGrade: 'High'
    }
  },
  {
    id: 'static-web-scripting',
    name: 'Static Web Design (HTML/CSS Only)',
    category: 'Web Development',
    trendType: 'declining',
    currentDemandIndex: 36,
    growth6M: -6,
    growth12M: -14,
    growthYoY: -14,
    futurePotential: 'Low',
    mainDriver: 'No-code website builders & full-stack JavaScript/TypeScript modern frameworks',
    displacementRisk: 'Very High',
    possibleReason: 'Widespread availability of AI website generation tools (v0, Webflow, Lovable) and No-code CMS platforms.',
    detailedDrivers: [
      {
        title: 'No-Code / AI Web Generators',
        description: 'Basic landing page creation largely automated by visual builders and AI layout generators.',
        impactScore: 92
      },
      {
        title: 'Full-Stack Framework Standard',
        description: 'Industry demands full-stack React/Next.js/Node.js rather than static HTML/CSS slicing.',
        impactScore: 86
      }
    ],
    demandSignals: {
      jobPostings: { name: 'Job Requisitions', change: '-14%', direction: 'down', score: 38, evidence: 'Postings for static web designers down 14% YoY across Indian tech hubs.' },
      industryAdoption: { name: 'Framework Standard', change: '-28%', direction: 'down', score: 34, evidence: '92% of new web projects initialized with React/Next.js/Tailwind or No-code.' },
      trainingDemand: { name: 'Student Demand', change: '-22%', direction: 'down', score: 45, evidence: 'High student transition to Full-Stack Web Development.' },
      investment: { name: 'Corporate Budget', change: '-32%', direction: 'down', score: 30, evidence: 'Small-scale web slicing work automated by agency toolkits.' },
      salaryPremium: { name: 'Compensation', change: '-6%', direction: 'down', score: 32, evidence: 'Stagnant starting package around ₹4.0 - ₹4.5 LPA.' }
    },
    futureImpact: {
      year1: {
        workforce: 'Static design positions merged into Full-Stack or UI/UX Design positions.',
        education: 'Replacing pure HTML/CSS courses with modern TypeScript and React ecosystems.',
        industry: 'AI visual generation creating complete web interfaces from text descriptions.'
      },
      year3: {
        workforce: 'Web developers must possess backend API integration, state management, and cloud hosting skills.',
        education: 'Mandatory Full-Stack Web Engineering capstone projects.',
        industry: 'Complex interactive web applications with AI copilot integration standard.'
      },
      year5: {
        workforce: 'AI-Native Web Application Architects building high-performance edge web applications.',
        education: 'End-to-end full-stack architectures standard across all IT curricula.',
        industry: 'Universal serverless deployment and automated multi-platform compilation.'
      }
    },
    forecastConfidence: 'High',
    forecastPoints: [
      { year: '2024', historical: 55, projected: 55, confidenceLower: 52, confidenceUpper: 58 },
      { year: '2025', historical: 44, projected: 44, confidenceLower: 41, confidenceUpper: 47 },
      { year: '2026', historical: 36, projected: 36, confidenceLower: 33, confidenceUpper: 39 },
      { year: '2027', projected: 26, confidenceLower: 22, confidenceUpper: 30 },
      { year: '2028', projected: 18, confidenceLower: 14, confidenceUpper: 22 },
      { year: '2029', projected: 12, confidenceLower: 8, confidenceUpper: 16 }
    ],
    industryDistribution: [
      { industry: 'Small Business Web Studios', sharePct: 48 },
      { industry: 'Marketing Agencies', sharePct: 32 },
      { industry: 'Maintenance IT Services', sharePct: 20 }
    ],
    regionalBreakdown: {
      'Delhi NCR': 28,
      'Hyderabad': 26,
      'Mumbai': 24,
      'Bengaluru': 22
    },
    talentSupplyLevel: 'High',
    supplyDemandGap: 'Surplus',
    shortageRiskLevel: 'Low',
    shortageTimeHorizon: 'N/A (Oversupply Risk)',
    curriculumAdvisory: {
      observedTrend: 'Declining demand (-14% YoY) with severe college oversupply of basic HTML/CSS graduates.',
      implication: 'Consider upgrading basic web modules directly to Full-Stack TypeScript, React, and backend API integration.',
      priority: 'High',
      evidenceLevel: 'Strong',
      suggestedReviewArea: 'Web Technologies & Internet Programming Curriculum',
      detailedTopics: [
        'Modern TypeScript & ESNext Fundamentals',
        'Component Architecture with React 19 / Next.js',
        'State Management & Server State (TanStack Query / Zustand)',
        'REST & GraphQL API Consumption with Authentication',
        'Tailwind CSS & Responsive UI Design Systems'
      ],
      recommendedSandboxTools: ['Vite', 'Next.js', 'Tailwind CSS', 'Vercel / Netlify'],
      facultyUpskillingNeed: 'Conduct faculty training on React ecosystem and modern TypeScript web standards.'
    },
    activeJobPostings: 11400,
    avgStartingSalaryLPA: 4.8,
    monthlyMomentum: [
      { month: 'Oct 25', demand: 46 },
      { month: 'Nov 25', demand: 44 },
      { month: 'Dec 25', demand: 42 },
      { month: 'Jan 26', demand: 40 },
      { month: 'Feb 26', demand: 39 },
      { month: 'Mar 26', demand: 38 },
      { month: 'Apr 26', demand: 37 },
      { month: 'May 26', demand: 37 },
      { month: 'Jun 26', demand: 36 },
      { month: 'Jul 26', demand: 36 },
      { month: 'Aug 26', demand: 36 },
      { month: 'Sep 26', demand: 36 }
    ],
    evidenceSources: {
      jobPostingsSample: 72000,
      employersTracked: 1100,
      trainingEnrollmentsSample: 52000,
      confidenceGrade: 'High'
    }
  }
];

// --------------------------------------------------------------------------
// SKILL EVOLUTION PATHWAYS (Section 8: Connected Transition Visualizer)
// --------------------------------------------------------------------------

export const mockSkillEvolutionPathways: SkillEvolutionPathway[] = [
  {
    id: 'data-evolution',
    title: 'Data Analytics → Modern Data & AI Engineering',
    description: 'Evolution of relational reporting into distributed streaming and AI-augmented data engineering.',
    category: 'Data & Analytics',
    steps: [
      {
        stage: 'Stage 1 (Legacy)',
        title: 'Traditional Data Analyst',
        timeframe: '2018 - 2021',
        description: 'Excel modeling, static SQL reports, manual CSV exports, and scheduled monthly dashboarding.',
        status: 'Legacy',
        statusColor: 'bg-slate-100 text-slate-700 border-slate-300'
      },
      {
        stage: 'Stage 2 (Current Core)',
        title: 'Advanced Analytics & BI',
        timeframe: '2021 - 2024',
        description: 'Interactive Power BI / Tableau dashboards, automated ETL cronjobs, and basic predictive Python statistics.',
        status: 'Current Core',
        statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
      },
      {
        stage: 'Stage 3 (Emerging)',
        title: 'Data Engineering & Streaming',
        timeframe: '2024 - 2026',
        description: 'Modular dbt transformations, Apache Kafka event streaming, Snowflake/BigQuery cloud data warehousing.',
        status: 'Emerging',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200'
      },
      {
        stage: 'Stage 4 (Future Frontier)',
        title: 'AI-Augmented Data Platform Engineer',
        timeframe: '2026 - 2029',
        description: 'Vector database indexing, real-time feature streaming stores for LLMs, autonomous Data Mesh governance.',
        status: 'Future Frontier',
        statusColor: 'bg-purple-50 text-purple-700 border-purple-200'
      }
    ]
  },
  {
    id: 'software-evolution',
    title: 'Software Development → AI Application Engineering',
    description: 'Transition of monolithic procedural programming into cloud-native, AI-orchestrated architectures.',
    category: 'Software Engineering',
    steps: [
      {
        stage: 'Stage 1 (Legacy)',
        title: 'Monolithic Web Developer',
        timeframe: '2017 - 2020',
        description: 'Static HTML/CSS, jQuery scripts, single-tier monolith servers, and manual FTP server deployments.',
        status: 'Legacy',
        statusColor: 'bg-slate-100 text-slate-700 border-slate-300'
      },
      {
        stage: 'Stage 2 (Current Core)',
        title: 'Full-Stack & Cloud Developer',
        timeframe: '2020 - 2024',
        description: 'React/Node.js SPAs, REST/GraphQL microservices, Docker containerization, and AWS/Azure cloud deployments.',
        status: 'Current Core',
        statusColor: 'bg-blue-50 text-blue-700 border-blue-200'
      },
      {
        stage: 'Stage 3 (Emerging)',
        title: 'AI-Assisted Software Engineer',
        timeframe: '2024 - 2026',
        description: 'Copilot-accelerated coding, LangChain API integration, vector embeddings, and automated DevSecOps CI/CD.',
        status: 'Emerging',
        statusColor: 'bg-amber-50 text-amber-700 border-amber-200'
      },
      {
        stage: 'Stage 4 (Future Frontier)',
        title: 'AI Systems Architect & Agent Orchestrator',
        timeframe: '2026 - 2029',
        description: 'Autonomous multi-agent orchestration (LangGraph), memory-safe Rust core services, deterministic AI guardrails.',
        status: 'Future Frontier',
        statusColor: 'bg-purple-50 text-purple-700 border-purple-200'
      }
    ]
  }
];

// --------------------------------------------------------------------------
// REGIONAL TECH HUBS DEMAND TELEMETRY (Section 9: India Hubs)
// --------------------------------------------------------------------------

export const mockRegionalHubsDemand: HubDemandInfo[] = [
  {
    hub: 'Bengaluru',
    growthPct: 46,
    demandIntensity: 96,
    topSkills: ['Generative AI & LLMs', 'Agentic AI', 'Rust Systems', 'Cloud Security'],
    activePostings: 78500,
    talentAvailability: 'Low',
    shortageRisk: 'High'
  },
  {
    hub: 'Hyderabad',
    growthPct: 42,
    demandIntensity: 92,
    topSkills: ['Cloud Security & DevSecOps', 'Generative AI', 'Data Engineering', 'Edge AI'],
    activePostings: 54200,
    talentAvailability: 'Low',
    shortageRisk: 'High'
  },
  {
    hub: 'Delhi NCR',
    growthPct: 34,
    demandIntensity: 84,
    topSkills: ['Data Engineering & Kafka', 'Generative AI', 'Cybersecurity', 'Full-Stack AI'],
    activePostings: 51200,
    talentAvailability: 'Medium',
    shortageRisk: 'Moderate'
  },
  {
    hub: 'Pune',
    growthPct: 32,
    demandIntensity: 80,
    topSkills: ['Cloud Security', 'Edge AI & Embedded IoT', 'DevOps & K8s', 'Data Engineering'],
    activePostings: 38400,
    talentAvailability: 'Medium',
    shortageRisk: 'Moderate'
  },
  {
    hub: 'Mumbai',
    growthPct: 28,
    demandIntensity: 78,
    topSkills: ['Cybersecurity in FinTech', 'Cloud Security', 'Predictive Analytics', 'SQL & BI'],
    activePostings: 42100,
    talentAvailability: 'Medium',
    shortageRisk: 'Moderate'
  },
  {
    hub: 'Chennai',
    growthPct: 30,
    demandIntensity: 76,
    topSkills: ['Edge AI & Automotive IoT', 'Cloud Security', 'Data Engineering', 'DevSecOps'],
    activePostings: 34600,
    talentAvailability: 'Medium',
    shortageRisk: 'Moderate'
  },
  {
    hub: 'Kolkata',
    growthPct: 20,
    demandIntensity: 64,
    topSkills: ['Data Analytics & SQL', 'Cloud Fundamentals', 'Python Programming'],
    activePostings: 18200,
    talentAvailability: 'High',
    shortageRisk: 'Low'
  }
];

// --------------------------------------------------------------------------
// EARLY WARNING RADAR SIGNALS (Section 13)
// --------------------------------------------------------------------------

export const mockEarlyWarningSignals: EarlyWarningSignal[] = [
  {
    id: 'ew-1',
    skill: 'Agentic AI & LangGraph',
    category: 'Artificial Intelligence',
    signalType: 'Exponential Job Requisition Surge',
    changePct: 64,
    confidence: 'High',
    timeDetected: 'Last 30 Days',
    status: 'High Alert',
    evidenceSummary: 'Active requisitions mentioning multi-agent orchestration increased by 64% month-over-month.'
  },
  {
    id: 'ew-2',
    skill: 'AI Cloud Security Posture (CSPM)',
    category: 'Cybersecurity',
    signalType: 'Regulatory Compliance Mandate',
    changePct: 38,
    confidence: 'High',
    timeDetected: 'Last 45 Days',
    status: 'High Alert',
    evidenceSummary: 'New RBI and CERT-In cybersecurity guidelines mandating AI system logging and real-time posture audits.'
  },
  {
    id: 'ew-3',
    skill: 'Rust Systems Programming',
    category: 'Software Engineering',
    signalType: 'Memory Safety Adoption Mandate',
    changePct: 38,
    confidence: 'High',
    timeDetected: 'Last 60 Days',
    status: 'Emerging',
    evidenceSummary: 'CISA & White House guidance accelerating corporate transition away from unmanaged C/C++.'
  },
  {
    id: 'ew-4',
    skill: 'Real-Time Streaming (Kafka/Flink)',
    category: 'Data Science',
    signalType: 'Modern Data Stack Upgrade',
    changePct: 29,
    confidence: 'Medium',
    timeDetected: 'Last 60 Days',
    status: 'Emerging',
    evidenceSummary: 'Enterprise migrations from batch ETL to event-driven real-time streaming architectures.'
  },
  {
    id: 'ew-5',
    skill: 'Legacy Manual Testing',
    category: 'Software Testing',
    signalType: 'Sustained Hiring Contraction',
    changePct: -18,
    confidence: 'High',
    timeDetected: 'Last 90 Days',
    status: 'Watch',
    evidenceSummary: 'Ongoing corporate replacement with automated CI/CD Playwright/Cypress pipelines and AI test generators.'
  }
];

// --------------------------------------------------------------------------
// OFFICER ACTION PANEL ADVISORIES (Section 17)
// --------------------------------------------------------------------------

export const mockOfficerAdvisories = [
  {
    id: 'adv-1',
    title: 'Monitor Generative AI & LLM Systems Demand',
    tag: 'High Priority',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Demand surge (+48% YoY) is creating an acute talent gap. Recommend monitoring autonomous college elective adoption and GPU sandbox provisioning across technical institutions.',
    actionText: 'Review AI Telemetry'
  },
  {
    id: 'adv-2',
    title: 'Evaluate DevSecOps & Cloud Security Skill Supply',
    tag: 'High Priority',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
    description: 'Continuous growth (+36% YoY) driven by BFSI compliance. Recommend checking whether CSE/IT syllabi include practical container vulnerability scanning and IAM labs.',
    actionText: 'Inspect Security Alignment'
  },
  {
    id: 'adv-3',
    title: 'Address Legacy Manual QA & Static Web Oversupply',
    tag: 'Curriculum Watch',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
    description: 'Continuous hiring contraction (-18% QA, -14% Static Web) risks producing underemployed graduates. Recommend advising academic boards to modernize coursework toward automation and full-stack frameworks.',
    actionText: 'View Modernization Pathway'
  },
  {
    id: 'adv-4',
    title: 'Track Regional Hub Shortage Disparities',
    tag: 'Regional Intelligence',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
    description: 'Bengaluru and Hyderabad account for over 64% of high-tech requisitions with high shortage risks. Review localized talent readiness pipelines and faculty upskilling initiatives.',
    actionText: 'Explore Regional Data'
  }
];

// --------------------------------------------------------------------------
// FILTER OPTIONS CONFIGURATION
// --------------------------------------------------------------------------

export const emergingIndustryOptions = [
  { label: 'All Industries', value: 'all' },
  { label: 'IT Services & SaaS', value: 'IT & SaaS Platforms' },
  { label: 'BFSI & FinTech', value: 'BFSI & FinTech' },
  { label: 'Healthcare & PharmaTech', value: 'Healthcare & PharmaTech' },
  { label: 'E-commerce & Retail', value: 'E-commerce & Retail' },
  { label: 'Automotive & Embedded', value: 'Automotive & Core Engineering' }
];

export const emergingHubOptions = [
  { label: 'All Tech Hubs (Pan-India)', value: 'all' },
  { label: 'Bengaluru', value: 'Bengaluru' },
  { label: 'Hyderabad', value: 'Hyderabad' },
  { label: 'Delhi NCR', value: 'Delhi NCR' },
  { label: 'Pune', value: 'Pune' },
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Chennai', value: 'Chennai' },
  { label: 'Kolkata', value: 'Kolkata' }
];

export const emergingCategoryOptions = [
  { label: 'All Skill Categories', value: 'all' },
  { label: 'Artificial Intelligence', value: 'Artificial Intelligence' },
  { label: 'Cybersecurity & Cloud', value: 'Cybersecurity & Cloud' },
  { label: 'Data & Analytics', value: 'Data & Analytics' },
  { label: 'Software Engineering', value: 'Software Engineering' },
  { label: 'Software Testing & QA', value: 'Software Testing & QA' },
  { label: 'Web Development', value: 'Web Development' }
];

export const educationLevelOptions = [
  { label: 'All Education Levels', value: 'all' },
  { label: 'B.Tech / B.E. (Undergraduate)', value: 'btech' },
  { label: 'M.Tech / M.S. (Postgraduate)', value: 'mtech' },
  { label: 'MCA / M.Sc Computer Science', value: 'mca' },
  { label: 'Polytechnic Diploma', value: 'diploma' }
];

export const experienceLevelOptions = [
  { label: 'All Experience Levels', value: 'all' },
  { label: 'Entry Level (0-2 Years / Freshers)', value: 'entry' },
  { label: 'Mid Level (3-5 Years)', value: 'mid' },
  { label: 'Senior & Lead (5+ Years)', value: 'senior' }
];

// --------------------------------------------------------------------------
// HELPER FUNCTIONS: Filter, Calculate Overview Metrics
// --------------------------------------------------------------------------

export function filterEmergingSkills(
  data: EmergingSkillIntelligenceItem[],
  filters: EmergingSkillsFilterOptions
): EmergingSkillIntelligenceItem[] {
  let list = [...data];

  if (filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q) ||
        s.mainDriver.toLowerCase().includes(q)
    );
  }

  if (filters.skillCategory !== 'all') {
    list = list.filter((s) => s.category === filters.skillCategory);
  }

  if (filters.industry !== 'all') {
    list = list.filter((s) =>
      s.industryDistribution.some((ind) => ind.industry.includes(filters.industry) || filters.industry.includes(ind.industry))
    );
  }

  return list;
}

export interface ComputedEmergingKpis {
  risingSkillsCount: number;
  decliningSkillsCount: number;
  highFuturePotentialCount: number;
  shortageRiskCount: number;
  curriculumPressureLevel: 'High' | 'Moderate' | 'Low';
  totalMonitored: number;
}

export function computeEmergingKpis(skills: EmergingSkillIntelligenceItem[]): ComputedEmergingKpis {
  const risingSkillsCount = skills.filter((s) => s.trendType === 'rising').length;
  const decliningSkillsCount = skills.filter((s) => s.trendType === 'declining').length;
  const highFuturePotentialCount = skills.filter((s) => s.futurePotential === 'Very High' || s.futurePotential === 'High').length;
  const shortageRiskCount = skills.filter((s) => s.shortageRiskLevel === 'High').length;
  const highAdvisoryCount = skills.filter((s) => s.curriculumAdvisory.priority === 'High').length;

  return {
    risingSkillsCount,
    decliningSkillsCount,
    highFuturePotentialCount,
    shortageRiskCount,
    curriculumPressureLevel: highAdvisoryCount >= 3 ? 'High' : highAdvisoryCount >= 1 ? 'Moderate' : 'Low',
    totalMonitored: skills.length
  };
}
