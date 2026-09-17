import React from 'react';
import type { FC } from 'react';
import {
  Flame,
  AlertOctagon,
  Users,
  BookOpenCheck,
  TrendingUp
} from 'lucide-react';
import type { ComputedDashboardMetrics } from '../../../mock/skillDemandIntelligenceData';

interface SkillDemandKpisProps {
  metrics: ComputedDashboardMetrics;
}

export const SkillDemandKpis: FC<SkillDemandKpisProps> = ({ metrics }) => {
  const kpiList = [
    {
      id: 'high-demand',
      title: 'HIGH-DEMAND SKILLS',
      value: metrics.highDemandCount.toString(),
      subtitle: 'Skills with significant industry demand (>75%)',
      badge: 'Active Hiring',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Flame,
      iconColor: 'text-amber-500 bg-amber-50 border-amber-200',
      trend: '+14% YoY',
      trendColor: 'text-emerald-600'
    },
    {
      id: 'critical-gaps',
      title: 'CRITICAL SKILL GAPS',
      value: metrics.criticalGapsCount.toString(),
      subtitle: 'Skills where demand significantly exceeds supply (>35% gap)',
      badge: 'Immediate Focus',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: AlertOctagon,
      iconColor: 'text-rose-500 bg-rose-50 border-rose-200',
      trend: '7 Shortages',
      trendColor: 'text-rose-600'
    },
    {
      id: 'student-interest',
      title: 'STUDENT INTEREST',
      value: `${metrics.avgStudentInterest}%`,
      subtitle: 'Average interest across tracked student cohorts',
      badge: 'High Engagement',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: Users,
      iconColor: 'text-blue-500 bg-blue-50 border-blue-200',
      trend: '+6.2% vs last term',
      trendColor: 'text-blue-600'
    },
    {
      id: 'curriculum-coverage',
      title: 'CURRICULUM COVERAGE',
      value: `${metrics.avgCurriculumCoverage}%`,
      subtitle: 'Industry-demand skills covered by current curriculum',
      badge: 'Curriculum Depth',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      icon: BookOpenCheck,
      iconColor: 'text-indigo-500 bg-indigo-50 border-indigo-200',
      trend: '58% target',
      trendColor: 'text-indigo-600'
    },
    {
      id: 'demand-supply-gap',
      title: 'DEMAND-SUPPLY GAP',
      value: `${metrics.overallDemandSupplyGap}%`,
      subtitle: 'Overall workforce readiness gap across colleges',
      badge: 'Workforce Deficit',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: TrendingUp,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      trend: 'Target: <15%',
      trendColor: 'text-amber-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {kpiList.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Title + Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase">
                  {card.title}
                </span>
                <div
                  className={`p-1.5 rounded-lg border ${card.iconColor} transition-transform group-hover:scale-105`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Metric Value */}
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {card.value}
                </span>
              </div>
            </div>

            {/* Bottom Subtitle & Badge */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                {card.subtitle}
              </p>
              <div className="flex items-center justify-between text-[10px]">
                <span className={`px-2 py-0.5 rounded-md font-semibold border ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <span className={`font-semibold ${card.trendColor}`}>
                  {card.trend}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
