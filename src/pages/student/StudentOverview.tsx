import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import {
  BookOpen,
  Award,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';

export const StudentOverview: FC = () => {
  const navigate = useNavigate();
  const { student, studentSkills } = useSkillBridge();

  // Find Cloud Computing skill to show dynamic proficiency
  const cloudSkill = studentSkills.find(s => s.name === 'Cloud Computing') || studentSkills[0];

  // Primary 6 snapshot skills requested in spec
  const snapshotSkills = [
    studentSkills.find(s => s.name === 'Python'),
    studentSkills.find(s => s.name === 'SQL'),
    studentSkills.find(s => s.name === 'Machine Learning'),
    studentSkills.find(s => s.name === 'Data Visualization'),
    cloudSkill,
    studentSkills.find(s => s.name === 'Communication')
  ].filter(Boolean);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Good morning, {student.name.split(' ')[0]}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Here’s your skill development progress.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="brand" size="md">
            {student.program}
          </Badge>
          <Badge variant="neutral" size="md">
            {student.year}
          </Badge>
        </div>
      </div>

      {/* 2. Top Summary & Overall Skill Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* Overall Readiness Card */}
        <Card className="lg:col-span-4 bg-gradient-to-br from-brand-600 to-brand-700 text-white border-transparent" padding="lg">
          <div className="flex flex-col justify-between h-full space-y-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-100">
                Overall Skill Readiness
              </span>
              <div className="text-4xl sm:text-5xl font-extrabold tracking-tight mt-1 tabular-nums">
                {student.readinessScore}%
              </div>
              <p className="text-xs text-brand-100 mt-2 leading-relaxed">
                Calculated against 12 key employer benchmarks for junior data roles.
              </p>
            </div>

            <div className="space-y-1.5 pt-2">
              <div className="w-full bg-brand-900/40 rounded-full h-2.5 overflow-hidden">
                <div
                  className="bg-white h-full rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${student.readinessScore}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-brand-100">
                <span>Current: {student.readinessScore}%</span>
                <span>Job Ready Goal: 80%</span>
              </div>
            </div>
          </div>
        </Card>

        {/* 3 Small Summary Cards */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            title="Learning Progress"
            value={`${student.learningProgress}%`}
            subtitle="Across enrolled courses"
            icon={BookOpen}
            change="+6% this week"
            changeType="positive"
          />
          <StatCard
            title="Assessment Score"
            value={`${student.assessmentAvg}%`}
            subtitle="Average across 3 tests"
            icon={Award}
            change="Strong performance"
            changeType="positive"
          />
          <StatCard
            title="Skills Matched"
            value={`${student.skillsMatchedCount} / ${student.skillsTotalCount}`}
            subtitle="Industry target profiles"
            icon={Target}
            change="4 to qualify"
            changeType="neutral"
          />
        </div>
      </div>

      {/* 3. Your Skill Snapshot */}
      <Card padding="lg">
        <CardHeader
          title="Your Skill Snapshot"
          subtitle="Top competencies evaluated against current tech hiring standards"
          action={
            <Link
              to="/student/skills"
              className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View All Skills</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 pt-1">
          {snapshotSkills.map((skill) => {
            if (!skill) return null;
            const isHighGap = skill.gapIndicator === 'High gap';
            return (
              <div key={skill.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-slate-800">{skill.name}</span>
                    <span className="text-[10px] text-slate-400">&bull; {skill.industryDemand} Demand</span>
                  </div>
                  <span className={`font-semibold tabular-nums ${isHighGap ? 'text-rose-600' : 'text-slate-900'}`}>
                    {skill.proficiency}%
                  </span>
                </div>
                <ProgressBar
                  value={skill.proficiency}
                  showPercentage={false}
                  color={isHighGap ? 'rose' : skill.proficiency >= 75 ? 'emerald' : 'brand'}
                  size="sm"
                />
              </div>
            );
          })}
        </div>
      </Card>

      {/* 4. Recommended Next Step Card */}
      <Card className="border-brand-200 bg-brand-50/40" padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-brand-100 text-brand-700">
                <Sparkles className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-800">
                Recommended Next Step
              </span>
            </div>

            <h3 className="text-lg font-bold text-slate-900">
              Strengthen Cloud Fundamentals
            </h3>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
              <span>
                Your current proficiency: <strong className="text-slate-900">{cloudSkill.proficiency}%</strong>
              </span>
              <span>&bull;</span>
              <span>
                Industry demand: <strong className="text-brand-700">High (+34% YoY)</strong>
              </span>
              <span>&bull;</span>
              <span>
                Recommended course: <strong className="text-slate-900">Cloud Fundamentals</strong>
              </span>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('/student/learning')}
              className="px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition-colors flex items-center gap-2 shadow-xs"
            >
              <span>Start Learning</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>

      {/* 5. Recent Activity */}
      <Card padding="md">
        <CardHeader
          title="Recent Activity"
          subtitle="Your latest achievements, assessments, and learning milestones"
        />

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Completed Python Assessment</span>
                <span className="text-slate-400 text-[11px]">Score: 88% &bull; Advanced Proficiency badge earned</span>
              </div>
            </div>
            <span className="text-slate-400 shrink-0 font-mono text-[11px]">28 Aug</span>
          </div>

          <div className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Completed SQL Module</span>
                <span className="text-slate-400 text-[11px]">Chapter 6: Index Optimization &amp; CTEs</span>
              </div>
            </div>
            <span className="text-slate-400 shrink-0 font-mono text-[11px]">Today</span>
          </div>

          <div className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Started Machine Learning Foundations</span>
                <span className="text-slate-400 text-[11px]">65% overall progress completed</span>
              </div>
            </div>
            <span className="text-slate-400 shrink-0 font-mono text-[11px]">Yesterday</span>
          </div>

          <div className="py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Calendar className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-slate-900 block">Assessment Scheduled: SQL Certification</span>
                <span className="text-slate-400 text-[11px]">Scheduled for 18 Sep 2026 &bull; 45 mins</span>
              </div>
            </div>
            <span className="text-slate-400 shrink-0 font-mono text-[11px]">Upcoming</span>
          </div>
        </div>
      </Card>
    </div>
  );
};
