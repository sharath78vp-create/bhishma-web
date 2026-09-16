import React from 'react';
import type { FC } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  AlertTriangle,
  BookOpenCheck
} from 'lucide-react';
import type { ComputedEmergingKpis } from '../../../mock/emergingSkillsIntelligenceData';

interface EmergingSkillsKpisProps {
  kpis: ComputedEmergingKpis;
}

export const EmergingSkillsKpis: FC<EmergingSkillsKpisProps> = ({ kpis }) => {
  const cards = [
    {
      id: 'rising',
      title: 'RISING SKILLS',
      value: `+${kpis.risingSkillsCount}`,
      subtitle: 'Skills showing sustained upward demand surge',
      badge: 'High Acceleration',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: TrendingUp,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200'
    },
    {
      id: 'declining',
      title: 'DECLINING SKILLS',
      value: `-${kpis.decliningSkillsCount}`,
      subtitle: 'Skills showing sustained hiring contraction',
      badge: 'Displacement Risk',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: TrendingDown,
      iconColor: 'text-rose-600 bg-rose-50 border-rose-200'
    },
    {
      id: 'future-potential',
      title: 'HIGH-FUTURE-POTENTIAL',
      value: kpis.highFuturePotentialCount.toString(),
      subtitle: 'Skills with strong 3-to-5 year projected market demand',
      badge: 'Strategic Focus',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Sparkles,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200'
    },
    {
      id: 'shortage-risk',
      title: 'SKILL SHORTAGE RISK',
      value: kpis.shortageRiskCount.toString(),
      subtitle: 'Skills where corporate demand may exceed available talent',
      badge: 'Workforce Bottleneck',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: AlertTriangle,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200'
    },
    {
      id: 'curriculum-pressure',
      title: 'CURRICULUM PRESSURE',
      value: kpis.curriculumPressureLevel,
      subtitle: 'Areas requiring academic curriculum review',
      badge: 'Advisory Alert',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: BookOpenCheck,
      iconColor: 'text-orange-600 bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            className="group relative bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Header: Title & Icon */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold tracking-wider text-slate-500 uppercase font-mono">
                  {card.title}
                </span>
                <div className={`p-1.5 rounded-lg border ${card.iconColor} transition-transform group-hover:scale-105`}>
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

            {/* Subtitle & Badge */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-1.5">
              <p className="text-[11px] text-slate-500 leading-snug line-clamp-2">
                {card.subtitle}
              </p>
              <div className="flex items-center justify-between text-[10px]">
                <span className={`px-2 py-0.5 rounded-md font-semibold border ${card.badgeColor}`}>
                  {card.badge}
                </span>
                <span className="text-slate-400 font-medium">Indicator</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
