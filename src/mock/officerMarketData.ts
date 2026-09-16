// ========================================================================
// OFFICER PORTAL — MARKET OVERVIEW DATA ARCHITECTURE
// Geospatial + Business Intelligence Data Model
// Structured for seamless API consumption
// ========================================================================

export interface JobMarkerPin {
  id: string;
  jobTitle: string;
  companyCount: number;
  openPositions: number;
  industry: string;
  demandLevel: 'Low' | 'Medium' | 'High';
  district: string;
  state: string;
  coordinates: [number, number]; // [lat, lng]
  locationName: string;
  requiredSkills: string[];
  category: 'job_demand' | 'industry' | 'skill_gap' | 'institute' | 'emerging';
}

export interface DistrictKPI {
  district: string;
  state: string;
  openJobs: number;
  openJobsChange: string; // e.g. "+12.4%"
  openJobsTrend: 'up' | 'down';
  industriesCount: number;
  industriesChange: string; // e.g. "+8.2%"
  industriesTrend: 'up' | 'down';
  highDemandSkillsCount: number;
  highDemandSkillsChange: string; // e.g. "+14.5%"
  highDemandSkillsTrend: 'up' | 'down';
  skillGapPct: number;
  skillGapChange: string; // e.g. "-4.2%"
  skillGapTrend: 'down' | 'up';
}

export interface OpenJobRole {
  id: string;
  title: string;
  openings: number;
  industry: string;
  salaryRange: string;
  urgency: 'Immediate' | 'Standard' | 'High';
  requiredSkills: {
    skill: string;
    importancePct: number;
  }[];
}

export interface DemandVsLearningItem {
  skill: string;
  industryDemand: number; // percentage
  studentCoverage: number; // percentage
  gap: number;
}

export interface SkillGapItem {
  skill: string;
  gapPct: number;
  industryDemand: number;
  currentCoverage: number;
  severity: 'CRITICAL GAP' | 'HIGH GAP' | 'MODERATE GAP' | 'LOW GAP';
  priorityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  recommendedModule: string;
  suggestedHours: string;
  reason: string;
  degreePrograms: string[];
}

export interface EmergingSkillItem {
  id: string;
  name: string;
  iconType: 'cloud' | 'ai' | 'cyber';
  growthPct: number;
  industriesCount: number;
  topRoles: string[];
}

export interface IndustryDistributionItem {
  industry: string;
  sharePct: number;
  jobCount: number;
  growthPct: string;
  color: string;
}

export interface DistrictComparisonRow {
  district: string;
  jobs: number;
  skillGap: string;
  skillGapValue: number;
  industries: number;
  topSkill: string;
  state: string;
  coordinates: [number, number];
}

export interface SkillTrendMonthData {
  month: string;
  Python: number;
  SQL: number;
  Cloud: number;
  'AI/ML': number;
  Cybersecurity: number;
}

// ------------------------------------------------------------------------
// 1. FILTER OPTIONS
// ------------------------------------------------------------------------
export const filterOptions = {
  states: ['Telangana', 'Karnataka', 'Maharashtra', 'Tamil Nadu', 'Delhi NCR'],
  districtsByState: {
    Telangana: ['All Districts', 'Hyderabad', 'Medchal-Malkajgiri', 'Rangareddy', 'Warangal', 'Sangareddy'],
    Karnataka: ['All Districts', 'Bengaluru Urban', 'Mysuru', 'Hubballi-Dharwad'],
    Maharashtra: ['All Districts', 'Mumbai City', 'Pune', 'Nagpur'],
    'Tamil Nadu': ['All Districts', 'Chennai', 'Coimbatore', 'Madurai'],
    'Delhi NCR': ['All Districts', 'Gurugram', 'Noida', 'New Delhi']
  } as Record<string, string[]>,
  industries: ['All Industries', 'Information Technology', 'Manufacturing', 'Healthcare', 'FinTech', 'Automotive', 'Retail'],
  jobRoles: ['All Job Roles', 'Data Analyst', 'Software Developer', 'Cloud Engineer', 'ML Engineer', 'Cybersecurity Analyst'],
  periods: ['1 Year (Last 12 Months)', 'Last 6 Months', 'Q1 2026 Live Telemetry']
};

// ------------------------------------------------------------------------
// 2. REAL MAP PINS (Locations across India / Telangana)
// ------------------------------------------------------------------------
export const initialMapPins: JobMarkerPin[] = [
  // Hyderabad Hubs (High Demand ●●●)
  {
    id: 'pin-hyd-01',
    jobTitle: 'Data Analyst',
    companyCount: 48,
    openPositions: 320,
    industry: 'Information Technology',
    demandLevel: 'High',
    district: 'Hyderabad',
    state: 'Telangana',
    coordinates: [17.4399, 78.3789], // HITEC City
    locationName: 'HITEC City, Hyderabad',
    requiredSkills: ['Python', 'SQL', 'Power BI', 'Excel', 'Statistics'],
    category: 'job_demand'
  },
  {
    id: 'pin-hyd-02',
    jobTitle: 'Software Developer',
    companyCount: 65,
    openPositions: 420,
    industry: 'Information Technology',
    demandLevel: 'High',
    district: 'Hyderabad',
    state: 'Telangana',
    coordinates: [17.4239, 78.3428], // Gachibowli
    locationName: 'Gachibowli Tech Corridor',
    requiredSkills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker'],
    category: 'job_demand'
  },
  {
    id: 'pin-hyd-03',
    jobTitle: 'Cloud Engineer',
    companyCount: 32,
    openPositions: 240,
    industry: 'Information Technology',
    demandLevel: 'High',
    district: 'Hyderabad',
    state: 'Telangana',
    coordinates: [17.4123, 78.4354], // Madhapur / Banjara
    locationName: 'Madhapur Innovation Hub',
    requiredSkills: ['AWS', 'Terraform', 'Kubernetes', 'CI/CD', 'Linux'],
    category: 'job_demand'
  },
  {
    id: 'pin-hyd-04',
    jobTitle: 'Bio-Pharma Data Scientist',
    companyCount: 22,
    openPositions: 145,
    industry: 'Healthcare',
    demandLevel: 'Medium',
    district: 'Hyderabad',
    state: 'Telangana',
    coordinates: [17.6045, 78.5832], // Genome Valley
    locationName: 'Genome Valley Bio-Park',
    requiredSkills: ['Python', 'R', 'Bioinformatics', 'SQL', 'Data Modeling'],
    category: 'industry'
  },

  // Medchal-Malkajgiri Hubs (Medium Demand ●●)
  {
    id: 'pin-med-01',
    jobTitle: 'Manufacturing Automation Lead',
    companyCount: 28,
    openPositions: 195,
    industry: 'Manufacturing',
    demandLevel: 'Medium',
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    coordinates: [17.5815, 78.4891], // Jeedimetla & Medchal
    locationName: 'Jeedimetla Industrial Area',
    requiredSkills: ['PLC Programming', 'SCADA', 'Industrial IoT', 'AutoCAD', 'Python'],
    category: 'industry'
  },
  {
    id: 'pin-med-02',
    jobTitle: 'Cybersecurity Analyst',
    companyCount: 18,
    openPositions: 120,
    industry: 'Information Technology',
    demandLevel: 'Medium',
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    coordinates: [17.5421, 78.5723], // ECIL Tech Hub
    locationName: 'ECIL Electronics & Security Corridor',
    requiredSkills: ['Network Security', 'SIEM', 'Ethical Hacking', 'Linux', 'SOC'],
    category: 'skill_gap'
  },

  // Rangareddy Hubs (High / Medium Demand)
  {
    id: 'pin-ran-01',
    jobTitle: 'Aerospace & EV Systems Engineer',
    companyCount: 35,
    openPositions: 275,
    industry: 'Automotive',
    demandLevel: 'High',
    district: 'Rangareddy',
    state: 'Telangana',
    coordinates: [17.2403, 78.4294], // Shamshabad & Adibatla
    locationName: 'Adibatla Aerospace & SEZ',
    requiredSkills: ['Embedded C', 'MATLAB', 'Battery Mgmt Systems', 'CAN Bus', 'IoT'],
    category: 'industry'
  },
  {
    id: 'pin-ran-02',
    jobTitle: 'ML Engineer',
    companyCount: 26,
    openPositions: 180,
    industry: 'Information Technology',
    demandLevel: 'Medium',
    district: 'Rangareddy',
    state: 'Telangana',
    coordinates: [17.3616, 78.4747], // Financial District fringe
    locationName: 'Nanakramguda Financial District',
    requiredSkills: ['PyTorch', 'TensorFlow', 'Python', 'MLOps', 'Vector DBs'],
    category: 'job_demand'
  },

  // Warangal Hub (Low / Medium Demand ●)
  {
    id: 'pin-war-01',
    jobTitle: 'Full Stack Web Developer',
    companyCount: 14,
    openPositions: 85,
    industry: 'Information Technology',
    demandLevel: 'Low',
    district: 'Warangal',
    state: 'Telangana',
    coordinates: [17.9689, 79.5941], // Warangal IT Tower
    locationName: 'Warangal IT Incubation Tower',
    requiredSkills: ['JavaScript', 'React', 'HTML/CSS', 'Node.js', 'MySQL'],
    category: 'job_demand'
  },
  {
    id: 'pin-war-02',
    jobTitle: 'Regional Agro-Tech Analyst',
    companyCount: 12,
    openPositions: 65,
    industry: 'Manufacturing',
    demandLevel: 'Low',
    district: 'Warangal',
    state: 'Telangana',
    coordinates: [18.0012, 79.5784],
    locationName: 'Kakatiya Mega Textile Park',
    requiredSkills: ['Supply Chain', 'ERP', 'Quality Control', 'Data Analysis'],
    category: 'institute'
  },

  // Sangareddy Hubs (Medium Demand ●●)
  {
    id: 'pin-san-01',
    jobTitle: 'Chemical Process & QA Specialist',
    companyCount: 24,
    openPositions: 140,
    industry: 'Healthcare',
    demandLevel: 'Medium',
    district: 'Sangareddy',
    state: 'Telangana',
    coordinates: [17.5284, 78.1726], // Pashamylaram
    locationName: 'Pashamylaram Industrial Estate',
    requiredSkills: ['GMP', 'HPLC', 'Process Chemistry', 'Regulatory Compliance'],
    category: 'industry'
  },
  {
    id: 'pin-san-02',
    jobTitle: 'Robotics Integration Specialist',
    companyCount: 16,
    openPositions: 110,
    industry: 'Manufacturing',
    demandLevel: 'Medium',
    district: 'Sangareddy',
    state: 'Telangana',
    coordinates: [17.5912, 78.1189], // IIT Hyderabad Cluster
    locationName: 'Kandi IIT Technology Cluster',
    requiredSkills: ['ROS', 'Python', 'Computer Vision', 'Microcontrollers'],
    category: 'emerging'
  },

  // Other India Tech Hubs for India-level view
  {
    id: 'pin-blr-01',
    jobTitle: 'Senior Cloud Architect',
    companyCount: 120,
    openPositions: 850,
    industry: 'Information Technology',
    demandLevel: 'High',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    coordinates: [12.9716, 77.5946],
    locationName: 'Electronic City, Bengaluru',
    requiredSkills: ['AWS', 'GCP', 'Kubernetes', 'Microservices', 'Golang'],
    category: 'job_demand'
  },
  {
    id: 'pin-pune-01',
    jobTitle: 'Automotive Embedded Engineer',
    companyCount: 45,
    openPositions: 310,
    industry: 'Automotive',
    demandLevel: 'High',
    district: 'Pune',
    state: 'Maharashtra',
    coordinates: [18.5204, 73.8567],
    locationName: 'Hinjawadi Tech Park, Pune',
    requiredSkills: ['AUTOSAR', 'Embedded C', 'Simulink', 'CANoe'],
    category: 'job_demand'
  },
  {
    id: 'pin-chn-01',
    jobTitle: 'FinTech Systems Engineer',
    companyCount: 40,
    openPositions: 290,
    industry: 'FinTech',
    demandLevel: 'High',
    district: 'Chennai',
    state: 'Tamil Nadu',
    coordinates: [13.0827, 80.2707],
    locationName: 'OMR Tech Corridor, Chennai',
    requiredSkills: ['Java', 'Spring Boot', 'Kafka', 'SQL', 'Security Protocols'],
    category: 'job_demand'
  },
  {
    id: 'pin-del-01',
    jobTitle: 'AI Research Engineer',
    companyCount: 52,
    openPositions: 380,
    industry: 'Information Technology',
    demandLevel: 'High',
    district: 'Gurugram',
    state: 'Delhi NCR',
    coordinates: [28.4595, 77.0266],
    locationName: 'Cyber City, Gurugram',
    requiredSkills: ['Python', 'LLMs', 'PyTorch', 'Vector Search', 'FastAPI'],
    category: 'job_demand'
  }
];

// ------------------------------------------------------------------------
// 3. DISTRICT COORDINATES & BOUNDARIES CENTER MAP
// ------------------------------------------------------------------------
export const districtCoordinates: Record<string, { center: [number, number]; zoom: number }> = {
  'All Districts': { center: [17.8749, 78.9629], zoom: 8 },
  Hyderabad: { center: [17.4065, 78.4772], zoom: 12 },
  'Medchal-Malkajgiri': { center: [17.5615, 78.5391], zoom: 11 },
  Rangareddy: { center: [17.2603, 78.4394], zoom: 11 },
  Warangal: { center: [17.9784, 79.5941], zoom: 11 },
  Sangareddy: { center: [17.5684, 78.1426], zoom: 11 },
  'Bengaluru Urban': { center: [12.9716, 77.5946], zoom: 11 },
  Pune: { center: [18.5204, 73.8567], zoom: 11 },
  Chennai: { center: [13.0827, 80.2707], zoom: 11 },
  Gurugram: { center: [28.4595, 77.0266], zoom: 11 }
};

// ------------------------------------------------------------------------
// 4. DISTRICT KPI CARDS DATA (Section 10 in Spec)
// ------------------------------------------------------------------------
export const districtKPIData: Record<string, DistrictKPI> = {
  Hyderabad: {
    district: 'Hyderabad',
    state: 'Telangana',
    openJobs: 12450,
    openJobsChange: '+12.4%',
    openJobsTrend: 'up',
    industriesCount: 820,
    industriesChange: '+8.2%',
    industriesTrend: 'up',
    highDemandSkillsCount: 87,
    highDemandSkillsChange: '+14.5%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 31,
    skillGapChange: '-4.2%',
    skillGapTrend: 'down'
  },
  'Medchal-Malkajgiri': {
    district: 'Medchal-Malkajgiri',
    state: 'Telangana',
    openJobs: 4210,
    openJobsChange: '+9.1%',
    openJobsTrend: 'up',
    industriesCount: 260,
    industriesChange: '+5.4%',
    industriesTrend: 'up',
    highDemandSkillsCount: 54,
    highDemandSkillsChange: '+11.2%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 38,
    skillGapChange: '+2.1%',
    skillGapTrend: 'up'
  },
  Rangareddy: {
    district: 'Rangareddy',
    state: 'Telangana',
    openJobs: 5180,
    openJobsChange: '+15.8%',
    openJobsTrend: 'up',
    industriesCount: 310,
    industriesChange: '+10.3%',
    industriesTrend: 'up',
    highDemandSkillsCount: 63,
    highDemandSkillsChange: '+16.0%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 35,
    skillGapChange: '-1.8%',
    skillGapTrend: 'down'
  },
  Warangal: {
    district: 'Warangal',
    state: 'Telangana',
    openJobs: 1840,
    openJobsChange: '+6.5%',
    openJobsTrend: 'up',
    industriesCount: 120,
    industriesChange: '+3.8%',
    industriesTrend: 'up',
    highDemandSkillsCount: 32,
    highDemandSkillsChange: '+7.4%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 42,
    skillGapChange: '+4.5%',
    skillGapTrend: 'up'
  },
  Sangareddy: {
    district: 'Sangareddy',
    state: 'Telangana',
    openJobs: 2920,
    openJobsChange: '+11.0%',
    openJobsTrend: 'up',
    industriesCount: 195,
    industriesChange: '+7.2%',
    industriesTrend: 'up',
    highDemandSkillsCount: 41,
    highDemandSkillsChange: '+9.8%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 36,
    skillGapChange: '-2.4%',
    skillGapTrend: 'down'
  },
  'All Districts': {
    district: 'Telangana State',
    state: 'Telangana',
    openJobs: 26600,
    openJobsChange: '+11.9%',
    openJobsTrend: 'up',
    industriesCount: 1705,
    industriesChange: '+7.8%',
    industriesTrend: 'up',
    highDemandSkillsCount: 142,
    highDemandSkillsChange: '+13.1%',
    highDemandSkillsTrend: 'up',
    skillGapPct: 33,
    skillGapChange: '-3.1%',
    skillGapTrend: 'down'
  }
};

// ------------------------------------------------------------------------
// 5. OPEN JOB POSITIONS (Section 11 in Spec)
// ------------------------------------------------------------------------
export const openJobRolesData: OpenJobRole[] = [
  {
    id: 'role-dev',
    title: 'Software Developer',
    openings: 420,
    industry: 'Information Technology',
    salaryRange: '₹8 - 18 LPA',
    urgency: 'Immediate',
    requiredSkills: [
      { skill: 'React', importancePct: 94 },
      { skill: 'TypeScript', importancePct: 90 },
      { skill: 'Node.js', importancePct: 82 },
      { skill: 'PostgreSQL', importancePct: 74 },
      { skill: 'Docker', importancePct: 68 }
    ]
  },
  {
    id: 'role-analyst',
    title: 'Data Analyst',
    openings: 320,
    industry: 'Information Technology',
    salaryRange: '₹6 - 14 LPA',
    urgency: 'Immediate',
    requiredSkills: [
      { skill: 'Python', importancePct: 92 },
      { skill: 'SQL', importancePct: 88 },
      { skill: 'Power BI', importancePct: 72 },
      { skill: 'Excel', importancePct: 65 },
      { skill: 'Statistics', importancePct: 55 }
    ]
  },
  {
    id: 'role-cloud',
    title: 'Cloud Engineer',
    openings: 240,
    industry: 'Information Technology',
    salaryRange: '₹10 - 22 LPA',
    urgency: 'High',
    requiredSkills: [
      { skill: 'AWS / Azure', importancePct: 95 },
      { skill: 'Terraform', importancePct: 84 },
      { skill: 'Kubernetes', importancePct: 80 },
      { skill: 'CI/CD Pipelines', importancePct: 76 },
      { skill: 'Linux Admin', importancePct: 70 }
    ]
  },
  {
    id: 'role-ml',
    title: 'ML Engineer',
    openings: 180,
    industry: 'Information Technology',
    salaryRange: '₹12 - 26 LPA',
    urgency: 'High',
    requiredSkills: [
      { skill: 'Python', importancePct: 96 },
      { skill: 'PyTorch / TF', importancePct: 89 },
      { skill: 'MLOps', importancePct: 78 },
      { skill: 'Vector Databases', importancePct: 72 },
      { skill: 'Linear Algebra', importancePct: 65 }
    ]
  },
  {
    id: 'role-cyber',
    title: 'Cybersecurity Analyst',
    openings: 120,
    industry: 'Information Technology',
    salaryRange: '₹7 - 16 LPA',
    urgency: 'Standard',
    requiredSkills: [
      { skill: 'Network Security', importancePct: 91 },
      { skill: 'SIEM Tools', importancePct: 85 },
      { skill: 'Ethical Hacking', importancePct: 75 },
      { skill: 'Compliance & ISO', importancePct: 68 },
      { skill: 'Incident Response', importancePct: 64 }
    ]
  }
];

// Additional job roles for "View All"
export const allJobRolesExtended: OpenJobRole[] = [
  ...openJobRolesData,
  {
    id: 'role-devops',
    title: 'DevOps Specialist',
    openings: 110,
    industry: 'Information Technology',
    salaryRange: '₹10 - 20 LPA',
    urgency: 'Standard',
    requiredSkills: [
      { skill: 'Kubernetes', importancePct: 88 },
      { skill: 'Docker', importancePct: 85 },
      { skill: 'Jenkins / GitHub Actions', importancePct: 82 },
      { skill: 'Ansible', importancePct: 70 }
    ]
  },
  {
    id: 'role-embedded',
    title: 'Embedded Systems Engineer',
    openings: 95,
    industry: 'Manufacturing',
    salaryRange: '₹6 - 15 LPA',
    urgency: 'Standard',
    requiredSkills: [
      { skill: 'Embedded C', importancePct: 92 },
      { skill: 'Microcontrollers', importancePct: 86 },
      { skill: 'RTOS', importancePct: 78 },
      { skill: 'PCB Design', importancePct: 65 }
    ]
  }
];

// ------------------------------------------------------------------------
// 6. INDUSTRY DEMAND VS CURRENT STUDENT LEARNING (Section 13 in Spec)
// ------------------------------------------------------------------------
export const industryVsStudentData: DemandVsLearningItem[] = [
  { skill: 'Python', industryDemand: 92, studentCoverage: 76, gap: 16 },
  { skill: 'SQL', industryDemand: 88, studentCoverage: 61, gap: 27 },
  { skill: 'Power BI', industryDemand: 72, studentCoverage: 28, gap: 44 },
  { skill: 'Cloud', industryDemand: 65, studentCoverage: 22, gap: 43 },
  { skill: 'Cybersecurity', industryDemand: 55, studentCoverage: 16, gap: 39 },
  { skill: 'Docker / K8s', industryDemand: 62, studentCoverage: 20, gap: 42 },
  { skill: 'ML / AI Models', industryDemand: 58, studentCoverage: 25, gap: 33 }
];

// ------------------------------------------------------------------------
// 7. SKILL GAP ANALYSIS (Section 14 & 15 in Spec)
// ------------------------------------------------------------------------
export const skillGapList: SkillGapItem[] = [
  {
    skill: 'Power BI',
    gapPct: 44,
    industryDemand: 72,
    currentCoverage: 28,
    severity: 'CRITICAL GAP',
    priorityLevel: 'CRITICAL',
    recommendedModule: 'Add practical Power BI & Executive Business Intelligence module',
    suggestedHours: '20–30 hour practical lab & capstone project',
    reason: 'High demand across 820 regional employers but minimal formal degree curriculum coverage',
    degreePrograms: ['B.Tech CSE', 'B.Tech IT', 'B.Com Analytics', 'MBA FinTech']
  },
  {
    skill: 'Cloud Computing',
    gapPct: 43,
    industryDemand: 65,
    currentCoverage: 22,
    severity: 'CRITICAL GAP',
    priorityLevel: 'CRITICAL',
    recommendedModule: 'Mandatory AWS/Azure Cloud Infrastructure & Architecture Labs',
    suggestedHours: '35–40 hour hands-on certification aligned sandbox',
    reason: 'Rapid migration of enterprise workloads creating urgent need for certified cloud practitioners',
    degreePrograms: ['B.Tech CSE', 'B.Tech IT', 'B.Tech ECE', 'MCA']
  },
  {
    skill: 'Cybersecurity',
    gapPct: 39,
    industryDemand: 55,
    currentCoverage: 16,
    severity: 'HIGH GAP',
    priorityLevel: 'HIGH',
    recommendedModule: 'Defensive Security, SOC Operations & Network Penetration Testing',
    suggestedHours: '30 hour virtual cyber range simulation',
    reason: 'Critical shortage of entry-level security analysts capable of triage and log monitoring',
    degreePrograms: ['B.Tech CSE Cybersecurity', 'B.Tech IT', 'M.Sc CS']
  },
  {
    skill: 'SQL & Data Warehousing',
    gapPct: 27,
    industryDemand: 88,
    currentCoverage: 61,
    severity: 'HIGH GAP',
    priorityLevel: 'HIGH',
    recommendedModule: 'Advanced SQL Query Optimization, Indexing & Cloud Data Warehouses (Snowflake)',
    suggestedHours: '20 hour applied database lab',
    reason: 'Curriculum teaches basic SQL syntax but lacks complex analytical window functions and query tuning',
    degreePrograms: ['B.Tech All Branches', 'BCA', 'B.Sc Data Science']
  },
  {
    skill: 'Python Applied Data Science',
    gapPct: 16,
    industryDemand: 92,
    currentCoverage: 76,
    severity: 'MODERATE GAP',
    priorityLevel: 'MEDIUM',
    recommendedModule: 'Production-ready Python: Vectorization (NumPy/Pandas) & API Deployment',
    suggestedHours: '15 hour coding bootcamp style workshops',
    reason: 'Good basic syntax familiarity among students, but low exposure to production packaging and profiling',
    degreePrograms: ['B.Tech CSE', 'B.Sc Statistics', 'M.Sc Analytics']
  }
];

// ------------------------------------------------------------------------
// 8. SKILL DEMAND TREND — LAST 12 MONTHS (Section 17 in Spec)
// ------------------------------------------------------------------------
export const skillDemandTrendData: SkillTrendMonthData[] = [
  { month: 'Jan', Python: 42, SQL: 38, Cloud: 24, 'AI/ML': 18, Cybersecurity: 15 },
  { month: 'Feb', Python: 48, SQL: 42, Cloud: 28, 'AI/ML': 22, Cybersecurity: 18 },
  { month: 'Mar', Python: 55, SQL: 47, Cloud: 33, 'AI/ML': 26, Cybersecurity: 21 },
  { month: 'Apr', Python: 59, SQL: 50, Cloud: 38, 'AI/ML': 31, Cybersecurity: 24 },
  { month: 'May', Python: 65, SQL: 54, Cloud: 42, 'AI/ML': 37, Cybersecurity: 28 },
  { month: 'Jun', Python: 68, SQL: 59, Cloud: 48, 'AI/ML': 44, Cybersecurity: 32 },
  { month: 'Jul', Python: 74, SQL: 63, Cloud: 52, 'AI/ML': 52, Cybersecurity: 35 },
  { month: 'Aug', Python: 79, SQL: 68, Cloud: 57, 'AI/ML': 59, Cybersecurity: 39 },
  { month: 'Sep', Python: 82, SQL: 72, Cloud: 61, 'AI/ML': 68, Cybersecurity: 43 },
  { month: 'Oct', Python: 86, SQL: 78, Cloud: 65, 'AI/ML': 74, Cybersecurity: 47 },
  { month: 'Nov', Python: 91, SQL: 83, Cloud: 70, 'AI/ML': 82, Cybersecurity: 51 },
  { month: 'Dec', Python: 95, SQL: 88, Cloud: 74, 'AI/ML': 89, Cybersecurity: 55 }
];

// ------------------------------------------------------------------------
// 9. EMERGING SKILLS (Section 18 in Spec)
// ------------------------------------------------------------------------
export const emergingSkillsList: EmergingSkillItem[] = [
  {
    id: 'em-cloud',
    name: 'Cloud Computing & Serverless',
    iconType: 'cloud',
    growthPct: 32,
    industriesCount: 18,
    topRoles: ['Cloud Architect', 'DevOps Specialist', 'Infrastructure Lead']
  },
  {
    id: 'em-ai',
    name: 'Generative AI / Applied ML',
    iconType: 'ai',
    growthPct: 28,
    industriesCount: 24,
    topRoles: ['ML Engineer', 'Prompt Systems Designer', 'NLP Specialist']
  },
  {
    id: 'em-cyber',
    name: 'Enterprise Cybersecurity & Zero Trust',
    iconType: 'cyber',
    growthPct: 24,
    industriesCount: 16,
    topRoles: ['SOC Analyst', 'Security Architect', 'Cloud Compliance Officer']
  }
];

// ------------------------------------------------------------------------
// 10. INDUSTRY DISTRIBUTION (Section 19 in Spec)
// ------------------------------------------------------------------------
export const industryDistributionData: IndustryDistributionItem[] = [
  { industry: 'IT & Software Services', sharePct: 42, jobCount: 5230, growthPct: '+14.8%', color: '#25343F' },
  { industry: 'Manufacturing & Industrial IoT', sharePct: 24, jobCount: 2980, growthPct: '+8.4%', color: '#FF9B51' },
  { industry: 'Healthcare & Life Sciences', sharePct: 14, jobCount: 1740, growthPct: '+11.2%', color: '#14746F' },
  { industry: 'FinTech & Banking', sharePct: 10, jobCount: 1250, growthPct: '+9.6%', color: '#4A6B82' },
  { industry: 'Automotive & EV Tech', sharePct: 6, jobCount: 750, growthPct: '+18.3%', color: '#E07A5F' },
  { industry: 'Retail & E-Commerce Logistics', sharePct: 4, jobCount: 500, growthPct: '+5.1%', color: '#8D99AE' }
];

// ------------------------------------------------------------------------
// 11. DISTRICT COMPARISON (Section 20 in Spec)
// ------------------------------------------------------------------------
export const districtComparisonData: DistrictComparisonRow[] = [
  {
    district: 'Hyderabad',
    jobs: 12450,
    skillGap: '31%',
    skillGapValue: 31,
    industries: 820,
    topSkill: 'Python & Cloud',
    state: 'Telangana',
    coordinates: [17.4065, 78.4772]
  },
  {
    district: 'Medchal-Malkajgiri',
    jobs: 4210,
    skillGap: '38%',
    skillGapValue: 38,
    industries: 260,
    topSkill: 'Industrial Automation & PLC',
    state: 'Telangana',
    coordinates: [17.5615, 78.5391]
  },
  {
    district: 'Rangareddy',
    jobs: 5180,
    skillGap: '35%',
    skillGapValue: 35,
    industries: 310,
    topSkill: 'EV Systems & ML',
    state: 'Telangana',
    coordinates: [17.2603, 78.4394]
  },
  {
    district: 'Warangal',
    jobs: 1840,
    skillGap: '42%',
    skillGapValue: 42,
    industries: 120,
    topSkill: 'Web Technologies & Agri-Tech',
    state: 'Telangana',
    coordinates: [17.9784, 79.5941]
  },
  {
    district: 'Sangareddy',
    jobs: 2920,
    skillGap: '36%',
    skillGapValue: 36,
    industries: 195,
    topSkill: 'Chemical QA & Robotics',
    state: 'Telangana',
    coordinates: [17.5684, 78.1426]
  }
];
