import type { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { mockLearningPath } from '../../mock/skillBridgeData';
import {
  Target,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

export const StudentSkillGap: FC = () => {
  const navigate = useNavigate();
  const { studentSkills } = useSkillBridge();

  // Highlight key comparison skills
  const keyComparisonSkills = [
    studentSkills.find(s => s.name === 'SQL'),
    studentSkills.find(s => s.name === 'Cloud Computing'),
    studentSkills.find(s => s.name === 'Power BI'),
    studentSkills.find(s => s.name === 'Communication')
  ].filter(Boolean);

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-rose-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Your Skill Gap
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Understand which skills you need to improve based on current industry demand.
          </p>
        </div>
      </div>

      {/* 1. Direct Comparison Table */}
      <Card padding="none">
        <div className="p-5 sm:p-6 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">
            Proficiency vs. Industry Expectation
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Direct benchmark comparison against hiring criteria across 128K active postings
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Skill</th>
                <th className="py-3 px-5 text-center">Your Level</th>
                <th className="py-3 px-5 text-center">Industry Expectation</th>
                <th className="py-3 px-5 text-right">Net Gap</th>
                <th className="py-3 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs font-medium text-slate-700">
              {keyComparisonSkills.map((skill) => {
                if (!skill) return null;
                const gap = Math.max(0, skill.demandPct - skill.proficiency);
                const isResolved = gap === 0;

                return (
                  <tr key={skill.name} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-semibold text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{skill.name}</span>
                        {isResolved && (
                          <Badge variant="success" size="sm">
                            Target Met
                          </Badge>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 font-normal block mt-0.5">
                        {skill.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 font-semibold tabular-nums">
                        {skill.proficiency}%
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-900 font-semibold tabular-nums">
                        {skill.demandPct}%
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <span className={`font-bold tabular-nums px-2 py-0.5 rounded-md ${
                        isResolved
                          ? 'text-emerald-700 bg-emerald-50'
                          : gap > 20
                          ? 'text-rose-700 bg-rose-50'
                          : 'text-amber-700 bg-amber-50'
                      }`}>
                        {isResolved ? '0%' : `${gap}%`}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <button
                        onClick={() => navigate('/student/learning')}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline"
                      >
                        Learn
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 2. AI Recommended Learning Path */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <h2 className="text-base font-bold text-slate-900">
            AI Recommended Learning Path
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockLearningPath.map((item, idx) => (
            <Card key={item.id} padding="md" className="flex flex-col justify-between space-y-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-brand-100 text-brand-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900">
                      {item.title}
                    </h3>
                  </div>

                  <Badge variant={item.priority === 'High' ? 'danger' : 'warning'} size="sm">
                    {item.priority} Priority
                  </Badge>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed pl-7">
                  {item.reason}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-100 pl-7 text-xs">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Est: {item.estimatedHours}</span>
                </div>

                <button
                  onClick={() => navigate('/student/learning')}
                  className="px-3 py-1.5 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <span>Start Module</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
