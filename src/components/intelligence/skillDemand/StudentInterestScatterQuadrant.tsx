import React, { useState } from 'react';
import type { FC } from 'react';
import { Compass } from 'lucide-react';
import type { SkillDemandIntelligenceItem } from '../../../mock/skillDemandIntelligenceData';

interface StudentInterestScatterQuadrantProps {
  skills: SkillDemandIntelligenceItem[];
  onSelectSkill: (skill: SkillDemandIntelligenceItem) => void;
}

export const StudentInterestScatterQuadrant: FC<StudentInterestScatterQuadrantProps> = ({
  skills,
  onSelectSkill
}) => {
  const [hoveredSkill, setHoveredSkill] = useState<SkillDemandIntelligenceItem | null>(null);

  // Determine quadrant colors and border styles
  const getQuadrantColor = (interest: number, demand: number) => {
    if (interest >= 50 && demand >= 50) {
      return {
        bg: 'bg-emerald-500',
        ring: 'ring-emerald-200',
        text: 'text-emerald-700',
        tag: 'Aligned Skills'
      };
    }
    if (interest < 50 && demand >= 50) {
      return {
        bg: 'bg-rose-500',
        ring: 'ring-rose-200',
        text: 'text-rose-700',
        tag: 'Critical Shortage'
      };
    }
    if (interest >= 50 && demand < 50) {
      return {
        bg: 'bg-amber-500',
        ring: 'ring-amber-200',
        text: 'text-amber-700',
        tag: 'Potential Oversupply'
      };
    }
    return {
      bg: 'bg-slate-400',
      ring: 'ring-slate-200',
      text: 'text-slate-600',
      tag: 'Low Priority'
    };
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs p-5 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
              Student Interest vs Industry Demand (Workforce Quadrant)
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Quadrant mapping identifying high-alignment, talent shortage, oversupply, and low-priority competencies.
          </p>
        </div>

        {/* Quadrant Legend */}
        <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-semibold">
          <span className="px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500" /> Critical Shortage
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Aligned Skills
          </span>
          <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500" /> Potential Oversupply
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-slate-400" /> Low Priority
          </span>
        </div>
      </div>

      {/* 2x2 Interactive Quadrant Canvas */}
      <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[380px] bg-slate-50/70 rounded-2xl border border-slate-200/80 p-8 overflow-hidden select-none">
        {/* Quadrant 4-Zone Background Grid */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          {/* Top Left: Low Interest + High Demand */}
          <div className="border-r border-b border-dashed border-slate-300 p-4 bg-rose-50/20 relative flex flex-col justify-start">
            <span className="text-[10px] font-bold text-rose-700 uppercase tracking-wider px-2 py-0.5 bg-rose-100/70 rounded-md inline-block w-fit">
              ZONE 1: CRITICAL TALENT SHORTAGE (Low Interest + High Demand)
            </span>
          </div>

          {/* Top Right: High Interest + High Demand */}
          <div className="border-b border-dashed border-slate-300 p-4 bg-emerald-50/20 relative flex flex-col justify-start items-end text-right">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider px-2 py-0.5 bg-emerald-100/70 rounded-md inline-block w-fit">
              ZONE 2: ALIGNED SKILLS (High Interest + High Demand)
            </span>
          </div>

          {/* Bottom Left: Low Interest + Low Demand */}
          <div className="border-r border-dashed border-slate-300 p-4 bg-slate-100/20 relative flex flex-col justify-end">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-0.5 bg-slate-200/70 rounded-md inline-block w-fit">
              ZONE 4: LOW PRIORITY (Low Interest + Low Demand)
            </span>
          </div>

          {/* Bottom Right: High Interest + Low Demand */}
          <div className="p-4 bg-amber-50/20 relative flex flex-col justify-end items-end text-right">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider px-2 py-0.5 bg-amber-100/70 rounded-md inline-block w-fit">
              ZONE 3: POTENTIAL OVERSUPPLY (High Interest + Low Demand)
            </span>
          </div>
        </div>

        {/* Center Crosshair Axes */}
        <div className="absolute inset-y-0 left-1/2 w-px bg-slate-300 pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 h-px bg-slate-300 pointer-events-none" />

        {/* Axis Labels */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[10px] font-bold uppercase tracking-widest text-slate-400 pointer-events-none">
          Industry Demand &rarr;
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[10px] font-bold uppercase tracking-widest text-slate-400 pointer-events-none">
          Student Interest &rarr;
        </div>

        {/* Plotted Skill Bubbles */}
        {skills.map((s) => {
          const xPercent = Math.min(Math.max(s.studentInterest, 8), 92);
          // Invert Y axis because 100% demand should be at top (0%)
          const yPercent = Math.min(Math.max(100 - s.industryDemand, 8), 92);
          const styling = getQuadrantColor(s.studentInterest, s.industryDemand);
          const isHovered = hoveredSkill?.id === s.id;

          return (
            <div
              key={s.id}
              style={{
                left: `${xPercent}%`,
                top: `${yPercent}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer transition-transform duration-200 hover:scale-125"
              onMouseEnter={() => setHoveredSkill(s)}
              onMouseLeave={() => setHoveredSkill(null)}
              onClick={() => onSelectSkill(s)}
            >
              {/* Bubble Dot */}
              <div
                className={`relative w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shadow-md ring-4 ${styling.bg} ${styling.ring} transition-all`}
              >
                <span>{s.skill.charAt(0)}</span>
              </div>

              {/* Bubble Persistent / Floating Label */}
              <div
                className={`absolute left-1/2 -translate-x-1/2 top-7 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-xs pointer-events-none transition-all ${
                  isHovered
                    ? 'bg-slate-900 text-white z-30 scale-110'
                    : 'bg-white/90 text-slate-800 border border-slate-200'
                }`}
              >
                {s.skill.split(' ')[0]}
              </div>
            </div>
          );
        })}

        {/* Hover Spotlight Box inside Quadrant */}
        {hoveredSkill && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 bg-slate-900/95 text-white px-4 py-2.5 rounded-xl border border-slate-700 shadow-2xl text-xs flex items-center gap-4 backdrop-blur-md animate-fade-in pointer-events-none">
            <div>
              <p className="font-bold text-sm text-blue-300">{hoveredSkill.skill}</p>
              <p className="text-[10px] text-slate-400">{hoveredSkill.category}</p>
            </div>
            <div className="h-6 w-px bg-slate-700" />
            <div className="flex items-center gap-3 text-[11px]">
              <span>
                Interest: <strong className="text-white">{hoveredSkill.studentInterest}%</strong>
              </span>
              <span>
                Demand: <strong className="text-blue-400">{hoveredSkill.industryDemand}%</strong>
              </span>
              <span className="text-rose-400 font-bold">
                Gap: +{hoveredSkill.demandSupplyGap}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Helper Footer */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium">
          Strategic Focus: Convert <strong>Zone 1 (Critical Shortage)</strong> into <strong>Zone 2 (Aligned)</strong> via student awareness campaigns &amp; elective workshops.
        </span>
        <span className="text-[11px] text-slate-400 font-mono">
          Click any bubble to view detailed workforce diagnostics.
        </span>
      </div>
    </div>
  );
};
