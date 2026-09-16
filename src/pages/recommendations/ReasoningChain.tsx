import type { FC } from 'react';
import { TrendingUp, Target, BookOpen, MapPin, Award, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { PolicyIntervention } from '../../types';

interface ReasoningChainProps {
  policy: PolicyIntervention;
}

export const ReasoningChain: FC<ReasoningChainProps> = ({ policy }) => {
  const isHero = policy.id === 'POL-304';

  const chainNodes = [
    {
      step: '01',
      stage: 'DEMAND SIGNAL',
      metric: isHero ? '99.8K Requisitions' : 'National Telemetry',
      highlight: isHero ? '+40.2% YoY Momentum' : 'Hiring Surge',
      description: isHero
        ? '34,200 active tech requisitions crawled across Hyderabad, with 94% mandating modern cloud analytics.'
        : `Labour-market signals flag expanding talent demand across ${policy.targetSector}.`,
      icon: TrendingUp,
      color: 'text-indigo-400',
      border: 'border-indigo-500/30',
      bg: 'bg-indigo-500/10',
      source: isHero ? 'EVD-01 & EVD-04' : 'Job Portals'
    },
    {
      step: '02',
      stage: 'SKILL DEFICIT',
      metric: isHero ? '+46 Deficit (dbt)' : 'Critical Shortage',
      highlight: isHero ? 'Demand 94 vs Supply 48' : 'Supply Bottleneck',
      description: isHero
        ? 'Acute shortage of Advanced SQL & dbt (+46 gap) and Cloud Warehousing (+49 gap) driving hiring delays.'
        : 'Enterprise hiring standards outpace collegiate output in specialized competencies.',
      icon: Target,
      color: 'text-rose-400',
      border: 'border-rose-500/30',
      bg: 'bg-rose-500/10',
      source: isHero ? 'SK-07, SK-09, SK-10' : 'Skill Taxonomy'
    },
    {
      step: '03',
      stage: 'CURRICULUM GAP',
      metric: isHero ? '46% Alignment' : 'Syllabus Deficit',
      highlight: isHero ? 'DS-302 (54% Deficit)' : 'AICTE Syllabus Audit',
      description: isHero
        ? '78% of Telangana engineering colleges still teach legacy Excel 2007 and FoxPro with 0% cloud data lab access.'
        : 'Accredited university learning outcomes fail to incorporate modern enterprise tools.',
      icon: BookOpen,
      color: 'text-amber-400',
      border: 'border-amber-500/30',
      bg: 'bg-amber-500/10',
      source: isHero ? 'CURR-104 & EVD-02' : 'Curriculum Audit'
    },
    {
      step: '04',
      stage: 'REGIONAL IMBALANCE',
      metric: isHero ? '+26 Net Deficit' : 'Regional Deficit',
      highlight: isHero ? 'Demand 95 vs Capacity 69' : 'Geospatial Radar',
      description: isHero
        ? 'Hyderabad Innovation Corridor suffers an average 5.4-month corporate retraining lag for fresh graduates.'
        : `Capacity deficit concentrated within ${policy.targetRegion}.`,
      icon: MapPin,
      color: 'text-cyan-400',
      border: 'border-cyan-500/30',
      bg: 'bg-cyan-500/10',
      source: isHero ? 'REG-05 & EVD-03' : 'Regional Index'
    },
    {
      step: '05',
      stage: 'INTERVENTION',
      metric: isHero ? `₹${policy.estimatedCostCr} Cr Mandate` : 'Targeted Policy',
      highlight: isHero ? '24,000 Graduates' : 'Co-op Overhaul',
      description: isHero
        ? 'Mandates subsidized university cloud sandboxes & 6-month industry co-op across 45 Tier-2 colleges in Hyderabad.'
        : policy.rationale,
      icon: Award,
      color: 'text-emerald-400',
      border: 'border-emerald-500/30',
      bg: 'bg-emerald-500/10',
      source: policy.id
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="info" className="font-mono text-[10px] uppercase">
            Deterministic Reasoning Loop
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-brand-400" />
          <CardTitle>Decision Reasoning Chain (Why this recommendation?)</CardTitle>
        </div>
        <CardDescription>
          Traceable decision signal chain linking macro labour signals and syllabus misalignment to empirical policy formulation
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {chainNodes.map((node, idx) => {
            const Icon = node.icon;
            return (
              <div
                key={node.step}
                className={`relative p-3.5 rounded-xl border ${node.border} ${node.bg} flex flex-col justify-between space-y-2`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold text-slate-400">
                      STEP {node.step}
                    </span>
                    <span className="font-mono text-[9px] bg-slate-900 border border-slate-700 px-1.5 py-0.5 rounded text-slate-300">
                      {node.source}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2">
                    <Icon className={`w-3.5 h-3.5 ${node.color}`} />
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider text-slate-300">
                      {node.stage}
                    </span>
                  </div>

                  <div className="font-mono text-xs sm:text-sm font-bold text-white mt-1">
                    {node.metric}
                  </div>
                  <div className={`text-[10px] font-semibold ${node.color}`}>
                    {node.highlight}
                  </div>

                  <p className="text-[11px] text-slate-300 leading-relaxed mt-2">
                    {node.description}
                  </p>
                </div>

                {idx < chainNodes.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10">
                    <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
