import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '../layouts/AppLayout';
import { LandingPage } from '../pages/landing/LandingPage';
import { Login } from '../pages/auth/Login';
import { Register } from '../pages/auth/Register';

// Trainer Pages
import { TrainerOverview } from '../pages/trainer/TrainerOverview';

// Student Pages
import { StudentOverview } from '../pages/student/StudentOverview';
import { StudentMySkills } from '../pages/student/StudentMySkills';
import { StudentLearning } from '../pages/student/StudentLearning';
import { StudentAssessments } from '../pages/student/StudentAssessments';
import { StudentSkillGap } from '../pages/student/StudentSkillGap';
import { StudentOpportunities } from '../pages/student/StudentOpportunities';
import { StudentProfile } from '../pages/student/StudentProfile';

// Institute Pages
import { InstituteOverview } from '../pages/institute/InstituteOverview';
import { InstituteStudents } from '../pages/institute/InstituteStudents';
import { InstituteTrainers } from '../pages/institute/InstituteTrainers';
import { InstitutePrograms } from '../pages/institute/InstitutePrograms';
import { InstituteSkillGaps } from '../pages/institute/InstituteSkillGaps';
import { InstituteAssessments } from '../pages/institute/InstituteAssessments';
import { InstitutePlacements } from '../pages/institute/InstitutePlacements';
import { InstituteCurriculum } from '../pages/institute/InstituteCurriculum';
import { InstituteRecommendations } from '../pages/institute/InstituteRecommendations';

// Skill Intelligence Pages
import { MarketOverview } from '../pages/intelligence/MarketOverview';
import { SkillDemand } from '../pages/intelligence/SkillDemand';
import { EmergingSkills } from '../pages/intelligence/EmergingSkills';
import { RegionalTrends } from '../pages/intelligence/RegionalTrends';
import { IntelligenceSkillGaps } from '../pages/intelligence/IntelligenceSkillGaps';
import { InstituteInsights } from '../pages/intelligence/InstituteInsights';
import { CurriculumRecommendations } from '../pages/intelligence/CurriculumRecommendations';
import { DataSources } from '../pages/intelligence/DataSources';
import { RoleGuard } from '../components/auth/RoleGuard';
import { IntelligenceOfficer } from '../pages/admin/IntelligenceOfficer';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/',
    element: <AppLayout />,
    children: [
      // Learner / Student Routes (Locked to Student)
      { path: 'student', element: <RoleGuard allowedRole="student"><StudentOverview /></RoleGuard> },
      { path: 'student/skills', element: <RoleGuard allowedRole="student"><StudentMySkills /></RoleGuard> },
      { path: 'student/learning', element: <RoleGuard allowedRole="student"><StudentLearning /></RoleGuard> },
      { path: 'student/assessments', element: <RoleGuard allowedRole="student"><StudentAssessments /></RoleGuard> },
      { path: 'student/skill-gap', element: <RoleGuard allowedRole="student"><StudentSkillGap /></RoleGuard> },
      { path: 'student/opportunities', element: <RoleGuard allowedRole="student"><StudentOpportunities /></RoleGuard> },
      { path: 'student/profile', element: <RoleGuard allowedRole="student"><StudentProfile /></RoleGuard> },

      // Trainer Routes (Locked to Trainer)
      { path: 'trainer', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },
      { path: 'trainer/programs', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },
      { path: 'trainer/students', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },
      { path: 'trainer/assessments', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },
      { path: 'trainer/skill-gaps', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },
      { path: 'trainer/upskilling', element: <RoleGuard allowedRole="trainer"><TrainerOverview /></RoleGuard> },

      // Institute Routes (Locked to Institute)
      { path: 'institute', element: <RoleGuard allowedRole="institute"><InstituteOverview /></RoleGuard> },
      { path: 'institute/students', element: <RoleGuard allowedRole="institute"><InstituteStudents /></RoleGuard> },
      { path: 'institute/trainers', element: <RoleGuard allowedRole="institute"><InstituteTrainers /></RoleGuard> },
      { path: 'institute/programs', element: <RoleGuard allowedRole="institute"><InstitutePrograms /></RoleGuard> },
      { path: 'institute/skill-gaps', element: <RoleGuard allowedRole="institute"><InstituteSkillGaps /></RoleGuard> },
      { path: 'institute/assessments', element: <RoleGuard allowedRole="institute"><InstituteAssessments /></RoleGuard> },
      { path: 'institute/placements', element: <RoleGuard allowedRole="institute"><InstitutePlacements /></RoleGuard> },
      { path: 'institute/curriculum', element: <RoleGuard allowedRole="institute"><InstituteCurriculum /></RoleGuard> },
      { path: 'institute/recommendations', element: <RoleGuard allowedRole="institute"><InstituteRecommendations /></RoleGuard> },

      // Admin & Skill Intelligence Officer Routes (Restricted)
      { path: 'intelligence', element: <RoleGuard allowedRole="intelligence"><IntelligenceOfficer /></RoleGuard> },
      { path: 'intelligence/skill-demand', element: <RoleGuard allowedRole="intelligence"><SkillDemand /></RoleGuard> },
      { path: 'intelligence/emerging-skills', element: <RoleGuard allowedRole="intelligence"><EmergingSkills /></RoleGuard> },
      { path: 'intelligence/regional-trends', element: <RoleGuard allowedRole="intelligence"><RegionalTrends /></RoleGuard> },
      { path: 'intelligence/skill-gaps', element: <RoleGuard allowedRole="intelligence"><IntelligenceSkillGaps /></RoleGuard> },
      { path: 'intelligence/institutes', element: <RoleGuard allowedRole="intelligence"><InstituteInsights /></RoleGuard> },
      { path: 'intelligence/curriculum', element: <RoleGuard allowedRole="intelligence"><CurriculumRecommendations /></RoleGuard> },
      { path: 'intelligence/data-sources', element: <RoleGuard allowedRole="intelligence"><DataSources /></RoleGuard> },
      { path: 'labour-market', element: <RoleGuard allowedRole="intelligence"><IntelligenceOfficer /></RoleGuard> },

      // Fallback
      { path: '*', element: <Navigate to="/student" replace /> }
    ]
  }
]);
