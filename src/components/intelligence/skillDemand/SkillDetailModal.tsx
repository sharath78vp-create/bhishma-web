import React from 'react';
import type { FC } from 'react';
import {
  X,
  TrendingUp,
  BookOpen,
  Briefcase,
  Scale
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface SkillDetailModalProps {
  skill: SkillDemandIntelligenceItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCompare?: (skill: SkillDemandIntelligenceItem) => void;
  isCompared?: boolean;
}

export const SkillDetailModal: FC<SkillDetailModalProps> = ({
  skill,
  isOpen,
  onClose,
  onAddToCompare,
  isCompared = false
}) => {
  if (!isOpen || !skill) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Box */}
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/80 shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
                {skill.category}
              </span>
              <span className="text-xs font-semibold text-emerald-600">
                +{skill.yoyGrowth}% YoY Growth
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {skill.skill}
            </h2>
            <p className="text-xs text-slate-500">
              Workforce Intelligence Profile &bull; Active Postings: <strong>{skill.activeJobPostings.toLocaleString()}</strong> &bull; Avg Starting Package: <strong>₹{skill.avgStartingSalaryLPA} LPA</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            {onAddToCompare && (
              <button
                onClick={() => onAddToCompare(skill)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isCompared
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Scale className="w-3.5 h-3.5 text-indigo-600" />
                {isCompared ? 'In Compare' : '+ Compare'}
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs">
          {/* Key 5 Telemetry Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-center">
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">
                Industry Demand
              </span>
              <strong className="text-xl font-extrabold text-blue-900 block mt-1">
                {skill.industryDemand}%
              </strong>
              <span className="text-[10px] text-blue-700">{skill.demandLevel} Demand</span>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100 text-center">
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider block">
                Student Interest
              </span>
              <strong className="text-xl font-extrabold text-indigo-900 block mt-1">
                {skill.studentInterest}%
              </strong>
              <span className="text-[10px] text-indigo-700">Student Preference</span>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-center">
              <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">
                Curriculum Coverage
              </span>
              <strong className="text-xl font-extrabold text-emerald-900 block mt-1">
                {skill.curriculumCoverage}%
              </strong>
              <span className="text-[10px] text-emerald-700">{skill.curriculumAttention} Attention</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                Student Supply
              </span>
              <strong className="text-xl font-extrabold text-slate-900 block mt-1">
                {skill.studentSupply}%
              </strong>
              <span className="text-[10px] text-slate-600">{skill.supplyStatus}</span>
            </div>

            <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-center col-span-2 sm:col-span-1">
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider block">
                Demand-Supply Gap
              </span>
              <strong className="text-xl font-extrabold text-rose-900 block mt-1">
                +{skill.demandSupplyGap}%
              </strong>
              <span className="text-[10px] text-rose-700 font-bold">Shortfall</span>
            </div>
          </div>

          {/* 12-Month Demand vs Interest Momentum Trend Chart */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <TrendingUp className="w-4 h-4 text-blue-600" />
                <span>12-Month Historical &amp; Predictive Demand Trajectory</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-semibold text-slate-600">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /> Demand
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-indigo-400" /> Interest
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Supply
                </span>
              </div>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={skill.monthlyTrend} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                  <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#ffffff',
                      fontSize: '11px',
                      border: 'none'
                    }}
                  />
                  <Line type="monotone" dataKey="demand" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="interest" stroke="#818cf8" strokeWidth={2} dot={{ r: 2 }} />
                  <Line type="monotone" dataKey="supply" stroke="#10b981" strokeWidth={2} strokeDasharray="3 3" dot={{ r: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Hiring Industries & Regional Demand Hotspots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Primary Hiring Industries</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-800 text-[11px] font-medium border border-blue-100"
                  >
                    {ind}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  Active Recruiters
                </span>
                <p className="text-[11px] text-slate-700">
                  {skill.keyHiringCompanies.join(', ')}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-1.5 font-bold text-slate-900">
                <BookOpen className="w-4 h-4 text-indigo-600" />
                <span>Foundations &amp; Prerequisites</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.prerequisites.map((req) => (
                  <span
                    key={req}
                    className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-800 text-[11px] font-medium border border-indigo-100"
                  >
                    {req}
                  </span>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">
                  Target Proficiency Level
                </span>
                <p className="text-[11px] text-slate-700">
                  Industry Ready &bull; Tier-1/2 Graduate Standard
                </p>
              </div>
            </div>
          </div>

          {/* Actionable Curriculum Recommendation Box */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-2">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-emerald-700" />
              <strong className="text-emerald-900 font-bold">
                Institutional Curriculum Recommendation
              </strong>
            </div>
            <p className="text-emerald-950 text-xs leading-relaxed">
              {skill.curriculumRecommendation}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t border-slate-100 bg-slate-50 text-xs font-semibold shrink-0">
          <span className="text-slate-500">
            Workforce Readiness Quadrant: <strong className="text-slate-800">{skill.quadrant}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors font-semibold"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
