import { useState } from 'react';
import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import {
  Users,
  BookOpen,
  Award,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Clock,
  ArrowRight,
  Layers,
  GraduationCap
} from 'lucide-react';
import { mockStudentsList } from '../../mock/skillBridgeData';

export const TrainerOverview: FC = () => {
  const { trainer, setNotification } = useSkillBridge();
  const [gradedIds, setGradedIds] = useState<string[]>([]);

  const mockPendingEvaluations = [
    {
      id: 'EVAL-01',
      studentName: 'Rahul Kumar',
      course: 'Machine Learning Foundations',
      assessment: 'Lab 4: Hyperparameter Optimization & Cross-Validation',
      submissionDate: 'Today, 10:30 AM',
      currentScore: 86
    },
    {
      id: 'EVAL-02',
      studentName: 'Sneha Iyer',
      course: 'Deep Learning Basics',
      assessment: 'Lab 3: Convolutional Neural Networks on PyTorch',
      submissionDate: 'Yesterday',
      currentScore: 92
    },
    {
      id: 'EVAL-03',
      studentName: 'Karthik Reddy',
      course: 'Machine Learning Foundations',
      assessment: 'Lab 2: Feature Engineering & Imbalance Handling',
      submissionDate: '2 days ago',
      currentScore: 78
    }
  ];

  const handleGradeSubmission = (evalId: string, studentName: string) => {
    setGradedIds(prev => [...prev, evalId]);
    setNotification(`Assessment for ${studentName} evaluated and certified successfully.`);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Trainer Profile Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-800 flex items-center justify-center font-bold text-lg">
            {trainer.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Welcome, {trainer.name}
              </h1>
              <Badge variant="warning" size="sm">
                ★ {trainer.performanceRating} Faculty Rating
              </Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Faculty Specialization: <strong>{trainer.specialization}</strong> &bull; Senior Technical Educator
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="brand" size="md">
            {trainer.coursesCount} Active Courses
          </Badge>
          <Badge variant="success" size="md">
            {trainer.studentsCount} Students Mentored
          </Badge>
        </div>
      </div>

      {/* 2. Key Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card padding="md">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{trainer.studentsCount}</div>
          <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
            <span className="text-emerald-700 font-semibold">+18% YoY</span> cohort enrollment
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Average Readiness</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{trainer.studentAvgReadiness}%</div>
          <div className="text-xs text-slate-500 mt-1">
            Industry hiring benchmark is 75%
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Pending Evaluations</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {mockPendingEvaluations.length - gradedIds.length}
          </div>
          <div className="text-xs text-slate-500 mt-1">
            Submissions requiring feedback
          </div>
        </Card>

        <Card padding="md">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            <span>Faculty Impact</span>
            <GraduationCap className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700">High Impact</div>
          <div className="text-xs text-slate-500 mt-1">
            Verified skills certification
          </div>
        </Card>
      </div>

      {/* 3. Assigned Programs & AI Skill Gap Detection */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Assigned Programs */}
        <div className="lg:col-span-7 space-y-4">
          <Card padding="lg">
            <CardHeader
              title="Your Assigned Training Programs"
              subtitle="Active academic and vocational modules under your instruction"
            />

            <div className="space-y-3.5 pt-2">
              {trainer.courses.map((courseTitle, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{courseTitle}</span>
                      <Badge variant="brand" size="sm">Active Batch</Badge>
                    </div>
                    <p className="text-xs text-slate-500">
                      90 Students Enrolled &bull; 14 Practical Labs &bull; Next Assessment in 3 days
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="text-right hidden sm:block">
                      <div className="text-xs font-bold text-slate-800">76% Avg Progress</div>
                      <div className="text-[10px] text-slate-400">Batch completion</div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotification(`Opened management console for: ${courseTitle}`)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition-colors"
                    >
                      Manage Batch
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Student Cohort Progress Snapshot */}
          <Card padding="lg">
            <CardHeader
              title="Mentored Students Cohort"
              subtitle="Direct view of candidate readiness in your batches"
            />

            <div className="divide-y divide-slate-100 pt-1">
              {mockStudentsList.slice(0, 4).map((s) => (
                <div key={s.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {s.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="truncate">
                      <div className="text-xs font-bold text-slate-900 truncate">{s.name}</div>
                      <div className="text-[11px] text-slate-400 truncate">{s.program}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <span className="text-xs font-semibold text-slate-800">{s.readinessScore}%</span>
                      <span className="text-[10px] text-slate-400 block">Readiness</span>
                    </div>
                    <Badge variant={s.readinessScore >= 80 ? 'success' : 'brand'} size="sm">
                      {s.placementStatus}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: AI Skill Gap Warning & Trainer Upskilling Card */}
        <div className="lg:col-span-5 space-y-4">
          {/* Cohort Skill Gap Alert */}
          <Card padding="lg" className="border-amber-200 bg-amber-50/20">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Cohort Skill Gap Identified
                </h3>
                <span className="text-[11px] text-amber-800 font-semibold">
                  Detected across 42% of submitted lab projects
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-3 leading-relaxed">
              Students excel in basic model training but lack familiarity with{' '}
              <strong className="text-slate-900">{trainer.topSkillGapAmongStudents}</strong>. Industry hiring requirements mandate containerized deployment scripts.
            </p>

            <div className="mt-3 p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-700 space-y-1">
              <div className="font-semibold text-slate-900">Recommended Curriculum Addition:</div>
              <div className="text-slate-600">
                Incorporate 2 practical labs on Dockerizing models and hosting inference endpoints using FastAPI/Triton.
              </div>
            </div>
          </Card>

          {/* Trainer Recommended Upskilling (Faculty Development) */}
          <Card padding="lg" className="border-indigo-100 bg-indigo-50/20">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Recommended Faculty Upskilling
                </h3>
                <span className="text-[11px] text-indigo-700 font-semibold">
                  Advanced Faculty Development &bull; Certified Pedagogy
                </span>
              </div>
            </div>

            <div className="mt-3 p-3 rounded-xl bg-white border border-indigo-200 text-xs space-y-1.5">
              <div className="font-bold text-slate-900">{trainer.recommendedUpskilling}</div>
              <p className="text-slate-600 leading-relaxed">
                Stay aligned with 2026 industry demand by completing this accredited module on high-throughput LLM serving.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setNotification(`Enrolled in faculty upskilling track: ${trainer.recommendedUpskilling}`)}
              className="w-full mt-3 py-2 px-3 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Enroll in Faculty Upskilling Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>

          {/* Pending Submissions & Assessment Queue */}
          <Card padding="lg">
            <CardHeader
              title="Grading &amp; Assessment Queue"
              subtitle="Evaluate candidate lab submissions"
            />

            <div className="space-y-3 pt-2">
              {mockPendingEvaluations.map((item) => {
                const isGraded = gradedIds.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border transition-all text-xs space-y-2 ${
                      isGraded ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900">{item.studentName}</div>
                        <div className="text-[11px] text-slate-500">{item.assessment}</div>
                      </div>
                      <span className="text-[10px] text-slate-400">{item.submissionDate}</span>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[11px] font-semibold text-slate-700">
                        Score: <strong>{item.currentScore}%</strong>
                      </span>

                      {isGraded ? (
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Certified &amp; Graded
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleGradeSubmission(item.id, item.studentName)}
                          className="px-2.5 py-1 rounded bg-amber-600 hover:bg-amber-700 text-white text-[11px] font-semibold transition-colors"
                        >
                          Approve Grade
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
