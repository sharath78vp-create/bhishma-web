import { useState } from 'react';
import type { FC } from 'react';
import { Card, CardHeader } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { mockSkillDemandTable } from '../../mock/skillBridgeData';
import { BarChart3, Search, TrendingUp, AlertTriangle } from 'lucide-react';

export const SkillDemand: FC = () => {
  const [query, setQuery] = useState('');

  const filtered = mockSkillDemandTable.filter(s =>
    s.skill.toLowerCase().includes(query.toLowerCase()) ||
    s.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-emerald-600" />
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Skill Demand &amp; Supply Balance
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Identify critical disparities between industry hiring demand and available collegiate talent supply.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter skills by keyword..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Core Intelligence Concept Card */}
      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <TrendingUp className="w-5 h-5 text-emerald-700 shrink-0" />
          <p className="text-emerald-900 leading-relaxed">
            <strong>Core Concept: Industry Demand vs. Available Skills.</strong> High growth (+34%) coupled with Low Student Supply signals immediate workforce bottlenecks that require curriculum intervention.
          </p>
        </div>
      </div>

      {/* Searchable Skill Demand Table */}
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                <th className="py-3 px-5">Skill Competency</th>
                <th className="py-3 px-5">Category</th>
                <th className="py-3 px-5 text-center">Industry Demand</th>
                <th className="py-3 px-5 text-center">YoY Growth</th>
                <th className="py-3 px-5 text-center">Available Student Supply</th>
                <th className="py-3 px-5 text-right">Supply Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
              {filtered.map((item) => {
                const isShortage = item.studentSupply === 'Low' || item.studentSupply === 'Very Low';
                return (
                  <tr key={item.skill} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-5 font-bold text-slate-900">
                      {item.skill}
                    </td>
                    <td className="py-3.5 px-5 text-slate-500">
                      {item.category}
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <Badge variant={item.demandLevel === 'Very High' ? 'danger' : 'brand'} size="sm">
                        {item.demandLevel}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-5 text-center font-bold text-emerald-700 tabular-nums">
                      +{item.growthPct}%
                    </td>
                    <td className="py-3.5 px-5 text-center">
                      <span className={`font-semibold ${isShortage ? 'text-rose-600' : 'text-slate-800'}`}>
                        {item.studentSupply}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-right">
                      <Badge variant={isShortage ? 'danger' : 'success'} size="sm">
                        {isShortage ? 'Acute Deficit' : 'Balanced'}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
