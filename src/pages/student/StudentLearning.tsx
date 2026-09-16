import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { BookOpen, Sparkles, ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export const StudentLearning: FC = () => {
  const {
    enrolledCourses,
    enrollInCloudCourse,
    heroRecommendation
  } = useSkillBridge();

  const isCloudEnrolled = enrolledCourses.some(c => c.title.includes('Cloud'));

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Learning
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage your enrolled coursework and targeted upskilling tracks.
          </p>
        </div>
      </div>

      {/* 1. Currently Enrolled Courses */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-slate-900">
          Enrolled Courses ({enrolledCourses.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {enrolledCourses.map((course) => (
            <Card key={course.id} padding="md" className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {course.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {course.title}
                    </h3>
                  </div>
                  <Badge variant={course.isCompleted ? 'success' : 'brand'} size="sm">
                    {course.isCompleted ? 'Completed' : 'In Progress'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-500">
                  {course.lastActivity}
                </p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <ProgressBar
                  value={course.progressPct}
                  label={`${course.completedModules} of ${course.totalModules} modules`}
                  color={course.isCompleted ? 'emerald' : 'brand'}
                  size="md"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[11px] text-slate-400">
                    Self-paced interactive lab
                  </span>

                  <button
                    onClick={() => {}}
                    className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>{course.isCompleted ? 'Review Modules' : 'Continue'}</span>
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* 2. Recommended Courses Based on Skill Gaps */}
      <div className="space-y-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-600" />
            <h2 className="text-base font-bold text-slate-900">
              Recommended Courses
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Targeted to eliminate your active 33% Cloud deficit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Cloud Course (Closed loop step) */}
          <Card
            padding="md"
            className={`border transition-all ${
              isCloudEnrolled ? 'border-emerald-300 bg-emerald-50/30' : 'border-brand-300 bg-brand-50/20 shadow-xs'
            }`}
          >
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 block mb-0.5">
                      Cloud &bull; Recommended by Institute
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Practical Cloud Computing &amp; Docker Lab
                    </h3>
                  </div>
                  <Badge variant={isCloudEnrolled ? 'success' : 'brand'} size="sm">
                    {isCloudEnrolled ? 'Enrolled' : 'High Priority'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Generated directly from Skill Intelligence Team recommendation REC-2026-CLOUD. Includes Docker containerization, AWS fundamentals, and cloud deployment labs.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                <span className="text-slate-500">14 Hands-on Lab Modules</span>

                {isCloudEnrolled ? (
                  <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Active in Enrolled Courses</span>
                  </div>
                ) : (
                  <button
                    onClick={enrollInCloudCourse}
                    className="px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Enroll &amp; Start</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </Card>

          {/* Secondary Course: Power BI */}
          <Card padding="md" className="border-slate-200">
            <div className="flex flex-col justify-between h-full space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      Data Analytics
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      Business Intelligence &amp; Power BI Masterclass
                    </h3>
                  </div>
                  <Badge variant="neutral" size="sm">
                    Curriculum Elective
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  Recommended to address your 22% gap in data visualization. Covers DAX calculations, dimensional schemas, and real-world KPI storytelling.
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                <span className="text-slate-500">16 Video Modules</span>
                <button
                  onClick={() => {}}
                  className="px-3.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                >
                  View Syllabus
                </button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
