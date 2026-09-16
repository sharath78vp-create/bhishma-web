import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Sliders, ArrowRight, Sparkles, TrendingUp, DollarSign, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export const RecommendationPolicySignal: FC = () => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm relative overflow-hidden">
      <CardHeader
        action={
          <Badge variant="default" size="sm" className="font-mono text-xs">
            NEXT: PHASE 3G SIMULATION
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-500/20 text-brand-400 border border-brand-500/30">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <CardTitle>Counterfactual Policy Simulation & Stress Testing</CardTitle>
            <CardDescription>
              Stress-test budget allocations, enrollment ramps, and curriculum adoption rates before executive clearance
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">+34.2%</div>
              <div className="text-xs font-semibold text-slate-300">Target Placement Velocity</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Modeled lift over baseline across 45 Tier-2 institutions
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">5.4m → 1.2m</div>
              <div className="text-xs font-semibold text-slate-300">Retraining Lag Reduction (Projected)</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Reduces onboarding friction for corporate data engineering teams
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 flex items-start gap-3">
            <div className="p-2 rounded-lg bg-slate-800/80 text-slate-300 border border-slate-700/80">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xl font-bold text-white font-mono">₹60,416</div>
              <div className="text-xs font-semibold text-slate-300">Cost per Industry-Ready Graduate</div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                ₹145 Cr distributed across 24,000 co-op seats
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-semibold text-white">
                Ready to explore alternative intervention scenarios?
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl">
              Adjust capital expenditure, alter course adoption quotas, or simulate private co-funding shares to observe projected job placement elasticity in simulation.
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <Link to="/curriculum-alignment">
              <Button variant="outline" size="sm">
                Inspect Curricula
              </Button>
            </Link>
            <Link to="/what-if-simulator">
              <Button variant="primary" size="sm" className="gap-1.5 shadow-sm">
                <span>Launch What-If Simulator</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
