import type { FC } from 'react';
import { MapPin, AlertOctagon, TrendingUp, Activity } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { mockRegionalGaps } from '../../mock';

export const RegionalKPIs: FC = () => {
  const totalRegions = mockRegionalGaps.length;
  const criticalCount = mockRegionalGaps.filter((r) => r.severity === 'critical').length;
  const maxDeficitRegion = [...mockRegionalGaps].sort((a, b) => b.netDeficit - a.netDeficit)[0];
  const avgDeficit = (
    mockRegionalGaps.reduce((acc, r) => acc + r.netDeficit, 0) / totalRegions
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Monitored Regional Nodes"
        value={totalRegions}
        change="8 States Covered"
        changeType="positive"
        icon={MapPin}
        subtitle="National manufacturing & tech corridors"
      />

      <StatCard
        title="Critical Deficit Nodes"
        value={criticalCount}
        change="Urgent Policy Priority"
        changeType="negative"
        icon={AlertOctagon}
        subtitle="Hyderabad & Dholera-Sanand"
      />

      <StatCard
        title="Peak Regional Deficit"
        value={`+${maxDeficitRegion.netDeficit} pts`}
        change={maxDeficitRegion.region.split(' ')[0]}
        changeType="negative"
        icon={TrendingUp}
        subtitle={`Demand ${maxDeficitRegion.demandIndex} vs Capacity ${maxDeficitRegion.trainingCapacityIndex}`}
      />

      <StatCard
        title="Average Capacity Deficit"
        value={`+${avgDeficit} pts`}
        change="Across Monitored Belts"
        changeType="negative"
        icon={Activity}
        subtitle="Average collegiate training shortfall"
      />
    </div>
  );
};
