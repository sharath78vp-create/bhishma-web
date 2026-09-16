import type { FC } from 'react';
import type { UserRole } from '../../types/skillbridge';
import { Award, CheckCircle2, TrendingUp, Sparkles, Building2, Brain, Database } from 'lucide-react';

export const LearnerIllustration2D: FC = () => {
  return (
    <div className="relative w-full h-72 sm:h-80 flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-br from-brand-900/5 via-indigo-500/10 to-sky-500/10 border border-brand-200/60 p-6 shadow-inner">
      {/* Ambient Animated Glows */}
      <div className="absolute -top-10 -left-10 w-36 h-36 rounded-full bg-brand-500/15 blur-2xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-sky-400/20 blur-3xl animate-pulse" />

      {/* Floating 2D Status Chip 1 */}
      <div className="absolute top-5 right-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-brand-100/80 flex items-center gap-2 animate-float-slow">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">Python 94%</span>
          <span className="text-[9px] text-emerald-600 font-semibold">Skill Certified</span>
        </div>
      </div>

      {/* Floating 2D Status Chip 2 */}
      <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-brand-100/80 flex items-center gap-2 animate-float-reverse">
        <div className="w-6 h-6 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
          <Award className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">Cloud Architecture</span>
          <span className="text-[9px] text-brand-600 font-semibold">Ready for Placement</span>
        </div>
      </div>

      {/* 2D Vector Desk & Student Artwork */}
      <svg className="w-56 sm:w-64 h-auto drop-shadow-xl" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Background Radial Circle */}
        <circle cx="160" cy="130" r="105" fill="#e0e7ff" fillOpacity="0.4" />

        {/* Desk Surface & Legs */}
        <rect x="35" y="200" width="250" height="14" rx="7" fill="#cbd5e1" />
        <rect x="55" y="214" width="12" height="38" rx="2" fill="#94a3b8" />
        <rect x="253" y="214" width="12" height="38" rx="2" fill="#94a3b8" />
        <line x1="67" y1="230" x2="253" y2="230" stroke="#cbd5e1" strokeWidth="4" />

        {/* Coffee Mug with Animated Steam */}
        <rect x="65" y="178" width="18" height="22" rx="3" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" />
        <path d="M 83 182 C 89 182 89 192 83 192" stroke="#94a3b8" strokeWidth="2" fill="none" />
        <g className="animate-steam">
          <path d="M 70 172 Q 74 166 70 160" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 76 172 Q 80 166 76 160" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </g>

        {/* Primary Monitor */}
        <rect x="110" y="125" width="100" height="66" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="3" />
        <rect x="116" y="131" width="88" height="54" rx="3" fill="#1e293b" />
        {/* Code syntax lines on monitor */}
        <line x1="122" y1="140" x2="155" y2="140" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
        <line x1="160" y1="140" x2="185" y2="140" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" />
        <line x1="122" y1="148" x2="145" y2="148" stroke="#34d399" strokeWidth="3" strokeLinecap="round" />
        <line x1="122" y1="156" x2="175" y2="156" stroke="#fbbf24" strokeWidth="3" strokeLinecap="round" />
        <line x1="128" y1="164" x2="160" y2="164" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" />
        <line x1="122" y1="172" x2="150" y2="172" stroke="#60a5fa" strokeWidth="3" strokeLinecap="round" />

        {/* Monitor Stand */}
        <rect x="154" y="191" width="12" height="10" fill="#64748b" />
        <rect x="140" y="198" width="40" height="4" rx="2" fill="#475569" />

        {/* Keyboard & Mouse */}
        <rect x="125" y="202" width="60" height="5" rx="2" fill="#94a3b8" />
        <rect x="195" y="202" width="10" height="5" rx="2" fill="#64748b" />

        {/* 2D Student Character Behind Desk */}
        {/* Back Chair */}
        <rect x="135" y="90" width="50" height="70" rx="10" fill="#334155" />

        {/* Head & Hair */}
        <circle cx="160" cy="72" r="22" fill="#fbcfe8" />
        {/* Modern styled hair */}
        <path d="M 140 68 C 140 46 180 46 180 68 C 172 60 148 60 140 68 Z" fill="#1e293b" />
        {/* Friendly eyes */}
        <circle cx="153" cy="73" r="2.5" fill="#0f172a" />
        <circle cx="167" cy="73" r="2.5" fill="#0f172a" />
        {/* Happy smile */}
        <path d="M 155 80 Q 160 84 165 80" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Hoodie / Torso */}
        <path d="M 132 94 C 132 94 145 88 160 88 C 175 88 188 94 188 94 L 195 140 H 125 Z" fill="#2563eb" />
        {/* Hoodie collar accents */}
        <path d="M 155 88 L 157 106 M 165 88 L 163 106" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />

        {/* Sparkle Inspiration stars */}
        <g className="animate-pulse">
          <path d="M 230 70 L 233 77 L 240 80 L 233 83 L 230 90 L 227 83 L 220 80 L 227 77 Z" fill="#fbbf24" />
          <path d="M 90 90 L 92 95 L 97 97 L 92 99 L 90 104 L 88 99 L 83 97 L 88 95 Z" fill="#38bdf8" />
        </g>
      </svg>
    </div>
  );
};

export const TrainerIllustration2D: FC = () => {
  return (
    <div className="relative w-full h-72 sm:h-80 flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-brand-500/10 border border-amber-200/60 p-6 shadow-inner">
      {/* Ambient Animated Glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-amber-400/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-orange-400/15 blur-2xl animate-pulse" />

      {/* Floating 2D Badge 1 */}
      <div className="absolute top-5 left-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-amber-100/80 flex items-center gap-2 animate-float-slow">
        <span className="text-amber-500 text-sm font-extrabold">★ 4.95</span>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">Faculty Rating</span>
          <span className="text-[9px] text-amber-600 font-semibold">1,240 Reviews</span>
        </div>
      </div>

      {/* Floating 2D Badge 2 */}
      <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-amber-100/80 flex items-center gap-2 animate-float-reverse">
        <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
          <TrendingUp className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">98% Cohort Pass</span>
          <span className="text-[9px] text-amber-700 font-semibold">Active Syllabus</span>
        </div>
      </div>

      {/* 2D Vector Smart Board & Instructor Artwork */}
      <svg className="w-56 sm:w-64 h-auto drop-shadow-xl" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Background Glow */}
        <circle cx="160" cy="130" r="105" fill="#fef3c7" fillOpacity="0.4" />

        {/* Digital Interactive Smartboard */}
        <rect x="40" y="35" width="220" height="140" rx="12" fill="#0f172a" stroke="#d97706" strokeWidth="4" />
        {/* Screen Bezel Accent */}
        <rect x="48" y="43" width="204" height="124" rx="8" fill="#1e293b" />

        {/* Performance Chart on Screen */}
        <path d="M 65 140 L 95 105 L 125 120 L 165 75 L 205 90 L 235 60" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <circle cx="165" cy="75" r="5" fill="#10b981" />
        <circle cx="235" cy="60" r="6" fill="#38bdf8" />

        {/* Bar charts inside board */}
        <rect x="70" y="115" width="12" height="32" rx="3" fill="#3b82f6" />
        <rect x="90" y="100" width="12" height="47" rx="3" fill="#6366f1" />
        <rect x="110" y="110" width="12" height="37" rx="3" fill="#10b981" />
        <rect x="130" y="85" width="12" height="62" rx="3" fill="#f59e0b" />

        {/* Smartboard Stand & Floor Base */}
        <rect x="144" y="175" width="12" height="50" fill="#64748b" />
        <rect x="110" y="222" width="80" height="8" rx="4" fill="#475569" />

        {/* 2D Faculty Instructor */}
        {/* Head */}
        <circle cx="235" cy="130" r="22" fill="#fed7aa" />
        {/* Professional Hair */}
        <path d="M 215 125 C 215 105 255 105 255 125 Z" fill="#451a03" />
        {/* Glasses */}
        <rect x="222" y="127" width="10" height="7" rx="2" stroke="#1e293b" strokeWidth="2" fill="none" />
        <rect x="236" y="127" width="10" height="7" rx="2" stroke="#1e293b" strokeWidth="2" fill="none" />
        <line x1="232" y1="130" x2="236" y2="130" stroke="#1e293b" strokeWidth="2" />
        {/* Smile */}
        <path d="M 230 142 Q 235 146 240 142" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Blazer / Attire */}
        <path d="M 210 155 C 210 155 225 150 235 150 C 245 150 260 155 260 155 L 268 225 H 202 Z" fill="#b45309" />
        {/* Shirt & Tie */}
        <polygon points="235,150 230,165 240,165" fill="#ffffff" />
        <polygon points="233,165 237,165 235,185" fill="#0f172a" />

        {/* Interactive Pointer Laser Beam */}
        <line x1="175" y1="78" x2="218" y2="155" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />
        <circle cx="175" cy="78" r="4" fill="#ef4444" className="animate-ping" />
      </svg>
    </div>
  );
};

export const InstituteIllustration2D: FC = () => {
  return (
    <div className="relative w-full h-72 sm:h-80 flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/10 via-brand-600/5 to-indigo-600/10 border border-purple-200/60 p-6 shadow-inner">
      {/* Ambient Animated Glows */}
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-purple-400/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-36 h-36 rounded-full bg-indigo-400/20 blur-2xl animate-pulse" />

      {/* Floating 2D Badge 1 */}
      <div className="absolute top-5 right-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-2 animate-float-slow">
        <div className="w-6 h-6 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
          <Building2 className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">4,850 Enrolled</span>
          <span className="text-[9px] text-purple-700 font-semibold">12 Departments</span>
        </div>
      </div>

      {/* Floating 2D Badge 2 */}
      <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-purple-100/80 flex items-center gap-2 animate-float-reverse">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
          <CheckCircle2 className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">96.4% Placements</span>
          <span className="text-[9px] text-emerald-700 font-semibold">Top Hiring Partners</span>
        </div>
      </div>

      {/* 2D Vector Campus & Academic Architecture */}
      <svg className="w-56 sm:w-64 h-auto drop-shadow-xl" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Background Glow */}
        <circle cx="160" cy="130" r="105" fill="#f3e8ff" fillOpacity="0.4" />

        {/* Plaza Ground Steps */}
        <rect x="40" y="215" width="240" height="12" rx="4" fill="#cbd5e1" />
        <rect x="55" y="227" width="210" height="10" rx="3" fill="#94a3b8" />

        {/* Classical Academic Pillars & Facade */}
        <rect x="70" y="85" width="180" height="130" rx="6" fill="#7e22ce" />
        {/* Pediment / Triangular Roof */}
        <polygon points="160,35 60,85 260,85" fill="#581c87" />
        <polygon points="160,48 85,85 235,85" fill="#6b21a8" />

        {/* Academic Seal / Crest in Triangle */}
        <circle cx="160" cy="68" r="11" fill="#f59e0b" />
        <path d="M 156 68 L 164 68 M 160 64 L 160 72" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        {/* White Architectural Pillars */}
        <rect x="85" y="95" width="16" height="120" rx="2" fill="#ffffff" />
        <rect x="125" y="95" width="16" height="120" rx="2" fill="#ffffff" />
        <rect x="179" y="95" width="16" height="120" rx="2" fill="#ffffff" />
        <rect x="219" y="95" width="16" height="120" rx="2" fill="#ffffff" />

        {/* Central Entrance Double Doors */}
        <rect x="147" y="145" width="26" height="70" rx="3" fill="#3b0764" />
        <rect x="150" y="150" width="9" height="60" rx="1" fill="#581c87" />
        <rect x="161" y="150" width="9" height="60" rx="1" fill="#581c87" />

        {/* Floating Tossed Graduation Cap (Mortarboard) */}
        <g className="animate-float-slow">
          <polygon points="85,38 105,32 125,38 105,44" fill="#1e1b4b" />
          <rect x="100" y="44" width="10" height="8" fill="#1e1b4b" />
          <line x1="105" y1="38" x2="120" y2="48" stroke="#f59e0b" strokeWidth="2" />
          <circle cx="120" cy="48" r="2.5" fill="#f59e0b" />
        </g>
      </svg>
    </div>
  );
};

export const IntelligenceIllustration2D: FC = () => {
  return (
    <div className="relative w-full h-72 sm:h-80 flex items-center justify-center select-none overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600/10 via-teal-600/5 to-slate-950/15 border border-emerald-200/60 p-6 shadow-inner">
      {/* Ambient Animated Glows */}
      <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-emerald-400/20 blur-3xl animate-pulse" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-teal-400/20 blur-2xl animate-pulse" />

      {/* Floating 2D Badge 1 */}
      <div className="absolute top-5 right-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-emerald-100/80 flex items-center gap-2 animate-float-slow">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">128,400+ Signals</span>
          <span className="text-[9px] text-emerald-700 font-semibold">Live Job Telemetry</span>
        </div>
      </div>

      {/* Floating 2D Badge 2 */}
      <div className="absolute bottom-6 left-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl shadow-lg border border-emerald-100/80 flex items-center gap-2 animate-float-reverse">
        <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
          <Brain className="w-3.5 h-3.5" />
        </div>
        <div className="flex flex-col">
          <span className="text-[11px] font-extrabold text-slate-800">Admin Intelligence</span>
          <span className="text-[9px] text-emerald-700 font-semibold">Strict Role Access</span>
        </div>
      </div>

      {/* 2D Vector Neural Ecosystem & Telemetry Radar */}
      <svg className="w-56 sm:w-64 h-auto drop-shadow-xl" viewBox="0 0 320 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Soft Background Glow */}
        <circle cx="160" cy="130" r="105" fill="#ecfdf5" fillOpacity="0.4" />

        {/* Central Radar Pulse Rings */}
        <circle cx="160" cy="130" r="75" stroke="#10b981" strokeWidth="1.5" strokeDasharray="6 6" fill="none" className="animate-radar" />
        <circle cx="160" cy="130" r="45" stroke="#059669" strokeWidth="2" fill="none" />

        {/* Connecting Data Flow Highway Lines */}
        <line x1="75" y1="75" x2="160" y2="130" stroke="#059669" strokeWidth="3" className="animate-data-flow" />
        <line x1="245" y1="75" x2="160" y2="130" stroke="#059669" strokeWidth="3" className="animate-data-flow" />
        <line x1="75" y1="185" x2="160" y2="130" stroke="#059669" strokeWidth="3" className="animate-data-flow" />
        <line x1="245" y1="185" x2="160" y2="130" stroke="#059669" strokeWidth="3" className="animate-data-flow" />

        {/* Central Intelligence Core */}
        <circle cx="160" cy="130" r="32" fill="#065f46" />
        <circle cx="160" cy="130" r="22" fill="#10b981" />
        <circle cx="160" cy="130" r="12" fill="#ffffff" />
        <circle cx="160" cy="130" r="6" fill="#064e3b" />

        {/* Surrounding Node 1: Job Demand */}
        <circle cx="75" cy="75" r="18" fill="#0284c7" />
        <circle cx="75" cy="75" r="9" fill="#ffffff" />

        {/* Surrounding Node 2: Emerging Tech */}
        <circle cx="245" cy="75" r="18" fill="#8b5cf6" />
        <circle cx="245" cy="75" r="9" fill="#ffffff" />

        {/* Surrounding Node 3: Regional Hubs */}
        <circle cx="75" cy="185" r="18" fill="#f59e0b" />
        <circle cx="75" cy="185" r="9" fill="#ffffff" />

        {/* Surrounding Node 4: Institute Alignments */}
        <circle cx="245" cy="185" r="18" fill="#ec4899" />
        <circle cx="245" cy="185" r="9" fill="#ffffff" />
      </svg>
    </div>
  );
};

export const AuthRoleIllustration: FC<{ role: UserRole }> = ({ role }) => {
  if (role === 'trainer') return <TrainerIllustration2D />;
  if (role === 'institute') return <InstituteIllustration2D />;
  if (role === 'intelligence') return <IntelligenceIllustration2D />;
  return <LearnerIllustration2D />;
};
