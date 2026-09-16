import { useState } from 'react';
import type { FC } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, RadarChart, Radar, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell,
} from 'recharts';
import {
  Briefcase, Target, BookOpen, Zap, Lightbulb,
  TrendingUp, Users, DollarSign, AlertTriangle, CheckCircle2,
  XCircle, ArrowRight, ChevronRight,
} from 'lucide-react';
import type { RegionalGap } from '../../types';
import type { DistrictJobData } from '../../mock/districtJobs';

// ─── Palette constants ────────────────────────────────────────
const P = {
  accent:  '#FF9B51',
  dark:    '#25343F',
  surface: '#EAEFEF',
  muted:   '#BFC9D1',
  white:   '#FFFFFF',
  // chart colors
  chart: ['#FF9B51', '#25343F', '#06b6d4', '#a855f7', '#10b981', '#f43f5e'],
  danger: '#f43f5e',
  success: '#10b981',
  warning: '#f59e0b',
};

// ─── Sub-chart components ─────────────────────────────────────

const CustomTooltipBase: FC<{ active?: boolean; payload?: unknown[]; label?: string; labelKey?: string }> = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: P.dark, borderRadius: 8, padding: '8px 12px',
      border: `1px solid ${P.muted}`, fontSize: 12, color: P.surface,
      boxShadow: '0 4px 16px rgba(37,52,63,0.2)',
    }}>
      <p style={{ fontWeight: 700, marginBottom: 4, color: P.surface }}>{label}</p>
      {(payload as Array<{ name: string; value: number; color: string }>).map((p) => (
        <p key={p.name} style={{ color: p.color || P.accent }}>
          {p.name}: <strong>{typeof p.value === 'number' ? p.value.toLocaleString() : p.value}</strong>
        </p>
      ))}
    </div>
  );
};

// Tab 1 — Open Positions
const OpenPositionsTab: FC<{ data: DistrictJobData }> = ({ data }) => {
  const chartData = [...data.openPositions]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
    .map(p => ({ name: p.role.length > 28 ? p.role.slice(0, 28) + '…' : p.role, count: p.count, growth: p.growthPct, sector: p.sector }));

  return (
    <div className="space-y-4">
      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: Briefcase, label: 'Total Openings', value: data.totalOpenings.toLocaleString(), color: P.accent },
          { icon: DollarSign, label: 'Avg. Salary', value: `₹${data.avgSalaryLakhs}L`, color: P.success },
          { icon: TrendingUp, label: 'Hiring Velocity', value: `${data.hiringVelocity}/100`, color: data.hiringVelocity > 80 ? P.danger : data.hiringVelocity > 60 ? P.warning : P.success },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="rounded-xl p-3 text-center" style={{ background: P.white, border: `1px solid ${P.muted}` }}>
            <Icon className="w-4 h-4 mx-auto mb-1" style={{ color }} />
            <div className="text-xs font-bold" style={{ color: P.dark }}>{value}</div>
            <div className="text-[10px] mt-0.5" style={{ color: P.muted.replace('1)', '0.8)') }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Horizontal bar chart */}
      <div>
        <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>
          Open Positions by Role
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16, top: 0, bottom: 0 }}>
            <CartesianGrid horizontal={false} stroke={`${P.muted}60`} />
            <XAxis type="number" tick={{ fontSize: 10, fill: `${P.dark}80` }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="name" tick={{ fontSize: 9.5, fill: P.dark }} width={180} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipBase />} />
            <Bar dataKey="count" name="Open Positions" fill={P.accent} radius={[0, 4, 4, 0]} maxBarSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Growth badges */}
      <div>
        <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>
          YoY Growth by Sector
        </p>
        <div className="flex flex-wrap gap-2">
          {[...new Map(data.openPositions.map(p => [p.sector, p])).values()]
            .sort((a, b) => b.growthPct - a.growthPct)
            .slice(0, 6)
            .map(p => (
              <span key={p.sector} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold" style={{
                background: `${P.accent}18`,
                color: P.dark,
                border: `1px solid ${P.accent}50`,
              }}>
                <TrendingUp className="w-3 h-3" style={{ color: P.accent }} />
                {p.sector}
                <span style={{ color: P.danger }}>+{p.growthPct}%</span>
              </span>
            ))}
        </div>
      </div>
    </div>
  );
};

// Tab 2 — Skills Required
const SkillsRequiredTab: FC<{ data: DistrictJobData }> = ({ data }) => {
  const gapColor = (shortage: string) =>
    shortage === 'critical' ? P.danger : shortage === 'high' ? P.warning : shortage === 'moderate' ? P.accent : P.success;

  const radarData = data.skillsRequired.map(s => ({
    skill: s.skill.length > 18 ? s.skill.slice(0, 18) + '…' : s.skill,
    demand: s.demandScore,
  }));

  const barData = [...data.skillsRequired].sort((a, b) => b.demandScore - a.demandScore);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Radar */}
        <div>
          <p className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>Skill Demand Radar</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData} margin={{ top: 10, right: 20, bottom: 10, left: 20 }}>
              <PolarGrid stroke={`${P.muted}60`} />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 9, fill: P.dark }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 8, fill: `${P.dark}60` }} />
              <Radar name="Demand" dataKey="demand" stroke={P.accent} fill={P.accent} fillOpacity={0.3} dot={{ fill: P.accent, r: 3 }} />
              <Tooltip content={<CustomTooltipBase />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Shortage severity list */}
        <div className="space-y-2">
          <p className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>Shortage Severity</p>
          {barData.map(s => (
            <div key={s.skill}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-medium" style={{ color: P.dark }}>{s.skill}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded capitalize" style={{
                  background: `${gapColor(s.shortage)}20`,
                  color: gapColor(s.shortage),
                  border: `1px solid ${gapColor(s.shortage)}40`,
                }}>
                  {s.shortage}
                </span>
              </div>
              <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: `${P.muted}40` }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${s.demandScore}%`, background: gapColor(s.shortage) }}
                />
              </div>
              <div className="text-[10px] text-right mt-0.5" style={{ color: `${P.dark}60` }}>{s.demandScore}/100</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Tab 3 — What Students Learn
const StudentsLearningTab: FC<{ data: DistrictJobData }> = ({ data }) => {
  const pieData = data.studentsLearning.map((s, i) => ({
    name: s.subject,
    value: s.coveragePct,
    color: P.chart[i % P.chart.length],
  }));

  const barData = [...data.studentsLearning].sort((a, b) => b.relevanceScore - a.relevanceScore);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Pie chart */}
        <div>
          <p className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>Curriculum Split</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                dataKey="value"
                paddingAngle={2}
              >
                {pieData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} stroke={P.white} strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => [`${v}%`, 'Coverage']} contentStyle={{ background: P.dark, border: `1px solid ${P.muted}`, borderRadius: 8, color: P.surface, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          {/* Legend */}
          <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
            {pieData.map(e => (
              <span key={e.name} className="flex items-center gap-1 text-[10px]" style={{ color: P.dark }}>
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: e.color }} />
                {e.name.length > 22 ? e.name.slice(0, 22) + '…' : e.name} ({e.value}%)
              </span>
            ))}
          </div>
        </div>

        {/* Industry relevance bar */}
        <div className="space-y-2">
          <p className="text-xs font-semibold mb-1 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>Industry Relevance Score</p>
          {barData.map(s => (
            <div key={s.subject}>
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-[11px] font-medium" style={{ color: P.dark }}>
                  {s.subject.length > 26 ? s.subject.slice(0, 26) + '…' : s.subject}
                </span>
                <span className="text-[10px] font-bold" style={{ color: s.relevanceScore >= 55 ? P.success : s.relevanceScore >= 40 ? P.warning : P.danger }}>
                  {s.relevanceScore}%
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: `${P.muted}40` }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${s.relevanceScore}%`,
                    background: s.relevanceScore >= 55 ? P.success : s.relevanceScore >= 40 ? P.warning : P.danger,
                  }}
                />
              </div>
            </div>
          ))}
          <p className="text-[10px] mt-2 pt-2" style={{ color: `${P.dark}60`, borderTop: `1px solid ${P.muted}60` }}>
            ⚠ Low relevance scores indicate curriculum content not aligned with current industry needs.
          </p>
        </div>
      </div>
    </div>
  );
};

// Tab 4 — Skill Gaps
const SkillGapsTab: FC<{ data: DistrictJobData }> = ({ data }) => {
  const chartData = data.skillGaps.map(g => ({
    skill: g.skill.length > 20 ? g.skill.slice(0, 20) + '…' : g.skill,
    Required: g.required,
    Available: g.available,
    gap: g.gap,
  }));

  const critical = data.skillGaps.filter(g => g.gap >= 60).slice(0, 3);

  return (
    <div className="space-y-4">
      {/* Critical gap summary */}
      {critical.length > 0 && (
        <div className="rounded-xl p-3" style={{ background: `${P.danger}10`, border: `1px solid ${P.danger}30` }}>
          <p className="text-[11px] font-bold mb-2 flex items-center gap-1.5" style={{ color: P.danger }}>
            <AlertTriangle className="w-3.5 h-3.5" /> Top Critical Gaps
          </p>
          <div className="space-y-1.5">
            {critical.map(g => (
              <div key={g.skill} className="flex items-center justify-between">
                <span className="text-xs font-medium" style={{ color: P.dark }}>{g.skill}</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{
                  background: `${P.danger}20`,
                  color: P.danger,
                  border: `1px solid ${P.danger}40`,
                }}>
                  Gap: {g.gap} pts
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grouped bar chart */}
      <div>
        <p className="text-xs font-semibold mb-2 uppercase tracking-wider" style={{ color: `${P.dark}99` }}>
          Required vs Available (Industry Demand Score 0–100)
        </p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chartData} margin={{ left: 8, right: 8, top: 4, bottom: 40 }}>
            <CartesianGrid vertical={false} stroke={`${P.muted}50`} />
            <XAxis
              dataKey="skill"
              tick={{ fontSize: 9.5, fill: P.dark }}
              angle={-28}
              textAnchor="end"
              interval={0}
              height={50}
              axisLine={false}
              tickLine={false}
            />
            <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: `${P.dark}70` }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltipBase />} />
            <Legend
              wrapperStyle={{ fontSize: 11, color: P.dark, paddingTop: 4 }}
              iconType="square"
              iconSize={10}
            />
            <Bar dataKey="Required" fill={P.dark} radius={[3, 3, 0, 0]} maxBarSize={22} />
            <Bar dataKey="Available" fill={P.accent} radius={[3, 3, 0, 0]} maxBarSize={22} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Gap score list */}
      <div className="space-y-1.5">
        {[...data.skillGaps].sort((a, b) => b.gap - a.gap).map(g => (
          <div key={g.skill} className="flex items-center gap-3 text-xs">
            <span className="w-3/5 font-medium" style={{ color: P.dark }}>{g.skill}</span>
            <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: `${P.muted}40` }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${g.gap}%`,
                  background: g.gap >= 60 ? P.danger : g.gap >= 40 ? P.warning : P.accent,
                }}
              />
            </div>
            <span className="w-10 text-right font-bold tabular-nums" style={{
              color: g.gap >= 60 ? P.danger : g.gap >= 40 ? P.warning : P.accent,
            }}>
              {g.gap}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Tab 5 — Curriculum Alignment
const CurriculumTab: FC<{ data: DistrictJobData }> = ({ data }) => {
  const priorityColor = (p: string) =>
    p === 'high' ? P.danger : p === 'medium' ? P.warning : P.success;

  return (
    <div className="space-y-4">
      {data.curriculumSuggestions.length === 0 ? (
        <div className="text-center py-8 text-sm" style={{ color: `${P.dark}60` }}>
          No curriculum suggestions available for this region.
        </div>
      ) : (
        data.curriculumSuggestions.map((s, i) => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${P.muted}` }}>
            {/* Card header */}
            <div className="px-4 py-3 flex items-start justify-between gap-3" style={{ background: `${P.muted}30` }}>
              <div>
                <p className="text-xs font-bold" style={{ color: P.dark }}>{s.course}</p>
                <p className="text-[11px] mt-0.5" style={{ color: `${P.dark}70` }}>{s.program}</p>
              </div>
              <span className="shrink-0 text-[10px] font-bold uppercase px-2 py-1 rounded-md" style={{
                background: `${priorityColor(s.priority)}20`,
                color: priorityColor(s.priority),
                border: `1px solid ${priorityColor(s.priority)}40`,
              }}>
                {s.priority} priority
              </span>
            </div>

            <div className="p-4 space-y-3">
              {/* Alignment score */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold" style={{ color: `${P.dark}80` }}>Current Industry Alignment</span>
                  <span className="text-xs font-bold" style={{ color: s.currentAlignment >= 60 ? P.success : s.currentAlignment >= 45 ? P.warning : P.danger }}>
                    {s.currentAlignment}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: `${P.muted}40` }}>
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.currentAlignment}%`,
                      background: s.currentAlignment >= 60 ? P.success : s.currentAlignment >= 45 ? P.warning : P.danger,
                    }}
                  />
                </div>
              </div>

              {/* Issue */}
              <div className="rounded-lg p-2.5 text-xs leading-relaxed" style={{ background: `${P.danger}08`, border: `1px solid ${P.danger}20`, color: P.dark }}>
                <span className="font-bold" style={{ color: P.danger }}>Issue: </span>{s.issue}
              </div>

              {/* Action */}
              <div className="rounded-lg p-2.5 text-xs leading-relaxed flex items-start gap-2" style={{ background: `${P.success}08`, border: `1px solid ${P.success}25`, color: P.dark }}>
                <ArrowRight className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: P.success }} />
                <span><span className="font-bold" style={{ color: P.success }}>Action: </span>{s.action}</span>
              </div>

              {/* Modules grid */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-[10px] font-bold mb-1.5 flex items-center gap-1" style={{ color: P.success }}>
                    <CheckCircle2 className="w-3 h-3" /> Add Modules
                  </p>
                  <div className="space-y-1">
                    {s.addModules.map(m => (
                      <div key={m} className="flex items-start gap-1 text-[10px]" style={{ color: P.dark }}>
                        <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: P.success }} />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-bold mb-1.5 flex items-center gap-1" style={{ color: P.danger }}>
                    <XCircle className="w-3 h-3" /> Remove Topics
                  </p>
                  <div className="space-y-1">
                    {s.removeTopics.map(t => (
                      <div key={t} className="flex items-start gap-1 text-[10px]" style={{ color: P.dark }}>
                        <ChevronRight className="w-3 h-3 mt-0.5 shrink-0" style={{ color: P.danger }} />
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

// ─── Main Drilldown Component ─────────────────────────────────

interface DistrictDrilldownProps {
  region: RegionalGap;
  districtData: DistrictJobData | null;
}

const TABS = [
  { id: 'positions', label: 'Open Jobs',    shortLabel: 'Jobs',     icon: Briefcase },
  { id: 'skills',    label: 'Skills Needed', shortLabel: 'Skills',  icon: Target },
  { id: 'learning',  label: 'Students Learn', shortLabel: 'Learning', icon: BookOpen },
  { id: 'gaps',      label: 'Skill Gaps',    shortLabel: 'Gaps',    icon: Zap },
  { id: 'curriculum',label: 'Curriculum Fixes', shortLabel: 'Fix',  icon: Lightbulb },
] as const;

type TabId = typeof TABS[number]['id'];

export const DistrictDrilldown: FC<DistrictDrilldownProps> = ({ region, districtData }) => {
  const [activeTab, setActiveTab] = useState<TabId>('positions');

  if (!districtData) {
    return (
      <div className="rounded-xl flex flex-col items-center justify-center text-center p-12 h-full" style={{
        border: `2px dashed ${P.muted}`,
        background: P.white,
        color: `${P.dark}60`,
        minHeight: 400,
      }}>
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: `${P.accent}15`, border: `2px solid ${P.accent}30` }}>
          <Briefcase className="w-7 h-7" style={{ color: P.accent }} />
        </div>
        <p className="text-base font-bold" style={{ color: P.dark }}>Click a district pin</p>
        <p className="text-sm mt-1" style={{ color: `${P.dark}70` }}>
          Select any location on the map to explore job market analytics, skill gaps, and curriculum alignment.
        </p>
      </div>
    );
  }

  const severityColor =
    region.severity === 'critical' ? P.danger :
    region.severity === 'high' ? P.warning :
    region.severity === 'moderate' ? '#06b6d4' : P.success;

  return (
    <div className="rounded-xl overflow-hidden flex flex-col h-full" style={{ border: `1px solid ${P.muted}`, background: P.white }}>

      {/* Region header */}
      <div className="px-4 py-3.5" style={{ background: P.dark }}>
        <div className="flex items-start justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-extrabold tracking-tight" style={{ color: P.surface }}>
                {region.region}
              </h2>
              <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{
                background: `${severityColor}25`,
                color: severityColor,
                border: `1px solid ${severityColor}50`,
              }}>
                {region.severity}
              </span>
            </div>
            <p className="text-[11px] mt-0.5" style={{ color: P.muted }}>{region.state}</p>
          </div>
          <div className="flex gap-3 shrink-0 text-right">
            <div>
              <div className="text-base font-black tabular-nums" style={{ color: P.accent }}>
                {districtData.totalOpenings.toLocaleString()}
              </div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: P.muted }}>Open Jobs</div>
            </div>
            <div>
              <div className="text-base font-black tabular-nums" style={{ color: severityColor }}>
                +{region.netDeficit}
              </div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: P.muted }}>Deficit</div>
            </div>
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 mt-3 overflow-x-auto pb-0.5 scrollbar-none">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-all shrink-0 border"
                style={{
                  background: isActive ? P.accent : 'transparent',
                  color: isActive ? P.white : P.muted,
                  borderColor: isActive ? P.accent : `${P.muted}30`,
                }}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="p-4 overflow-y-auto flex-1">
        {activeTab === 'positions'  && <OpenPositionsTab  data={districtData} />}
        {activeTab === 'skills'     && <SkillsRequiredTab data={districtData} />}
        {activeTab === 'learning'   && <StudentsLearningTab data={districtData} />}
        {activeTab === 'gaps'       && <SkillGapsTab      data={districtData} />}
        {activeTab === 'curriculum' && <CurriculumTab     data={districtData} />}
      </div>

      {/* Footer */}
      <div className="px-4 py-2.5 flex items-center justify-between" style={{
        borderTop: `1px solid ${P.muted}60`,
        background: `${P.surface}80`,
      }}>
        <div className="flex items-center gap-2">
          <Users className="w-3 h-3" style={{ color: `${P.dark}60` }} />
          <span className="text-[10px]" style={{ color: `${P.dark}70` }}>
            {region.vocationalInstitutesCount} accredited institutions
          </span>
        </div>
        <div className="text-[10px]" style={{ color: `${P.dark}50` }}>
          Avg. Salary: <strong>₹{districtData.avgSalaryLakhs}L</strong>
        </div>
      </div>
    </div>
  );
};
