import type { TimeSeriesPoint } from '../types';

export const mockMonthlyTrends: TimeSeriesPoint[] = [
  {
    month: 'Oct 2025',
    jobDemand: 71200,
    hiringVelocity: 74,
    aiDataDemand: 22100,
    dataAnalystDemand: 9100,
    curriculumAlignmentAvg: 56.2
  },
  {
    month: 'Nov 2025',
    jobDemand: 73400,
    hiringVelocity: 76,
    aiDataDemand: 23400,
    dataAnalystDemand: 9600,
    curriculumAlignmentAvg: 55.8
  },
  {
    month: 'Dec 2025',
    jobDemand: 75100,
    hiringVelocity: 77,
    aiDataDemand: 24800,
    dataAnalystDemand: 10200,
    curriculumAlignmentAvg: 55.0
  },
  {
    month: 'Jan 2026',
    jobDemand: 78900,
    hiringVelocity: 81,
    aiDataDemand: 26500,
    dataAnalystDemand: 11100,
    curriculumAlignmentAvg: 54.1
  },
  {
    month: 'Feb 2026',
    jobDemand: 82100,
    hiringVelocity: 83,
    aiDataDemand: 27900,
    dataAnalystDemand: 11900,
    curriculumAlignmentAvg: 53.4
  },
  {
    month: 'Mar 2026',
    jobDemand: 85600,
    hiringVelocity: 85,
    aiDataDemand: 29400,
    dataAnalystDemand: 12600,
    curriculumAlignmentAvg: 52.8
  },
  {
    month: 'Apr 2026',
    jobDemand: 88400,
    hiringVelocity: 87,
    aiDataDemand: 30800,
    dataAnalystDemand: 13200,
    curriculumAlignmentAvg: 52.0
  },
  {
    month: 'May 2026',
    jobDemand: 91200,
    hiringVelocity: 89,
    aiDataDemand: 32100,
    dataAnalystDemand: 13900,
    curriculumAlignmentAvg: 51.5
  },
  {
    month: 'Jun 2026',
    jobDemand: 93800,
    hiringVelocity: 90,
    aiDataDemand: 33200,
    dataAnalystDemand: 14500,
    curriculumAlignmentAvg: 50.9
  },
  {
    month: 'Jul 2026',
    jobDemand: 95700,
    hiringVelocity: 91,
    aiDataDemand: 34100,
    dataAnalystDemand: 15100,
    curriculumAlignmentAvg: 50.2
  },
  {
    month: 'Aug 2026',
    jobDemand: 97400,
    hiringVelocity: 92,
    aiDataDemand: 35000,
    dataAnalystDemand: 15600,
    curriculumAlignmentAvg: 49.8
  },
  {
    month: 'Sep 2026',
    jobDemand: 99800,
    hiringVelocity: 93,
    aiDataDemand: 36200,
    dataAnalystDemand: 16200,
    curriculumAlignmentAvg: 49.2
  }
];

export interface SkillDemandTrajectory {
  month: string;
  sqlAndDbt: number;
  genAiAnalytics: number;
  powerBiAndTableau: number;
  legacyQa: number;
}

export const mockSkillDemandTrajectories: SkillDemandTrajectory[] = [
  { month: 'Oct 25', sqlAndDbt: 68, genAiAnalytics: 32, powerBiAndTableau: 79, legacyQa: 64 },
  { month: 'Nov 25', sqlAndDbt: 70, genAiAnalytics: 38, powerBiAndTableau: 80, legacyQa: 60 },
  { month: 'Dec 25', sqlAndDbt: 73, genAiAnalytics: 44, powerBiAndTableau: 81, legacyQa: 56 },
  { month: 'Jan 26', sqlAndDbt: 77, genAiAnalytics: 52, powerBiAndTableau: 83, legacyQa: 51 },
  { month: 'Feb 26', sqlAndDbt: 80, genAiAnalytics: 61, powerBiAndTableau: 84, legacyQa: 46 },
  { month: 'Mar 26', sqlAndDbt: 83, genAiAnalytics: 69, powerBiAndTableau: 85, legacyQa: 42 },
  { month: 'Apr 26', sqlAndDbt: 86, genAiAnalytics: 76, powerBiAndTableau: 86, legacyQa: 39 },
  { month: 'May 26', sqlAndDbt: 88, genAiAnalytics: 82, powerBiAndTableau: 87, legacyQa: 36 },
  { month: 'Jun 26', sqlAndDbt: 90, genAiAnalytics: 87, powerBiAndTableau: 88, legacyQa: 33 },
  { month: 'Jul 26', sqlAndDbt: 91, genAiAnalytics: 90, powerBiAndTableau: 88, legacyQa: 30 },
  { month: 'Aug 26', sqlAndDbt: 93, genAiAnalytics: 93, powerBiAndTableau: 89, legacyQa: 27 },
  { month: 'Sep 26', sqlAndDbt: 94, genAiAnalytics: 95, powerBiAndTableau: 89, legacyQa: 24 }
];
