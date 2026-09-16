import { createBrowserRouter, Navigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { Overview } from '../pages/Overview';
import { LabourMarket } from '../pages/LabourMarket';
import { SkillIntelligence } from '../pages/SkillIntelligence';
import { CurriculumAlignment } from '../pages/CurriculumAlignment';
import { EarlyWarnings } from '../pages/EarlyWarnings';
import { Recommendations } from '../pages/Recommendations';
import { WhatIfSimulator } from '../pages/WhatIfSimulator';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Overview /> },
      { path: 'labour-market', element: <LabourMarket /> },
      { path: 'skill-intelligence', element: <SkillIntelligence /> },
      { path: 'curriculum-alignment', element: <CurriculumAlignment /> },
      { path: 'early-warnings', element: <EarlyWarnings /> },
      { path: 'recommendations', element: <Recommendations /> },
      { path: 'what-if-simulator', element: <WhatIfSimulator /> },
      { path: '*', element: <Navigate to="/" replace /> }
    ]
  }
]);
