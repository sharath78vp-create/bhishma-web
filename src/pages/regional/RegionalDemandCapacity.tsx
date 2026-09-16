import type { FC } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { AlertCircle } from 'lucide-react';
import { ChartContainer } from '../../components/charts/ChartContainer';
import { Badge } from '../../components/ui/Badge';
import { mockRegionalGaps } from '../../mock';
import type { RegionalGap } from '../../types';

interface RegionalDemandCapacityProps {
  selectedRegionId?: string;
  onSelectRegion?: (region: RegionalGap) => void;
}

export const RegionalDemandCapacity: FC<RegionalDemandCapacityProps> = ({
  selectedRegionId = 'REG-05',
  onSelectRegion
}) => {
  // Sort regions by net deficit descending
  const sortedRegions = [...mockRegionalGaps].sort((a, b) => b.netDeficit - a.netDeficit);

  const chartData = sortedRegions.map((r) => {
    // Compact display name for YAxis
    const shortName = r.region.split(' ')[0].replace('-Mysuru', '').replace('-Sanand', '');
    return {
      id: r.id,
      shortName,
      fullRegion: r.region,
      state: r.state,
      demand: r.demandIndex,
      capacity: r.trainingCapacityIndex,
      deficit: r.netDeficit,
      severity: r.severity || 'moderate',
      isHero: r.id === 'REG-05',
      isSelected: r.id === selectedRegionId,
      rawItem: r
    };
  });

  return (
    <ChartContainer
      title="Regional Demand vs Training Capacity Disparity"
      subtitle="Ranked comparison of industry workforce demand against collegiate capacity (sorted by net deficit)"
      height={390}
      legend={
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-indigo-500 inline-block" />
            <span className="text-slate-300 font-medium">Industry Demand</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-sm bg-cyan-500 inline-block" />
            <span className="text-slate-300 font-medium">Training Capacity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
            <span className="text-rose-400 font-medium">★ Hyderabad (Hero)</span>
          </div>
        </div>
      }
      footerNote={
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-slate-400">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Click any bar or axis label to focus regional intelligence & policy drilldown</span>
          </div>
          <span className="text-[10px] font-mono text-slate-500">
            Peak Deficit: Dholera (+48) | Hero Focus: Hyderabad (+26)
          </span>
        </div>
      }
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={chartData}
          margin={{ top: 5, right: 30, left: 110, bottom: 5 }}
          barGap={2}
          barSize={10}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#27303A" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            stroke="#4B5563"
            tick={{ fill: '#9CA3AF', fontSize: 11, fontFamily: 'monospace' }}
            tickLine={{ stroke: '#27303A' }}
          />
          <YAxis
            type="category"
            dataKey="shortName"
            stroke="#4B5563"
            tickLine={false}
            axisLine={{ stroke: '#27303A' }}
            tick={({ x, y, payload }) => {
              const item = chartData.find((d) => d.shortName === payload.value);
              const isHero = item?.isHero;
              const isSelected = item?.isSelected;
              const xPos = typeof x === 'number' ? x - 6 : typeof x === 'string' ? parseFloat(x) - 6 : 0;
              return (
                <text
                  x={xPos}
                  y={y}
                  dy={4}
                  textAnchor="end"
                  fill={isHero ? '#f43f5e' : isSelected ? '#a5b4fc' : '#D1D5DB'}
                  fontWeight={isHero || isSelected ? 600 : 400}
                  fontSize={11}
                  className="cursor-pointer select-none"
                  onClick={() => item && onSelectRegion?.(item.rawItem)}
                >
                  {payload.value} {isHero ? '★' : ''}
                </text>
              );
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const data = payload[0].payload;
                return (
                  <div className="bg-slate-950/95 border border-slate-700/80 rounded-lg p-3 shadow-xl backdrop-blur-md min-w-[220px]">
                    <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
                      <div>
                        <span className="font-bold text-xs text-white block">{data.fullRegion}</span>
                        <span className="text-[10px] text-slate-400">{data.state}</span>
                      </div>
                      <Badge
                        variant={data.severity === 'critical' ? 'critical' : data.severity === 'high' ? 'warning' : 'info'}
                        size="sm"
                        className="text-[9px] uppercase"
                      >
                        {data.severity}
                      </Badge>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-sm bg-indigo-500" />
                          Industry Demand:
                        </span>
                        <strong className="font-mono text-indigo-300">{data.demand}/100</strong>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 flex items-center gap-1">
                          <span className="w-2 h-2 rounded-sm bg-cyan-500" />
                          Training Capacity:
                        </span>
                        <strong className="font-mono text-cyan-300">{data.capacity}/100</strong>
                      </div>

                      <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between font-semibold">
                        <span className="text-rose-400">Net Skill Deficit:</span>
                        <span className="font-mono text-rose-400">+{data.deficit} pts</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar
            dataKey="demand"
            name="Industry Demand"
            fill="#6366f1"
            radius={[0, 4, 4, 0]}
            onClick={(entry) => onSelectRegion?.((entry as unknown as { rawItem: RegionalGap }).rawItem)}
            cursor="pointer"
          />
          <Bar
            dataKey="capacity"
            name="Training Capacity"
            fill="#06b6d4"
            radius={[0, 4, 4, 0]}
            onClick={(entry) => onSelectRegion?.((entry as unknown as { rawItem: RegionalGap }).rawItem)}
            cursor="pointer"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
