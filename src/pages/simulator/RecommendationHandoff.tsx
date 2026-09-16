import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export const RecommendationHandoff: FC = () => {
  return (
    <Card className="border-slate-800 bg-slate-900 shadow-sm overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-400" />
              <h3 className="text-base font-bold text-white">
                Ready to return to the policy governance review?
              </h3>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Use these counterfactual simulation results as supporting analytical evidence during human-in-the-loop committee evaluation. <em>The simulator informs decision-making; it does not automatically approve or ratify policy interventions.</em>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto justify-center">
            <Link to="/recommendations">
              <Button variant="primary" size="sm" className="gap-2 shadow-sm">
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Policy Recommendations</span>
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
