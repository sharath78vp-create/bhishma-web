import type { EvidenceRecord } from '../types';

export const mockEvidenceRecords: EvidenceRecord[] = [
  {
    id: 'EVD-01',
    source: 'Nasscom-Zinnov Future of Skills Telemetry 2026',
    sourceType: 'Industry Body Report',
    description: 'Analysis of 185,000 technology job postings in India showed a 38.5% YoY spike for Data Analysts equipped with cloud analytics engineering skills (dbt, Snowflake) and interactive dashboarding, against an acute 46% collegiate syllabus obsolescence in Tier-2 institutions.',
    sampleSize: '185,000 Job Postings & 450 Enterprise Surveys',
    confidenceScore: 96,
    verifiedDate: '2026-08-10',
    relevance: 'Direct Driver',
    relatedRecommendationId: 'POL-304',
    keyMetricHighlight: '+38.5% YoY hiring velocity; 46% syllabus alignment gap'
  },
  {
    id: 'EVD-02',
    source: 'AICTE Model Curriculum Syllabus Gap Audit (Telangana Engineering Cluster)',
    sourceType: 'Academic Audit',
    description: 'Comparative keyword extraction of 42 affiliated engineering colleges under JNTU-H and Osmania University indicated that 78% of B.Tech Data Science courses still teach legacy Excel 2007 and FoxPro DB models, with only 12% offering cloud data warehouse labs.',
    sampleSize: '42 Accredited University Syllabi',
    confidenceScore: 94,
    verifiedDate: '2026-07-25',
    relevance: 'Direct Driver',
    relatedRecommendationId: 'POL-304',
    keyMetricHighlight: '78% syllabi retain deprecated tooling; only 12% offer cloud labs'
  },
  {
    id: 'EVD-03',
    source: 'National Sample Survey Office (PLFS Periodic Labour Force Survey Q4 2025)',
    sourceType: 'Government Survey',
    description: 'Quarterly macro labour statistics reporting formal youth employment in IT hubs. Highlighted that engineering graduates in Telangana face an average 5.4-month hiring lag due to mandatory post-college corporate retraining bootcamps.',
    sampleSize: '128,000 Urban Households Sampled',
    confidenceScore: 91,
    verifiedDate: '2026-06-30',
    relevance: 'Secondary Corroboration',
    relatedRecommendationId: 'POL-304',
    keyMetricHighlight: '5.4 months average corporate retraining lag for fresh graduates'
  },
  {
    id: 'EVD-04',
    source: 'BHISHMA Real-Time Job Ingestion Pipeline (Naukri, LinkedIn, Foundit APIs)',
    sourceType: 'Job Market Telemetry',
    description: 'Direct crawling and NLP parsing of active postings across Hyderabad, Bengaluru, and Pune showing that 94% of mid-tier Data Analyst requisitions mandate Advanced SQL and Power BI/Tableau, while 62% now evaluate candidate ability to leverage LLM agents for data synthesis.',
    sampleSize: '34,200 Active Hyderabad Postings',
    confidenceScore: 98,
    verifiedDate: '2026-09-08',
    relevance: 'Direct Driver',
    relatedRecommendationId: 'POL-304',
    keyMetricHighlight: '94% demand for modern BI; 62% evaluate generative AI prompting'
  },
  {
    id: 'EVD-05',
    source: 'India Semiconductor Mission (ISM) Manpower Projection Report 2026',
    sourceType: 'Industry Body Report',
    description: 'Government fab incentives and private commercial tapeouts in Gujarat and Karnataka project an immediate deficit of 24,000 qualified fabrication and verification engineers by Q3 2027.',
    sampleSize: '18 Semiconductor Design & Fab Consortiums',
    confidenceScore: 93,
    verifiedDate: '2026-08-14',
    relevance: 'Contextual Benchmark',
    relatedRecommendationId: 'POL-301',
    keyMetricHighlight: 'Shortfall of 24,000 VLSI engineers projected by Q3 2027'
  },
  {
    id: 'EVD-06',
    source: 'Society of Indian Automobile Manufacturers (SIAM) EV Skill Gap Study',
    sourceType: 'Enterprise Survey',
    description: 'Survey of EV OEMs and Tier-1 battery pack manufacturers in Pune, Chennai, and Hosur showing that 84% of mechanical engineering graduates lack foundational knowledge of Battery Management System (BMS) thermal simulation and CAN bus diagnostics.',
    sampleSize: '65 EV Manufacturing Plants & R&D Units',
    confidenceScore: 92,
    verifiedDate: '2026-07-15',
    relevance: 'Contextual Benchmark',
    relatedRecommendationId: 'POL-302',
    keyMetricHighlight: '84% mechanical grads lack BMS thermal and high-voltage training'
  }
];
