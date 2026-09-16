import type { FC } from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { Radio, Clock, Zap } from 'lucide-react';
import { mockEarlyWarningSignals } from '../../../mock/emergingSkillsIntelligenceData';

interface EarlyWarningSignalsTableProps {
  onSelectSkillByName?: (skillName: string) => void;
}

export const EarlyWarningSignalsTable: FC<EarlyWarningSignalsTableProps> = ({
  onSelectSkillByName
}) => {
  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-50 text-amber-700">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Emerging Skill Early-Warning Radar
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Automated telemetry detection of inflection points in requisition velocity, investment surge, and talent deficits
            </p>
          </div>
        </div>

        <Badge variant="warning" size="sm">
          {mockEarlyWarningSignals.length} Active Early Signals
        </Badge>
      </div>

      {/* Signals Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs text-slate-700 border-collapse">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-slate-600 font-bold uppercase text-[10px] tracking-wider">
              <th className="py-2.5 px-3">Skill Competency</th>
              <th className="py-2.5 px-3">Signal Trigger</th>
              <th className="py-2.5 px-3 text-right">30-60D Surge</th>
              <th className="py-2.5 px-3 text-center">Confidence</th>
              <th className="py-2.5 px-3">Time Window</th>
              <th className="py-2.5 px-3 text-center">Radar Status</th>
              <th className="py-2.5 px-3">Telemetry Context</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {mockEarlyWarningSignals.map((signal) => {
              const isAlert = signal.status === 'High Alert';
              const isEmerging = signal.status === 'Emerging';

              return (
                <tr
                  key={signal.id}
                  onClick={() => onSelectSkillByName && onSelectSkillByName(signal.skill)}
                  className="hover:bg-slate-50/90 transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <Zap className={`w-3.5 h-3.5 ${isAlert ? 'text-rose-500' : 'text-amber-500'}`} />
                      <div>
                        <span className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {signal.skill}
                        </span>
                        <span className="block text-[10px] text-slate-400 font-medium">
                          {signal.category}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-semibold text-slate-800">
                    {signal.signalType}
                  </td>

                  <td className="py-3 px-3 text-right">
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      +{signal.changePct}%
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={signal.confidence === 'High' ? 'success' : 'neutral'}
                      size="sm"
                    >
                      {signal.confidence}
                    </Badge>
                  </td>

                  <td className="py-3 px-3 text-slate-500 font-medium whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      <span>{signal.timeDetected}</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-center">
                    <Badge
                      variant={
                        isAlert ? 'danger' : isEmerging ? 'purple' : 'warning'
                      }
                      size="sm"
                    >
                      {signal.status}
                    </Badge>
                  </td>

                  <td className="py-3 px-3 text-[11px] text-slate-600 max-w-xs leading-snug">
                    {signal.evidenceSummary}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center justify-between border-t border-slate-100">
        <span>Click any row to load the corresponding skill intelligence telemetry.</span>
        <span className="font-semibold text-slate-700">Algorithm: Bayesian Requisition Anomaly Scanner v2.4</span>
      </div>
    </Card>
  );
};
