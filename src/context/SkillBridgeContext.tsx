import { createContext, useContext, useState, useEffect } from 'react';
import type { FC, ReactNode } from 'react';
import type {
  UserRole,
  StudentProfile,
  SkillItem,
  EnrolledCourse,
  AssessmentItem,
  TrainingProgramItem,
  CurriculumRecommendation,
  CurriculumCourseItem,
  TrainerItem
} from '../types/skillbridge';
import {
  mockDemoStudent,
  mockStudentSkills,
  mockEnrolledCourses,
  mockAssessments,
  mockTrainingPrograms,
  mockCurriculumCourses,
  mockHeroRecommendation,
  mockTrainers
} from '../mock/skillBridgeData';

interface SkillBridgeContextType {
  currentRole: UserRole;
  isAuthenticated: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  setRole: (role: UserRole) => void;
  student: StudentProfile;
  trainer: TrainerItem;
  trainers: TrainerItem[];
  studentSkills: SkillItem[];
  enrolledCourses: EnrolledCourse[];
  assessments: AssessmentItem[];
  trainingPrograms: TrainingProgramItem[];
  curriculumCourses: CurriculumCourseItem[];
  heroRecommendation: CurriculumRecommendation;
  notification: string | null;
  setNotification: (msg: string | null) => void;
  // Closed Loop Demo triggers (Step 1 -> Step 8)
  sendRecommendationToInstitute: () => void;
  acceptRecommendationByInstitute: () => void;
  enrollInCloudCourse: () => void;
  completeCloudAssessment: () => void;
  createTrainingProgram: (program: Omit<TrainingProgramItem, 'id'>) => void;
  resetDemoFlow: () => void;
}

const SkillBridgeContext = createContext<SkillBridgeContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'skillbridge_state_v1';

export const SkillBridgeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_role`);
    return (saved as UserRole) || 'student';
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(`${LOCAL_STORAGE_KEY}_auth`) === 'true';
  });

  const [student, setStudent] = useState<StudentProfile>(mockDemoStudent);
  const [trainers, setTrainers] = useState<TrainerItem[]>(mockTrainers);
  const [trainer, setTrainer] = useState<TrainerItem>(mockTrainers[0]);
  const [studentSkills, setStudentSkills] = useState<SkillItem[]>(mockStudentSkills);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>(mockEnrolledCourses);
  const [assessments, setAssessments] = useState<AssessmentItem[]>(mockAssessments);
  const [trainingPrograms, setTrainingPrograms] = useState<TrainingProgramItem[]>(mockTrainingPrograms);
  const [curriculumCourses, setCurriculumCourses] = useState<CurriculumCourseItem[]>(mockCurriculumCourses);
  const [heroRecommendation, setHeroRecommendation] = useState<CurriculumRecommendation>(mockHeroRecommendation);
  const [notification, setNotification] = useState<string | null>(null);

  // Auto-dismiss notification after 4 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, role);
  };

  const login = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_role`, role);
    localStorage.setItem(`${LOCAL_STORAGE_KEY}_auth`, 'true');
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_auth`);
    setNotification('You have been logged out.');
  };

  // STEP 3: Skill Intelligence Team sends recommendation to Institute
  const sendRecommendationToInstitute = () => {
    setHeroRecommendation(prev => ({
      ...prev,
      status: 'sent_to_institute',
      timestamp: 'Just now'
    }));
    setNotification('Recommendation REC-2026-CLOUD dispatched to Hyderabad Institute of Technology & Science.');
  };

  // STEP 5: Institute reviews and accepts recommendation
  const acceptRecommendationByInstitute = () => {
    setHeroRecommendation(prev => ({
      ...prev,
      status: 'accepted_by_institute',
      timestamp: 'Accepted just now'
    }));

    // Generate new training program
    const newProgram: TrainingProgramItem = {
      id: 'PROG-06',
      title: 'Practical Cloud Computing & Docker Lab',
      category: 'Cloud',
      enrolledStudents: 140,
      completionRate: 15,
      durationWeeks: 8,
      trainerName: 'Rajesh Kulkarni',
      status: 'Active'
    };

    setTrainingPrograms(prev => [newProgram, ...prev]);

    // Update curriculum course relevance
    setCurriculumCourses(prev =>
      prev.map(c =>
        c.courseCode === 'CS-405'
          ? { ...c, alignmentPct: 78, currentRelevance: 'High' }
          : c
      )
    );

    setNotification('Recommendation accepted! New training program "Practical Cloud Computing & Docker Lab" created.');
  };

  // STEP 6: Student enrolls in the recommended Cloud course
  const enrollInCloudCourse = () => {
    const existing = enrolledCourses.find(c => c.title.includes('Cloud'));
    if (!existing) {
      const newCourse: EnrolledCourse = {
        id: 'CRS-104',
        title: 'Practical Cloud Computing & Docker Lab',
        category: 'Cloud',
        progressPct: 35,
        lastActivity: 'Just enrolled • Module 1 in progress',
        totalModules: 14,
        completedModules: 5,
        isCompleted: false
      };
      setEnrolledCourses(prev => [newCourse, ...prev]);
    }
    setNotification('Enrolled in Practical Cloud Computing & Docker Lab! Module 1 started.');
  };

  // STEP 7 & 8: Student completes Cloud Assessment -> proficiency jumps to 78%, readiness jumps to 81%!
  const completeCloudAssessment = () => {
    // 1. Update Assessment
    setAssessments(prev =>
      prev.map(a =>
        a.skill === 'Cloud Computing'
          ? { ...a, status: 'Completed', score: 86, date: 'Today (Completed)' }
          : a
      )
    );

    // 2. Update Cloud skill proficiency from 42% to 78% (Moderate -> Strong)
    setStudentSkills(prev =>
      prev.map(s =>
        s.name === 'Cloud Computing'
          ? {
              ...s,
              proficiency: 78,
              gapIndicator: 'Strong',
              gapPct: 0,
              description: 'Proficiency upgraded: Hands-on AWS Core, Docker containers and serverless deployments.'
            }
          : s
      )
    );

    // 3. Update enrolled course progress
    setEnrolledCourses(prev =>
      prev.map(c =>
        c.title.includes('Cloud')
          ? { ...c, progressPct: 100, completedModules: c.totalModules, isCompleted: true, lastActivity: 'Completed today' }
          : c
      )
    );

    // 4. Update overall student readiness score
    setStudent(prev => ({
      ...prev,
      readinessScore: 81,
      learningProgress: 79,
      assessmentAvg: 82,
      skillsMatchedCount: 9
    }));

    setNotification('Assessment completed with 86%! Cloud Computing proficiency improved to 78%. Overall Readiness: 81%.');
  };

  // Add custom training program
  const createTrainingProgram = (newProgData: Omit<TrainingProgramItem, 'id'>) => {
    const newProg: TrainingProgramItem = {
      ...newProgData,
      id: `PROG-${Date.now().toString().slice(-4)}`
    };
    setTrainingPrograms(prev => [newProg, ...prev]);
    setNotification(`Program "${newProg.title}" successfully created.`);
  };

  // Reset demo flow for repeated presentations
  const resetDemoFlow = () => {
    setStudent(mockDemoStudent);
    setTrainers(mockTrainers);
    setTrainer(mockTrainers[0]);
    setStudentSkills(mockStudentSkills);
    setEnrolledCourses(mockEnrolledCourses);
    setAssessments(mockAssessments);
    setTrainingPrograms(mockTrainingPrograms);
    setCurriculumCourses(mockCurriculumCourses);
    setHeroRecommendation(mockHeroRecommendation);
    setNotification('Demo state has been reset to baseline.');
  };

  return (
    <SkillBridgeContext.Provider
      value={{
        currentRole,
        isAuthenticated,
        login,
        logout,
        setRole,
        student,
        trainer,
        trainers,
        studentSkills,
        enrolledCourses,
        assessments,
        trainingPrograms,
        curriculumCourses,
        heroRecommendation,
        notification,
        setNotification,
        sendRecommendationToInstitute,
        acceptRecommendationByInstitute,
        enrollInCloudCourse,
        completeCloudAssessment,
        createTrainingProgram,
        resetDemoFlow
      }}
    >
      {children}
    </SkillBridgeContext.Provider>
  );
};

export const useSkillBridge = () => {
  const context = useContext(SkillBridgeContext);
  if (!context) {
    throw new Error('useSkillBridge must be used within a SkillBridgeProvider');
  }
  return context;
};
