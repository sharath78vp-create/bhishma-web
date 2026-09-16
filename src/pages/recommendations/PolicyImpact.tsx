import type { FC } from 'react';
import { Target, Users, DollarSign, Calendar, Building2, TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { PolicyIntervention } from '../../types';

interface PolicyImpactProps {
  policy: PolicyIntervention;
}

export const PolicyImpact: FC<PolicyImpactProps> = ({ policy }) => {
  const isHero = policy.id === 'POL-304';

  const impactMetrics = [
    {
      title: 'Targeted Graduate Output',
      value: `${(policy.projectedTalentOutput / 1000).toFixed(0)},000`,
      subtitle: 'Qualified industry-ready talent',
      icon: Users,
      color: 'text-brand-400',
      detail: isHero ? 'Direct pipeline for 45 Tier-2 campuses' : 'Regional collegiate talent pool'
    },
    {
      title: 'Public-Private Investment',
      value: `₹${policy.estimatedCostCr} Cr`,
      subtitle: 'Tool licenses & sandbox grants',
      icon: DollarSign,
      color: 'text-emerald-400',
      detail: isHero ? '₹3.22 Cr average per engineering college' : 'Subsidized infrastructure allocation'
    },
    {
      title: 'Deployment Horizon',
      value: `${policy.implementationTimeMonths} Mo`,
      subtitle: 'Fast-track turnaround',
      icon: Calendar,
      color: 'text-amber-400',
      detail: isHero ? 'Integrated into 4th-year 6-month co-op' : 'Implementation to cohort graduation'
    },
    {
      title: 'Corporate Retraining Lag',
      value: isHero ? '1.2 Mos' : 'Reduced',
      subtitle: isHero ? 'Down from 5.4 months baseline (Projected)' : 'Accelerated time-to-productivity',
      icon: TrendingUp,
      color: 'text-cyan-400',
      detail: isHero ? 'Direct employer placement upon co-op completion' : 'Accelerated time-to-productivity'
    }
  ];

  return (
    <Card>
      <CardHeader
        action={
          <Badge variant="info" className="font-mono text-[10px] uppercase">
            Targeted Policy Outcomes
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <Target className="w-4 h-4 text-brand-400" />
          <CardTitle>Projected Policy Outcomes &amp; Institutional Scope</CardTitle>
        </div>
        <CardDescription>
          Estimated workforce impact calibrated from empirical regional capacity shortfalls (Non-speculative metadata)
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-4">
        {/* Metric Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {impactMetrics.map((m) => {
            const Icon = m.icon;
            return (
              <div
                key={m.title}
                className="p-3.5 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      {m.title}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${m.color}`} />
                  </div>
                  <div className="font-mono text-2xl font-bold text-white mt-1">
                    {m.value}
                  </div>
                  <span className="text-[11px] font-medium text-slate-300 block">
                    {m.subtitle}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400">
                  {m.detail}
                </div>
              </div>
            );
          })}
        </div>

        {/* Expected Institutional Beneficiaries */}
        <div className="p-3 rounded-lg bg-slate-950/40 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-brand-400 shrink-0" />
            <span>
              Target Beneficiaries: <strong>{isHero ? '45 Affiliated Colleges (JNTU-H & Osmania University)' : policy.targetRegion}</strong>
            </span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">
            Model: Mandatory Industry Co-op Semester
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
