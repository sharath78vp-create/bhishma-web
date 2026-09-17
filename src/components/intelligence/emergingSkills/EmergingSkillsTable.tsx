import { useState, useMemo } from 'react';
import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import {
  Table as TableIcon,
  Search,
  Download,
  ArrowUpDown,
  TrendingUp,
  TrendingDown,
  ChevronRight
} from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface EmergingSkillsTableProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkillId: string;
  onSelectSkill: (skillId: string) => void;
}

type SortField = 'name' | 'currentDemandIndex' | 'growth6M' | 'growth12M' | 'futurePotential' | 'shortageRiskLevel';
type SortDirection = 'asc' | 'desc';

export const EmergingSkillsTable: FC<EmergingSkillsTableProps> = ({
  skills,
  selectedSkillId,
  onSelectSkill
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [trendFilter, setTrendFilter] = useState<'all' | 'rising' | 'declining'>('all');
  const [sortField, setSortField] = useState<SortField>('growth12M');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const filteredAndSortedSkills = useMemo(() => {
    return skills
      .filter((s) => {
        if (trendFilter !== 'all' && s.trendType !== trendFilter) return false;
        if (searchTerm.trim() === '') return true;
        const q = searchTerm.toLowerCase();
        return (
          s.name.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.mainDriver.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const valA: any = a[sortField];
        const valB: any = b[sortField];

        if (typeof valA === 'string') {
          return sortDirection === 'asc'
            ? valA.localeCompare(valB)
            : valB.localeCompare(valA);
        }

        return sortDirection === 'asc' ? valA - valB : valB - valA;
      });
  }, [skills, searchTerm, trendFilter, sortField, sortDirection]);

  // Export CSV function
  const handleExportCSV = () => {
    const headers = [
      'Skill Name',
      'Category',
      'Trend Type',
      'Current Demand Index',
      '6M Growth (%)',
      '12M Growth (%)',
      'Future Potential',
      'Talent Supply',
      'Supply-Demand Gap',
      'Shortage Risk',
      'Primary Driver'
    ];

    const rows = filteredAndSortedSkills.map((s) => [
      `"${s.name}"`,
      `"${s.category}"`,
      s.trendType,
      s.currentDemandIndex,
      s.growth6M,
      s.growth12M,
      s.futurePotential,
      s.talentSupplyLevel,
      `"${s.supplyDemandGap}"`,
      s.shortageRiskLevel,
      `"${s.mainDriver.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `emerging_skills_intelligence_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-slate-100 text-slate-800">
            <TableIcon className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Comprehensive Emerging Skills Intelligence Register
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed telemetry telemetry matrix for verified skill clusters with econometric growth metrics
            </p>
          </div>
        </div>

        {/* Export CSV Button */}
        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-700 hover:text-slate-900 font-semibold rounded-lg text-xs transition-all shadow-2xs cursor-pointer"
        >
          <Download className="w-3.5 h-3.5 text-slate-600" />
          <span>Export CSV Matrix</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 my-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search skill, category or driver..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-slate-400"
          />
        </div>

        {/* Trend Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-semibold text-slate-600">
          <button
            onClick={() => setTrendFilter('all')}
            className={`px-3 py-1 rounded-md transition-all ${
              trendFilter === 'all' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            All ({skills.length})
          </button>
          <button
            onClick={() => setTrendFilter('rising')}
            className={`px-3 py-1 rounded-md transition-all ${
              trendFilter === 'rising' ? 'bg-white text-emerald-700 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Rising Only
          </button>
          <button
            onClick={() => setTrendFilter('declining')}
            className={`px-3 py-1 rounded-md transition-all ${
              trendFilter === 'declining' ? 'bg-white text-rose-700 shadow-2xs font-bold' : 'hover:text-slate-900'
            }`}
          >
            Declining Only
          </button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto border border-slate-200 rounded-xl">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-bold uppercase text-[10px] tracking-wider select-none">
              <th
                onClick={() => handleSort('name')}
                className="py-3 px-3 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  <span>Skill Competency</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('currentDemandIndex')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>Demand Index</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('growth6M')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>6M Growth</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('growth12M')}
                className="py-3 px-3 text-right cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-end gap-1">
                  <span>12M YoY</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th
                onClick={() => handleSort('futurePotential')}
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Future Potential</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Supply Gap</th>
              <th
                onClick={() => handleSort('shortageRiskLevel')}
                className="py-3 px-3 text-center cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center justify-center gap-1">
                  <span>Shortage Risk</span>
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                </div>
              </th>
              <th className="py-3 px-3">Primary Driver</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredAndSortedSkills.map((skill) => {
              const isSelected = skill.id === selectedSkillId;
              const isRising = skill.trendType === 'rising';

              return (
                <tr
                  key={skill.id}
                  onClick={() => onSelectSkill(skill.id)}
                  className={`transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50/70 font-semibold'
                      : 'hover:bg-slate-50/80'
                  }`}
                >
                  {/* Skill Name */}
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      {isRising ? (
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900 block">{skill.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">{skill.category}</span>
                      </div>
                    </div>
                  </td>

                  {/* Demand Index */}
                  <td className="py-3 px-3 text-right font-black text-slate-900">
                    {skill.currentDemandIndex}/100
                  </td>

                  {/* 6M Growth */}
                  <td className="py-3 px-3 text-right font-bold text-slate-700">
                    {skill.growth6M >= 0 ? `+${skill.growth6M}%` : `${skill.growth6M}%`}
                  </td>

                  {/* 12M Growth */}
                  <td className="py-3 px-3 text-right font-extrabold">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] ${
                        skill.growth12M >= 0
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {skill.growth12M >= 0 ? `+${skill.growth12M}%` : `${skill.growth12M}%`}
                    </span>
                  </td>

                  {/* Future Potential */}
                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={
                        skill.futurePotential === 'Very High'
                          ? 'purple'
                          : skill.futurePotential === 'High'
                          ? 'success'
                          : 'neutral'
                      }
                      size="sm"
                    >
                      {skill.futurePotential}
                    </Badge>
                  </td>

                  {/* Supply Gap */}
                  <td className="py-3 px-3 text-slate-600 font-medium">
                    <span className={`text-[11px] ${skill.supplyDemandGap === 'Large Deficit' ? 'text-rose-700 font-bold' : ''}`}>
                      {skill.supplyDemandGap}
                    </span>
                  </td>

                  {/* Shortage Risk */}
                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={
                        skill.shortageRiskLevel === 'High'
                          ? 'danger'
                          : skill.shortageRiskLevel === 'Moderate'
                          ? 'warning'
                          : 'success'
                      }
                      size="sm"
                    >
                      {skill.shortageRiskLevel}
                    </Badge>
                  </td>

                  {/* Driver */}
                  <td className="py-3 px-3 text-slate-600 text-[11px] max-w-xs truncate">
                    {skill.mainDriver}
                  </td>

                  {/* Action */}
                  <td className="py-3 px-3 text-right">
                    <span className="inline-flex items-center text-[11px] font-bold text-orange-600 group-hover:text-orange-700">
                      View <ChevronRight className="w-3 h-3 ml-0.5" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>Showing {filteredAndSortedSkills.length} of {skills.length} tracked emerging competencies</span>
        <span>Sorted by: <strong className="text-slate-800">{sortField} ({sortDirection.toUpperCase()})</strong></span>
      </div>
    </Card>
  );
};
