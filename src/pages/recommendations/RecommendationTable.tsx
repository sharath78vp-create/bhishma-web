import type { FC } from 'react';
import { Table, Sparkles, Building2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { DataTable, type Column } from '../../components/ui/DataTable';
import { Badge } from '../../components/ui/Badge';
import { mockPolicyInterventions } from '../../mock';
import type { PolicyIntervention } from '../../types';

interface RecommendationTableProps {
  onSelectPolicy?: (policy: PolicyIntervention) => void;
  selectedPolicyId?: string;
}

export const RecommendationTable: FC<RecommendationTableProps> = ({
  onSelectPolicy,
  selectedPolicyId = 'POL-304'
}) => {
  // Sort high priority first
  const sortedPolicies = [...mockPolicyInterventions].sort((a, b) => {
    if (a.priority === 'high' && b.priority !== 'high') return -1;
    if (a.priority !== 'high' && b.priority === 'high') return 1;
    return b.estimatedCostCr - a.estimatedCostCr;
  });

  const columns: Column<PolicyIntervention>[] = [
    {
      key: 'title',
      header: 'Policy Intervention & Title',
      render: (item) => {
        const isSelected = item.id === selectedPolicyId;
        const isHero = item.id === 'POL-304';

        return (
          <div className="max-w-md">
            <div className="flex items-center gap-2">
              <span className={`font-mono text-xs font-bold ${isSelected ? 'text-brand-300' : 'text-brand-400'}`}>
                {item.id}
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className={`text-xs font-semibold truncate ${isSelected ? 'text-brand-300' : 'text-white'}`}>
                {item.title}
              </span>
              {isHero && (
                <Badge variant="critical" size="sm" className="text-[9px] px-1 py-0 uppercase">
                  Hero
                </Badge>
              )}
            </div>
            <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
              {item.rationale}
            </p>
          </div>
        );
      }
    },
    {
      key: 'targetRegion',
      header: 'Target Cluster / Corridor',
      render: (item) => (
        <span className="text-xs text-slate-300 font-medium flex items-center gap-1">
          <Building2 className="w-3 h-3 text-brand-400 shrink-0" />
          <span className="truncate max-w-[180px]">{item.targetRegion}</span>
        </span>
      )
    },
    {
      key: 'priority',
      header: 'Priority',
      align: 'center',
      render: (item) => (
        <Badge
          variant={item.priority === 'high' ? 'critical' : 'warning'}
          size="sm"
          className="text-[10px] uppercase font-mono"
        >
          {item.priority}
        </Badge>
      )
    },
    {
      key: 'interventionType',
      header: 'Mechanism',
      render: (item) => (
        <Badge variant="info" size="sm" className="text-[10px]">
          {item.interventionType}
        </Badge>
      )
    },
    {
      key: 'estimatedCostCr',
      header: 'Budget',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-bold text-emerald-400">
          ₹{item.estimatedCostCr} Cr
        </span>
      )
    },
    {
      key: 'projectedTalentOutput',
      header: 'Target Output',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs font-semibold text-slate-200">
          {(item.projectedTalentOutput / 1000).toFixed(0)}K Grads
        </span>
      )
    },
    {
      key: 'implementationTimeMonths',
      header: 'Horizon',
      align: 'right',
      render: (item) => (
        <span className="font-mono text-xs text-slate-400">
          {item.implementationTimeMonths} Mo
        </span>
      )
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="default" className="font-mono text-[10px]">
            {mockPolicyInterventions.length} Actionable Mandates
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Table className="w-4 h-4 text-brand-400" />
          <CardTitle>Prioritized Policy Recommendations Matrix</CardTitle>
        </div>
        <CardDescription>
          Empirically formulated policy interventions designed to eliminate structural regional skill deficits
        </CardDescription>
      </CardHeader>

      <CardContent className="p-3 sm:p-5">
        <DataTable
          columns={columns}
          data={sortedPolicies}
          keyExtractor={(item) => item.id}
          onRowClick={(item) => onSelectPolicy?.(item)}
          compact
          striped
        />
        <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 px-1">
          <span className="flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-brand-400" />
            Click any recommendation row to inspect detailed evidence, reasoning chain, and review controls
          </span>
          <span className="font-mono text-slate-500">Sorted: High Priority Mandates First</span>
        </div>
      </CardContent>
    </Card>
  );
};
