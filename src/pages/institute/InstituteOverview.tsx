import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { StatCard } from '../../components/common/StatCard';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  Layers,
  GraduationCap,
  Briefcase,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  Building2
} from 'lucide-react';

export const InstituteOverview: FC = () => {
  const navigate = useNavigate();
  const { trainingPrograms, heroRecommendation } = useSkillBridge();

  const topSkillGaps = [
    { skill: 'Cloud Computing', gap: '33% Gap', severity: 'danger' as const },
    { skill: 'Power BI & Dashboards', gap: '22% Gap', severity: 'warning' as const },
    { skill: 'Communication & Pitching', gap: '19% Gap', severity: 'warning' as const },
    { skill: 'Machine Learning Deployment', gap: '14% Gap', severity: 'neutral' as const },
    { skill: 'SQL Optimization', gap: '13% Gap', severity: 'neutral' as const }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Institute Overview
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor training, student skills and placement outcomes.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">
            Hyderabad Inst. of Tech &amp; Science
          </Badge>
          <Badge variant="neutral" size="md">
            Tier-2 Accredited
          </Badge>
        </div>
      </div>

      {/* 2. Top 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value="4,820"
          subtitle="Enrolled in engineering"
          icon={Users}
          change="AY 2026-27"
          changeType="neutral"
        />
        <StatCard
          title="Active Training"
          value={trainingPrograms.length}
          subtitle="Cohort programs active"
          icon={Layers}
          change="+2 new tracks"
          changeType="positive"
        />
        <StatCard
          title="Training Completion"
          value="81%"
          subtitle="Average syllabus milestone"
          icon={GraduationCap}
          change="+4.5% YoY"
          changeType="positive"
        />
        <StatCard
          title="Placement Rate"
          value="72.8%"
          subtitle="3,508 students placed"
          icon={Briefcase}
          change="Goal: 80%"
          changeType="neutral"
        />
      </div>

      {/* 3. Student Skill Readiness Breakdown */}
      <Card padding="lg">
        <CardHeader
          title="Student Skill Readiness"
          subtitle="Categorized by student proficiency against national employer hiring benchmarks"
        />

        <div className="space-y-4">
          {/* Stacked Progress Bar */}
          <div className="w-full h-4 rounded-full bg-slate-100 flex overflow-hidden">
            <div
              style={{ width: '28%' }}
              className="bg-emerald-600 h-full transition-all"
              title="Job-ready: 28%"
            />
            <div
              style={{ width: '43%' }}
              className="bg-amber-500 h-full transition-all"
              title="Nearly ready: 43%"
            />
            <div
              style={{ width: '29%' }}
              className="bg-rose-500 h-full transition-all"
              title="Needs improvement: 29%"
            />
          </div>

          {/* Legend Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-emerald-900">Job-ready</span>
                <span className="text-lg font-bold text-emerald-700 tabular-nums">28%</span>
              </div>
              <p className="text-[11px] text-emerald-700 mt-1">1,350 students meeting &gt;80% target</p>
            </div>

            <div className="p-3 rounded-xl border border-amber-200 bg-amber-50/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-900">Nearly ready</span>
                <span className="text-lg font-bold text-amber-700 tabular-nums">43%</span>
              </div>
              <p className="text-[11px] text-amber-700 mt-1">2,072 students within 10-15% gap</p>
            </div>

            <div className="p-3 rounded-xl border border-rose-200 bg-rose-50/40">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-rose-900">Needs improvement</span>
                <span className="text-lg font-bold text-rose-700 tabular-nums">29%</span>
              </div>
              <p className="text-[11px] text-rose-700 mt-1">1,398 students requiring targeted labs</p>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Top Skill Gaps Across Cohort */}
      <Card padding="lg">
        <CardHeader
          title="Top Institutional Skill Gaps"
          subtitle="Areas where student proficiency trails current employer expectations most severely"
          action={
            <button
              onClick={() => navigate('/institute/skill-gaps')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              <span>View Skill Matrix</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          }
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {topSkillGaps.map((item) => (
            <div
              key={item.skill}
              className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-slate-900 block">{item.skill}</span>
                <span className="text-[11px] text-slate-500">Trailing demand index</span>
              </div>
              <Badge variant={item.severity} size="sm">
                {item.gap}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* 5. Recent Recommendations from Skill Intelligence */}
      <Card className="border-purple-200 bg-purple-50/20" padding="lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-purple-100 text-purple-700">
                <Lightbulb className="w-4 h-4" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-800">
                Inbound Recommendation from Skill Intelligence Team
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              Industry demand for Cloud Computing has increased (+34%).
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
              Suggested action: <strong>Add more Cloud practical sessions and Docker container labs to close the 33% student proficiency deficit.</strong>
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => navigate('/institute/recommendations')}
              className="px-4 py-2.5 rounded-lg bg-purple-700 hover:bg-purple-800 text-white text-xs font-semibold flex items-center gap-2 transition-colors shadow-xs"
            >
              <span>View Recommendation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};
