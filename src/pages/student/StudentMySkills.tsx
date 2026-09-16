import { useState } from 'react';
import type { FC } from 'react';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Brain, Filter, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import type { SkillItem } from '../../types/skillbridge';

const categories: ('All' | SkillItem['category'])[] = [
  'All',
  'Programming',
  'Data',
  'AI & ML',
  'Cloud',
  'Soft Skills'
];

export const StudentMySkills: FC = () => {
  const { studentSkills } = useSkillBridge();
  const [selectedCategory, setSelectedCategory] = useState<'All' | SkillItem['category']>('All');

  const filteredSkills = studentSkills.filter(s =>
    selectedCategory === 'All' ? true : s.category === selectedCategory
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-brand-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              My Skills
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Track your current proficiency and industry relevance.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-600 text-white shadow-2xs font-semibold'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSkills.map((skill) => {
          const isHighGap = skill.gapIndicator === 'High gap';
          const isModerateGap = skill.gapIndicator === 'Moderate gap';
          const isStrong = skill.gapIndicator === 'Strong';

          return (
            <Card key={skill.id} padding="md" className="flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                      {skill.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 leading-tight">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Gap Indicator Badge */}
                  <Badge
                    variant={isStrong ? 'success' : isModerateGap ? 'warning' : 'danger'}
                    size="sm"
                  >
                    {isStrong && <CheckCircle2 className="w-3 h-3" />}
                    {isModerateGap && <AlertTriangle className="w-3 h-3" />}
                    {isHighGap && <AlertCircle className="w-3 h-3" />}
                    <span>{skill.gapIndicator}</span>
                  </Badge>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                  {skill.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Current Proficiency:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {skill.proficiency}%
                  </span>
                </div>

                <ProgressBar
                  value={skill.proficiency}
                  showPercentage={false}
                  color={isHighGap ? 'rose' : skill.proficiency >= 75 ? 'emerald' : 'brand'}
                  size="md"
                />

                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                  <span>
                    Industry Demand: <strong className="text-slate-700">{skill.industryDemand}</strong>
                  </span>
                  <span>
                    Benchmark: <strong className="text-slate-700">{skill.demandPct}%</strong>
                  </span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
