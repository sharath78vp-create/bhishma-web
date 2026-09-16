import type { FC } from 'react';
import { ArrowRight, FileCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import type { RegionalGap } from '../../types';

interface RegionalPolicySignalProps {
  region: RegionalGap;
}

export const RegionalPolicySignal: FC<RegionalPolicySignalProps> = ({ region }) => {
  const isHero = region.id === 'REG-05';
  const isCritical = region.severity === 'critical';

  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm">
      <CardHeader
        action={
          <Badge variant={isCritical ? 'critical' : 'warning'} className="font-mono text-[10px] uppercase">
            Policy Advisory
          </Badge>
        }
      >
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <CardTitle className="text-base sm:text-lg">Regional Policy Signal</CardTitle>
        </div>
        <CardDescription>
          Translating geospatial workforce imbalance into targeted curriculum and institutional mandates
        </CardDescription>
      </CardHeader>

      <CardContent className="p-4 sm:p-5 space-y-3.5">
        <div className="p-3.5 rounded-lg bg-slate-950/60 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {isCritical ? 'Critical Capacity Deficit Detected' : 'Elevated Demand Mismatch Observed'}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isHero ? (
              <span>
                Industry demand (<strong>95/100</strong>) in the <strong>Hyderabad Innovation Corridor</strong> is outpacing collegiate training capacity (<strong>69/100</strong>) by <strong>26 points</strong>. Traditional IT curricula fail to equip graduates with high-demand competencies such as Cloud Data Warehousing and modern Analytics Engineering.
              </span>
            ) : (
              <span>
                Workforce demand (<strong>{region.demandIndex}/100</strong>) in <strong>{region.region}</strong> is outpacing training output (<strong>{region.trainingCapacityIndex}/100</strong>) by <strong>{region.netDeficit} points</strong> across priority sectors: {region.topSectorsInDemand.join(', ')}.
              </span>
            )}
          </p>
        </div>

        <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 space-y-1.5">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Mandated Policy Next Step</span>
          </div>
          <p className="text-[11px] text-slate-300">
            {isHero
              ? 'Review collegiate curriculum alignment (DS-302 / CURR-104) and mandate modern cloud analytics sandbox training for Tier-2 engineering colleges.'
              : `Audit accredited course syllabi mapped to ${region.topSectorsInDemand[0]} to identify missing industry skill modules.`}
          </p>
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Link
          to="/curriculum-alignment"
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold shadow-sm transition-all text-center"
        >
          <span>Review curriculum alignment</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardFooter>
    </Card>
  );
};
