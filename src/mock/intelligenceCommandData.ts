// ========================================================================
// LABOUR MARKET INTELLIGENCE COMMAND CENTER — HIERARCHICAL DEMO DATASET
// State → District → Industries → Jobs → Skills → Student Supply → Gap → Curriculum
// ========================================================================

export interface MapClusterMarker {
  id: string;
  name: string;
  category: 'industry' | 'job_demand' | 'institute' | 'skill_gap' | 'student_supply';
  coordinates: [number, number];
  industryType: string;
  activeJobDemand: number;
  studentSupply: number;
  topSkills: string[];
  skillGaps: {
    skill: string;
    gapLevel: 'High' | 'Medium' | 'Low';
    gapPoints: number;
  }[];
  curriculumCoverage: {
    skill: string;
    coverage: 'Good' | 'Partial' | 'Limited' | 'Low' | 'None';
  }[];
  description: string;
}

export interface SkillComparisonItem {
  skill: string;
  industryDemandPct: number;
  studentProficiencyPct: number;
  gapPoints: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  category: string;
  curriculumCoverage: 'Good' | 'Partial' | 'Low' | 'None';
}

export interface JobRoleDrilldown {
  id: string;
  title: string;
  industry: string;
  activeOpenings: number;
  growthYoY: string;
  salaryBenchmark: string;
  requiredSkills: {
    name: string;
    industryDemand: number; // %
    studentAvailability: number; // %
    gapPoints: number;
    gapStatus: 'Critical Gap' | 'High Gap' | 'Moderate Gap' | 'Aligned';
    curriculumCoverage: 'Good' | 'Partial' | 'Low';
  }[];
  primaryGapSkill: string;
  primaryRecommendation: string;
}

export interface CurriculumRecommendationItem {
  id: string;
  title: string;
  targetSkill: string;
  industryRequirement: number;
  studentProficiency: number;
  gapPoints: number;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  currentCurriculumStatus: 'Low' | 'Partial' | 'Outdated';
  suggestedAction: string;
  justification: string;
  evidenceSource: string;
  evidenceDetails: string;
  affectedDegreePrograms: string[];
  status: 'Draft Recommended' | 'Sent to Academic Board' | 'Approved';
}

export interface DistrictIntelligence {
  id: string;
  name: string;
  state: string;
  coordinates: [number, number];
  demandLabel: string;
  gapLabel: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  jobDemand: number;
  topSkill: string;
  netGapPoints: number;
  activeIndustriesCount: number;
  institutesCount: number;
  studentsAnalyzedCount: number;
  clusters: MapClusterMarker[];
  topSkillsComparison: SkillComparisonItem[];
  jobsList: JobRoleDrilldown[];
  curriculumRecommendations: CurriculumRecommendationItem[];
}

export interface StateIntelligence {
  id: string;
  name: string;
  centerCoordinates: [number, number];
  zoomLevel: number;
  totalJobDemand: number;
  topSkill: string;
  avgGapPoints: number;
  districts: DistrictIntelligence[];
}

// ------------------------------------------------------------------------
// 1. TELANGANA STATE DATA (PRIMARY DEMO FOCUS)
// ------------------------------------------------------------------------

export const telanganaHyderabadClusters: MapClusterMarker[] = [
  {
    id: 'HYD-HITEC',
    name: 'HITEC City — Cyber Gateway Tech Corridor',
    category: 'industry',
    coordinates: [17.4474, 78.3762],
    industryType: 'Information Technology & Cloud Services',
    activeJobDemand: 2480,
    studentSupply: 1720,
    topSkills: ['Python', 'SQL', 'React', 'Cloud Computing (AWS/Azure)', 'Data Analytics'],
    skillGaps: [
      { skill: 'Cloud Computing', gapLevel: 'High', gapPoints: 33 },
      { skill: 'Data Engineering', gapLevel: 'High', gapPoints: 22 },
      { skill: 'React', gapLevel: 'Low', gapPoints: 6 }
    ],
    curriculumCoverage: [
      { skill: 'Cloud Computing', coverage: 'Limited' },
      { skill: 'Data Engineering', coverage: 'Partial' },
      { skill: 'React', coverage: 'Good' }
    ],
    description: 'Premier regional software export and hyperscale IT cluster housing 400+ enterprise technology development centers.'
  },
  {
    id: 'HYD-FIN',
    name: 'Financial District — Nanakramguda Hub',
    category: 'job_demand',
    coordinates: [17.4156, 78.3427],
    industryType: 'FinTech & Enterprise Analytics',
    activeJobDemand: 1940,
    studentSupply: 1280,
    topSkills: ['Python', 'Data Analytics', 'Cybersecurity', 'Power BI', 'SQL'],
    skillGaps: [
      { skill: 'Power BI & BI Architecture', gapLevel: 'High', gapPoints: 27 },
      { skill: 'Cybersecurity Compliance', gapLevel: 'High', gapPoints: 25 },
      { skill: 'Python', gapLevel: 'Low', gapPoints: 6 }
    ],
    curriculumCoverage: [
      { skill: 'Power BI', coverage: 'Partial' },
      { skill: 'Cybersecurity', coverage: 'Limited' },
      { skill: 'Python', coverage: 'Good' }
    ],
    description: 'Specialized enterprise zone for multinational banks, financial risk algorithms, and high-frequency analytical teams.'
  },
  {
    id: 'HYD-GACHI',
    name: 'Gachibowli — Software & AI Labs Corridor',
    category: 'skill_gap',
    coordinates: [17.4401, 78.3489],
    industryType: 'Artificial Intelligence & Product Engineering',
    activeJobDemand: 1650,
    studentSupply: 980,
    topSkills: ['Applied Generative AI', 'PySpark', 'Docker', 'FastAPI', 'MLOps'],
    skillGaps: [
      { skill: 'MLOps & Model Deployment', gapLevel: 'High', gapPoints: 38 },
      { skill: 'PySpark & Distributed Compute', gapLevel: 'High', gapPoints: 35 },
      { skill: 'FastAPI', gapLevel: 'Medium', gapPoints: 16 }
    ],
    curriculumCoverage: [
      { skill: 'MLOps', coverage: 'None' },
      { skill: 'PySpark', coverage: 'Limited' },
      { skill: 'FastAPI', coverage: 'Partial' }
    ],
    description: 'Concentrated AI and advanced product engineering cluster with significant collegiate talent deficit in MLOps.'
  },
  {
    id: 'HYD-GENOME',
    name: 'Genome Valley — Life Sciences Innovation Hub',
    category: 'industry',
    coordinates: [17.6521, 78.6012],
    industryType: 'Bioinformatics & Pharmaceutical R&D',
    activeJobDemand: 890,
    studentSupply: 620,
    topSkills: ['Biostatistics', 'Python for Genomics', 'GMP Compliance', 'Analytical Chemistry'],
    skillGaps: [
      { skill: 'Python for Genomics', gapLevel: 'High', gapPoints: 32 },
      { skill: 'Next-Gen Sequencing Data', gapLevel: 'High', gapPoints: 34 }
    ],
    curriculumCoverage: [
      { skill: 'Python for Genomics', coverage: 'Limited' },
      { skill: 'Biostatistics', coverage: 'Good' }
    ],
    description: 'Leading biotechnology and vaccine cluster requiring modernization of bioinformatics compute curricula.'
  },
  {
    id: 'HYD-AERO',
    name: 'Adibatla — Aerospace & Defense Electronics Park',
    category: 'industry',
    coordinates: [17.2023, 78.5833],
    industryType: 'Aerospace & Embedded Hardware Systems',
    activeJobDemand: 740,
    studentSupply: 480,
    topSkills: ['Embedded C', 'MATLAB/Simulink', 'VLSI Verification', 'Avionics Protocols'],
    skillGaps: [
      { skill: 'VLSI Tapeout Flow', gapLevel: 'High', gapPoints: 47 },
      { skill: 'Embedded Firmware Safety', gapLevel: 'Medium', gapPoints: 21 }
    ],
    curriculumCoverage: [
      { skill: 'VLSI Tapeout Flow', coverage: 'Limited' },
      { skill: 'Embedded C', coverage: 'Partial' }
    ],
    description: 'Precision manufacturing and aerospace electronics testing zone facing a shortage of RTL verification talent.'
  },
  {
    id: 'HYD-INST-01',
    name: 'Apex Technical Institute & Engineering College',
    category: 'institute',
    coordinates: [17.4350, 78.3820],
    industryType: 'Higher Education Node',
    activeJobDemand: 0,
    studentSupply: 4820,
    topSkills: ['Python 78%', 'SQL 66%', 'React 58%', 'Cloud 44%'],
    skillGaps: [
      { skill: 'Cloud Computing', gapLevel: 'High', gapPoints: 31 }
    ],
    curriculumCoverage: [
      { skill: 'Cloud Computing', coverage: 'Partial' }
    ],
    description: 'Accredited technical institute with 4,820 enrolled undergraduate engineers; active pilot for SkillBridge closed-loop sync.'
  },
  {
    id: 'HYD-INST-02',
    name: 'IIIT Hyderabad — Applied Advanced Research Campus',
    category: 'institute',
    coordinates: [17.4455, 78.3498],
    industryType: 'Premier Research & AI Center',
    activeJobDemand: 0,
    studentSupply: 2100,
    topSkills: ['Machine Learning 88%', 'NLP 82%', 'Algorithms 94%'],
    skillGaps: [],
    curriculumCoverage: [
      { skill: 'Applied AI', coverage: 'Good' }
    ],
    description: 'Premier national computer science and computational linguistic research university.'
  },
  {
    id: 'HYD-INST-03',
    name: 'Osmania University University College of Engineering',
    category: 'institute',
    coordinates: [17.4190, 78.5284],
    industryType: 'Autonomous State Technical University',
    activeJobDemand: 0,
    studentSupply: 3400,
    topSkills: ['Data Structures 74%', 'C++ 79%', 'Web Tech 62%'],
    skillGaps: [
      { skill: 'Cloud Architecture', gapLevel: 'High', gapPoints: 29 }
    ],
    curriculumCoverage: [
      { skill: 'Cloud Architecture', coverage: 'Limited' }
    ],
    description: 'Historic public engineering college providing baseline technical talent for southern regional industry.'
  }
];

export const hyderabadSkillComparison: SkillComparisonItem[] = [
  {
    skill: 'Python',
    industryDemandPct: 82,
    studentProficiencyPct: 76,
    gapPoints: 6,
    priority: 'LOW',
    category: 'Programming',
    curriculumCoverage: 'Good'
  },
  {
    skill: 'SQL',
    industryDemandPct: 78,
    studentProficiencyPct: 64,
    gapPoints: 14,
    priority: 'MEDIUM',
    category: 'Data',
    curriculumCoverage: 'Good'
  },
  {
    skill: 'Cloud Computing (AWS/Azure)',
    industryDemandPct: 75,
    studentProficiencyPct: 42,
    gapPoints: 33,
    priority: 'HIGH',
    category: 'Cloud',
    curriculumCoverage: 'Low'
  },
  {
    skill: 'Data Engineering (ETL/Pipelines)',
    industryDemandPct: 70,
    studentProficiencyPct: 48,
    gapPoints: 22,
    priority: 'HIGH',
    category: 'Data',
    curriculumCoverage: 'Partial'
  },
  {
    skill: 'Power BI & Visual Analytics',
    industryDemandPct: 65,
    studentProficiencyPct: 51,
    gapPoints: 14,
    priority: 'MEDIUM',
    category: 'Data',
    curriculumCoverage: 'Partial'
  },
  {
    skill: 'React & Frontend Architecture',
    industryDemandPct: 61,
    studentProficiencyPct: 55,
    gapPoints: 6,
    priority: 'LOW',
    category: 'Programming',
    curriculumCoverage: 'Good'
  },
  {
    skill: 'Docker & Microservices',
    industryDemandPct: 68,
    studentProficiencyPct: 36,
    gapPoints: 32,
    priority: 'CRITICAL',
    category: 'Cloud',
    curriculumCoverage: 'Low'
  },
  {
    skill: 'Cybersecurity Fundamentals',
    industryDemandPct: 58,
    studentProficiencyPct: 34,
    gapPoints: 24,
    priority: 'HIGH',
    category: 'Cloud',
    curriculumCoverage: 'Low'
  }
];

export const hyderabadJobsList: JobRoleDrilldown[] = [
  {
    id: 'JOB-IT-01',
    title: 'Data Analyst',
    industry: 'Information Technology',
    activeOpenings: 1240,
    growthYoY: '+21.4%',
    salaryBenchmark: '₹5.5L - ₹9.2L',
    requiredSkills: [
      { name: 'SQL', industryDemand: 88, studentAvailability: 64, gapPoints: 24, gapStatus: 'Moderate Gap', curriculumCoverage: 'Good' },
      { name: 'Python', industryDemand: 82, studentAvailability: 76, gapPoints: 6, gapStatus: 'Aligned', curriculumCoverage: 'Good' },
      { name: 'Excel Advanced', industryDemand: 85, studentAvailability: 82, gapPoints: 3, gapStatus: 'Aligned', curriculumCoverage: 'Good' },
      { name: 'Power BI', industryDemand: 78, studentAvailability: 51, gapPoints: 27, gapStatus: 'High Gap', curriculumCoverage: 'Partial' },
      { name: 'Applied Statistics', industryDemand: 72, studentAvailability: 58, gapPoints: 14, gapStatus: 'Moderate Gap', curriculumCoverage: 'Good' }
    ],
    primaryGapSkill: 'Power BI',
    primaryRecommendation: 'Increase Power BI project-based learning and capstone dashboard reporting in Semester 6 data electives.'
  },
  {
    id: 'JOB-IT-02',
    title: 'Cloud Solutions Engineer',
    industry: 'Information Technology',
    activeOpenings: 1840,
    growthYoY: '+34.2%',
    salaryBenchmark: '₹7.2L - ₹14.5L',
    requiredSkills: [
      { name: 'Cloud Computing (AWS/Azure)', industryDemand: 85, studentAvailability: 42, gapPoints: 43, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'Docker & Containerization', industryDemand: 76, studentAvailability: 38, gapPoints: 38, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'Linux System Admin', industryDemand: 80, studentAvailability: 65, gapPoints: 15, gapStatus: 'Moderate Gap', curriculumCoverage: 'Partial' },
      { name: 'Python Automation', industryDemand: 78, studentAvailability: 74, gapPoints: 4, gapStatus: 'Aligned', curriculumCoverage: 'Good' }
    ],
    primaryGapSkill: 'Cloud Computing (AWS/Azure)',
    primaryRecommendation: 'Incorporate 40-hour hands-on AWS/Azure infrastructure deployment lab modules into syllabus.'
  },
  {
    id: 'JOB-IT-03',
    title: 'Data Engineer (Big Data & ETL)',
    industry: 'Information Technology',
    activeOpenings: 980,
    growthYoY: '+28.0%',
    salaryBenchmark: '₹8.0L - ₹15.0L',
    requiredSkills: [
      { name: 'Data Engineering (ETL)', industryDemand: 80, studentAvailability: 48, gapPoints: 32, gapStatus: 'High Gap', curriculumCoverage: 'Partial' },
      { name: 'PySpark & Distributed Compute', industryDemand: 75, studentAvailability: 35, gapPoints: 40, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'SQL Query Optimization', industryDemand: 82, studentAvailability: 64, gapPoints: 18, gapStatus: 'Moderate Gap', curriculumCoverage: 'Good' }
    ],
    primaryGapSkill: 'PySpark & Distributed Compute',
    primaryRecommendation: 'Introduce distributed data engineering elective covering Apache Spark and cloud data lakes.'
  },
  {
    id: 'JOB-SEMI-01',
    title: 'VLSI RTL Design & Verification Engineer',
    industry: 'Semiconductors',
    activeOpenings: 680,
    growthYoY: '+46.5%',
    salaryBenchmark: '₹9.0L - ₹18.0L',
    requiredSkills: [
      { name: 'Verilog & SystemVerilog', industryDemand: 86, studentAvailability: 38, gapPoints: 48, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'UVM Testbench Methodology', industryDemand: 78, studentAvailability: 24, gapPoints: 54, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'EDA Tool Flows', industryDemand: 82, studentAvailability: 31, gapPoints: 51, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' }
    ],
    primaryGapSkill: 'UVM Testbench Methodology',
    primaryRecommendation: 'Partner with regional semiconductor finishing schools for EDA tool license provisioning.'
  },
  {
    id: 'JOB-AUTO-01',
    title: 'EV Powertrain & BMS Engineer',
    industry: 'Electric Vehicles',
    activeOpenings: 540,
    growthYoY: '+38.9%',
    salaryBenchmark: '₹6.5L - ₹12.0L',
    requiredSkills: [
      { name: 'Battery Management Systems (BMS)', industryDemand: 84, studentAvailability: 36, gapPoints: 48, gapStatus: 'Critical Gap', curriculumCoverage: 'Low' },
      { name: 'CAN / LIN Bus Protocols', industryDemand: 78, studentAvailability: 44, gapPoints: 34, gapStatus: 'High Gap', curriculumCoverage: 'Partial' },
      { name: 'Thermal Simulation in MATLAB', industryDemand: 72, studentAvailability: 52, gapPoints: 20, gapStatus: 'Moderate Gap', curriculumCoverage: 'Partial' }
    ],
    primaryGapSkill: 'Battery Management Systems (BMS)',
    primaryRecommendation: 'Standardize high-voltage laboratory safety and battery cell telemetry experiments.'
  }
];

export const hyderabadCurriculumRecommendations: CurriculumRecommendationItem[] = [
  {
    id: 'REC-HYD-01',
    title: 'Increase Cloud Computing Practical Training (AWS / Azure)',
    targetSkill: 'Cloud Computing',
    industryRequirement: 75,
    studentProficiency: 42,
    gapPoints: 33,
    priority: 'HIGH',
    currentCurriculumStatus: 'Low',
    suggestedAction: 'Integrate 40 hours of hands-on cloud provisioning, containerized deployment, and VPC networking labs into 3rd-year CS & IT programs.',
    justification: 'Industry demand in Hyderabad IT corridor is 75%, but evaluated student proficiency is only 42%, creating an acute 33-point placement bottleneck.',
    evidenceSource: 'Tech Workforce Telemetry Q4 2025 (1,840 verified postings in HITEC City & Gachibowli)',
    evidenceDetails: '68% of enterprise job descriptions now mandate live cloud deployment proof over theoretical architecture concepts.',
    affectedDegreePrograms: ['B.Tech Computer Science', 'B.Tech Information Technology', 'MCA'],
    status: 'Draft Recommended'
  },
  {
    id: 'REC-HYD-02',
    title: 'Introduce Data Engineering & Distributed ETL Fundamentals',
    targetSkill: 'Data Engineering',
    industryRequirement: 70,
    studentProficiency: 48,
    gapPoints: 22,
    priority: 'HIGH',
    currentCurriculumStatus: 'Partial',
    suggestedAction: 'Expand elective course catalog to introduce PySpark, modern ETL batch pipelines, and data warehouse schema design in Semester 6.',
    justification: 'Regional demand has surged +28% YoY across financial tech hubs while current curricula focus solely on traditional single-node SQL.',
    evidenceSource: 'Regional Employer Council Audit (Sample: 48 Analytics Engineering Firms in Telangana)',
    evidenceDetails: 'Recruiters report 58% rejection rate during SQL optimization and distributed big data pipeline screening rounds.',
    affectedDegreePrograms: ['B.Tech Data Science & Analytics', 'B.Tech AI & Data Engineering'],
    status: 'Draft Recommended'
  },
  {
    id: 'REC-HYD-03',
    title: 'Increase Power BI & Business Intelligence Project-Based Learning',
    targetSkill: 'Power BI',
    industryRequirement: 65,
    studentProficiency: 51,
    gapPoints: 14,
    priority: 'MEDIUM',
    currentCurriculumStatus: 'Partial',
    suggestedAction: 'Add mandatory end-to-end dashboard capstone project using real-world public enterprise datasets with DAX query design.',
    justification: 'High requirement across entry-level Data Analyst requisitions (1,240 openings) where conceptual knowledge lags practical interactive visualization.',
    evidenceSource: 'Post-Hire Recruiter Performance Benchmark (Hyderabad Financial District Firms)',
    evidenceDetails: 'Employers highlight 4-week retraining delay required to onboard fresh graduates on production reporting dashboards.',
    affectedDegreePrograms: ['B.Tech Data Science', 'B.Sc Data Analytics', 'BBA Business Analytics'],
    status: 'Draft Recommended'
  },
  {
    id: 'REC-HYD-04',
    title: 'VLSI SystemVerilog & UVM Testbench Certification Fast-Track',
    targetSkill: 'VLSI Verification',
    industryRequirement: 82,
    studentProficiency: 31,
    gapPoints: 51,
    priority: 'CRITICAL',
    currentCurriculumStatus: 'Low',
    suggestedAction: 'Establish shared regional EDA tool lab clusters for semiconductor verification and RTL logic synthesis.',
    justification: 'Critical national talent deficit in hardware tapeout verification with 680 urgent requisitions in southern cluster.',
    evidenceSource: 'Semiconductor Industry Consortium Manpower Projection Study 2026',
    evidenceDetails: 'Deficit of qualified tapeout engineers threatens operational scaling of new commercial chip fabrication initiatives.',
    affectedDegreePrograms: ['B.Tech Electronics & Communication', 'M.Tech VLSI Design'],
    status: 'Draft Recommended'
  }
];

// ------------------------------------------------------------------------
// 2. COMPLETE STATES DATA (TELANGANA, KARNATAKA, MAHARASHTRA, TAMIL NADU, AP)
// ------------------------------------------------------------------------

export const stateDistrictsData: Record<string, DistrictIntelligence[]> = {
  Telangana: [
    {
      id: 'DIS-TG-01',
      name: 'Hyderabad',
      state: 'Telangana',
      coordinates: [17.3850, 78.4867],
      demandLabel: 'High Demand',
      gapLabel: 'Moderate Gap',
      severity: 'high',
      jobDemand: 12480,
      topSkill: 'Python (82%)',
      netGapPoints: 26,
      activeIndustriesCount: 428,
      institutesCount: 34,
      studentsAnalyzedCount: 18240,
      clusters: telanganaHyderabadClusters,
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-TG-02',
      name: 'Rangareddy',
      state: 'Telangana',
      coordinates: [17.3297, 78.5822],
      demandLabel: 'Very High Demand',
      gapLabel: 'High Gap',
      severity: 'critical',
      jobDemand: 14200,
      topSkill: 'Cloud Computing (79%)',
      netGapPoints: 31,
      activeIndustriesCount: 380,
      institutesCount: 28,
      studentsAnalyzedCount: 16500,
      clusters: [
        {
          id: 'RR-AERO',
          name: 'Hardware Park & Aerocity Corridor',
          category: 'industry',
          coordinates: [17.2280, 78.5140],
          industryType: 'Electronics & Aerospace Hardware',
          activeJobDemand: 3100,
          studentSupply: 1450,
          topSkills: ['Embedded Systems', 'PCB Design', 'VLSI', 'IoT'],
          skillGaps: [{ skill: 'Embedded Firmware', gapLevel: 'High', gapPoints: 29 }],
          curriculumCoverage: [{ skill: 'Embedded Firmware', coverage: 'Partial' }],
          description: 'Large manufacturing and export park on the southern outer ring corridor.'
        },
        {
          id: 'RR-SHAMSH',
          name: 'Shamshabad Global In-House Center Hub',
          category: 'job_demand',
          coordinates: [17.2403, 78.4294],
          industryType: 'Logistics Tech & Cloud Operations',
          activeJobDemand: 2450,
          studentSupply: 1100,
          topSkills: ['Cloud Infrastructure', 'Network Security', 'Supply Chain Analytics'],
          skillGaps: [{ skill: 'Cloud Infrastructure', gapLevel: 'High', gapPoints: 34 }],
          curriculumCoverage: [{ skill: 'Cloud Infrastructure', coverage: 'Low' }],
          description: 'Rapidly expanding IT infrastructure and operations parks near airport corridor.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-TG-03',
      name: 'Warangal',
      state: 'Telangana',
      coordinates: [17.9689, 79.5941],
      demandLabel: 'Medium Demand',
      gapLabel: 'High Gap',
      severity: 'high',
      jobDemand: 3120,
      topSkill: 'Full Stack Java (74%)',
      netGapPoints: 24,
      activeIndustriesCount: 94,
      institutesCount: 16,
      studentsAnalyzedCount: 9400,
      clusters: [
        {
          id: 'WGL-IT',
          name: 'Kakatiya Mega IT Tower & Incubation Center',
          category: 'industry',
          coordinates: [17.9780, 79.6020],
          industryType: 'Software Development & BPO',
          activeJobDemand: 980,
          studentSupply: 1650,
          topSkills: ['Java Spring Boot', 'SQL', 'Web Development'],
          skillGaps: [{ skill: 'Java Spring Boot', gapLevel: 'High', gapPoints: 26 }],
          curriculumCoverage: [{ skill: 'Java', coverage: 'Good' }],
          description: 'Tier-2 IT development center expanding under regional decentralization initiatives.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-TG-04',
      name: 'Karimnagar',
      state: 'Telangana',
      coordinates: [18.4386, 79.1288],
      demandLabel: 'Medium Demand',
      gapLabel: 'Moderate Gap',
      severity: 'moderate',
      jobDemand: 1840,
      topSkill: 'Web Development (68%)',
      netGapPoints: 18,
      activeIndustriesCount: 62,
      institutesCount: 11,
      studentsAnalyzedCount: 6200,
      clusters: [
        {
          id: 'KRM-TOWER',
          name: 'Karimnagar Regional Technology Tower',
          category: 'industry',
          coordinates: [18.4420, 79.1350],
          industryType: 'Digital Tech & Smart Agri Solutions',
          activeJobDemand: 520,
          studentSupply: 890,
          topSkills: ['Python', 'IoT Sensor Tech', 'Frontend Web'],
          skillGaps: [{ skill: 'IoT Sensor Tech', gapLevel: 'Medium', gapPoints: 19 }],
          curriculumCoverage: [{ skill: 'IoT', coverage: 'Partial' }],
          description: 'Regional innovation cluster focusing on smart grid, agriculture tech, and software testing.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-TG-05',
      name: 'Medchal-Malkajgiri',
      state: 'Telangana',
      coordinates: [17.6294, 78.4812],
      demandLabel: 'High Demand',
      gapLabel: 'Moderate Gap',
      severity: 'moderate',
      jobDemand: 4650,
      topSkill: 'Automation & PLC (72%)',
      netGapPoints: 21,
      activeIndustriesCount: 145,
      institutesCount: 19,
      studentsAnalyzedCount: 11200,
      clusters: [
        {
          id: 'MED-IND',
          name: 'Medchal Industrial & Automation Zone',
          category: 'industry',
          coordinates: [17.6320, 78.4900],
          industryType: 'Industrial Automation & Machinery',
          activeJobDemand: 1420,
          studentSupply: 1900,
          topSkills: ['PLC Programming', 'SCADA', 'Mechanical CAD'],
          skillGaps: [{ skill: 'PLC Programming', gapLevel: 'Medium', gapPoints: 21 }],
          curriculumCoverage: [{ skill: 'PLC', coverage: 'Partial' }],
          description: 'Heavy machinery and automated packaging hub north of Hyderabad.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    }
  ],

  Karnataka: [
    {
      id: 'DIS-KA-01',
      name: 'Bengaluru Urban',
      state: 'Karnataka',
      coordinates: [12.9716, 77.5946],
      demandLabel: 'Very High Demand',
      gapLabel: 'Moderate Gap',
      severity: 'high',
      jobDemand: 28400,
      topSkill: 'Cloud & AI/ML (88%)',
      netGapPoints: 22,
      activeIndustriesCount: 890,
      institutesCount: 78,
      studentsAnalyzedCount: 34500,
      clusters: [
        {
          id: 'BLR-ECITY',
          name: 'Electronic City — IT & Hardware Cluster',
          category: 'industry',
          coordinates: [12.8452, 77.6602],
          industryType: 'Semiconductors & Software',
          activeJobDemand: 5200,
          studentSupply: 4100,
          topSkills: ['VLSI', 'Embedded C', 'Cloud', 'Python'],
          skillGaps: [{ skill: 'VLSI', gapLevel: 'High', gapPoints: 36 }],
          curriculumCoverage: [{ skill: 'VLSI', coverage: 'Partial' }],
          description: 'Global electronics and tech park housing major R&D hubs.'
        },
        {
          id: 'BLR-WHITE',
          name: 'Whitefield — Software Export SEZ',
          category: 'job_demand',
          coordinates: [12.9698, 77.7500],
          industryType: 'Enterprise Cloud & Analytics',
          activeJobDemand: 4800,
          studentSupply: 3900,
          topSkills: ['Cloud Architecture', 'React', 'DevOps', 'Data Science'],
          skillGaps: [{ skill: 'Cloud Architecture', gapLevel: 'High', gapPoints: 28 }],
          curriculumCoverage: [{ skill: 'Cloud', coverage: 'Partial' }],
          description: 'Major software export zone with heavy demand for full-stack and cloud architects.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-KA-02',
      name: 'Mysuru',
      state: 'Karnataka',
      coordinates: [12.2958, 76.6394],
      demandLabel: 'Medium Demand',
      gapLabel: 'Moderate Gap',
      severity: 'moderate',
      jobDemand: 2900,
      topSkill: 'Java & Web Dev (71%)',
      netGapPoints: 19,
      activeIndustriesCount: 85,
      institutesCount: 18,
      studentsAnalyzedCount: 8900,
      clusters: [],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    }
  ],

  Maharashtra: [
    {
      id: 'DIS-MH-01',
      name: 'Pune',
      state: 'Maharashtra',
      coordinates: [18.5204, 73.8567],
      demandLabel: 'Very High Demand',
      gapLabel: 'High Gap',
      severity: 'high',
      jobDemand: 16800,
      topSkill: 'Automotive Embedded & Cloud (84%)',
      netGapPoints: 25,
      activeIndustriesCount: 520,
      institutesCount: 48,
      studentsAnalyzedCount: 22400,
      clusters: [
        {
          id: 'PUN-HINJ',
          name: 'Hinjewadi Rajiv Gandhi Infotech Park',
          category: 'industry',
          coordinates: [18.5912, 73.7389],
          industryType: 'IT Services & Product Dev',
          activeJobDemand: 4100,
          studentSupply: 3200,
          topSkills: ['Java', 'Cloud', 'Cybersecurity', 'Python'],
          skillGaps: [{ skill: 'Cloud', gapLevel: 'High', gapPoints: 30 }],
          curriculumCoverage: [{ skill: 'Cloud', coverage: 'Partial' }],
          description: 'Premier Maharashtra software and engineering delivery cluster.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    },
    {
      id: 'DIS-MH-02',
      name: 'Mumbai Suburban',
      state: 'Maharashtra',
      coordinates: [19.0760, 72.8777],
      demandLabel: 'Very High Demand',
      gapLabel: 'Moderate Gap',
      severity: 'moderate',
      jobDemand: 21400,
      topSkill: 'FinTech & Analytics (86%)',
      netGapPoints: 20,
      activeIndustriesCount: 640,
      institutesCount: 54,
      studentsAnalyzedCount: 26000,
      clusters: [],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    }
  ],

  'Tamil Nadu': [
    {
      id: 'DIS-TN-01',
      name: 'Chennai',
      state: 'Tamil Nadu',
      coordinates: [13.0827, 80.2707],
      demandLabel: 'High Demand',
      gapLabel: 'Moderate Gap',
      severity: 'high',
      jobDemand: 15600,
      topSkill: 'EV Engineering & Software (81%)',
      netGapPoints: 23,
      activeIndustriesCount: 480,
      institutesCount: 44,
      studentsAnalyzedCount: 21800,
      clusters: [
        {
          id: 'CHE-OMR',
          name: 'Old Mahabalipuram Road (OMR) IT Expressway',
          category: 'industry',
          coordinates: [12.9165, 80.2285],
          industryType: 'SaaS & Enterprise Systems',
          activeJobDemand: 3800,
          studentSupply: 3100,
          topSkills: ['React', 'Node.js', 'Cloud', 'Data Analytics'],
          skillGaps: [{ skill: 'Cloud', gapLevel: 'High', gapPoints: 29 }],
          curriculumCoverage: [{ skill: 'Cloud', coverage: 'Partial' }],
          description: 'SaaS capital of India with high demand for product and full-stack talent.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    }
  ],

  'Andhra Pradesh': [
    {
      id: 'DIS-AP-01',
      name: 'Visakhapatnam',
      state: 'Andhra Pradesh',
      coordinates: [17.6868, 83.2185],
      demandLabel: 'High Demand',
      gapLabel: 'High Gap',
      severity: 'high',
      jobDemand: 4200,
      topSkill: 'Full Stack & Data (75%)',
      netGapPoints: 24,
      activeIndustriesCount: 115,
      institutesCount: 21,
      studentsAnalyzedCount: 11400,
      clusters: [
        {
          id: 'VIZ-RUSH',
          name: 'Rushikonda IT SEZ & Fintech Valley',
          category: 'industry',
          coordinates: [17.7820, 83.3850],
          industryType: 'FinTech, IT & Port Logistics',
          activeJobDemand: 1250,
          studentSupply: 1400,
          topSkills: ['Python', 'SQL', 'FinTech Analytics', 'React'],
          skillGaps: [{ skill: 'FinTech Analytics', gapLevel: 'High', gapPoints: 26 }],
          curriculumCoverage: [{ skill: 'FinTech', coverage: 'Low' }],
          description: 'Coastal technology SEZ focusing on maritime logistics and banking tech.'
        }
      ],
      topSkillsComparison: hyderabadSkillComparison,
      jobsList: hyderabadJobsList,
      curriculumRecommendations: hyderabadCurriculumRecommendations
    }
  ]
};

export const stateList: StateIntelligence[] = [
  {
    id: 'ST-TG',
    name: 'Telangana',
    centerCoordinates: [17.8749, 78.1008],
    zoomLevel: 7.2,
    totalJobDemand: 36290,
    topSkill: 'Python & Cloud',
    avgGapPoints: 26,
    districts: stateDistrictsData.Telangana
  },
  {
    id: 'ST-KA',
    name: 'Karnataka',
    centerCoordinates: [15.3173, 75.7139],
    zoomLevel: 6.8,
    totalJobDemand: 42500,
    topSkill: 'AI/ML & VLSI',
    avgGapPoints: 22,
    districts: stateDistrictsData.Karnataka
  },
  {
    id: 'ST-MH',
    name: 'Maharashtra',
    centerCoordinates: [19.7515, 75.7139],
    zoomLevel: 6.8,
    totalJobDemand: 48900,
    topSkill: 'FinTech & Auto Embedded',
    avgGapPoints: 23,
    districts: stateDistrictsData.Maharashtra
  },
  {
    id: 'ST-TN',
    name: 'Tamil Nadu',
    centerCoordinates: [11.1271, 78.6569],
    zoomLevel: 7.0,
    totalJobDemand: 29800,
    topSkill: 'EV Tech & SaaS',
    avgGapPoints: 23,
    districts: stateDistrictsData['Tamil Nadu']
  },
  {
    id: 'ST-AP',
    name: 'Andhra Pradesh',
    centerCoordinates: [15.9129, 79.7400],
    zoomLevel: 7.0,
    totalJobDemand: 16400,
    topSkill: 'Data Analytics & Web',
    avgGapPoints: 24,
    districts: stateDistrictsData['Andhra Pradesh']
  }
];

// Helper to look up active district data
export const getDistrictData = (stateName: string, districtName: string): DistrictIntelligence => {
  const districts = stateDistrictsData[stateName] || stateDistrictsData.Telangana;
  return districts.find(d => d.name === districtName) || districts[0];
};
