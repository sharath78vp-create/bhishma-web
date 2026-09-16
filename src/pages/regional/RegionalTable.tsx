import type { FC } from 'react';
import { Table, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge, type BadgeVariant } from '../../components/ui/Badge';
import { mockRegionalGaps } from '../../mock';
import type { RegionalGap, RegionalSeverity } from '../../types';

interface RegionalTableProps {
  selectedRegionId?: string;
  onSelectRegion?: (region: RegionalGap) => void;
}

export const RegionalTable: FC<RegionalTableProps> = ({
  selectedRegionId = 'REG-05',
  onSelectRegion
}) => {
  // Sort regions by net deficit descending
  const sortedData = [...mockRegionalGaps].sort((a, b) => b.netDeficit - a.netDeficit);

  const severityBadgeMap: Record<RegionalSeverity, { variant: BadgeVariant; label: string }> = {
    critical: { variant: 'critical', label: 'Critical' },
    high: { variant: 'warning', label: 'High' },
    moderate: { variant: 'info', label: 'Moderate' },
    low: { variant: 'success', label: 'Low' }
  };

  const columns: Column<RegionalGap>[] = [
    {
      key: 'region',
      header: 'Regional Node',
      render: (item) => {
        const isHero = item.id === 'REG-05';
        const isSelected = item.id === selectedRegionId;
        return (
          <div className="flex items-center gap-2">
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-semibold text-xs ${isSelected ? 'text-brand-300' : 'text-white'}`}>
                  {item.region}
                </span>
                {isHero && (
                  <Badge variant="critical" size="sm" className="text-[9px] px-1 py-0 uppercase">
                    Hero
                  </Badge>
                )}
              </div>
              <span className="text-[10px] text-slate-400">{item.state} &bull; {item.vocationalInstitutesCount} Colleges</span>
            </div>
          </div>
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
      key: 'trainingCapacityIndex',
      header: 'Capacity',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-300">
          {item.trainingCapacityIndex}/100
        </span>
      )
    },
    {
      key: 'netDeficit',
      header: 'Net Deficit',
      align: 'right',
      render: (item) => (
        <span
          className={`font-mono text-xs font-bold px-1.5 py-0.5 rounded ${
            item.netDeficit >= 25
              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              : item.netDeficit >= 18
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              : 'bg-slate-800 text-slate-300'
          }`}
        >
          +{item.netDeficit} pts
        </span>
      )
    },
    {
      key: 'severity',
      header: 'Severity',
      align: 'center',
      render: (item) => {
        const severity = (item.severity || 'moderate') as RegionalSeverity;
        const config = severityBadgeMap[severity] || severityBadgeMap.moderate;
        return (
          <Badge variant={config.variant} size="sm" className="text-[10px] uppercase">
            {config.label}
          </Badge>
        );
      }
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <div className="flex items-center gap-2">
            <Badge variant="default" className="font-mono text-[10px]">
              {mockRegionalGaps.length} Nodes
            </Badge>
          </div>
        }
      >
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-brand-400" />
          <CardTitle>Ranked Regional Skill Deficit Registry</CardTitle>
        </div>
        <CardDescription>
          Ranked by highest net capacity deficit between industrial hiring requisitions and collegiate output
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <DataTable
          columns={columns}
          data={sortedData}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => onSelectRegion?.(item)}
          compact
          striped
        />
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-400" />
            Click any regional corridor to inspect training capacity and policy signals
          </span>
          <span className="font-mono text-slate-500">Sorted: Highest Deficit First</span>
        </div>
      </CardContent>
    </Card>
  );
};
