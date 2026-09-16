export type SkillStatus = 'emerging' | 'stable' | 'declining' | 'critical-shortage';
export type AlertSeverity = 'critical' | 'warning' | 'info';
export type PriorityLevel = 'high' | 'medium' | 'low';
export type RegionalSeverity = 'critical' | 'high' | 'moderate' | 'low';
export type EvidenceSourceType = 'Government Survey' | 'Job Market Telemetry' | 'Industry Body Report' | 'Academic Audit' | 'Enterprise Survey';

export interface LabourSignal {
  id: string;
  sector: string;
  subSector: string;
  roleTitle: string;
  activePostings: number;
  yoyGrowthPct: number;
  topSkillsRequired: string[];
  medianSalaryLakhs: number;
  hiringVelocityScore: number; // 0 - 100
  regionalDemandHotspots: string[];
}

export interface SkillMetric {
  id: string;
  name: string;
  category: 'Technical' | 'Analytical' | 'Domain Specific' | 'Foundational';
  status: SkillStatus;
  demandIndex: number;      // 0 - 100
  supplyIndex: number;      // 0 - 100
  gapScore: number;         // (demandIndex - supplyIndex)
  growthRatePct: number;
  topEmergingSectors: string[];
  description: string;
}

export interface CurriculumAudit {
  id: string;
  courseCode: string;
  courseName: string;
  program: string;
  institutionTier: 'Tier 1' | 'Tier 2' | 'Tier 3';
  alignmentScorePct: number;
  industryRelevanceScore: number;
  outdatedTopics: string[];
  recommendedModules: string[];
  currentCoverageSkills?: string[];
  missingSkills?: string[];
  lastReviewedDate: string;
}

export interface RegionalGap {
  id: string;
  state: string;
  region: string;
  coordinates: [number, number]; // [lat, lng]
  demandIndex: number;
  trainingCapacityIndex: number;
  netDeficit: number;
  severity?: RegionalSeverity;
  topSectorsInDemand: string[];
  vocationalInstitutesCount: number;
}

export interface EarlyWarningAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  sector: string;
  affectedRoles: string[];
  predictedImpactHorizon: string; // e.g., "6 - 12 Months"
  description: string;
  recommendedImmediateAction: string;
  timestamp: string;
}

export interface PolicyIntervention {
  id: string;
  title: string;
  targetSector: string;
  targetRegion: string;
  priority: PriorityLevel;
  interventionType: 'Curriculum Overhaul' | 'Faculty Upskilling' | 'Industry Co-op' | 'Infrastructure Grant';
  estimatedCostCr: number;
  projectedTalentOutput: number;
  implementationTimeMonths: number;
  rationale: string;
  relatedCourseIds?: string[];
  relatedSkillIds?: string[];
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  sectorFocus: string;
  parameters: {
    automationAdoptionRatePct: number;
    fdiInflowIncreasePct: number;
    curriculumRevisionLagMonths: number;
    trainingCapacityExpansionPct: number;
  };
  projectedDemandShiftPct: number;
  projectedSkillDeficitDelta: number;
  suggestedMitigation: string;
}

export interface EvidenceRecord {
  id: string;
  source: string;
  sourceType: EvidenceSourceType;
  description: string;
  sampleSize: string;
  confidenceScore: number; // 0 - 100 percentage
  verifiedDate: string;
  relevance: 'Direct Driver' | 'Secondary Corroboration' | 'Contextual Benchmark';
  relatedRecommendationId?: string;
  keyMetricHighlight?: string;
}

export interface TimeSeriesPoint {
  month: string;                    // e.g., "Oct 2025"
  jobDemand: number;                // active job postings volume
  hiringVelocity: number;           // 0 - 100 speed index
  aiDataDemand?: number;            // sector postings volume
  dataAnalystDemand?: number;       // hero role specific postings volume
  curriculumAlignmentAvg?: number;  // aggregate syllabus parity %
}
