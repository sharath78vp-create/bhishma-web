// ─────────────────────────────────────────────────────────────
// District Job Analytics Mock Data
// Drives the 5-tab drilldown panel in Labour Market Intelligence
// ─────────────────────────────────────────────────────────────

export interface OpenPosition {
  role: string;
  count: number;
  growthPct: number;
  sector: string;
}

export interface SkillRequired {
  skill: string;
  demandScore: number; // 0–100
  category: string;
  shortage: 'critical' | 'high' | 'moderate' | 'low';
}

export interface StudentLearning {
  subject: string;
  coveragePct: number; // % of semester hours
  relevanceScore: number; // 0–100 industry relevance
}

export interface SkillGapEntry {
  skill: string;
  required: number; // 0–100 industry demand
  available: number; // 0–100 student supply
  gap: number; // required - available
}

export interface CurriculumSuggestion {
  course: string;
  program: string;
  currentAlignment: number; // 0–100
  priority: 'high' | 'medium' | 'low';
  issue: string;
  action: string;
  addModules: string[];
  removeTopics: string[];
}

export interface DistrictJobData {
  regionId: string;
  regionName: string;
  state: string;
  totalOpenings: number;
  avgSalaryLakhs: number;
  hiringVelocity: number; // 0–100
  openPositions: OpenPosition[];
  skillsRequired: SkillRequired[];
  studentsLearning: StudentLearning[];
  skillGaps: SkillGapEntry[];
  curriculumSuggestions: CurriculumSuggestion[];
}

export const mockDistrictJobs: Record<string, DistrictJobData> = {
  'REG-01': {
    regionId: 'REG-01',
    regionName: 'Bengaluru-Mysuru Tech Corridor',
    state: 'Karnataka',
    totalOpenings: 28400,
    avgSalaryLakhs: 18.4,
    hiringVelocity: 88,
    openPositions: [
      { role: 'ML Engineer (LLM)', count: 4800, growthPct: 142, sector: 'AI & Data' },
      { role: 'Semiconductor Layout Engineer', count: 3200, growthPct: 58, sector: 'Semiconductors' },
      { role: 'Avionics Software Engineer', count: 2100, growthPct: 44, sector: 'Aerospace' },
      { role: 'Generative AI Product Manager', count: 1800, growthPct: 120, sector: 'AI & Data' },
      { role: 'RTL Design Verification Engineer', count: 1600, growthPct: 52, sector: 'Semiconductors' },
      { role: 'Cloud ML Ops Engineer', count: 1400, growthPct: 88, sector: 'Cloud Platforms' },
      { role: 'Embedded Software Engineer', count: 1200, growthPct: 38, sector: 'Aerospace' },
      { role: 'Data Platform Engineer', count: 1100, growthPct: 64, sector: 'AI & Data' },
    ],
    skillsRequired: [
      { skill: 'LLM Fine-Tuning', demandScore: 96, category: 'Technical', shortage: 'critical' },
      { skill: 'VLSI RTL Design', demandScore: 91, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'PyTorch / JAX', demandScore: 89, category: 'Technical', shortage: 'high' },
      { skill: 'CUDA Programming', demandScore: 84, category: 'Technical', shortage: 'high' },
      { skill: 'SystemVerilog UVM', demandScore: 82, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Cloud MLOps (Vertex/SageMaker)', demandScore: 78, category: 'Technical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Basic Programming (C/C++)', coveragePct: 28, relevanceScore: 45 },
      { subject: 'Data Structures & Algorithms', coveragePct: 22, relevanceScore: 62 },
      { subject: 'Digital Electronics', coveragePct: 18, relevanceScore: 38 },
      { subject: 'Mathematics & Statistics', coveragePct: 16, relevanceScore: 55 },
      { subject: 'Introductory ML (sklearn)', coveragePct: 10, relevanceScore: 48 },
      { subject: 'Project Management', coveragePct: 6, relevanceScore: 30 },
    ],
    skillGaps: [
      { skill: 'LLM Fine-Tuning', required: 96, available: 18, gap: 78 },
      { skill: 'VLSI RTL Design', required: 91, available: 28, gap: 63 },
      { skill: 'CUDA Programming', required: 84, available: 14, gap: 70 },
      { skill: 'SystemVerilog', required: 82, available: 24, gap: 58 },
      { skill: 'Cloud MLOps', required: 78, available: 32, gap: 46 },
      { skill: 'PyTorch / JAX', required: 89, available: 30, gap: 59 },
    ],
    curriculumSuggestions: [
      {
        course: 'Introduction to Machine Learning',
        program: 'B.Tech CSE / AI',
        currentAlignment: 34,
        priority: 'high',
        issue: 'Covers only sklearn + basic algorithms. No LLM, transformer, or GPU-accelerated training.',
        action: 'Add LLM fine-tuning lab with Hugging Face, introduce LoRA/QLoRA, and CUDA fundamentals.',
        addModules: ['Transformer Architecture & Attention', 'LLM Fine-Tuning with LoRA', 'Distributed Training on GPUs'],
        removeTopics: ['Decision Tree from Scratch (manual)', 'Legacy SVM kernel theory'],
      },
      {
        course: 'VLSI System Design & Testing',
        program: 'B.Tech ECE',
        currentAlignment: 54,
        priority: 'high',
        issue: 'Focuses on 8085 interfacing and TTL logic. Industry requires SystemVerilog, STA, and synthesis flow.',
        action: 'Replace legacy content with SystemVerilog UVM, OpenROAD physical design, and RISC-V architecture.',
        addModules: ['SystemVerilog UVM Framework', 'Static Timing Analysis', 'Physical Design with OpenROAD'],
        removeTopics: ['8085 Assembler Interfacing', 'TTL Gate Logic without HDL'],
      },
    ],
  },

  'REG-02': {
    regionId: 'REG-02',
    regionName: 'Dholera-Sanand Industrial Node',
    state: 'Gujarat',
    totalOpenings: 19800,
    avgSalaryLakhs: 14.2,
    hiringVelocity: 72,
    openPositions: [
      { role: 'Semiconductor Process Engineer', count: 4200, growthPct: 68, sector: 'Semiconductors' },
      { role: 'Green Hydrogen Systems Engineer', count: 2800, growthPct: 92, sector: 'Green Energy' },
      { role: 'Chemical Process Automation Engineer', count: 2200, growthPct: 44, sector: 'Heavy Chemicals' },
      { role: 'Cleanroom Lithography Technician', count: 1900, growthPct: 58, sector: 'Semiconductors' },
      { role: 'Industrial IoT Integration Engineer', count: 1600, growthPct: 72, sector: 'Manufacturing' },
      { role: 'EHS & Chemical Safety Specialist', count: 1400, growthPct: 32, sector: 'Heavy Chemicals' },
      { role: 'Electrolyzer Systems Engineer', count: 1200, growthPct: 110, sector: 'Green Energy' },
      { role: 'SCADA & PLC Engineer', count: 1100, growthPct: 48, sector: 'Manufacturing' },
    ],
    skillsRequired: [
      { skill: 'Fab Process Control (CVD/PVD)', demandScore: 94, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Green Hydrogen Electrolysis', demandScore: 90, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'SCADA / PLC Programming', demandScore: 86, category: 'Technical', shortage: 'high' },
      { skill: 'Chemical Safety Protocols (HAZMAT)', demandScore: 82, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Industrial IoT (OPC-UA)', demandScore: 78, category: 'Technical', shortage: 'moderate' },
      { skill: 'Energy Storage Systems', demandScore: 76, category: 'Technical', shortage: 'high' },
    ],
    studentsLearning: [
      { subject: 'General Chemistry & Lab', coveragePct: 30, relevanceScore: 40 },
      { subject: 'Thermodynamics', coveragePct: 22, relevanceScore: 55 },
      { subject: 'Basic Electronics', coveragePct: 18, relevanceScore: 28 },
      { subject: 'Engineering Mechanics', coveragePct: 16, relevanceScore: 35 },
      { subject: 'Environmental Science', coveragePct: 8, relevanceScore: 42 },
      { subject: 'Computer Programming', coveragePct: 6, relevanceScore: 30 },
    ],
    skillGaps: [
      { skill: 'Fab Process Control', required: 94, available: 12, gap: 82 },
      { skill: 'Green Hydrogen Systems', required: 90, available: 8, gap: 82 },
      { skill: 'SCADA / PLC', required: 86, available: 30, gap: 56 },
      { skill: 'Chemical Safety (HAZMAT)', required: 82, available: 24, gap: 58 },
      { skill: 'Industrial IoT', required: 78, available: 22, gap: 56 },
      { skill: 'Energy Storage', required: 76, available: 18, gap: 58 },
    ],
    curriculumSuggestions: [
      {
        course: 'Chemical Process Engineering',
        program: 'B.Tech Chemical Engineering',
        currentAlignment: 32,
        priority: 'high',
        issue: 'No coverage of semiconductor fab processes, green hydrogen, or cleanroom protocols.',
        action: 'Partner with fab operators for lab visits. Add semiconductor process modules and HAZMAT certification.',
        addModules: ['Semiconductor CVD/PVD Process Control', 'Green Hydrogen Electrolysis Fundamentals', 'Cleanroom Protocols & Safety'],
        removeTopics: ['Traditional Coal-Based Process Design', 'Outdated Distillation Column Sizing'],
      },
    ],
  },

  'REG-03': {
    regionId: 'REG-03',
    regionName: 'Chennai-Hosur EV Belt',
    state: 'Tamil Nadu',
    totalOpenings: 22600,
    avgSalaryLakhs: 15.8,
    hiringVelocity: 80,
    openPositions: [
      { role: 'EV Battery Systems Engineer', count: 5200, growthPct: 96, sector: 'EV & Mobility' },
      { role: 'Embedded Firmware Engineer (AUTOSAR)', count: 3400, growthPct: 72, sector: 'EV & Mobility' },
      { role: 'SaaS Backend Engineer (Go/Rust)', count: 2800, growthPct: 44, sector: 'SaaS' },
      { role: 'Precision Machining CNC Programmer', count: 2100, growthPct: 28, sector: 'Manufacturing' },
      { role: 'Battery Cell Thermal Engineer', count: 1900, growthPct: 88, sector: 'EV & Mobility' },
      { role: 'Vehicle Dynamics Simulation Engineer', count: 1600, growthPct: 52, sector: 'EV & Mobility' },
      { role: 'CAN/LIN Bus Diagnostics Engineer', count: 1400, growthPct: 60, sector: 'EV & Mobility' },
      { role: 'Kubernetes Platform Engineer', count: 1200, growthPct: 38, sector: 'Cloud Platforms' },
    ],
    skillsRequired: [
      { skill: 'EV Battery Management Systems (BMS)', demandScore: 95, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'AUTOSAR / FreeRTOS Firmware', demandScore: 89, category: 'Technical', shortage: 'critical' },
      { skill: 'CAN/LIN Bus & Vehicle Networks', demandScore: 84, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Thermal Runaway Simulation', demandScore: 80, category: 'Technical', shortage: 'high' },
      { skill: 'Rust / Go Backend Services', demandScore: 76, category: 'Technical', shortage: 'moderate' },
      { skill: 'ISO 26262 Functional Safety', demandScore: 74, category: 'Domain Specific', shortage: 'high' },
    ],
    studentsLearning: [
      { subject: 'Internal Combustion Engines', coveragePct: 32, relevanceScore: 22 },
      { subject: 'Mechanical Design (CAD)', coveragePct: 24, relevanceScore: 48 },
      { subject: 'Electrical Machines', coveragePct: 18, relevanceScore: 35 },
      { subject: 'C Programming', coveragePct: 14, relevanceScore: 38 },
      { subject: 'Vehicle Dynamics', coveragePct: 8, relevanceScore: 52 },
      { subject: 'Industrial Electronics', coveragePct: 4, relevanceScore: 30 },
    ],
    skillGaps: [
      { skill: 'EV Battery BMS', required: 95, available: 14, gap: 81 },
      { skill: 'AUTOSAR Firmware', required: 89, available: 20, gap: 69 },
      { skill: 'CAN/LIN Bus', required: 84, available: 26, gap: 58 },
      { skill: 'Thermal Simulation', required: 80, available: 12, gap: 68 },
      { skill: 'ISO 26262 Safety', required: 74, available: 10, gap: 64 },
      { skill: 'Rust/Go Backend', required: 76, available: 30, gap: 46 },
    ],
    curriculumSuggestions: [
      {
        course: 'Automobile Engineering & Prime Movers',
        program: 'B.Tech Mechanical Engineering',
        currentAlignment: 38,
        priority: 'high',
        issue: 'Heavily ICE-focused. No EV architecture, BMS, or embedded firmware coverage.',
        action: 'Restructure 40% of content toward EV systems. Add industry BMS lab sessions.',
        addModules: ['EV Battery Thermal Management', 'Regenerative Braking Systems', 'CAN Bus Diagnostics'],
        removeTopics: ['Carburetor Tuning & Calibration', 'Conventional Drum Brake Hydraulics'],
      },
      {
        course: 'Microcontrollers & Real-Time OS',
        program: 'B.Tech ECE',
        currentAlignment: 52,
        priority: 'high',
        issue: 'Uses 8051 assembly. Industry needs AUTOSAR, ARM Cortex-M, and FreeRTOS.',
        action: 'Replace 8051 labs with ARM Cortex-M + FreeRTOS. Add CAN bus simulation lab.',
        addModules: ['FreeRTOS Task Management', 'ARM Cortex-M Programming', 'Secure CAN Bus Implementation'],
        removeTopics: ['8051 Assembly Timer Interfacing', 'Bit-banging Parallel Ports'],
      },
    ],
  },

  'REG-04': {
    regionId: 'REG-04',
    regionName: 'Pune-Chakan Auto Cluster',
    state: 'Maharashtra',
    totalOpenings: 17200,
    avgSalaryLakhs: 16.2,
    hiringVelocity: 74,
    openPositions: [
      { role: 'Industrial IoT Systems Engineer', count: 3600, growthPct: 82, sector: 'Industrial IoT' },
      { role: 'Mechatronics Automation Engineer', count: 2900, growthPct: 56, sector: 'Manufacturing' },
      { role: 'Fintech Backend Developer (Python)', count: 2400, growthPct: 48, sector: 'Fintech' },
      { role: 'Robotics Process Engineer', count: 2000, growthPct: 64, sector: 'Manufacturing' },
      { role: 'Predictive Maintenance Data Scientist', count: 1800, growthPct: 90, sector: 'Industrial IoT' },
      { role: 'SCADA Systems Engineer', count: 1600, growthPct: 42, sector: 'Manufacturing' },
      { role: 'Digital Twin Developer', count: 1400, growthPct: 112, sector: 'Industrial IoT' },
      { role: 'Fintech Risk Analyst', count: 900, growthPct: 36, sector: 'Fintech' },
    ],
    skillsRequired: [
      { skill: 'Industrial IoT (OPC-UA / MQTT)', demandScore: 92, category: 'Technical', shortage: 'critical' },
      { skill: 'Digital Twin Simulation', demandScore: 88, category: 'Technical', shortage: 'critical' },
      { skill: 'Predictive Maintenance (ML)', demandScore: 84, category: 'Technical', shortage: 'high' },
      { skill: 'ROS2 Robotics Stack', demandScore: 80, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Python Data Engineering', demandScore: 78, category: 'Technical', shortage: 'moderate' },
      { skill: 'SCADA / Ladder Logic (PLC)', demandScore: 74, category: 'Technical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Engineering Drawing & CAD', coveragePct: 26, relevanceScore: 42 },
      { subject: 'Thermodynamics', coveragePct: 22, relevanceScore: 35 },
      { subject: 'Basic Electronics & Circuits', coveragePct: 18, relevanceScore: 38 },
      { subject: 'Mathematics & Physics', coveragePct: 18, relevanceScore: 50 },
      { subject: 'Manufacturing Processes', coveragePct: 12, relevanceScore: 48 },
      { subject: 'Industrial Management', coveragePct: 4, relevanceScore: 30 },
    ],
    skillGaps: [
      { skill: 'Industrial IoT', required: 92, available: 20, gap: 72 },
      { skill: 'Digital Twin Simulation', required: 88, available: 8, gap: 80 },
      { skill: 'Predictive Maintenance ML', required: 84, available: 18, gap: 66 },
      { skill: 'ROS2 Robotics', required: 80, available: 12, gap: 68 },
      { skill: 'Python Data Engineering', required: 78, available: 35, gap: 43 },
      { skill: 'SCADA / PLC', required: 74, available: 28, gap: 46 },
    ],
    curriculumSuggestions: [
      {
        course: 'Industrial Automation & Control Systems',
        program: 'B.Tech Mechanical/Electrical Engineering',
        currentAlignment: 44,
        priority: 'high',
        issue: 'Covers relay logic and analog PLCs. Digital twin and IoT integration missing.',
        action: 'Introduce digital twin platforms (Siemens NX/NVIDIA Omniverse) and OPC-UA labs.',
        addModules: ['IIoT Protocol Stack (OPC-UA, MQTT)', 'Digital Twin with Unity/Omniverse', 'Predictive Maintenance with ML'],
        removeTopics: ['Relay Ladder Logic (1980s era)', 'Analog PLC Programming'],
      },
    ],
  },

  'REG-05': {
    regionId: 'REG-05',
    regionName: 'Hyderabad Innovation Corridor',
    state: 'Telangana',
    totalOpenings: 34600,
    avgSalaryLakhs: 19.8,
    hiringVelocity: 92,
    openPositions: [
      { role: 'AI / ML Engineer', count: 7800, growthPct: 156, sector: 'AI & Data' },
      { role: 'Data Platform Engineer (Snowflake/dbt)', count: 5200, growthPct: 62, sector: 'AI & Data' },
      { role: 'Generative AI Product Specialist', count: 3800, growthPct: 142, sector: 'AI & Data' },
      { role: 'VLSI Physical Design Engineer', count: 3200, growthPct: 58, sector: 'Semiconductors' },
      { role: 'Cloud Data Architect (AWS/GCP)', count: 2900, growthPct: 78, sector: 'Cloud Platforms' },
      { role: 'Analytics Engineer (dbt + SQL)', count: 2400, growthPct: 44, sector: 'AI & Data' },
      { role: 'BI & Predictive Dashboard Developer', count: 2100, growthPct: 22, sector: 'Enterprise IT' },
      { role: 'LLM Agentic Workflow Developer', count: 1800, growthPct: 200, sector: 'AI & Data' },
    ],
    skillsRequired: [
      { skill: 'LLM Fine-Tuning & Agentic AI', demandScore: 97, category: 'Technical', shortage: 'critical' },
      { skill: 'Cloud Data Warehousing (Snowflake)', demandScore: 93, category: 'Technical', shortage: 'critical' },
      { skill: 'Advanced SQL & Analytics Eng (dbt)', demandScore: 90, category: 'Technical', shortage: 'high' },
      { skill: 'VLSI RTL & Physical Design', demandScore: 88, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'MLOps & Model Deployment', demandScore: 85, category: 'Technical', shortage: 'high' },
      { skill: 'Power BI / Tableau Storytelling', demandScore: 80, category: 'Analytical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Basic Python / Java Programming', coveragePct: 26, relevanceScore: 50 },
      { subject: 'Data Structures & Algorithms', coveragePct: 20, relevanceScore: 62 },
      { subject: 'Database Management (SQL Basics)', coveragePct: 16, relevanceScore: 55 },
      { subject: 'Statistics & Probability', coveragePct: 14, relevanceScore: 58 },
      { subject: 'ML Fundamentals (sklearn)', coveragePct: 12, relevanceScore: 46 },
      { subject: 'Web Development (HTML/React basics)', coveragePct: 12, relevanceScore: 28 },
    ],
    skillGaps: [
      { skill: 'LLM Fine-Tuning', required: 97, available: 16, gap: 81 },
      { skill: 'Snowflake / Cloud DW', required: 93, available: 22, gap: 71 },
      { skill: 'Analytics Eng (dbt)', required: 90, available: 30, gap: 60 },
      { skill: 'VLSI Physical Design', required: 88, available: 24, gap: 64 },
      { skill: 'MLOps', required: 85, available: 28, gap: 57 },
      { skill: 'Power BI / Tableau', required: 80, available: 40, gap: 40 },
    ],
    curriculumSuggestions: [
      {
        course: 'Business Intelligence & Enterprise Data Analytics',
        program: 'B.Tech AI & Data Science',
        currentAlignment: 46,
        priority: 'high',
        issue: 'Teaches Excel 2007 macros and SPSS. Misses cloud DW, dbt, LLM-augmented analytics.',
        action: 'Replace legacy tools with Snowflake, dbt, Power BI, and agentic analytics workflows.',
        addModules: ['Cloud Data Warehouse with Snowflake', 'dbt for Analytics Engineering', 'LLM-Augmented Data Analysis', 'Power BI + DAX Storytelling'],
        removeTopics: ['Static Excel 2007 Macros', 'SPSS Manual Syntax Coding', 'FoxPro Database Forms'],
      },
      {
        course: 'Database Management Systems',
        program: 'B.Tech CSE',
        currentAlignment: 68,
        priority: 'medium',
        issue: 'Strong relational foundation but no vector databases, distributed consensus, or cloud query optimization.',
        action: 'Add pgvector/Pinecone lab, Snowflake query optimization, and distributed Raft consensus module.',
        addModules: ['Vector Databases (pgvector / Pinecone)', 'Distributed Consensus (Raft)', 'Snowflake Query Optimization'],
        removeTopics: ['Hierarchical DB Models', 'Legacy XML Databases'],
      },
    ],
  },

  'REG-06': {
    regionId: 'REG-06',
    regionName: 'Delhi NCR Cyber & Electronics Hub',
    state: 'Delhi NCR',
    totalOpenings: 26800,
    avgSalaryLakhs: 17.6,
    hiringVelocity: 82,
    openPositions: [
      { role: 'Enterprise AI Solution Architect', count: 5600, growthPct: 98, sector: 'Enterprise AI' },
      { role: 'OT / ICS Cybersecurity Engineer', count: 4200, growthPct: 74, sector: 'Cybersecurity' },
      { role: 'SaaS Product Engineer (Full Stack)', count: 3800, growthPct: 42, sector: 'SaaS' },
      { role: 'AI Red Team Security Analyst', count: 2400, growthPct: 140, sector: 'Cybersecurity' },
      { role: 'Consumer Electronics Firmware Dev', count: 2000, growthPct: 36, sector: 'Consumer Electronics' },
      { role: 'Cloud Security Posture Analyst', count: 1800, growthPct: 88, sector: 'Cybersecurity' },
      { role: 'Enterprise Data Analyst', count: 1600, growthPct: 52, sector: 'Enterprise AI' },
      { role: 'DevSecOps Platform Engineer', count: 1400, growthPct: 66, sector: 'Cybersecurity' },
    ],
    skillsRequired: [
      { skill: 'OT / SCADA Cybersecurity', demandScore: 94, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Enterprise LLM Integration', demandScore: 90, category: 'Technical', shortage: 'critical' },
      { skill: 'AI Red Teaming & Prompt Injection', demandScore: 86, category: 'Technical', shortage: 'critical' },
      { skill: 'Cloud CSPM (Wiz/Prisma)', demandScore: 82, category: 'Technical', shortage: 'high' },
      { skill: 'Zero Trust IAM Architecture', demandScore: 80, category: 'Technical', shortage: 'high' },
      { skill: 'Fullstack TypeScript + GraphQL', demandScore: 75, category: 'Technical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Network Fundamentals (OSI/TCP)', coveragePct: 28, relevanceScore: 55 },
      { subject: 'Operating Systems & Linux', coveragePct: 22, relevanceScore: 60 },
      { subject: 'Basic Cryptography', coveragePct: 18, relevanceScore: 50 },
      { subject: 'Web Development', coveragePct: 16, relevanceScore: 35 },
      { subject: 'Database Security', coveragePct: 10, relevanceScore: 42 },
      { subject: 'Software Engineering', coveragePct: 6, relevanceScore: 32 },
    ],
    skillGaps: [
      { skill: 'OT/SCADA Cybersecurity', required: 94, available: 16, gap: 78 },
      { skill: 'Enterprise LLM', required: 90, available: 20, gap: 70 },
      { skill: 'AI Red Teaming', required: 86, available: 10, gap: 76 },
      { skill: 'Cloud CSPM', required: 82, available: 22, gap: 60 },
      { skill: 'Zero Trust IAM', required: 80, available: 28, gap: 52 },
      { skill: 'TypeScript / GraphQL', required: 75, available: 38, gap: 37 },
    ],
    curriculumSuggestions: [
      {
        course: 'Network Security & Applied Cryptography',
        program: 'B.Tech CSE',
        currentAlignment: 62,
        priority: 'high',
        issue: 'Covers perimeter security and DES/MD5. No OT security, cloud security posture, or AI threat hunting.',
        action: 'Add OT/ICS security module and CSPM lab. Integrate AI threat detection tooling.',
        addModules: ['Zero Trust IAM (Okta/Azure AD)', 'Cloud Security Posture (Wiz)', 'AI-Driven Threat Hunting (SIEM)', 'OT/SCADA Protocol Hardening'],
        removeTopics: ['DES & MD5 Hashing', 'Perimeter Firewall Filter Rules'],
      },
    ],
  },

  'REG-07': {
    regionId: 'REG-07',
    regionName: 'Mumbai-Navi Mumbai Financial Tech Zone',
    state: 'Maharashtra',
    totalOpenings: 21400,
    avgSalaryLakhs: 20.4,
    hiringVelocity: 78,
    openPositions: [
      { role: 'Fintech ML Risk Engineer', count: 5800, growthPct: 88, sector: 'Fintech' },
      { role: 'Algorithmic Trading Developer (Python/C++)', count: 4200, growthPct: 56, sector: 'Fintech' },
      { role: 'Cloud Data Center Architect', count: 3000, growthPct: 42, sector: 'Cloud' },
      { role: 'Blockchain & Smart Contract Developer', count: 2200, growthPct: 72, sector: 'Fintech' },
      { role: 'Enterprise IT Business Analyst', count: 2000, growthPct: 24, sector: 'Enterprise IT' },
      { role: 'Data Science - Credit Risk Modeling', count: 1800, growthPct: 64, sector: 'Fintech' },
      { role: 'Regulatory Technology (RegTech) Engineer', count: 1400, growthPct: 96, sector: 'Fintech' },
      { role: 'Payment Gateway Engineer', count: 1000, growthPct: 38, sector: 'Fintech' },
    ],
    skillsRequired: [
      { skill: 'Fintech ML Risk Modeling', demandScore: 94, category: 'Analytical', shortage: 'critical' },
      { skill: 'Algorithmic Trading & Quant Finance', demandScore: 90, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Blockchain (Solidity/Ethereum)', demandScore: 82, category: 'Technical', shortage: 'high' },
      { skill: 'Cloud Data Center Design', demandScore: 80, category: 'Technical', shortage: 'moderate' },
      { skill: 'RegTech & AML Compliance AI', demandScore: 78, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Credit Risk Analytics (Python)', demandScore: 76, category: 'Analytical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Financial Mathematics', coveragePct: 28, relevanceScore: 60 },
      { subject: 'Programming (Python basics)', coveragePct: 22, relevanceScore: 48 },
      { subject: 'Accounting & Finance', coveragePct: 20, relevanceScore: 45 },
      { subject: 'Probability & Statistics', coveragePct: 16, relevanceScore: 62 },
      { subject: 'Data Analysis (Excel)', coveragePct: 10, relevanceScore: 35 },
      { subject: 'Corporate Governance', coveragePct: 4, relevanceScore: 28 },
    ],
    skillGaps: [
      { skill: 'ML Risk Modeling', required: 94, available: 22, gap: 72 },
      { skill: 'Algorithmic Trading', required: 90, available: 14, gap: 76 },
      { skill: 'Blockchain / Solidity', required: 82, available: 20, gap: 62 },
      { skill: 'Cloud Data Center', required: 80, available: 30, gap: 50 },
      { skill: 'RegTech / AML AI', required: 78, available: 12, gap: 66 },
      { skill: 'Credit Risk Analytics', required: 76, available: 34, gap: 42 },
    ],
    curriculumSuggestions: [
      {
        course: 'Financial Engineering & Analytics',
        program: 'B.Tech / MBA Finance',
        currentAlignment: 50,
        priority: 'high',
        issue: 'Excel-based analysis and theory-heavy. No ML credit risk, quant finance coding, or blockchain.',
        action: 'Add Python quant finance lab (QuantLib), ML credit scoring, and Solidity smart contract module.',
        addModules: ['Python Quant Finance (QuantLib)', 'ML Credit Risk Scoring', 'Solidity & DeFi Smart Contracts', 'RegTech & AML Automation'],
        removeTopics: ['Manual Excel VLOOKUP Finance Models', 'Outdated Discounted Cash Flow only approach'],
      },
    ],
  },

  'REG-08': {
    regionId: 'REG-08',
    regionName: 'Ahmedabad-Sanand Industrial & Chemical Belt',
    state: 'Gujarat',
    totalOpenings: 15600,
    avgSalaryLakhs: 13.4,
    hiringVelocity: 68,
    openPositions: [
      { role: 'Industrial Automation Engineer', count: 3800, growthPct: 64, sector: 'Manufacturing' },
      { role: 'Bioinformatics Data Scientist', count: 2600, growthPct: 108, sector: 'Life Sciences' },
      { role: 'Renewable Energy Systems Engineer', count: 2400, growthPct: 86, sector: 'Green Energy' },
      { role: 'PLC / SCADA Systems Integrator', count: 2000, growthPct: 42, sector: 'Manufacturing' },
      { role: 'Solar Farm Operations Engineer', count: 1800, growthPct: 72, sector: 'Green Energy' },
      { role: 'Pharmaceutical Process Automation Eng', count: 1400, growthPct: 54, sector: 'Life Sciences' },
      { role: 'Energy Analytics Specialist', count: 1000, growthPct: 90, sector: 'Green Energy' },
      { role: 'Quality Systems & Six Sigma Engineer', count: 600, growthPct: 28, sector: 'Manufacturing' },
    ],
    skillsRequired: [
      { skill: 'Industrial Automation (Siemens / ABB PLC)', demandScore: 90, category: 'Technical', shortage: 'high' },
      { skill: 'Bioinformatics & Genomics Analysis', demandScore: 86, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Solar & Wind Energy Systems', demandScore: 84, category: 'Domain Specific', shortage: 'high' },
      { skill: 'SCADA Energy Management', demandScore: 78, category: 'Technical', shortage: 'moderate' },
      { skill: 'R / Python for Life Sciences', demandScore: 76, category: 'Technical', shortage: 'high' },
      { skill: 'Six Sigma & Lean Manufacturing', demandScore: 70, category: 'Foundational', shortage: 'low' },
    ],
    studentsLearning: [
      { subject: 'Chemistry & Chemical Engineering', coveragePct: 30, relevanceScore: 45 },
      { subject: 'Mechanical Engineering Principles', coveragePct: 22, relevanceScore: 38 },
      { subject: 'Basic Electrical Engineering', coveragePct: 18, relevanceScore: 35 },
      { subject: 'Mathematics', coveragePct: 16, relevanceScore: 50 },
      { subject: 'Biology & Biochemistry', coveragePct: 10, relevanceScore: 42 },
      { subject: 'Environmental Studies', coveragePct: 4, relevanceScore: 40 },
    ],
    skillGaps: [
      { skill: 'Industrial Automation PLC', required: 90, available: 32, gap: 58 },
      { skill: 'Bioinformatics', required: 86, available: 10, gap: 76 },
      { skill: 'Solar/Wind Systems', required: 84, available: 18, gap: 66 },
      { skill: 'SCADA Energy Management', required: 78, available: 26, gap: 52 },
      { skill: 'R/Python Life Sciences', required: 76, available: 16, gap: 60 },
      { skill: 'Six Sigma / Lean', required: 70, available: 42, gap: 28 },
    ],
    curriculumSuggestions: [
      {
        course: 'Biotechnology & Bioinformatics',
        program: 'B.Tech Biotechnology',
        currentAlignment: 40,
        priority: 'high',
        issue: 'Lab-focused wet chemistry with no genomics software, bioinformatics pipelines, or AI for drug discovery.',
        action: 'Add Python for bioinformatics (Biopython), genomics data analysis, and ML for drug target prediction.',
        addModules: ['Genomic Sequence Analysis (Biopython)', 'ML for Drug Discovery', 'Bioinformatics Pipelines (Snakemake)'],
        removeTopics: ['Manual Gel Electrophoresis only theory', 'Outdated Bacterial Culture Documentation'],
      },
    ],
  },

  'REG-09': {
    regionId: 'REG-09',
    regionName: 'Kolkata-Rajarhat IT & Emerging Technologies',
    state: 'West Bengal',
    totalOpenings: 12800,
    avgSalaryLakhs: 12.6,
    hiringVelocity: 62,
    openPositions: [
      { role: 'Fullstack Engineer (MERN/Next.js)', count: 3200, growthPct: 44, sector: 'IT Services' },
      { role: 'Data Analyst (Python + SQL)', count: 2800, growthPct: 58, sector: 'Data Analytics' },
      { role: '3D Artist & Technical Art Director', count: 1800, growthPct: 72, sector: 'Animation & Gaming' },
      { role: 'Game Developer (Unity / Unreal)', count: 1600, growthPct: 64, sector: 'Animation & Gaming' },
      { role: 'Backend Java Spring Boot Engineer', count: 1400, growthPct: 28, sector: 'IT Services' },
      { role: 'UI/UX Product Designer (Figma)', count: 1200, growthPct: 48, sector: 'Design & Product' },
      { role: 'Data Engineering (Apache Spark)', count: 900, growthPct: 80, sector: 'Data Analytics' },
      { role: 'AR/VR Developer', count: 400, growthPct: 120, sector: 'Animation & Gaming' },
    ],
    skillsRequired: [
      { skill: 'React.js / Next.js Fullstack', demandScore: 88, category: 'Technical', shortage: 'moderate' },
      { skill: 'Python Data Analytics (Pandas/Polars)', demandScore: 84, category: 'Technical', shortage: 'moderate' },
      { skill: '3D Modeling (Blender / Maya)', demandScore: 80, category: 'Domain Specific', shortage: 'high' },
      { skill: 'Unity / Unreal Engine Development', demandScore: 78, category: 'Technical', shortage: 'high' },
      { skill: 'Apache Spark Data Engineering', demandScore: 74, category: 'Technical', shortage: 'moderate' },
      { skill: 'Figma UI/UX Design Systems', demandScore: 70, category: 'Analytical', shortage: 'low' },
    ],
    studentsLearning: [
      { subject: 'C / Java Programming', coveragePct: 30, relevanceScore: 48 },
      { subject: 'Data Structures', coveragePct: 24, relevanceScore: 60 },
      { subject: 'Web Development Basics', coveragePct: 18, relevanceScore: 45 },
      { subject: 'DBMS & SQL', coveragePct: 14, relevanceScore: 52 },
      { subject: 'Computer Graphics (Theory)', coveragePct: 8, relevanceScore: 38 },
      { subject: 'Software Engineering', coveragePct: 6, relevanceScore: 35 },
    ],
    skillGaps: [
      { skill: 'React/Next.js', required: 88, available: 42, gap: 46 },
      { skill: 'Python Analytics', required: 84, available: 40, gap: 44 },
      { skill: '3D Modeling', required: 80, available: 14, gap: 66 },
      { skill: 'Unity / Unreal', required: 78, available: 16, gap: 62 },
      { skill: 'Apache Spark', required: 74, available: 24, gap: 50 },
      { skill: 'Figma Design', required: 70, available: 30, gap: 40 },
    ],
    curriculumSuggestions: [
      {
        course: 'Computer Graphics & Multimedia',
        program: 'B.Tech CSE',
        currentAlignment: 42,
        priority: 'medium',
        issue: 'Theory-heavy OpenGL basics. No 3D modeling tools, game engines, or AR/VR development.',
        action: 'Add Blender 3D modeling lab, Unity/Unreal capstone project, and WebXR AR/VR module.',
        addModules: ['Blender 3D Modeling & Rigging', 'Unity Game Development (C#)', 'WebXR / AR Foundation'],
        removeTopics: ['Legacy OpenGL Fixed Pipeline', 'Manual Polygon Mesh Theory without tools'],
      },
    ],
  },

  'REG-10': {
    regionId: 'REG-10',
    regionName: 'Kochi-Infopark Electronics & Marine Tech',
    state: 'Kerala',
    totalOpenings: 9800,
    avgSalaryLakhs: 13.8,
    hiringVelocity: 58,
    openPositions: [
      { role: 'Marine Embedded Systems Engineer', count: 2200, growthPct: 66, sector: 'Marine Tech' },
      { role: 'Cloud DevOps Engineer (AWS/Azure)', count: 2000, growthPct: 48, sector: 'Cloud' },
      { role: 'Agritech IoT Developer', count: 1800, growthPct: 82, sector: 'Agritech' },
      { role: 'Drone Firmware Engineer', count: 1400, growthPct: 94, sector: 'Marine Tech' },
      { role: 'LPWAN Network Engineer', count: 1000, growthPct: 72, sector: 'Agritech' },
      { role: 'Precision Agriculture Data Scientist', count: 800, growthPct: 88, sector: 'Agritech' },
      { role: 'Marine Navigation Software Developer', count: 600, growthPct: 52, sector: 'Marine Tech' },
    ],
    skillsRequired: [
      { skill: 'Marine Embedded Systems (CAN/NMEA)', demandScore: 88, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Cloud DevOps (Terraform/ArgoCD)', demandScore: 84, category: 'Technical', shortage: 'moderate' },
      { skill: 'Agritech IoT (LoRaWAN/LPWAN)', demandScore: 82, category: 'Domain Specific', shortage: 'critical' },
      { skill: 'Drone Autopilot Firmware (PX4)', demandScore: 78, category: 'Technical', shortage: 'high' },
      { skill: 'Precision Agriculture ML', demandScore: 74, category: 'Technical', shortage: 'high' },
      { skill: 'Python / Rust Embedded Systems', demandScore: 70, category: 'Technical', shortage: 'moderate' },
    ],
    studentsLearning: [
      { subject: 'Electronics & Circuit Theory', coveragePct: 28, relevanceScore: 48 },
      { subject: 'Embedded C Programming', coveragePct: 22, relevanceScore: 55 },
      { subject: 'Communication Systems', coveragePct: 18, relevanceScore: 42 },
      { subject: 'Signal Processing', coveragePct: 16, relevanceScore: 45 },
      { subject: 'Marine Engineering Basics', coveragePct: 10, relevanceScore: 52 },
      { subject: 'Networking Fundamentals', coveragePct: 6, relevanceScore: 38 },
    ],
    skillGaps: [
      { skill: 'Marine Embedded (CAN/NMEA)', required: 88, available: 14, gap: 74 },
      { skill: 'Cloud DevOps', required: 84, available: 30, gap: 54 },
      { skill: 'Agritech IoT (LoRaWAN)', required: 82, available: 10, gap: 72 },
      { skill: 'Drone Firmware (PX4)', required: 78, available: 12, gap: 66 },
      { skill: 'Precision Agriculture ML', required: 74, available: 16, gap: 58 },
      { skill: 'Embedded Rust/Python', required: 70, available: 28, gap: 42 },
    ],
    curriculumSuggestions: [
      {
        course: 'Embedded Systems & IoT',
        program: 'B.Tech ECE',
        currentAlignment: 48,
        priority: 'high',
        issue: 'Focuses on generic Arduino/Raspberry Pi. No marine protocols, LoRaWAN, or drone autopilot systems.',
        action: 'Add LoRaWAN LPWAN module, marine NMEA protocol lab, and PX4 drone firmware capstone.',
        addModules: ['LoRaWAN & LPWAN Network Design', 'Marine NMEA 2000 Protocol Stack', 'PX4 Drone Autopilot Firmware'],
        removeTopics: ['Basic Arduino Blinking LED Labs', 'Outdated 8051 I2C only theory'],
      },
    ],
  },
};
