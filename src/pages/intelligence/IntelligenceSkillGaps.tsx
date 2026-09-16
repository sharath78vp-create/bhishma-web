import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Target, TrendingDown, AlertTriangle, CheckCircle2 } from 'lucide-react';

const nationalGaps = [
  { skill: 'Generative AI & LLM Engineering', demand: 95, supply: 22, netGap: 73, growth: '+48%', priority: 'Critical' as const },
  { skill: 'Cloud Computing & DevOps', demand: 88, supply: 42, netGap: 46, growth: '+34%', priority: 'Critical' as const },
  { skill: 'Data Engineering (dbt/Snowflake)', demand: 85, supply: 38, netGap: 47, growth: '+29%', priority: 'High' as const },
  { skill: 'Cybersecurity Architecture', demand: 82, supply: 48, netGap: 34, growth: '+26%', priority: 'High' as const },
  { skill: 'Power BI & Visual Analytics', demand: 76, supply: 52, netGap: 24, growth: '+22%', priority: 'Moderate' as const },
  { skill: 'Advanced SQL Query Optimization', demand: 84, supply: 68, netGap: 16, growth: '+21%', priority: 'Moderate' as const },
  { skill: 'Python Core & Scripting', demand: 86, supply: 82, netGap: 4, growth: '+18%', priority: 'Low' as const }
];

export const IntelligenceSkillGaps: FC = () => {
  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Macro Skill Gap Diagnostics
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            National aggregated deficit scores comparing industry hiring requirements with university supply.
          </p>
        </div>
      </div>

      {/* National Gaps Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Competency Domain</th>
                <th className="py-3 px-5 text-center">Industry Demand Index</th>
                <th className="py-3 px-5 text-center">Collegiate Supply Index</th>
                <th className="py-3 px-5 text-center">Net Deficit Gap</th>
                <th className="py-3 px-5 text-center">YoY Demand Velocity</th>
                <th className="py-3 px-5 text-right">Intervention Urgency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {nationalGaps.map((item) => (
                <tr key={item.skill} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-5 font-bold text-slate-900">
                    {item.skill}
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-900 tabular-nums">
                    {item.demand} / 100
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-slate-600 tabular-nums">
                    {item.supply} / 100
                  </td>
                  <td className="py-3.5 px-5 text-center">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-md font-bold tabular-nums ${
                      item.netGap > 40
                        ? 'bg-rose-50 text-rose-800'
                        : item.netGap > 20
                        ? 'bg-amber-50 text-amber-800'
                        : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      +{item.netGap} pts
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-center font-semibold text-emerald-700 tabular-nums">
                    {item.growth}
                  </td>
                  <td className="py-3.5 px-5 text-right">
                    <Badge
                      variant={item.priority === 'Critical' ? 'danger' : item.priority === 'High' ? 'warning' : 'neutral'}
                      size="sm"
                    >
                      {item.priority}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
