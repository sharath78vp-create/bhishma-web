import type { FC } from 'react';
import { TrendingUp, Zap, MapPin, GraduationCap, Target } from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import {
  mockMonthlyTrends,
  mockRegionalGaps,
  mockCurriculumAudits,
  mockSkills,
} from '../../mock';

export const OverviewKPIs: FC = () => {
  // Compute metrics from actual mock datasets
  const latestTrend = mockMonthlyTrends[mockMonthlyTrends.length - 1];
  const firstTrend = mockMonthlyTrends[0];
  const yoyGrowth = ((latestTrend.jobDemand - firstTrend.jobDemand) / firstTrend.jobDemand) * 100;

  const hyderabadGap = mockRegionalGaps.find((r) => r.id === 'REG-05');
  const heroCurriculum = mockCurriculumAudits.find((c) => c.id === 'CURR-104');
  const criticalSkillsCount = mockSkills.filter((s) => s.status === 'critical-shortage').length;

  return (
    <section aria-label="Executive KPI Summary">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <StatCard
          title="Active Job Demand"
          value={`${(latestTrend.jobDemand / 1000).toFixed(1)}K`}
          change={`+${yoyGrowth.toFixed(1)}% YoY`}
          changeType="positive"
          icon={TrendingUp}
          subtitle="Monitored across 6 priority sectors"
        />

        <StatCard
          title="Hiring Velocity"
          value={`${latestTrend.hiringVelocity} / 100`}
          change="Surging Demand"
          changeType="positive"
          icon={Zap}
          subtitle="Time-to-fill velocity across IT & engineering"
        />

        <StatCard
          title="Hyderabad Deficit"
          value={`${hyderabadGap?.netDeficit ?? 26} pts`}
          change="Critical Gap"
          changeType="negative"
          icon={MapPin}
          subtitle="Demand: 95 vs Training Capacity: 69"
        />

        <StatCard
          title="Curriculum Alignment"
          value={`${heroCurriculum?.alignmentScorePct ?? 46}%`}
          change="Critical Disconnect"
          changeType="negative"
          icon={GraduationCap}
          subtitle="B.Tech AI & Data Science (Tier-2 sample)"
        />

        <StatCard
          title="Critical Shortages"
          value={`${criticalSkillsCount} Skills`}
          change="Acute Deficit"
          changeType="negative"
          icon={Target}
          subtitle="Demand outpaces supply >45 pts"
        />
      </div>
    </section>
  );
};
