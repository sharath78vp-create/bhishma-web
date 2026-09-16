import type { FC } from 'react';
import { BrainCircuit, AlertOctagon, TrendingUp, TrendingDown } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { mockSkills } from '../../mock';

export const SkillKPIs: FC = () => {
  const totalSkills = mockSkills.length;
  const criticalCount = mockSkills.filter((s) => s.status === 'critical-shortage').length;
  const emergingCount = mockSkills.filter((s) => s.status === 'emerging').length;
  const decliningCount = mockSkills.filter((s) => s.status === 'declining').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Monitored Taxonomy"
        value={`${totalSkills} Skills`}
        change="4 Technical Domains"
        changeType="positive"
        icon={BrainCircuit}
        subtitle="Standardized industry competencies"
      />

      <StatCard
        title="Critical Shortages"
        value={`${criticalCount} Skills`}
        change="Demand Outpaces Supply"
        changeType="negative"
        icon={AlertOctagon}
        subtitle="Gaps exceeding +45 to +73 pts"
      />

      <StatCard
        title="Emerging High-Velocity"
        value={`${emergingCount} Skills`}
        change="+83.9% Avg Growth"
        changeType="positive"
        icon={TrendingUp}
        subtitle="Surging requisitions across hubs"
      />

      <StatCard
        title="Declining / At-Risk"
        value={`${decliningCount} Skills`}
        change="-41.8% Avg Contraction"
        changeType="negative"
        icon={TrendingDown}
        subtitle="Automated or legacy maintenance"
      />
    </div>
  );
};
