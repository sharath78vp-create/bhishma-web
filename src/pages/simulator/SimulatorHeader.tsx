import type { FC } from 'react';
import { Sparkles, MapPin, RotateCcw } from 'lucide-react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Button } from '../../components/ui/Button';

interface SimulatorHeaderProps {
  isHero: boolean;
  isModified: boolean;
  onReset: () => void;
}

export const SimulatorHeader: FC<SimulatorHeaderProps> = ({
  isHero,
  isModified,
  onReset
}) => {
  return (
    <PageHeader
      title="What-If Policy Simulator"
      description="Explore how different training interventions could affect identified skill and curriculum gaps."
      badge="PROTOTYPE SIMULATION"
      badgeVariant="warning"
      actions={
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-brand-400" />
            <span className="text-slate-400">Context:</span>
            <span className="font-semibold text-white">Telangana &rarr; AI &amp; Data &rarr; Data Analyst</span>
          </div>

          {isHero && (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hero: POL-304 Scenario</span>
            </div>
          )}

          {isModified && (
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="gap-1.5 text-xs text-amber-400 border-amber-500/30 hover:bg-amber-500/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Scenario Baseline</span>
            </Button>
          )}
        </div>
      }
    />
  );
};
