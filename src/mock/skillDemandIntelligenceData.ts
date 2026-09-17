// Skill Demand Intelligence Mock Data & Type Definitions
// Structured cleanly for direct replacement with backend REST/GraphQL API responses

export type SkillCategory =
  | 'AI & Machine Learning'
  | 'Cloud & Infrastructure'
  | 'Data Science & Analytics'
  | 'Cybersecurity'
  | 'Software Engineering'
  | 'DevOps & SRE'
  | 'Core Engineering & IoT';

export type DemandLevel = 'Very High' | 'High' | 'Medium' | 'Low';
export type SupplyStatus = 'Acute Deficit' | 'Moderate Deficit' | 'Balanced' | 'Surplus';
export type CurriculumAttention = 'Critical' | 'High' | 'Moderate' | 'Stable';
export type QuadrantZone =
  | 'Aligned Skills'
  | 'Critical Talent Shortage'
  | 'Potential Oversupply'
  | 'Low Priority';

export interface MonthlyTrajectory {
  month: string;
  demand: number;
  interest: number;
  supply: number;
}

export interface SkillDemandIntelligenceItem {
  id: string;
  skill: string;
  category: SkillCategory;
  studentInterest: number; // 0 - 100 (%)
  industryDemand: number; // 0 - 100 (%)
  curriculumCoverage: number; // 0 - 100 (%)
  studentSupply: number; // 0 - 100 (%)
  demandSupplyGap: number; // industryDemand - studentSupply (%)
  curriculumGap: number; // industryDemand - curriculumCoverage (%)
  yoyGrowth: number; // e.g. +48 (%)
  demandLevel: DemandLevel;
  supplyStatus: SupplyStatus;
  curriculumAttention: CurriculumAttention;
  quadrant: QuadrantZone;
  activeJobPostings: number;
  avgStartingSalaryLPA: number;
  industries: string[];
  regions: string[];
  institutionCoverage: {
    autonomous: number;
    stateTech: number;
    tier1: number;
    tier2_3: number;
    polytechnic: number;
  };
  monthlyTrend: MonthlyTrajectory[];
  curriculumRecommendation: string;
  keyHiringCompanies: string[];
  prerequisites: string[];
}

export interface RegionalDemandGapRecord {
  id: string;
  region: string;
  code: string;
  topSkill: string;
  industryDemand: number;
  studentSupply: number;
  demandSupplyGap: number;
  yoyGrowth: number;
  primarySector: string;
  hubsCount: number;
  activePostings: number;
  mapCoords: { x: number; y: number }; // Relative position on India map canvas (percentage 0-100)
  colorIntensity: string; // Tailwind class or hex for heatmap shading
}

export interface FilterOptions {
  timePeriod: string;
  industry: string;
  skillCategory: string;
  region: string;
  institutionType: string;
  searchQuery: string;
  sortBy: 'demand' | 'gap' | 'interest' | 'growth';
}

// --------------------------------------------------------------------------
// MOCK DATASET: Tracked Skills with Multidimensional Telemetry
// --------------------------------------------------------------------------

export const initialSkillDemandIntelligenceData: SkillDemandIntelligenceItem[] = [
  {
    id: 'gen-ai',
    skill: 'Generative AI & LLMs',
    category: 'AI & Machine Learning',
    studentInterest: 82,
    industryDemand: 96,
    curriculumCoverage: 32,
    studentSupply: 31,
    demandSupplyGap: 65,
    curriculumGap: 64,
    yoyGrowth: 48,
    demandLevel: 'Very High',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'Critical',
    quadrant: 'Aligned Skills',
    activeJobPostings: 28450,
    avgStartingSalaryLPA: 14.5,
    industries: ['AI & SaaS', 'Fintech', 'Enterprise IT', 'Healthcare Tech'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Delhi NCR', 'Tamil Nadu'],
    institutionCoverage: {
      autonomous: 48,
      stateTech: 28,
      tier1: 72,
      tier2_3: 18,
      polytechnic: 6
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 62, interest: 55, supply: 18 },
      { month: 'Nov 25', demand: 68, interest: 60, supply: 20 },
      { month: 'Dec 25', demand: 73, interest: 64, supply: 22 },
      { month: 'Jan 26', demand: 78, interest: 69, supply: 24 },
      { month: 'Feb 26', demand: 84, interest: 72, supply: 26 },
      { month: 'Mar 26', demand: 88, interest: 75, supply: 27 },
      { month: 'Apr 26', demand: 90, interest: 77, supply: 28 },
      { month: 'May 26', demand: 92, interest: 79, supply: 29 },
      { month: 'Jun 26', demand: 94, interest: 80, supply: 30 },
      { month: 'Jul 26', demand: 95, interest: 81, supply: 30 },
      { month: 'Aug 26', demand: 95, interest: 82, supply: 31 },
      { month: 'Sep 26', demand: 96, interest: 82, supply: 31 }
    ],
    curriculumRecommendation:
      'Urgent mandate: Integrate LangChain/LlamaIndex, RAG architectures, and fine-tuning pipelines into Semester 6/7 core curriculum; deploy GPU cloud sandboxes across autonomous colleges.',
    keyHiringCompanies: ['Microsoft IDC', 'Amazon Web Services', 'Google Cloud', 'Fractal Analytics', 'Infosys AI Labs'],
    prerequisites: ['Python', 'Deep Learning Basics', 'Vector Databases', 'REST APIs']
  },
  {
    id: 'cloud-computing',
    skill: 'Cloud Computing & AWS/Azure',
    category: 'Cloud & Infrastructure',
    studentInterest: 54,
    industryDemand: 89,
    curriculumCoverage: 45,
    studentSupply: 42,
    demandSupplyGap: 47,
    curriculumGap: 44,
    yoyGrowth: 34,
    demandLevel: 'Very High',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'High',
    quadrant: 'Critical Talent Shortage',
    activeJobPostings: 42100,
    avgStartingSalaryLPA: 11.8,
    industries: ['Enterprise IT', 'Fintech', 'Cloud & DevOps', 'E-commerce'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi NCR', 'Andhra Pradesh'],
    institutionCoverage: {
      autonomous: 62,
      stateTech: 44,
      tier1: 82,
      tier2_3: 35,
      polytechnic: 20
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 74, interest: 48, supply: 35 },
      { month: 'Nov 25', demand: 76, interest: 49, supply: 36 },
      { month: 'Dec 25', demand: 78, interest: 50, supply: 37 },
      { month: 'Jan 26', demand: 81, interest: 51, supply: 38 },
      { month: 'Feb 26', demand: 83, interest: 52, supply: 39 },
      { month: 'Mar 26', demand: 85, interest: 52, supply: 40 },
      { month: 'Apr 26', demand: 86, interest: 53, supply: 40 },
      { month: 'May 26', demand: 87, interest: 53, supply: 41 },
      { month: 'Jun 26', demand: 88, interest: 54, supply: 41 },
      { month: 'Jul 26', demand: 88, interest: 54, supply: 42 },
      { month: 'Aug 26', demand: 89, interest: 54, supply: 42 },
      { month: 'Sep 26', demand: 89, interest: 54, supply: 42 }
    ],
    curriculumRecommendation:
      'Transition from theoretical networking to mandatory 30-hour AWS/Azure cloud architecture sandboxes with real microservices deployment.',
    keyHiringCompanies: ['TCS Digital', 'Wipro Cloud', 'Cognizant', 'Accenture', 'Deloitte USI'],
    prerequisites: ['Linux Fundamentals', 'Computer Networks', 'Virtualization Basics']
  },
  {
    id: 'cybersecurity',
    skill: 'Cybersecurity & IAM',
    category: 'Cybersecurity',
    studentInterest: 61,
    industryDemand: 84,
    curriculumCoverage: 48,
    studentSupply: 46,
    demandSupplyGap: 38,
    curriculumGap: 36,
    yoyGrowth: 26,
    demandLevel: 'High',
    supplyStatus: 'Moderate Deficit',
    curriculumAttention: 'High',
    quadrant: 'Aligned Skills',
    activeJobPostings: 19800,
    avgStartingSalaryLPA: 12.2,
    industries: ['Fintech', 'BFSI & FinTech', 'Enterprise IT', 'Healthcare Tech'],
    regions: ['Telangana', 'Karnataka', 'Delhi NCR', 'Maharashtra'],
    institutionCoverage: {
      autonomous: 55,
      stateTech: 42,
      tier1: 75,
      tier2_3: 31,
      polytechnic: 15
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 70, interest: 52, supply: 38 },
      { month: 'Nov 25', demand: 72, interest: 54, supply: 39 },
      { month: 'Dec 25', demand: 74, interest: 55, supply: 40 },
      { month: 'Jan 26', demand: 76, interest: 57, supply: 42 },
      { month: 'Feb 26', demand: 78, interest: 58, supply: 43 },
      { month: 'Mar 26', demand: 80, interest: 59, supply: 44 },
      { month: 'Apr 26', demand: 81, interest: 60, supply: 45 },
      { month: 'May 26', demand: 82, interest: 60, supply: 45 },
      { month: 'Jun 26', demand: 83, interest: 61, supply: 46 },
      { month: 'Jul 26', demand: 83, interest: 61, supply: 46 },
      { month: 'Aug 26', demand: 84, interest: 61, supply: 46 },
      { month: 'Sep 26', demand: 84, interest: 61, supply: 46 }
    ],
    curriculumRecommendation:
      'Introduce hands-on SOC emulation, Zero-Trust network architecture, and OWASP Top 10 web security auditing into IT/CSE curricula.',
    keyHiringCompanies: ['HDFC Bank Tech', 'Palo Alto Networks', 'Qualys', 'EY Cyber', 'Cisco'],
    prerequisites: ['Networking', 'Cryptography', 'Operating Systems Security']
  },
  {
    id: 'data-engineering',
    skill: 'Data Engineering (dbt/Spark/Kafka)',
    category: 'Data Science & Analytics',
    studentInterest: 48,
    industryDemand: 82,
    curriculumCoverage: 38,
    studentSupply: 38,
    demandSupplyGap: 44,
    curriculumGap: 44,
    yoyGrowth: 29,
    demandLevel: 'High',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'High',
    quadrant: 'Critical Talent Shortage',
    activeJobPostings: 24500,
    avgStartingSalaryLPA: 13.0,
    industries: ['AI & SaaS', 'Fintech', 'Enterprise IT', 'Data & Analytics'],
    regions: ['Karnataka', 'Telangana', 'Maharashtra', 'Delhi NCR', 'Tamil Nadu'],
    institutionCoverage: {
      autonomous: 46,
      stateTech: 30,
      tier1: 68,
      tier2_3: 22,
      polytechnic: 8
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 68, interest: 41, supply: 30 },
      { month: 'Nov 25', demand: 70, interest: 43, supply: 32 },
      { month: 'Dec 25', demand: 73, interest: 44, supply: 33 },
      { month: 'Jan 26', demand: 75, interest: 45, supply: 34 },
      { month: 'Feb 26', demand: 77, interest: 46, supply: 35 },
      { month: 'Mar 26', demand: 79, interest: 47, supply: 36 },
      { month: 'Apr 26', demand: 80, interest: 47, supply: 37 },
      { month: 'May 26', demand: 81, interest: 48, supply: 37 },
      { month: 'Jun 26', demand: 81, interest: 48, supply: 38 },
      { month: 'Jul 26', demand: 82, interest: 48, supply: 38 },
      { month: 'Aug 26', demand: 82, interest: 48, supply: 38 },
      { month: 'Sep 26', demand: 82, interest: 48, supply: 38 }
    ],
    curriculumRecommendation:
      'Shift standard SQL labs to modern batch/stream processing with Apache Kafka, PySpark, and Snowflake/BigQuery data pipelines.',
    keyHiringCompanies: ['Swiggy', 'PhonePe', 'Flipkart Data Org', 'Mu Sigma', 'Tiger Analytics'],
    prerequisites: ['Advanced SQL', 'Python / Scala', 'Distributed Systems']
  },
  {
    id: 'python-programming',
    skill: 'Python & Systems Scripting',
    category: 'Software Engineering',
    studentInterest: 78,
    industryDemand: 88,
    curriculumCoverage: 84,
    studentSupply: 76,
    demandSupplyGap: 12,
    curriculumGap: 4,
    yoyGrowth: 18,
    demandLevel: 'Very High',
    supplyStatus: 'Balanced',
    curriculumAttention: 'Stable',
    quadrant: 'Aligned Skills',
    activeJobPostings: 56000,
    avgStartingSalaryLPA: 8.5,
    industries: ['Enterprise IT', 'AI & SaaS', 'Fintech', 'Automotive & EV', 'Manufacturing'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi NCR', 'Andhra Pradesh', 'Kerala', 'Gujarat'],
    institutionCoverage: {
      autonomous: 94,
      stateTech: 88,
      tier1: 98,
      tier2_3: 82,
      polytechnic: 64
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 80, interest: 72, supply: 70 },
      { month: 'Nov 25', demand: 82, interest: 73, supply: 71 },
      { month: 'Dec 25', demand: 83, interest: 74, supply: 72 },
      { month: 'Jan 26', demand: 85, interest: 75, supply: 73 },
      { month: 'Feb 26', demand: 86, interest: 76, supply: 74 },
      { month: 'Mar 26', demand: 87, interest: 77, supply: 75 },
      { month: 'Apr 26', demand: 87, interest: 77, supply: 75 },
      { month: 'May 26', demand: 88, interest: 78, supply: 76 },
      { month: 'Jun 26', demand: 88, interest: 78, supply: 76 },
      { month: 'Jul 26', demand: 88, interest: 78, supply: 76 },
      { month: 'Aug 26', demand: 88, interest: 78, supply: 76 },
      { month: 'Sep 26', demand: 88, interest: 78, supply: 76 }
    ],
    curriculumRecommendation:
      'Curriculum coverage is healthy. Recommend upgrading advanced modules to asynchronous programming (AsyncIO), NumPy vectorization, and FastAPI microservices.',
    keyHiringCompanies: ['TCS', 'Infosys', 'Capgemini', 'IBM India', 'Oracle'],
    prerequisites: ['Basic Algorithmic Logic', 'Data Structures']
  },
  {
    id: 'sql-analytics',
    skill: 'SQL & Relational Modelling',
    category: 'Data Science & Analytics',
    studentInterest: 73,
    industryDemand: 86,
    curriculumCoverage: 79,
    studentSupply: 68,
    demandSupplyGap: 18,
    curriculumGap: 7,
    yoyGrowth: 21,
    demandLevel: 'Very High',
    supplyStatus: 'Balanced',
    curriculumAttention: 'Stable',
    quadrant: 'Aligned Skills',
    activeJobPostings: 48900,
    avgStartingSalaryLPA: 8.0,
    industries: ['Enterprise IT', 'Fintech', 'BFSI & FinTech', 'Data & Analytics'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi NCR', 'Andhra Pradesh', 'Kerala'],
    institutionCoverage: {
      autonomous: 90,
      stateTech: 84,
      tier1: 96,
      tier2_3: 78,
      polytechnic: 58
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 79, interest: 68, supply: 62 },
      { month: 'Nov 25', demand: 81, interest: 69, supply: 63 },
      { month: 'Dec 25', demand: 82, interest: 70, supply: 64 },
      { month: 'Jan 26', demand: 83, interest: 71, supply: 65 },
      { month: 'Feb 26', demand: 84, interest: 71, supply: 66 },
      { month: 'Mar 26', demand: 85, interest: 72, supply: 67 },
      { month: 'Apr 26', demand: 85, interest: 72, supply: 67 },
      { month: 'May 26', demand: 86, interest: 73, supply: 68 },
      { month: 'Jun 26', demand: 86, interest: 73, supply: 68 },
      { month: 'Jul 26', demand: 86, interest: 73, supply: 68 },
      { month: 'Aug 26', demand: 86, interest: 73, supply: 68 },
      { month: 'Sep 26', demand: 86, interest: 73, supply: 68 }
    ],
    curriculumRecommendation:
      'Curriculum is stable. Add advanced analytical window functions, CTE query tuning, and index optimization capstone labs.',
    keyHiringCompanies: ['HCLTech', 'Cognizant', 'LTIMindtree', 'ICICI Tech', 'Genpact'],
    prerequisites: ['Database Management Systems', 'Entity Relational Design']
  },
  {
    id: 'devops-kubernetes',
    skill: 'DevOps & Docker/Kubernetes',
    category: 'DevOps & SRE',
    studentInterest: 41,
    industryDemand: 79,
    curriculumCoverage: 36,
    studentSupply: 41,
    demandSupplyGap: 38,
    curriculumGap: 43,
    yoyGrowth: 31,
    demandLevel: 'High',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'High',
    quadrant: 'Critical Talent Shortage',
    activeJobPostings: 21300,
    avgStartingSalaryLPA: 12.0,
    industries: ['Cloud & DevOps', 'Enterprise IT', 'Fintech', 'AI & SaaS'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Delhi NCR'],
    institutionCoverage: {
      autonomous: 44,
      stateTech: 28,
      tier1: 65,
      tier2_3: 20,
      polytechnic: 10
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 66, interest: 34, supply: 32 },
      { month: 'Nov 25', demand: 68, interest: 35, supply: 33 },
      { month: 'Dec 25', demand: 71, interest: 37, supply: 35 },
      { month: 'Jan 26', demand: 73, interest: 38, supply: 37 },
      { month: 'Feb 26', demand: 75, interest: 39, supply: 38 },
      { month: 'Mar 26', demand: 77, interest: 40, supply: 39 },
      { month: 'Apr 26', demand: 78, interest: 40, supply: 40 },
      { month: 'May 26', demand: 78, interest: 41, supply: 40 },
      { month: 'Jun 26', demand: 79, interest: 41, supply: 41 },
      { month: 'Jul 26', demand: 79, interest: 41, supply: 41 },
      { month: 'Aug 26', demand: 79, interest: 41, supply: 41 },
      { month: 'Sep 26', demand: 79, interest: 41, supply: 41 }
    ],
    curriculumRecommendation:
      'Introduce CI/CD automation pipelines (GitHub Actions), Containerization (Docker), and Helm charts into software engineering course curricula.',
    keyHiringCompanies: ['Red Hat India', 'JPMorgan Chase', 'Sasken', 'Morgan Stanley', 'Persistent Systems'],
    prerequisites: ['Linux Shell Scripting', 'Git Version Control', 'Networking Basics']
  },
  {
    id: 'powerbi-analytics',
    skill: 'Power BI & Visual Analytics',
    category: 'Data Science & Analytics',
    studentInterest: 67,
    industryDemand: 74,
    curriculumCoverage: 62,
    studentSupply: 58,
    demandSupplyGap: 16,
    curriculumGap: 12,
    yoyGrowth: 24,
    demandLevel: 'High',
    supplyStatus: 'Moderate Deficit',
    curriculumAttention: 'Moderate',
    quadrant: 'Aligned Skills',
    activeJobPostings: 23100,
    avgStartingSalaryLPA: 7.8,
    industries: ['BFSI & FinTech', 'Enterprise IT', 'Manufacturing', 'Healthcare Tech', 'Data & Analytics'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Andhra Pradesh', 'Gujarat'],
    institutionCoverage: {
      autonomous: 72,
      stateTech: 58,
      tier1: 85,
      tier2_3: 52,
      polytechnic: 38
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 62, interest: 58, supply: 50 },
      { month: 'Nov 25', demand: 64, interest: 60, supply: 52 },
      { month: 'Dec 25', demand: 66, interest: 61, supply: 53 },
      { month: 'Jan 26', demand: 68, interest: 63, supply: 54 },
      { month: 'Feb 26', demand: 70, interest: 64, supply: 55 },
      { month: 'Mar 26', demand: 71, interest: 65, supply: 56 },
      { month: 'Apr 26', demand: 72, interest: 66, supply: 57 },
      { month: 'May 26', demand: 73, interest: 66, supply: 57 },
      { month: 'Jun 26', demand: 73, interest: 67, supply: 58 },
      { month: 'Jul 26', demand: 74, interest: 67, supply: 58 },
      { month: 'Aug 26', demand: 74, interest: 67, supply: 58 },
      { month: 'Sep 26', demand: 74, interest: 67, supply: 58 }
    ],
    curriculumRecommendation:
      'Expand DAX measure formulations and business storytelling projects with multi-dimensional datasets.',
    keyHiringCompanies: ['KPMG India', 'PwC', 'Deloitte', 'Target India', 'ITC Infotech'],
    prerequisites: ['Excel Formulas', 'Basic SQL', 'Business Statistics']
  },
  {
    id: 'edge-ai-iot',
    skill: 'Edge AI & Embedded IoT',
    category: 'Core Engineering & IoT',
    studentInterest: 38,
    industryDemand: 72,
    curriculumCoverage: 28,
    studentSupply: 24,
    demandSupplyGap: 48,
    curriculumGap: 44,
    yoyGrowth: 41,
    demandLevel: 'High',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'High',
    quadrant: 'Critical Talent Shortage',
    activeJobPostings: 14200,
    avgStartingSalaryLPA: 11.5,
    industries: ['Automotive & EV', 'Manufacturing', 'Healthcare Tech', 'Enterprise IT'],
    regions: ['Karnataka', 'Tamil Nadu', 'Telangana', 'Maharashtra', 'Gujarat'],
    institutionCoverage: {
      autonomous: 40,
      stateTech: 24,
      tier1: 62,
      tier2_3: 16,
      polytechnic: 12
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 54, interest: 28, supply: 18 },
      { month: 'Nov 25', demand: 57, interest: 30, supply: 19 },
      { month: 'Dec 25', demand: 60, interest: 32, supply: 20 },
      { month: 'Jan 26', demand: 63, interest: 33, supply: 21 },
      { month: 'Feb 26', demand: 66, interest: 35, supply: 22 },
      { month: 'Mar 26', demand: 68, interest: 36, supply: 22 },
      { month: 'Apr 26', demand: 69, interest: 37, supply: 23 },
      { month: 'May 26', demand: 70, interest: 37, supply: 23 },
      { month: 'Jun 26', demand: 71, interest: 38, supply: 24 },
      { month: 'Jul 26', demand: 71, interest: 38, supply: 24 },
      { month: 'Aug 26', demand: 72, interest: 38, supply: 24 },
      { month: 'Sep 26', demand: 72, interest: 38, supply: 24 }
    ],
    curriculumRecommendation:
      'Setup physical hardware labs with NVIDIA Jetson / ESP32 microcontrollers and tinyML inference frameworks for ECE/EEE students.',
    keyHiringCompanies: ['Bosch India', 'Ola Electric', 'Qualcomm', 'Tata Elxsi', 'Texas Instruments'],
    prerequisites: ['Embedded C/C++', 'Microcontrollers', 'Basic ML Concepts']
  },
  {
    id: 'rust-systems',
    skill: 'Rust & High-Performance Systems',
    category: 'Software Engineering',
    studentInterest: 29,
    industryDemand: 68,
    curriculumCoverage: 18,
    studentSupply: 16,
    demandSupplyGap: 52,
    curriculumGap: 50,
    yoyGrowth: 38,
    demandLevel: 'Medium',
    supplyStatus: 'Acute Deficit',
    curriculumAttention: 'High',
    quadrant: 'Critical Talent Shortage',
    activeJobPostings: 9800,
    avgStartingSalaryLPA: 16.0,
    industries: ['Cloud & DevOps', 'BFSI & FinTech', 'AI & SaaS', 'Enterprise IT'],
    regions: ['Karnataka', 'Telangana', 'Delhi NCR'],
    institutionCoverage: {
      autonomous: 24,
      stateTech: 12,
      tier1: 45,
      tier2_3: 8,
      polytechnic: 2
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 50, interest: 20, supply: 10 },
      { month: 'Nov 25', demand: 53, interest: 22, supply: 11 },
      { month: 'Dec 25', demand: 56, interest: 24, supply: 12 },
      { month: 'Jan 26', demand: 59, interest: 25, supply: 13 },
      { month: 'Feb 26', demand: 62, interest: 26, supply: 14 },
      { month: 'Mar 26', demand: 64, interest: 27, supply: 14 },
      { month: 'Apr 26', demand: 65, interest: 28, supply: 15 },
      { month: 'May 26', demand: 66, interest: 28, supply: 15 },
      { month: 'Jun 26', demand: 67, interest: 29, supply: 16 },
      { month: 'Jul 26', demand: 67, interest: 29, supply: 16 },
      { month: 'Aug 26', demand: 68, interest: 29, supply: 16 },
      { month: 'Sep 26', demand: 68, interest: 29, supply: 16 }
    ],
    curriculumRecommendation:
      'Introduce memory safety, borrow checker paradigms, and concurrent systems programming in elective tracks.',
    keyHiringCompanies: ['Cloudflare India', 'Zerodha Tech', 'BrowserStack', 'Postman', 'Microsoft R&D'],
    prerequisites: ['C/C++ Memory Management', 'Data Structures', 'Operating Systems']
  },
  {
    id: 'legacy-manual-qa',
    skill: 'Legacy Manual QA & Test Scripting',
    category: 'Software Engineering',
    studentInterest: 58,
    industryDemand: 28,
    curriculumCoverage: 76,
    studentSupply: 82,
    demandSupplyGap: -54,
    curriculumGap: -48,
    yoyGrowth: -18,
    demandLevel: 'Low',
    supplyStatus: 'Surplus',
    curriculumAttention: 'Critical',
    quadrant: 'Potential Oversupply',
    activeJobPostings: 7200,
    avgStartingSalaryLPA: 4.2,
    industries: ['Enterprise IT'],
    regions: ['Telangana', 'Tamil Nadu', 'Andhra Pradesh', 'Maharashtra'],
    institutionCoverage: {
      autonomous: 80,
      stateTech: 88,
      tier1: 60,
      tier2_3: 92,
      polytechnic: 85
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 42, interest: 64, supply: 84 },
      { month: 'Nov 25', demand: 40, interest: 63, supply: 84 },
      { month: 'Dec 25', demand: 38, interest: 62, supply: 83 },
      { month: 'Jan 26', demand: 35, interest: 61, supply: 83 },
      { month: 'Feb 26', demand: 33, interest: 60, supply: 83 },
      { month: 'Mar 26', demand: 31, interest: 59, supply: 82 },
      { month: 'Apr 26', demand: 30, interest: 59, supply: 82 },
      { month: 'May 26', demand: 29, interest: 58, supply: 82 },
      { month: 'Jun 26', demand: 29, interest: 58, supply: 82 },
      { month: 'Jul 26', demand: 28, interest: 58, supply: 82 },
      { month: 'Aug 26', demand: 28, interest: 58, supply: 82 },
      { month: 'Sep 26', demand: 28, interest: 58, supply: 82 }
    ],
    curriculumRecommendation:
      'Urgent de-emphasis required: Replace manual test writing courses with Automated Testing (Playwright/Cypress), API test automation, and AI-assisted QA pipelines.',
    keyHiringCompanies: ['Legacy Outsourcing Vendors', 'Maintenance IT Hubs'],
    prerequisites: ['Basic Web Navigation', 'Excel Reporting']
  },
  {
    id: 'basic-web-dev',
    skill: 'Static Web Design (HTML/CSS/Basic JS)',
    category: 'Software Engineering',
    studentInterest: 72,
    industryDemand: 36,
    curriculumCoverage: 88,
    studentSupply: 89,
    demandSupplyGap: -53,
    curriculumGap: -52,
    yoyGrowth: -12,
    demandLevel: 'Low',
    supplyStatus: 'Surplus',
    curriculumAttention: 'Critical',
    quadrant: 'Potential Oversupply',
    activeJobPostings: 11400,
    avgStartingSalaryLPA: 4.8,
    industries: ['Enterprise IT'],
    regions: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi NCR', 'Andhra Pradesh', 'Kerala', 'Gujarat', 'West Bengal'],
    institutionCoverage: {
      autonomous: 92,
      stateTech: 96,
      tier1: 85,
      tier2_3: 98,
      polytechnic: 95
    },
    monthlyTrend: [
      { month: 'Oct 25', demand: 46, interest: 76, supply: 90 },
      { month: 'Nov 25', demand: 44, interest: 75, supply: 90 },
      { month: 'Dec 25', demand: 42, interest: 74, supply: 90 },
      { month: 'Jan 26', demand: 40, interest: 73, supply: 89 },
      { month: 'Feb 26', demand: 39, interest: 73, supply: 89 },
      { month: 'Mar 26', demand: 38, interest: 72, supply: 89 },
      { month: 'Apr 26', demand: 37, interest: 72, supply: 89 },
      { month: 'May 26', demand: 37, interest: 72, supply: 89 },
      { month: 'Jun 26', demand: 36, interest: 72, supply: 89 },
      { month: 'Jul 26', demand: 36, interest: 72, supply: 89 },
      { month: 'Aug 26', demand: 36, interest: 72, supply: 89 },
      { month: 'Sep 26', demand: 36, interest: 72, supply: 89 }
    ],
    curriculumRecommendation:
      'Curriculum over-indexed on static HTML/CSS. Upgrade to Full-Stack TypeScript, React 19 / Next.js, and backend serverless endpoints.',
    keyHiringCompanies: ['Web Studios', 'Small Scale IT Vendors'],
    prerequisites: ['Computer Literacy']
  }
];

// --------------------------------------------------------------------------
// MOCK DATASET: Regional Demand Gaps (India Regional Telemetry)
// --------------------------------------------------------------------------

export const mockRegionalDemandGaps: RegionalDemandGapRecord[] = [
  {
    id: 'telangana',
    region: 'Telangana',
    code: 'TS',
    topSkill: 'Cloud Computing & AWS',
    industryDemand: 89,
    studentSupply: 42,
    demandSupplyGap: 47,
    yoyGrowth: 34,
    primarySector: 'IT & Cloud Platforms, PharmaTech',
    hubsCount: 14,
    activePostings: 54200,
    mapCoords: { x: 46, y: 64 },
    colorIntensity: '#dc2626' // Red - High gap
  },
  {
    id: 'karnataka',
    region: 'Karnataka',
    code: 'KA',
    topSkill: 'Generative AI & LLMs',
    industryDemand: 96,
    studentSupply: 38,
    demandSupplyGap: 58,
    yoyGrowth: 46,
    primarySector: 'AI, SaaS, DeepTech & FinTech',
    hubsCount: 18,
    activePostings: 78500,
    mapCoords: { x: 38, y: 74 },
    colorIntensity: '#991b1b' // Dark Red - Very high gap
  },
  {
    id: 'maharashtra',
    region: 'Maharashtra',
    code: 'MH',
    topSkill: 'Cybersecurity & IAM',
    industryDemand: 86,
    studentSupply: 48,
    demandSupplyGap: 38,
    yoyGrowth: 28,
    primarySector: 'BFSI, FinTech, Auto EV & Cloud',
    hubsCount: 16,
    activePostings: 69300,
    mapCoords: { x: 32, y: 56 },
    colorIntensity: '#ea580c' // Orange - Moderate gap
  },
  {
    id: 'tamil-nadu',
    region: 'Tamil Nadu',
    code: 'TN',
    topSkill: 'Edge AI & Embedded IoT',
    industryDemand: 81,
    studentSupply: 44,
    demandSupplyGap: 37,
    yoyGrowth: 31,
    primarySector: 'Automotive EV, SaaS & Electronics',
    hubsCount: 15,
    activePostings: 46800,
    mapCoords: { x: 44, y: 84 },
    colorIntensity: '#ea580c'
  },
  {
    id: 'delhi-ncr',
    region: 'Delhi NCR',
    code: 'DL',
    topSkill: 'Data Engineering & Kafka',
    industryDemand: 88,
    studentSupply: 46,
    demandSupplyGap: 42,
    yoyGrowth: 33,
    primarySector: 'E-commerce, Telecom & Enterprise SaaS',
    hubsCount: 12,
    activePostings: 51200,
    mapCoords: { x: 38, y: 32 },
    colorIntensity: '#dc2626'
  },
  {
    id: 'andhra-pradesh',
    region: 'Andhra Pradesh',
    code: 'AP',
    topSkill: 'Cloud Computing & Python',
    industryDemand: 76,
    studentSupply: 52,
    demandSupplyGap: 24,
    yoyGrowth: 22,
    primarySector: 'IT Services, MedTech, AgriTech',
    hubsCount: 8,
    activePostings: 22400,
    mapCoords: { x: 50, y: 70 },
    colorIntensity: '#f59e0b' // Amber
  },
  {
    id: 'kerala',
    region: 'Kerala',
    code: 'KL',
    topSkill: 'DevOps & Microservices',
    industryDemand: 74,
    studentSupply: 56,
    demandSupplyGap: 18,
    yoyGrowth: 20,
    primarySector: 'Healthcare IT, Digital Services',
    hubsCount: 6,
    activePostings: 18200,
    mapCoords: { x: 36, y: 88 },
    colorIntensity: '#10b981' // Emerald
  },
  {
    id: 'gujarat',
    region: 'Gujarat',
    code: 'GJ',
    topSkill: 'Industrial IoT & Automation',
    industryDemand: 75,
    studentSupply: 50,
    demandSupplyGap: 25,
    yoyGrowth: 25,
    primarySector: 'Chemicals, Renewables & Manufacturing Tech',
    hubsCount: 9,
    activePostings: 21900,
    mapCoords: { x: 22, y: 48 },
    colorIntensity: '#f59e0b'
  },
  {
    id: 'west-bengal',
    region: 'West Bengal',
    code: 'WB',
    topSkill: 'Data Analytics & SQL',
    industryDemand: 71,
    studentSupply: 54,
    demandSupplyGap: 17,
    yoyGrowth: 18,
    primarySector: 'Fintech Analytics, IT Support',
    hubsCount: 7,
    activePostings: 19400,
    mapCoords: { x: 70, y: 48 },
    colorIntensity: '#10b981'
  }
];

// --------------------------------------------------------------------------
// FILTER OPTIONS CONFIGURATION
// --------------------------------------------------------------------------

export const timePeriodOptions = [
  { label: 'Last 12 Months (2025 - 2026)', value: '12m' },
  { label: 'Last 6 Months (Current Year)', value: '6m' },
  { label: 'Last Quarter (Q3 2026)', value: '3m' },
  { label: 'Academic Year 2025-26', value: 'ay2526' }
];

export const industryOptions = [
  { label: 'All Industries', value: 'all' },
  { label: 'AI & SaaS', value: 'AI & SaaS' },
  { label: 'Cloud & DevOps', value: 'Cloud & DevOps' },
  { label: 'Data & Analytics', value: 'Data & Analytics' },
  { label: 'BFSI & FinTech', value: 'BFSI & FinTech' },
  { label: 'Automotive & EV', value: 'Automotive & EV' },
  { label: 'Manufacturing & IoT', value: 'Manufacturing' },
  { label: 'Healthcare Tech', value: 'Healthcare Tech' },
  { label: 'Enterprise IT', value: 'Enterprise IT' }
];

export const categoryOptions = [
  { label: 'All Categories', value: 'all' },
  { label: 'AI & Machine Learning', value: 'AI & Machine Learning' },
  { label: 'Cloud & Infrastructure', value: 'Cloud & Infrastructure' },
  { label: 'Data Science & Analytics', value: 'Data Science & Analytics' },
  { label: 'Cybersecurity', value: 'Cybersecurity' },
  { label: 'Software Engineering', value: 'Software Engineering' },
  { label: 'DevOps & SRE', value: 'DevOps & SRE' },
  { label: 'Core Engineering & IoT', value: 'Core Engineering & IoT' }
];

export const regionOptions = [
  { label: 'All Regions (Pan-India)', value: 'all' },
  { label: 'Telangana', value: 'Telangana' },
  { label: 'Karnataka', value: 'Karnataka' },
  { label: 'Maharashtra', value: 'Maharashtra' },
  { label: 'Tamil Nadu', value: 'Tamil Nadu' },
  { label: 'Delhi NCR', value: 'Delhi NCR' },
  { label: 'Andhra Pradesh', value: 'Andhra Pradesh' },
  { label: 'Kerala', value: 'Kerala' },
  { label: 'Gujarat', value: 'Gujarat' },
  { label: 'West Bengal', value: 'West Bengal' }
];

export const institutionTypeOptions = [
  { label: 'All Institutions', value: 'all' },
  { label: 'Autonomous Universities', value: 'autonomous' },
  { label: 'State Tech Universities', value: 'stateTech' },
  { label: 'Tier-1 Engineering Colleges', value: 'tier1' },
  { label: 'Tier-2 & Tier-3 Colleges', value: 'tier2_3' },
  { label: 'Polytechnics & ITIs', value: 'polytechnic' }
];

// --------------------------------------------------------------------------
// HELPER FUNCTIONS: Filter, Calculate Metrics & Dynamic Insights
// --------------------------------------------------------------------------

export function filterSkillDemandData(
  data: SkillDemandIntelligenceItem[],
  filters: FilterOptions
): SkillDemandIntelligenceItem[] {
  let filtered = [...data];

  // Search filter
  if (filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(
      item =>
        item.skill.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.industries.some(ind => ind.toLowerCase().includes(q))
    );
  }

  // Industry filter
  if (filters.industry !== 'all') {
    filtered = filtered.filter(item =>
      item.industries.includes(filters.industry)
    );
  }

  // Skill category filter
  if (filters.skillCategory !== 'all') {
    filtered = filtered.filter(item => item.category === filters.skillCategory);
  }

  // Region filter
  if (filters.region !== 'all') {
    filtered = filtered.filter(item => item.regions.includes(filters.region));
  }

  // Sort
  if (filters.sortBy === 'demand') {
    filtered.sort((a, b) => b.industryDemand - a.industryDemand);
  } else if (filters.sortBy === 'gap') {
    filtered.sort((a, b) => b.demandSupplyGap - a.demandSupplyGap);
  } else if (filters.sortBy === 'interest') {
    filtered.sort((a, b) => b.studentInterest - a.studentInterest);
  } else if (filters.sortBy === 'growth') {
    filtered.sort((a, b) => b.yoyGrowth - a.yoyGrowth);
  }

  return filtered;
}

export interface ComputedDashboardMetrics {
  highDemandCount: number;
  criticalGapsCount: number;
  avgStudentInterest: number;
  avgCurriculumCoverage: number;
  overallDemandSupplyGap: number;
  totalActivePostings: number;
  topShortageSkill: SkillDemandIntelligenceItem | null;
  topOverSupplySkill: SkillDemandIntelligenceItem | null;
}

export function computeDashboardMetrics(items: SkillDemandIntelligenceItem[]): ComputedDashboardMetrics {
  if (items.length === 0) {
    return {
      highDemandCount: 0,
      criticalGapsCount: 0,
      avgStudentInterest: 0,
      avgCurriculumCoverage: 0,
      overallDemandSupplyGap: 0,
      totalActivePostings: 0,
      topShortageSkill: null,
      topOverSupplySkill: null
    };
  }

  const highDemandCount = items.filter(s => s.industryDemand >= 75).length;
  const criticalGapsCount = items.filter(s => s.demandSupplyGap >= 35).length;

  const totalInterest = items.reduce((acc, curr) => acc + curr.studentInterest, 0);
  const avgStudentInterest = Math.round(totalInterest / items.length);

  const totalCurriculum = items.reduce((acc, curr) => acc + curr.curriculumCoverage, 0);
  const avgCurriculumCoverage = Math.round(totalCurriculum / items.length);

  const totalDemand = items.reduce((acc, curr) => acc + curr.industryDemand, 0);
  const avgDemand = totalDemand / items.length;

  const totalSupply = items.reduce((acc, curr) => acc + curr.studentSupply, 0);
  const avgSupply = totalSupply / items.length;

  const overallDemandSupplyGap = Math.max(0, Math.round(avgDemand - avgSupply));
  const totalActivePostings = items.reduce((acc, curr) => acc + curr.activeJobPostings, 0);

  // Sorted copies
  const sortedByGap = [...items].sort((a, b) => b.demandSupplyGap - a.demandSupplyGap);
  const topShortageSkill = sortedByGap[0] || null;
  const topOverSupplySkill = [...items].sort((a, b) => a.demandSupplyGap - b.demandSupplyGap)[0] || null;

  return {
    highDemandCount,
    criticalGapsCount,
    avgStudentInterest,
    avgCurriculumCoverage,
    overallDemandSupplyGap,
    totalActivePostings,
    topShortageSkill,
    topOverSupplySkill
  };
}

export function generateDynamicDemandInsight(
  metrics: ComputedDashboardMetrics,
  activeFilterRegion: string,
  activeFilterIndustry: string
): {
  title: string;
  body: string;
  demandMetric: number;
  supplyMetric: number;
  gapMetric: number;
  curriculumSignal: string;
  urgencyLevel: 'critical' | 'high' | 'moderate';
} {
  const top = metrics.topShortageSkill;
  if (!top) {
    return {
      title: 'Workforce Readiness Balanced',
      body: 'Current filters reflect a balanced equilibrium across student interest, curriculum, and hiring volume.',
      demandMetric: 65,
      supplyMetric: 65,
      gapMetric: 0,
      curriculumSignal: 'Continue routine quarterly tracking across departments.',
      urgencyLevel: 'moderate'
    };
  }

  const regionContext = activeFilterRegion !== 'all' ? ` in ${activeFilterRegion}` : '';
  const industryContext = activeFilterIndustry !== 'all' ? ` for ${activeFilterIndustry}` : '';

  const body = `${top.skill} exhibits the largest current workforce disparity${regionContext}${industryContext}. Industry demand stands at ${top.industryDemand}% while available collegiate supply is only ${top.studentSupply}%, creating an acute ${top.demandSupplyGap}-point workforce shortfall.`;

  const curriculumSignal =
    top.curriculumCoverage < 40
      ? `Critical Curriculum Warning: Current curriculum coverage is severely lagging at ${top.curriculumCoverage}%. Immediate intervention required to inject practical coursework and sandbox labs before next hiring cycle.`
      : `Curriculum Watch: Current coverage (${top.curriculumCoverage}%) is progressing but student project readiness lags behind industry standards.`;

  return {
    title: `Key Workforce Intelligence Insight: ${top.skill}`,
    body,
    demandMetric: top.industryDemand,
    supplyMetric: top.studentSupply,
    gapMetric: top.demandSupplyGap,
    curriculumSignal,
    urgencyLevel: top.demandSupplyGap > 45 ? 'critical' : 'high'
  };
}
