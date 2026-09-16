import type { FC } from 'react';
import { Award, DollarSign, Users, Calendar } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { mockPolicyInterventions } from '../../mock';

export const RecommendationKPIs: FC = () => {
  const totalPolicies = mockPolicyInterventions.length;
  const highPriorityCount = mockPolicyInterventions.filter((p) => p.priority === 'high').length;
  const totalCost = mockPolicyInterventions.reduce((acc, p) => acc + p.estimatedCostCr, 0);
  const totalTalent = mockPolicyInterventions.reduce((acc, p) => acc + p.projectedTalentOutput, 0);
  const avgMonths = (
    mockPolicyInterventions.reduce((acc, p) => acc + p.implementationTimeMonths, 0) / totalPolicies
  ).toFixed(1);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Active Policy Playbooks"
        value={`${totalPolicies} Interventions`}
        change={`${highPriorityCount} High Priority`}
        changeType="positive"
        icon={Award}
        subtitle="Formulated from empirical deficits"
      />

      <StatCard
        title="Estimated Capital Allocation"
        value={`₹${totalCost} Cr`}
        change="Public-Private Scope"
        changeType="neutral"
        icon={DollarSign}
        subtitle="Subsidized sandboxes & tool grants"
      />

      <StatCard
        title="Targeted Talent Output"
        value={`${(totalTalent / 1000).toFixed(1)}K`}
        change="Qualified Graduates"
        changeType="positive"
        icon={Users}
        subtitle="Direct collegiate absorption pool"
      />

      <StatCard
        title="Average Horizon"
        value={`${avgMonths} Months`}
        change="Fast-Track Turnaround"
        changeType="positive"
        icon={Calendar}
        subtitle="Target deployment to graduation"
      />
    </div>
  );
};
