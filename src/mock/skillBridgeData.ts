import type {
  StudentProfile,
  SkillItem,
  RecommendedLearningPath,
  EnrolledCourse,
  AssessmentItem,
  OpportunityItem,
  TrainerItem,
  TrainingProgramItem,
  CurriculumCourseItem,
  CurriculumRecommendation,
  PlacementMetric,
  SkillDemandRecord,
  EmergingSkillRecord,
  DataSourceItem,
  RegionalTrendItem,
  InstituteInsightItem
} from '../types/skillbridge';

// ==========================================
// 1. STUDENT DEMO PROFILE & MOCK STUDENTS
// ==========================================
export const mockDemoStudent: StudentProfile = {
  id: 'STU-1001',
  name: 'Rahul Kumar',
  email: 'rahul@example.com',
  instituteId: 'INST-01',
  instituteName: 'Hyderabad Institute of Technology & Science',
  program: 'B.Tech Data Science & Analytics',
  year: 'Year 3 (Semester 6)',
  cgpa: 8.4,
  readinessScore: 72,
  learningProgress: 68,
  assessmentAvg: 76,
  skillsMatchedCount: 8,
  skillsTotalCount: 12,
  placementStatus: 'Looking'
};

export const mockStudentsList: StudentProfile[] = [
  mockDemoStudent,
  {
    id: 'STU-1002',
    name: 'Ananya Sharma',
    email: 'ananya.s@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Computer Science & Engineering',
    year: 'Year 4 (Semester 8)',
    cgpa: 9.1,
    readinessScore: 86,
    learningProgress: 91,
    assessmentAvg: 89,
    skillsMatchedCount: 11,
    skillsTotalCount: 12,
    placementStatus: 'Placed'
  },
  {
    id: 'STU-1003',
    name: 'Karthik Reddy',
    email: 'karthik.r@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Artificial Intelligence',
    year: 'Year 3 (Semester 6)',
    cgpa: 7.8,
    readinessScore: 64,
    learningProgress: 58,
    assessmentAvg: 68,
    skillsMatchedCount: 7,
    skillsTotalCount: 12,
    placementStatus: 'Looking'
  },
  {
    id: 'STU-1004',
    name: 'Sneha Iyer',
    email: 'sneha.iyer@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Information Technology',
    year: 'Year 4 (Semester 8)',
    cgpa: 8.7,
    readinessScore: 82,
    learningProgress: 88,
    assessmentAvg: 84,
    skillsMatchedCount: 10,
    skillsTotalCount: 12,
    placementStatus: 'Placed'
  },
  {
    id: 'STU-1005',
    name: 'Vikram Malhotra',
    email: 'vikram.m@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Data Science & Analytics',
    year: 'Year 3 (Semester 5)',
    cgpa: 7.2,
    readinessScore: 54,
    learningProgress: 46,
    assessmentAvg: 60,
    skillsMatchedCount: 5,
    skillsTotalCount: 12,
    placementStatus: 'Looking'
  },
  {
    id: 'STU-1006',
    name: 'Divya Nair',
    email: 'divya.n@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Computer Science & Engineering',
    year: 'Year 4 (Semester 7)',
    cgpa: 8.9,
    readinessScore: 79,
    learningProgress: 84,
    assessmentAvg: 81,
    skillsMatchedCount: 9,
    skillsTotalCount: 12,
    placementStatus: 'In Process'
  },
  {
    id: 'STU-1007',
    name: 'Rohan Verma',
    email: 'rohan.v@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Cloud & Systems',
    year: 'Year 3 (Semester 6)',
    cgpa: 7.5,
    readinessScore: 61,
    learningProgress: 52,
    assessmentAvg: 65,
    skillsMatchedCount: 6,
    skillsTotalCount: 12,
    placementStatus: 'Looking'
  },
  {
    id: 'STU-1008',
    name: 'Pooja Hegde',
    email: 'pooja.h@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech AI & Data Science',
    year: 'Year 4 (Semester 8)',
    cgpa: 9.3,
    readinessScore: 92,
    learningProgress: 95,
    assessmentAvg: 94,
    skillsMatchedCount: 12,
    skillsTotalCount: 12,
    placementStatus: 'Placed'
  },
  {
    id: 'STU-1009',
    name: 'Aditya Rao',
    email: 'aditya.rao@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Computer Science',
    year: 'Year 4 (Semester 7)',
    cgpa: 7.9,
    readinessScore: 71,
    learningProgress: 75,
    assessmentAvg: 73,
    skillsMatchedCount: 8,
    skillsTotalCount: 12,
    placementStatus: 'In Process'
  },
  {
    id: 'STU-1010',
    name: 'Meera Nambiar',
    email: 'meera.n@example.com',
    instituteId: 'INST-01',
    instituteName: 'Hyderabad Institute of Technology & Science',
    program: 'B.Tech Electronics & Communication',
    year: 'Year 3 (Semester 6)',
    cgpa: 8.2,
    readinessScore: 69,
    learningProgress: 64,
    assessmentAvg: 72,
    skillsMatchedCount: 7,
    skillsTotalCount: 12,
    placementStatus: 'Looking'
  }
];

// ==========================================
// 2. STUDENT SKILLS & SNAPSHOT
// ==========================================
export const mockStudentSkills: SkillItem[] = [
  {
    id: 'SK-01',
    name: 'Python',
    category: 'Programming',
    proficiency: 85,
    industryDemand: 'High',
    gapIndicator: 'Strong',
    demandPct: 88,
    gapPct: 3,
    description: 'Data structures, OOP, scientific packages (NumPy, Pandas), scripting and clean code architecture.'
  },
  {
    id: 'SK-02',
    name: 'SQL',
    category: 'Data',
    proficiency: 72,
    industryDemand: 'Very High',
    gapIndicator: 'Moderate gap',
    demandPct: 85,
    gapPct: 13,
    description: 'Complex aggregations, window functions, CTEs, indexing, query planning and relational modeling.'
  },
  {
    id: 'SK-03',
    name: 'Machine Learning',
    category: 'AI & ML',
    proficiency: 64,
    industryDemand: 'High',
    gapIndicator: 'Moderate gap',
    demandPct: 78,
    gapPct: 14,
    description: 'Supervised/unsupervised algorithms, scikit-learn, model cross-validation, hyperparameter tuning.'
  },
  {
    id: 'SK-04',
    name: 'Data Visualization',
    category: 'Data',
    proficiency: 58,
    industryDemand: 'High',
    gapIndicator: 'Moderate gap',
    demandPct: 70,
    gapPct: 12,
    description: 'Exploratory data analysis with Matplotlib/Seaborn and interactive business dashboards in Power BI/Tableau.'
  },
  {
    id: 'SK-05',
    name: 'Cloud Computing',
    category: 'Cloud',
    proficiency: 42,
    industryDemand: 'High',
    gapIndicator: 'High gap',
    demandPct: 75,
    gapPct: 33,
    description: 'Core cloud services (AWS/Azure), virtualization, serverless compute, and distributed storage foundations.'
  },
  {
    id: 'SK-06',
    name: 'Communication',
    category: 'Soft Skills',
    proficiency: 61,
    industryDemand: 'High',
    gapIndicator: 'Moderate gap',
    demandPct: 80,
    gapPct: 19,
    description: 'Technical presentation, recruiter interview clarity, stakeholder reporting and collaborative documentation.'
  },
  {
    id: 'SK-07',
    name: 'Power BI',
    category: 'Data',
    proficiency: 48,
    industryDemand: 'High',
    gapIndicator: 'Moderate gap',
    demandPct: 70,
    gapPct: 22,
    description: 'DAX formulas, dimensional modeling, star schemas, and automated report refreshes.'
  },
  {
    id: 'SK-08',
    name: 'Git & Version Control',
    category: 'Programming',
    proficiency: 78,
    industryDemand: 'Very High',
    gapIndicator: 'Strong',
    demandPct: 82,
    gapPct: 4,
    description: 'Branching workflows, pull requests, resolving merge conflicts, and code review etiquette.'
  },
  {
    id: 'SK-09',
    name: 'FastAPI & REST APIs',
    category: 'Programming',
    proficiency: 52,
    industryDemand: 'High',
    gapIndicator: 'Moderate gap',
    demandPct: 68,
    gapPct: 16,
    description: 'Async endpoints, Pydantic schemas, dependency injection, and Swagger API documentation.'
  },
  {
    id: 'SK-10',
    name: 'Generative AI & LLMs',
    category: 'AI & ML',
    proficiency: 38,
    industryDemand: 'Very High',
    gapIndicator: 'High gap',
    demandPct: 72,
    gapPct: 34,
    description: 'Prompt engineering, Retrieval-Augmented Generation (RAG), embeddings, and LangChain basics.'
  }
];

// ==========================================
// 3. AI RECOMMENDED LEARNING PATH
// ==========================================
export const mockLearningPath: RecommendedLearningPath[] = [
  {
    id: 'PATH-01',
    title: 'Cloud Fundamentals',
    skillId: 'SK-05',
    reason: 'Industry demand for Cloud has surged by 34%; your current proficiency is 42% against 75% required.',
    estimatedHours: '8 hours',
    priority: 'High',
    completed: false
  },
  {
    id: 'PATH-02',
    title: 'Power BI & Visual Analytics',
    skillId: 'SK-07',
    reason: '82% of Data Analyst openings require interactive dashboarding; current proficiency is 48%.',
    estimatedHours: '12 hours',
    priority: 'High',
    completed: false
  },
  {
    id: 'PATH-03',
    title: 'Advanced SQL (Window Functions & CTEs)',
    skillId: 'SK-02',
    reason: 'Enterprise data pipelines mandate complex SQL transformations to clear technical coding rounds.',
    estimatedHours: '6 hours',
    priority: 'Medium',
    completed: false
  },
  {
    id: 'PATH-04',
    title: 'Communication for Technical Interviews',
    skillId: 'SK-06',
    reason: 'Non-placement diagnostics show 22% drop-off occurs during behavioral and technical interview communication.',
    estimatedHours: '4 hours',
    priority: 'Medium',
    completed: false
  }
];

// ==========================================
// 4. STUDENT ENROLLED COURSES
// ==========================================
export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 'CRS-101',
    title: 'Machine Learning Foundations',
    category: 'AI & ML',
    progressPct: 65,
    lastActivity: 'Yesterday • Chapter 4: Decision Trees',
    totalModules: 20,
    completedModules: 13,
    isCompleted: false
  },
  {
    id: 'CRS-102',
    title: 'Big Data Analytics with Spark',
    category: 'Data',
    progressPct: 42,
    lastActivity: '3 days ago • Chapter 2: RDDs & DataFrames',
    totalModules: 19,
    completedModules: 8,
    isCompleted: false
  },
  {
    id: 'CRS-103',
    title: 'Enterprise SQL for Data Engineering',
    category: 'Data',
    progressPct: 80,
    lastActivity: 'Today • Chapter 6: Index Optimization',
    totalModules: 20,
    completedModules: 16,
    isCompleted: false
  }
];

export const mockRecommendedCourses: EnrolledCourse[] = [
  {
    id: 'CRS-REC-01',
    title: 'Practical Cloud Computing & Docker Lab',
    category: 'Cloud',
    progressPct: 0,
    lastActivity: 'Recommended by Skill Intelligence Team',
    totalModules: 14,
    completedModules: 0,
    isCompleted: false
  },
  {
    id: 'CRS-REC-02',
    title: 'Business Intelligence & Power BI Masterclass',
    category: 'Data',
    progressPct: 0,
    lastActivity: 'Recommended based on skill gap (+22%)',
    totalModules: 16,
    completedModules: 0,
    isCompleted: false
  }
];

// ==========================================
// 5. STUDENT ASSESSMENTS
// ==========================================
export const mockAssessments: AssessmentItem[] = [
  {
    id: 'ASM-01',
    title: 'SQL Query & Schema Assessment',
    skill: 'SQL',
    date: '18 Sep 2026',
    status: 'Upcoming',
    totalQuestions: 25,
    duration: '45 mins'
  },
  {
    id: 'ASM-02',
    title: 'Cloud Fundamentals Benchmark',
    skill: 'Cloud Computing',
    date: '22 Sep 2026',
    status: 'Upcoming',
    totalQuestions: 30,
    duration: '60 mins'
  },
  {
    id: 'ASM-03',
    title: 'Machine Learning Core Evaluation',
    skill: 'Machine Learning',
    date: '10 Sep 2026',
    status: 'Completed',
    score: 76,
    totalQuestions: 30,
    duration: '60 mins'
  },
  {
    id: 'ASM-04',
    title: 'Python Scripting & Data Structures',
    skill: 'Python',
    date: '28 Aug 2026',
    status: 'Completed',
    score: 88,
    totalQuestions: 40,
    duration: '75 mins'
  },
  {
    id: 'ASM-05',
    title: 'Applied Statistics & Probability',
    skill: 'Data',
    date: '14 Aug 2026',
    status: 'Completed',
    score: 82,
    totalQuestions: 20,
    duration: '40 mins'
  }
];

// ==========================================
// 6. STUDENT OPPORTUNITIES (JOB MATCHES)
// ==========================================
export const mockOpportunities: OpportunityItem[] = [
  {
    id: 'OPP-01',
    roleTitle: 'Junior Data Analyst',
    company: 'FinEdge Technologies',
    location: 'Hyderabad (HITEC City)',
    matchPct: 82,
    matchedSkills: ['Python', 'SQL', 'Data Visualization', 'Git'],
    skillsToImprove: ['Power BI', 'Cloud Fundamentals'],
    salaryRange: '₹6.5 - 8.2 LPA',
    type: 'Full-time • Fresh Graduate'
  },
  {
    id: 'OPP-02',
    roleTitle: 'Associate Analytics Engineer',
    company: 'CloudScale Systems',
    location: 'Bengaluru (Hybrid)',
    matchPct: 78,
    matchedSkills: ['SQL', 'Python', 'Machine Learning'],
    skillsToImprove: ['Cloud Computing', 'dbt', 'Data Pipelines'],
    salaryRange: '₹7.0 - 9.5 LPA',
    type: 'Full-time • Entry Level'
  },
  {
    id: 'OPP-03',
    roleTitle: 'Business Intelligence Trainee',
    company: 'Apex Decision Insights',
    location: 'Pune',
    matchPct: 85,
    matchedSkills: ['Data Visualization', 'SQL', 'Communication', 'Python'],
    skillsToImprove: ['Power BI DAX'],
    salaryRange: '₹5.5 - 7.0 LPA',
    type: 'Internship with PPO'
  }
];

// ==========================================
// 7. INSTITUTE TRAINERS
// ==========================================
export const mockTrainers: TrainerItem[] = [
  {
    id: 'TR-01',
    name: 'Arjun Rao',
    specialization: 'Machine Learning & Applied AI',
    coursesCount: 2,
    studentsCount: 180,
    performanceRating: 4.8,
    courses: ['Machine Learning Foundations', 'Deep Learning Basics'],
    studentAvgReadiness: 76,
    topSkillGapAmongStudents: 'MLOps & Deployment',
    recommendedUpskilling: 'Triton Server & vLLM Inference Optimization'
  },
  {
    id: 'TR-02',
    name: 'Priya Sharma',
    specialization: 'Data Analytics & Engineering',
    coursesCount: 3,
    studentsCount: 240,
    performanceRating: 4.9,
    courses: ['Enterprise SQL', 'Power BI Masterclass', 'Business Statistics'],
    studentAvgReadiness: 81,
    topSkillGapAmongStudents: 'Cloud Data Warehousing',
    recommendedUpskilling: 'dbt Core & Snowflake Analytics Engineering'
  },
  {
    id: 'TR-03',
    name: 'Rajesh Kulkarni',
    specialization: 'Cloud Computing & Infrastructure',
    coursesCount: 2,
    studentsCount: 190,
    performanceRating: 4.6,
    courses: ['Cloud Fundamentals', 'Linux Systems'],
    studentAvgReadiness: 58,
    topSkillGapAmongStudents: 'Container Orchestration',
    recommendedUpskilling: 'Kubernetes Admin (CKA) & Terraform Infrastructure'
  },
  {
    id: 'TR-04',
    name: 'Dr. Meenakshi Sundaram',
    specialization: 'Database Architectures',
    coursesCount: 2,
    studentsCount: 210,
    performanceRating: 4.7,
    courses: ['Database Systems', 'Distributed Data'],
    studentAvgReadiness: 78,
    topSkillGapAmongStudents: 'Vector Search',
    recommendedUpskilling: 'Vector Databases (Pinecone/Milvus) & Indexing'
  },
  {
    id: 'TR-05',
    name: 'Ananya Desai',
    specialization: 'Technical Communication & Workplace Skills',
    coursesCount: 4,
    studentsCount: 420,
    performanceRating: 4.9,
    courses: ['Professional Communication', 'Interview Mastery'],
    studentAvgReadiness: 74,
    topSkillGapAmongStudents: 'System Design Pitching',
    recommendedUpskilling: 'AI-assisted Pitch & Presentation Coaching'
  }
];

// ==========================================
// 8. INSTITUTE TRAINING PROGRAMS
// ==========================================
export const mockTrainingPrograms: TrainingProgramItem[] = [
  {
    id: 'PROG-01',
    title: 'Data Science Foundation',
    category: 'Data Science',
    enrolledStudents: 320,
    completionRate: 78,
    durationWeeks: 12,
    trainerName: 'Priya Sharma',
    status: 'Active'
  },
  {
    id: 'PROG-02',
    title: 'AI & Machine Learning',
    category: 'AI & ML',
    enrolledStudents: 180,
    completionRate: 64,
    durationWeeks: 16,
    trainerName: 'Arjun Rao',
    status: 'Active'
  },
  {
    id: 'PROG-03',
    title: 'Cloud Computing & DevOps',
    category: 'Cloud',
    enrolledStudents: 210,
    completionRate: 52,
    durationWeeks: 10,
    trainerName: 'Rajesh Kulkarni',
    status: 'Active'
  },
  {
    id: 'PROG-04',
    title: 'Enterprise SQL & Modern BI',
    category: 'Data',
    enrolledStudents: 290,
    completionRate: 84,
    durationWeeks: 8,
    trainerName: 'Priya Sharma',
    status: 'Active'
  },
  {
    id: 'PROG-05',
    title: 'Full Stack Web Engineering',
    category: 'Software Engineering',
    enrolledStudents: 260,
    completionRate: 71,
    durationWeeks: 14,
    trainerName: 'Dr. Meenakshi Sundaram',
    status: 'Active'
  }
];

// ==========================================
// 9. INSTITUTE PLACEMENTS & NON-PLACEMENT DATA
// ==========================================
export const mockPlacementMetrics: PlacementMetric = {
  totalEligible: 4820,
  totalPlaced: 3508,
  placementRate: 72.8,
  seekingPlacement: 1312,
  avgPackageLPA: 7.2,
  nonPlacementReasons: [
    {
      reason: 'Skill gap',
      percentage: 34,
      count: 446,
      description: 'Technical disparity in hands-on cloud labs, distributed queries, and modern framework practice.'
    },
    {
      reason: 'Communication',
      percentage: 22,
      count: 288,
      description: 'Candidate unable to articulate architectural decisions and problem-solving rationale during interviews.'
    },
    {
      reason: 'Lack of certification',
      percentage: 18,
      count: 236,
      description: 'Recruiters prioritized candidates with verified vendor credentials (AWS Cloud Practitioner, Azure Fundamentals).'
    },
    {
      reason: 'Interview readiness',
      percentage: 12,
      count: 157,
      description: 'Struggled with live timed coding rounds and mock technical evaluation hurdles.'
    },
    {
      reason: 'Location constraints',
      percentage: 8,
      count: 105,
      description: 'Reluctance to relocate from Tier-2 home towns to metro tech corridors (Bengaluru, Pune, NCR).'
    },
    {
      reason: 'Lack of local jobs',
      percentage: 6,
      count: 80,
      description: 'Limited regional hiring quota for specialized technical sub-disciplines in rural state zones.'
    }
  ]
};

// ==========================================
// 10. INSTITUTE CURRICULUM AUDIT & PROPOSALS
// ==========================================
export const mockCurriculumCourses: CurriculumCourseItem[] = [
  {
    id: 'CURR-01',
    courseCode: 'CS-302',
    title: 'Database Management Systems',
    program: 'B.Tech CSE & Data Science',
    currentRelevance: 'High',
    industryDemand: 'High',
    alignmentPct: 78,
    outdatedModules: ['Hierarchical DB Models', 'Legacy XML DB Queries'],
    modernReplacements: ['Distributed Query Optimization', 'PostgreSQL JSONB & Indexing']
  },
  {
    id: 'CURR-02',
    courseCode: 'CS-405',
    title: 'Cloud Computing & Infrastructure',
    program: 'B.Tech CSE & IT',
    currentRelevance: 'Medium',
    industryDemand: 'Very High',
    alignmentPct: 54,
    outdatedModules: ['Legacy On-Prem Virtualization', 'Manual Server Provisioning'],
    modernReplacements: ['AWS/Azure Cloud Sandboxes', 'Docker Containers & Kubernetes']
  },
  {
    id: 'CURR-03',
    courseCode: 'DS-204',
    title: 'Data Visualization & Business Intelligence',
    program: 'B.Tech Data Science',
    currentRelevance: 'High',
    industryDemand: 'High',
    alignmentPct: 70,
    outdatedModules: ['Static Excel Macros', 'Manual Chart Formatting'],
    modernReplacements: ['Power BI DAX Modeling', 'Interactive Tableau Dashboards']
  },
  {
    id: 'CURR-04',
    courseCode: 'CS-201',
    title: 'Object-Oriented Programming',
    program: 'B.Tech CSE',
    currentRelevance: 'High',
    industryDemand: 'High',
    alignmentPct: 82,
    outdatedModules: ['C++ Turbo IDE Tooling', 'File Stream Buffers'],
    modernReplacements: ['Modern Python 3.12+', 'Clean Architecture & Unit Tests']
  }
];

// ==========================================
// 11. CURRICULUM RECOMMENDATION (HERO CLOSED LOOP)
// ==========================================
export const mockHeroRecommendation: CurriculumRecommendation = {
  id: 'REC-2026-CLOUD',
  title: 'Increase Cloud Computing Practical Training',
  targetCourse: 'Cloud Computing & Infrastructure (CS-405)',
  evidence: 'Analysis of 128,450 active national tech postings reveals a 34% surge in cloud requisitions. Current student proficiency in Tier-2 institutions averages 42%, while entry-level employers mandate at least 75%.',
  currentProficiencyPct: 42,
  industryRequiredPct: 75,
  impact: 'High',
  recommendedAction: 'Mandate 40 hours of hands-on cloud sandbox labs (Docker, AWS Fundamentals) and introduce real-world deployment capstone projects.',
  status: 'draft', // changes to 'sent_to_institute' then 'accepted_by_institute' during demo
  timestamp: 'Sep 16, 2026 • 09:30 AM'
};

// ==========================================
// 12. SKILL INTELLIGENCE DATA
// ==========================================
export const mockSkillDemandTable: SkillDemandRecord[] = [
  { skill: 'Python', category: 'Programming', demandLevel: 'Very High', growthPct: 18, studentSupply: 'High' },
  { skill: 'SQL', category: 'Data', demandLevel: 'Very High', growthPct: 21, studentSupply: 'Medium' },
  { skill: 'Cloud Computing', category: 'Cloud', demandLevel: 'High', growthPct: 34, studentSupply: 'Low' },
  { skill: 'Generative AI', category: 'AI & ML', demandLevel: 'Very High', growthPct: 48, studentSupply: 'Very Low' },
  { skill: 'Data Engineering (dbt/Spark)', category: 'Data', demandLevel: 'High', growthPct: 29, studentSupply: 'Low' },
  { skill: 'Cybersecurity & IAM', category: 'Security', demandLevel: 'High', growthPct: 26, studentSupply: 'Medium' },
  { skill: 'Power BI & Visual Analytics', category: 'Data', demandLevel: 'High', growthPct: 24, studentSupply: 'Medium' },
  { skill: 'DevOps & Docker/K8s', category: 'Cloud', demandLevel: 'High', growthPct: 31, studentSupply: 'Low' },
  { skill: 'FastAPI / Microservices', category: 'Programming', demandLevel: 'Medium', growthPct: 15, studentSupply: 'Medium' }
];

export const mockEmergingSkills: EmergingSkillRecord[] = [
  {
    name: 'Generative AI & LLM Systems',
    growthStatus: 'Rapidly growing',
    growthRatePct: 48,
    evidence: '18,400 new job postings across Indian tech hubs specifically mandate prompt chaining and RAG architecture.',
    timePeriod: 'Last 12 Months (2025 - 2026)',
    relevantIndustries: ['AI & SaaS', 'Fintech', 'Enterprise IT', 'EdTech']
  },
  {
    name: 'Cloud Security & DevSecOps',
    growthStatus: 'Growing',
    growthRatePct: 36,
    evidence: 'Increased regulatory compliance mandates in BFSI driven by RBI digital security directives.',
    timePeriod: 'Last 12 Months',
    relevantIndustries: ['Banking & Finance', 'Cloud Platforms', 'Healthcare IT']
  },
  {
    name: 'Data Engineering & Analytics Eng',
    growthStatus: 'Growing',
    growthRatePct: 29,
    evidence: '24,500 active job openings requiring dbt, Snowflake, and real-time Kafka event streaming.',
    timePeriod: 'Last 18 Months',
    relevantIndustries: ['E-commerce', 'Fintech', 'SaaS', 'Telecom']
  },
  {
    name: 'MLOps & Model Lifecycle Management',
    growthStatus: 'Emerging',
    growthRatePct: 42,
    evidence: 'Enterprises moving from experimental notebooks to scalable model serving pipelines (vLLM, Triton).',
    timePeriod: 'Last 6 Months',
    relevantIndustries: ['AI Product Firms', 'Autonomous Systems', 'Retail AI']
  }
];

export const mockRegionalTrends: RegionalTrendItem[] = [
  {
    region: 'Hyderabad',
    state: 'Telangana',
    topSkillsInDemand: [
      { skill: 'AI & Data Analytics', demandLevel: 'Very High' },
      { skill: 'Cloud Computing', demandLevel: 'High' },
      { skill: 'VLSI & Hardware', demandLevel: 'High' }
    ],
    topSectors: ['Information Technology', 'Semiconductors', 'Pharma Tech'],
    deficitScore: 26
  },
  {
    region: 'Bengaluru',
    state: 'Karnataka',
    topSkillsInDemand: [
      { skill: 'Generative AI', demandLevel: 'Very High' },
      { skill: 'Cloud & DevOps', demandLevel: 'Very High' },
      { skill: 'Product Management', demandLevel: 'High' }
    ],
    topSectors: ['SaaS & Startups', 'Aerospace', 'DeepTech'],
    deficitScore: 18
  },
  {
    region: 'Pune',
    state: 'Maharashtra',
    topSkillsInDemand: [
      { skill: 'Data Engineering', demandLevel: 'High' },
      { skill: 'Automotive IoT & EV', demandLevel: 'High' },
      { skill: 'Cloud Infrastructure', demandLevel: 'Medium' }
    ],
    topSectors: ['Auto & EV', 'Fintech', 'Enterprise IT'],
    deficitScore: 14
  },
  {
    region: 'Delhi NCR',
    state: 'National Capital Region',
    topSkillsInDemand: [
      { skill: 'Cybersecurity', demandLevel: 'High' },
      { skill: 'Full Stack Engineering', demandLevel: 'High' },
      { skill: 'AI Business Solutions', demandLevel: 'High' }
    ],
    topSectors: ['FinTech', 'E-commerce', 'Consulting'],
    deficitScore: 16
  },
  {
    region: 'Chennai',
    state: 'Tamil Nadu',
    topSkillsInDemand: [
      { skill: 'EV Powertrain & BMS', demandLevel: 'High' },
      { skill: 'Embedded Firmware', demandLevel: 'High' },
      { skill: 'Cloud Systems', demandLevel: 'Medium' }
    ],
    topSectors: ['Clean Energy & EV', 'SaaS', 'Manufacturing'],
    deficitScore: 21
  }
];

export const mockInstituteInsights: InstituteInsightItem[] = [
  {
    instituteName: 'Hyderabad Institute of Technology & Science',
    tier: 'Tier 2 Engineering',
    totalStudents: 4820,
    industryDemandSkill: 'Cloud Computing',
    studentProficiency: 'Low',
    gapLevel: 'High',
    recommendation: 'Increase Cloud Computing practical labs; add Docker & AWS sandbox training.'
  },
  {
    instituteName: 'Bangalore Institute of Advanced Computing',
    tier: 'Tier 1 Engineering',
    totalStudents: 3400,
    industryDemandSkill: 'Generative AI',
    studentProficiency: 'Medium',
    gapLevel: 'Moderate',
    recommendation: 'Provide high-throughput GPU sandbox credits for deep learning capstone projects.'
  },
  {
    instituteName: 'Pune College of Applied Sciences',
    tier: 'Tier 2 Engineering',
    totalStudents: 5100,
    industryDemandSkill: 'Enterprise SQL & BI',
    studentProficiency: 'High',
    gapLevel: 'Low',
    recommendation: 'Curriculum well-aligned; expand industry co-op internships for top 25% cohort.'
  },
  {
    instituteName: 'Gujarat State Polytechnic & Skills Node',
    tier: 'Tier 3 Vocational',
    totalStudents: 2900,
    industryDemandSkill: 'Industrial IoT & Cloud',
    studentProficiency: 'Low',
    gapLevel: 'High',
    recommendation: 'Urgent faculty upskilling required; subsidize lab training kits.'
  }
];

export const mockDataSources: DataSourceItem[] = [
  {
    source: 'National Job Requisitions Feed (Naukri, LinkedIn, Foundit APIs)',
    lastUpdated: 'Today • 08:00 AM',
    recordsCount: '128,450 records',
    status: 'Active',
    confidenceScore: 98
  },
  {
    source: 'Periodic Labour Force Survey (PLFS NSSO Q4 2025)',
    lastUpdated: '15 Aug 2026',
    recordsCount: '45,000 household samples',
    status: 'Synced',
    confidenceScore: 94
  },
  {
    source: 'AICTE & State University Model Syllabi Registry',
    lastUpdated: '01 Sep 2026',
    recordsCount: '840 audited curricula',
    status: 'Synced',
    confidenceScore: 96
  },
  {
    source: 'Employer Post-Hire Workplace Survey (Global Industry & Enterprise Talent Network)',
    lastUpdated: '12 Sep 2026',
    recordsCount: '650 hiring partners',
    status: 'Active',
    confidenceScore: 92
  },
  {
    source: 'Institutional Student Assessment Telemetry Stream',
    lastUpdated: 'Real-time (Active)',
    recordsCount: '94,200 test submissions',
    status: 'Active',
    confidenceScore: 99
  }
];
