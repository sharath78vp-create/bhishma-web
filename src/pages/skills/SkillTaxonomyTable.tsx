import { useState } from 'react';
import type { FC } from 'react';
import { Table, Search, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { mockSkills } from '../../mock';
import type { SkillMetric, SkillStatus } from '../../types';

interface SkillTaxonomyTableProps {
  onSelectSkill?: (skill: SkillMetric) => void;
  selectedSkillId?: string;
}

export const SkillTaxonomyTable: FC<SkillTaxonomyTableProps> = ({
  onSelectSkill,
  selectedSkillId = 'SK-07'
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const statusBadgeMap: Record<SkillStatus, { variant: BadgeVariant; label: string }> = {
    'critical-shortage': { variant: 'critical', label: 'Critical' },
    emerging: { variant: 'warning', label: 'Emerging' },
    stable: { variant: 'success', label: 'Stable' },
    declining: { variant: 'declining', label: 'Declining' }
  };

  const filteredData = mockSkills.filter((s) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(term) ||
      s.category.toLowerCase().includes(term) ||
      s.description.toLowerCase().includes(term) ||
      s.topEmergingSectors.some((sec) => sec.toLowerCase().includes(term))
    );
  });

  const columns: Column<SkillMetric>[] = [
    {
      key: 'name',
      header: 'Skill Capability & Description',
      render: (item) => {
        const isSelected = item.id === selectedSkillId;
        const isHero = item.id === 'SK-07';
        return (
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className={`font-semibold text-xs ${isSelected ? 'text-brand-300' : 'text-white'}`}>
                {item.name}
              </span>
              {isHero && (
                <Badge variant="critical" size="sm" className="text-[9px] px-1 py-0 uppercase">
                  Hero
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {item.description}
            </p>
          </div>
        );
      }
    },
    {
      key: 'category',
      header: 'Domain',
      render: (item) => (
        <span className="text-xs text-slate-300 font-medium">
          {item.category}
        </span>
      )
    },
    {
      key: 'status',
      header: 'Status',
      align: 'center',
      render: (item) => {
        const config = statusBadgeMap[item.status];
        return (
          <Badge variant={config.variant} size="sm" className="text-[10px] uppercase">
            {config.label}
          </Badge>
        );
      }
    },
    {
      key: 'demandIndex',
      header: 'Demand',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-200">
          {item.demandIndex}/100
        </span>
      )
    },
    {
      key: 'supplyIndex',
      header: 'Supply',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-300">
          {item.supplyIndex}/100
        </span>
      )
    },
    {
      key: 'growthRatePct',
      header: 'YoY Growth',
      align: 'right',
      render: (item) => (
        <span
          className={`font-mono text-xs font-semibold ${
            item.growthRatePct > 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {item.growthRatePct > 0 ? `+${item.growthRatePct}%` : `${item.growthRatePct}%`}
        </span>
      )
    },
    {
      key: 'gapScore',
      header: 'Net Deficit',
      align: 'right',
      render: (item) => (
        <span
          className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
            item.gapScore >= 45
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              : item.gapScore < 0
              ? 'bg-slate-800 text-slate-400'
              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}
        >
          {item.gapScore > 0 ? `+${item.gapScore}` : item.gapScore}
        </span>
      )
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search skills, domains..."
                className="pl-8 pr-3 py-1 text-xs rounded-md bg-slate-900 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-brand-500 w-44 sm:w-56"
              />
            </div>
            <Badge variant="default" className="font-mono text-[10px]">
              {filteredData.length} of {mockSkills.length} Skills
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-brand-400" />
          <CardTitle>Standardized National Skill Taxonomy</CardTitle>
        </div>
        <CardDescription>
          Comprehensive inventory of indexed industrial competencies with normalized demand, collegiate supply, and deficit telemetry
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <DataTable
          columns={columns}
          data={filteredData}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => onSelectSkill?.(item)}
          compact
          striped
        />
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-400" />
            Click any skill row to load the telemetry drilldown and policy nexus
          </span>
          <span className="font-mono text-slate-500">14 Indexed Competencies</span>
        </div>
      </CardContent>
    </Card>
  );
};
