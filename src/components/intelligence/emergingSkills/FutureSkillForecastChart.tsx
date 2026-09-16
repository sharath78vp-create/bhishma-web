import type { FC } from 'react';
import {
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart
} from 'recharts';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { TrendingUp, AlertCircle, Sparkles } from 'lucide-react';
import type { EmergingSkillIntelligenceItem } from '../../../mock/emergingSkillsIntelligenceData';

interface FutureSkillForecastChartProps {
  skills: EmergingSkillIntelligenceItem[];
  selectedSkill: EmergingSkillIntelligenceItem;
  onSelectSkill: (skillId: string) => void;
}

export const FutureSkillForecastChart: FC<FutureSkillForecastChartProps> = ({
  skills,
  selectedSkill,
  onSelectSkill
}) => {
  const forecastData = selectedSkill.forecastPoints || [];
  const currentVal = forecastData.find((p) => p.year === '2024')?.projected || selectedSkill.currentDemandIndex;
  const projected2029 = forecastData.find((p) => p.year === '2029')?.projected || 0;
  const projectedGrowth = currentVal > 0 ? Math.round(((projected2029 - currentVal) / currentVal) * 100) : 0;

  return (
    <Card padding="lg" className="border-slate-200 shadow-sm bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-indigo-50 text-indigo-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Future Skill Demand Forecast (2024 – 2029)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Multi-variable autoregressive demand projections with 80% statistical confidence intervals
            </p>
          </div>
        </div>

        {/* Skill Selector */}
        <div className="flex items-center gap-2">
          <label className="text-xs font-semibold text-slate-600 hidden sm:inline">
            Forecast Skill:
          </label>
          <select
            value={selectedSkill.id}
            onChange={(e) => onSelectSkill(e.target.value)}
            className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            {skills.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name} ({s.trendType === 'rising' ? `+${s.growthYoY}%` : `${s.growthYoY}%`})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Snapshot Metric Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
        <div className="space-y-0.5">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Current Index (2024)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">{selectedSkill.currentDemandIndex}</span>
            <span className="text-xs text-slate-500 font-medium">/100</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Projected Index (2029)
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-indigo-700">{projected2029}</span>
            <span className="text-xs text-slate-500 font-medium">/100</span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            5-Year Projected Trajectory
          </span>
          <div className="flex items-center gap-1">
            <TrendingUp className={`w-4 h-4 ${projectedGrowth >= 0 ? 'text-emerald-600' : 'text-rose-600'}`} />
            <span className={`text-xl font-black ${projectedGrowth >= 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
              {projectedGrowth >= 0 ? `+${projectedGrowth}%` : `${projectedGrowth}%`}
            </span>
          </div>
        </div>

        <div className="space-y-0.5">
          <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
            Forecast Confidence
          </span>
          <div className="mt-1">
            <Badge
              variant={
                selectedSkill.forecastConfidence === 'High'
                  ? 'success'
                  : selectedSkill.forecastConfidence === 'Medium'
                  ? 'purple'
                  : 'warning'
              }
              size="sm"
            >
              {selectedSkill.forecastConfidence} Confidence Grade
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Forecast Chart */}
      <div className="h-72 w-full mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={forecastData} margin={{ top: 10, right: 30, left: -10, bottom: 5 }}>
            <defs>
              <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.03} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis
              dataKey="year"
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
            />
            <YAxis
              domain={[0, 150]}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={{ stroke: '#e2e8f0' }}
              label={{ value: 'Demand Index', angle: -90, position: 'insideLeft', offset: 15, fontSize: 11, fill: '#94a3b8' }}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  const isHistorical = !!data.historical;
                  return (
                    <div className="bg-slate-900 text-white p-3 rounded-lg shadow-xl text-xs space-y-1.5 border border-slate-700 min-w-[200px]">
                      <div className="flex items-center justify-between border-b border-slate-700 pb-1.5">
                        <span className="font-bold text-slate-200">Year: {label}</span>
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${isHistorical ? 'bg-slate-700 text-slate-300' : 'bg-indigo-600 text-indigo-100'}`}>
                          {isHistorical ? 'Historical' : 'Projected Model'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300 pt-0.5">
                        <span>Demand Value:</span>
                        <span className="font-bold text-white text-sm">{data.projected} / 100</span>
                      </div>
                      {!isHistorical && (
                        <div className="pt-1 border-t border-slate-800 space-y-0.5 text-[11px] text-indigo-300">
                          <div className="flex justify-between">
                            <span>Confidence Upper:</span>
                            <span className="font-semibold text-indigo-200">{data.confidenceUpper}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Confidence Lower:</span>
                            <span className="font-semibold text-indigo-200">{data.confidenceLower}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />

            {/* Confidence Interval Band */}
            <Area
              type="monotone"
              dataKey="confidenceUpper"
              stroke="transparent"
              fill="url(#confidenceBand)"
              name="Confidence Range"
            />
            {/* Forecast Projection Line */}
            <Line
              type="monotone"
              dataKey="projected"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{ r: 4, fill: '#4f46e5', strokeWidth: 2, stroke: '#ffffff' }}
              activeDot={{ r: 6, fill: '#ea580c' }}
              name="Projected Trajectory"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Strict Projection Disclaimer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-slate-600">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-indigo-600 rounded"></span>
            <span className="font-medium text-[11px]">Demand Forecast Trajectory</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-2 bg-indigo-100 border border-indigo-300 rounded-sm"></span>
            <span className="font-medium text-[11px]">80% Confidence Interval</span>
          </div>
        </div>

        <div className="flex items-start gap-1.5 text-amber-800 bg-amber-50 px-2.5 py-1.5 rounded-md border border-amber-200">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
          <span className="text-[11px] leading-tight">
            <strong>Advisory Note:</strong> Projections represent econometric estimations based on enterprise requisitions. Forecasts must be reviewed alongside regional institute capabilities.
          </span>
        </div>
      </div>
    </Card>
  );
};
