export type UserRole = 'student' | 'trainer' | 'institute' | 'intelligence';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  instituteId: string;
  instituteName: string;
  program: string;
  year: string;
  cgpa: number;
  readinessScore: number;
  learningProgress: number;
  assessmentAvg: number;
  skillsMatchedCount: number;
  skillsTotalCount: number;
  placementStatus: 'Looking' | 'Placed' | 'In Process' | 'Not Seeking';
  avatarUrl?: string;
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'Programming' | 'Data' | 'AI & ML' | 'Cloud' | 'Soft Skills';
  proficiency: number; // 0 - 100
  industryDemand: 'Very High' | 'High' | 'Moderate' | 'Emerging';
  gapIndicator: 'Strong' | 'Moderate gap' | 'High gap';
  demandPct: number; // 0 - 100 benchmark
  gapPct: number; // demandPct - proficiency
  description: string;
}

export interface RecommendedLearningPath {
  id: string;
  title: string;
  skillId: string;
  reason: string;
  estimatedHours: string;
  priority: 'High' | 'Medium' | 'Low';
  completed: boolean;
}

export interface EnrolledCourse {
  id: string;
  title: string;
  category: string;
  progressPct: number;
  lastActivity: string;
  totalModules: number;
  completedModules: number;
  isCompleted: boolean;
}

export interface AssessmentItem {
  id: string;
  title: string;
  skill: string;
  date: string;
  status: 'Upcoming' | 'Completed' | 'Pending';
  score?: number;
  totalQuestions?: number;
  duration?: string;
}

export interface OpportunityItem {
  id: string;
  roleTitle: string;
  company: string;
  location: string;
  matchPct: number;
  matchedSkills: string[];
  skillsToImprove: string[];
  salaryRange: string;
  type: string;
}

export interface TrainerItem {
  id: string;
  name: string;
  specialization: string;
  coursesCount: number;
  studentsCount: number;
  performanceRating: number;
  courses: string[];
  studentAvgReadiness: number;
  topSkillGapAmongStudents: string;
  recommendedUpskilling: string;
}

export interface TrainingProgramItem {
  id: string;
  title: string;
  category: string;
  enrolledStudents: number;
  completionRate: number;
  durationWeeks: number;
  trainerName: string;
  status: 'Active' | 'Upcoming' | 'Completed';
}

export interface CurriculumCourseItem {
  id: string;
  courseCode: string;
  title: string;
  program: string;
  currentRelevance: 'High' | 'Medium' | 'Low' | 'Outdated';
  industryDemand: 'Very High' | 'High' | 'Medium';
  alignmentPct: number;
  outdatedModules: string[];
  modernReplacements: string[];
}

export interface CurriculumRecommendation {
  id: string;
  title: string;
  targetCourse: string;
  evidence: string;
  currentProficiencyPct: number;
  industryRequiredPct: number;
  impact: 'High' | 'Medium' | 'Critical';
  recommendedAction: string;
  status: 'draft' | 'sent_to_institute' | 'accepted_by_institute' | 'under_review';
  timestamp: string;
}

export interface NonPlacementReason {
  reason: 'Skill gap' | 'Communication' | 'Lack of certification' | 'Interview readiness' | 'Location constraints' | 'Lack of local jobs';
  percentage: number;
  count: number;
  description: string;
}

export interface PlacementMetric {
  totalEligible: number;
  totalPlaced: number;
  placementRate: number;
  seekingPlacement: number;
  avgPackageLPA: number;
  nonPlacementReasons: NonPlacementReason[];
}

export interface LabourMarketRecord {
  id: string;
  roleTitle: string;
  sector: string;
  activePostings: number;
  yoyGrowthPct: number;
  topSkills: string[];
  salaryRange: string;
  regionalHotspots: string[];
}

export interface SkillDemandRecord {
  skill: string;
  category: string;
  demandLevel: 'Very High' | 'High' | 'Medium';
  growthPct: number;
  studentSupply: 'Very Low' | 'Low' | 'Medium' | 'High';
}

export interface EmergingSkillRecord {
  name: string;
  growthStatus: 'Rapidly growing' | 'Growing' | 'Emerging';
  growthRatePct: number;
  evidence: string;
  timePeriod: string;
  relevantIndustries: string[];
}

export interface DataSourceItem {
  source: string;
  lastUpdated: string;
  recordsCount: string;
  status: 'Active' | 'Synced' | 'Scheduled';
  confidenceScore: number;
}

export interface RegionalTrendItem {
  region: string;
  state: string;
  topSkillsInDemand: { skill: string; demandLevel: string }[];
  topSectors: string[];
  deficitScore: number;
}

export interface InstituteInsightItem {
  instituteName: string;
  tier: string;
  totalStudents: number;
  industryDemandSkill: string;
  studentProficiency: 'High' | 'Medium' | 'Low';
  gapLevel: 'High' | 'Moderate' | 'Low';
  recommendation: string;
}
