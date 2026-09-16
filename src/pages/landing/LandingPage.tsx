import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { RoleSelectionModal } from '../../components/auth/RoleSelectionModal';
import {
  Search,
  BrainCircuit,
  GraduationCap,
  Users,
  Building2,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Globe2,
  Compass,
  Layers,
  ChevronRight,
  Briefcase,
  BookOpen,
  CheckCircle2,
  ShieldCheck,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Laptop,
  Cpu,
  Zap,
  HelpCircle,
  Eye,
  FileCheck,
  UserCheck
} from 'lucide-react';
import type { UserRole } from '../../types/skillbridge';

export const LandingPage: FC = () => {
  const navigate = useNavigate();
  const { setRole, currentRole, isAuthenticated } = useSkillBridge();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'login' | 'register'>('register');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseCategory, setActiveCourseCategory] = useState<'all' | 'it' | 'electronics' | 'green'>('all');

  // Lock user to their assigned portal once logged in - cannot be changed or bypassed
  useEffect(() => {
    if (isAuthenticated) {
      const portalMap: Record<UserRole, string> = {
        student: '/student',
        trainer: '/trainer',
        institute: '/institute',
        intelligence: '/intelligence'
      };
      navigate(portalMap[currentRole] || '/student', { replace: true });
    }
  }, [isAuthenticated, currentRole, navigate]);

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setModalMode(mode);
    setModalOpen(true);
  };

  const handleQuickRoleNavigate = (role: UserRole) => {
    setRole(role);
    if (role === 'student') navigate('/student');
    else if (role === 'trainer') navigate('/trainer');
    else if (role === 'institute') navigate('/institute');
    else if (role === 'intelligence') navigate('/intelligence');
  };

  // Trending course showcase data
  const sampleCourses = [
    {
      id: 'c1',
      category: 'it',
      title: 'Full-Stack Cloud Application Engineering',
      provider: 'Apex Technical Institute',
      duration: '12 Weeks',
      mode: 'Hybrid & Practical Lab',
      rating: 4.9,
      learners: '18,420',
      badge: 'High Industry Demand',
      tagColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'c2',
      category: 'electronics',
      title: 'VLSI Digital Design & Verification Mastery',
      provider: 'Semiconductor Academy Hub',
      duration: '16 Weeks',
      mode: 'Virtual Lab & Simulation',
      rating: 4.8,
      learners: '9,840',
      badge: 'Critical Talent Shortage',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      id: 'c3',
      category: 'green',
      title: 'EV Powertrain Design & Battery Systems',
      provider: 'Automotive Innovation Institute',
      duration: '10 Weeks',
      mode: 'Hands-on Workshop',
      rating: 4.9,
      learners: '12,650',
      badge: 'Emerging Green Tech',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    },
    {
      id: 'c4',
      category: 'it',
      title: 'Applied Generative AI & Prompt Engineering',
      provider: 'Enterprise Intelligence Labs',
      duration: '8 Weeks',
      mode: 'Self-Paced & Projects',
      rating: 4.95,
      learners: '24,100',
      badge: 'Top Enrolled 2026',
      tagColor: 'bg-purple-50 text-purple-700 border-purple-200'
    }
  ];

  const filteredCourses = activeCourseCategory === 'all' 
    ? sampleCourses 
    : sampleCourses.filter(c => c.category === activeCourseCategory);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-orange-500 selection:text-white">
      {/* 1. Universal Top Utility Ribbon */}
      <div className="bg-slate-900 text-slate-300 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Left: Platform Mode & Realtime Pulse */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
              NATIONAL SKILLING PORTAL
            </span>
            <span className="hidden sm:inline text-slate-400">
              Integrated Digital Skilling, Training &amp; Employment Platform
            </span>
          </div>

          {/* Right: Accessibility Controls, Language, Telemetry Badge */}
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <div className="flex items-center gap-1.5 cursor-pointer hover:text-white transition-colors">
              <Eye className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Screen Reader</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1 font-mono font-bold text-slate-300">
              <span className="cursor-pointer hover:text-white px-1">A-</span>
              <span className="cursor-pointer hover:text-white px-1">A</span>
              <span className="cursor-pointer hover:text-white px-1">A+</span>
            </div>
            <span>|</span>
            <div className="flex items-center gap-1.5 text-emerald-400 font-mono font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live Telemetry</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Portal Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
          {/* Brand Identity */}
          <Link to="/" className="flex items-center gap-3.5 shrink-0 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-orange-500 text-white flex items-center justify-center font-extrabold text-2xl shadow-md transition-transform group-hover:scale-105">
              DH
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                  Digital Skill Hub
                </span>
              </div>
              <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider mt-0.5">
                Skills &bull; Certifications &bull; Employment
              </span>
            </div>
          </Link>

          {/* Center Search Input */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-4">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 2,400+ verified skill courses, apprenticeships & pathways..."
                className="w-full pl-10 pr-4 py-2.5 text-xs rounded-full border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all text-slate-800 placeholder:text-slate-400 shadow-2xs"
              />
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Skill Intelligence Button */}
            <button
              onClick={() => handleQuickRoleNavigate('intelligence')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all shadow-2xs"
              title="Restricted Admin & Officer Telemetry"
            >
              <BrainCircuit className="w-3.5 h-3.5 text-emerald-600" />
              <span>SKILL INTELLIGENCE</span>
            </button>

            {/* Register Button (Vibrant Orange / Saffron) */}
            <button
              onClick={() => handleOpenAuth('register')}
              className="px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-700 active:scale-95 text-white text-xs font-extrabold shadow-sm shadow-orange-600/30 transition-all uppercase tracking-wider"
            >
              Register
            </button>

            {/* Login Button (Clean Outlined / Dark) */}
            <button
              onClick={() => handleOpenAuth('login')}
              className="px-5 py-2.5 rounded-full border-2 border-slate-800 hover:border-slate-900 bg-white hover:bg-slate-50 active:scale-95 text-slate-900 text-xs font-extrabold transition-all uppercase tracking-wider"
            >
              Login
            </button>
          </div>
        </div>

        {/* Sub-Header Category Strip */}
        <div className="border-t border-slate-100 bg-slate-100/70 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between text-xs text-slate-700 font-semibold">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => handleQuickRoleNavigate('student')}
                className="hover:text-blue-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-blue-600" />
                <span>Learner Portal</span>
              </button>
              <button 
                onClick={() => handleQuickRoleNavigate('trainer')}
                className="hover:text-amber-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Users className="w-4 h-4 text-amber-600" />
                <span>Trainer &amp; Faculty Portal</span>
              </button>
              <button 
                onClick={() => handleQuickRoleNavigate('institute')}
                className="hover:text-purple-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <Building2 className="w-4 h-4 text-purple-600" />
                <span>Institute &amp; Academies</span>
              </button>
              <button 
                onClick={() => handleQuickRoleNavigate('intelligence')}
                className="hover:text-emerald-700 cursor-pointer flex items-center gap-1.5 transition-colors"
              >
                <BrainCircuit className="w-4 h-4 text-emerald-600" />
                <span>Intelligence Officer</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
              <span>Unified Skilling Standard 2026-27</span>
            </div>
          </div>
        </div>
      </header>

      {/* 3. Hero Section & Interactive Search Carousel */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white py-14 sm:py-20 px-4 sm:px-6">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-orange-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Hero Message */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-bold text-orange-300">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" />
                <span>Next-Generation Workforce Skilling Architecture</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                Skill. Certify. Connect.{' '}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-sky-300 bg-clip-text text-transparent">
                  Anytime, Anywhere.
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed mx-auto lg:mx-0">
                An all-in-one digital skilling destination connecting learners, certified faculty, training academies, and enterprise recruiters with verified labor market intelligence.
              </p>

              {/* Prominent Hero Search Box */}
              <div className="bg-white p-2 sm:p-2.5 rounded-2xl sm:rounded-full shadow-2xl flex flex-col sm:flex-row items-center gap-2 border-2 border-orange-500/40">
                <div className="flex items-center gap-2.5 w-full px-3 text-slate-700">
                  <Search className="w-5 h-5 text-orange-500 shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What skill do you want to learn today?"
                    className="w-full text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 bg-transparent focus:outline-none"
                  />
                </div>
                <button
                  onClick={() => handleOpenAuth('register')}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-full bg-orange-600 hover:bg-orange-700 text-white text-xs font-extrabold shadow-md transition-all shrink-0 flex items-center justify-center gap-1.5 uppercase tracking-wider"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Trending Topic Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1 text-xs">
                <span className="text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                  Trending:
                </span>
                {['Artificial Intelligence', 'Cloud Engineering', 'VLSI Design', 'EV Battery Systems', 'Full Stack Tech', 'Cybersecurity'].map((topic) => (
                  <span
                    key={topic}
                    onClick={() => handleOpenAuth('register')}
                    className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-slate-200 hover:text-white cursor-pointer transition-colors text-[11px] font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Hero Graphic: Fast Role Access Panel */}
            <div className="lg:col-span-5">
              <div className="p-6 sm:p-7 rounded-3xl bg-slate-900/80 backdrop-blur-xl border border-white/15 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-white">
                      Direct Stakeholder Access
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-semibold">Select portal to enter</span>
                </div>

                <div className="space-y-3">
                  {/* Learner Card */}
                  <div
                    onClick={() => handleQuickRoleNavigate('student')}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-300 flex items-center justify-center font-bold">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                          Learner / Student Portal
                        </div>
                        <div className="text-[11px] text-slate-300">Enroll courses, diagnose skill gaps &amp; jobs</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Trainer Card */}
                  <div
                    onClick={() => handleQuickRoleNavigate('trainer')}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-600/30 text-amber-300 flex items-center justify-center font-bold">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                          Trainer &amp; Faculty Portal
                        </div>
                        <div className="text-[11px] text-slate-300">Cohort management &amp; assessment grading</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Institute Card */}
                  <div
                    onClick={() => handleQuickRoleNavigate('institute')}
                    className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-600/30 text-purple-300 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                          Institute &amp; Academy Portal
                        </div>
                        <div className="text-[11px] text-slate-300">Curriculum sync &amp; campus placements</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Intelligence Officer Card */}
                  <div
                    onClick={() => handleQuickRoleNavigate('intelligence')}
                    className="p-3.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600/40 text-emerald-300 flex items-center justify-center font-bold">
                        <BrainCircuit className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-emerald-300 group-hover:text-white transition-colors">
                          Admin &amp; Intelligence Officer
                        </div>
                        <div className="text-[11px] text-slate-300">Restricted labor market telemetry</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quick Services / Squircle Grid */}
      <section className="py-12 px-4 sm:px-6 bg-white border-b border-slate-200 relative -mt-6 z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { label: 'Skill Courses', icon: BookOpen, color: 'bg-blue-600', role: 'student' as UserRole },
              { label: 'Apprenticeships', icon: Briefcase, color: 'bg-emerald-600', role: 'student' as UserRole },
              { label: 'Job Placements', icon: TrendingUp, color: 'bg-purple-600', role: 'student' as UserRole },
              { label: 'Training Hubs', icon: Building2, color: 'bg-orange-600', role: 'institute' as UserRole },
              { label: 'Skill Passport', icon: Award, color: 'bg-amber-600', role: 'student' as UserRole },
              { label: 'Assessments', icon: FileCheck, color: 'bg-cyan-600', role: 'trainer' as UserRole },
              { label: 'Curriculum Sync', icon: Layers, color: 'bg-rose-600', role: 'institute' as UserRole },
              { label: 'Market Telemetry', icon: BrainCircuit, color: 'bg-teal-600', role: 'intelligence' as UserRole }
            ].map((serv, idx) => {
              const IconComp = serv.icon;
              return (
                <div
                  key={idx}
                  onClick={() => handleQuickRoleNavigate(serv.role)}
                  className="p-4 rounded-2xl bg-slate-50 hover:bg-white border border-slate-200/80 hover:border-slate-300 hover:shadow-md cursor-pointer transition-all flex flex-col items-center text-center gap-2.5 group"
                >
                  <div className={`w-12 h-12 rounded-2xl ${serv.color} text-white flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-extrabold text-slate-800 leading-tight">
                    {serv.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Live Impact Statistics Ribbon */}
      <section className="py-10 px-4 sm:px-6 bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-orange-400">4.8M+</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Candidates Registered</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-blue-400">18,500+</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Active Training Batches</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400">2,400+</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Certified Courses</div>
          </div>
          <div className="space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-amber-400">850+</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Hiring Corporates</div>
          </div>
          <div className="col-span-2 md:col-span-1 space-y-1">
            <div className="text-3xl sm:text-4xl font-black text-purple-400">94.8%</div>
            <div className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Placement Track Record</div>
          </div>
        </div>
      </section>

      {/* 6. Popular Courses & Learning Pathways Grid */}
      <section className="py-16 px-4 sm:px-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
                Verified Skilling Curriculum
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Popular Courses &amp; Certifications
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Curriculums aligned directly with real-time employer demand benchmarks.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-white rounded-xl border border-slate-200 shadow-2xs self-start">
              <button
                onClick={() => setActiveCourseCategory('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCourseCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Sectors
              </button>
              <button
                onClick={() => setActiveCourseCategory('it')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCourseCategory === 'it'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                IT &amp; Cloud
              </button>
              <button
                onClick={() => setActiveCourseCategory('electronics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCourseCategory === 'electronics'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semiconductors
              </button>
              <button
                onClick={() => setActiveCourseCategory('green')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCourseCategory === 'green'
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Green Mobility
              </button>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCourses.map((c) => (
              <div
                key={c.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${c.tagColor}`}>
                      {c.badge}
                    </span>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      {c.rating}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                    {c.title}
                  </h3>

                  <div className="text-xs text-slate-500 font-medium">
                    {c.provider}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {c.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-slate-700">
                      <Users className="w-3.5 h-3.5 text-slate-400" />
                      {c.learners} Enrolled
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => handleQuickRoleNavigate('student')}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Enroll Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Comprehensive 4-Role Showcase Cards */}
      <section className="py-16 px-4 sm:px-6 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-orange-600">
              One Unified Ecosystem &bull; 4 Specialized Portals
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Designed for Every Stakeholder in Skilling
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Choose your role below to enter your dedicated workflow platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Learner */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Learner / Student</h3>
                  <span className="text-xs text-blue-700 font-semibold">Candidates &amp; Professionals</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Personalized skill gap diagnosis, certified pathways, benchmark assessments, and direct matching with live industry jobs.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => handleQuickRoleNavigate('student')}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Enter Learner Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Trainer */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Trainer &amp; Faculty</h3>
                  <span className="text-xs text-amber-700 font-semibold">Instructors &amp; Evaluators</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Deliver accredited programs, track student cohort mastery, grade evaluation labs, and access instructor upskilling toolkits.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => handleQuickRoleNavigate('trainer')}
                  className="w-full py-2.5 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Enter Trainer Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 3: Institute */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Institute &amp; Academy</h3>
                  <span className="text-xs text-purple-700 font-semibold">Universities &amp; Training Hubs</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Institutional syllabus audit, faculty allocation, automated curriculum upgrades, and corporate placement conversion tracking.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => handleQuickRoleNavigate('institute')}
                  className="w-full py-2.5 px-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Enter Institute Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 4: Skill Intelligence */}
            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Admin &amp; Officer</h3>
                  <span className="text-xs text-emerald-700 font-semibold">Restricted Intelligence</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Internal portal for administrators and intelligence officers to audit ecosystem telemetry, market trends, and policy simulator feeds.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <button
                  onClick={() => handleQuickRoleNavigate('intelligence')}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <span>Officer Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Multi-Column Comprehensive Portal Footer */}
      <footer className="bg-slate-950 text-white text-xs pt-12 pb-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
            {/* Column 1: Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-orange-500 text-white flex items-center justify-center font-bold text-base shadow-sm">
                  DH
                </div>
                <span className="font-extrabold text-base text-white tracking-tight">
                  Digital Skill Hub
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Unified digital skilling, training delivery, and labor market telemetry ecosystem connecting talent with career opportunities.
              </p>
            </div>

            {/* Column 2: Portals */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Stakeholder Portals
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><button onClick={() => handleQuickRoleNavigate('student')} className="hover:text-white transition-colors">Learner &amp; Student Portal</button></li>
                <li><button onClick={() => handleQuickRoleNavigate('trainer')} className="hover:text-white transition-colors">Trainer &amp; Faculty Portal</button></li>
                <li><button onClick={() => handleQuickRoleNavigate('institute')} className="hover:text-white transition-colors">Institute &amp; Academies</button></li>
                <li><button onClick={() => handleQuickRoleNavigate('intelligence')} className="hover:text-white transition-colors">Skill Intelligence Officer</button></li>
              </ul>
            </div>

            {/* Column 3: Resources */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Platform Resources
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><span className="hover:text-white cursor-pointer">Verified Course Catalog</span></li>
                <li><span className="hover:text-white cursor-pointer">Apprenticeship Guidelines</span></li>
                <li><span className="hover:text-white cursor-pointer">Curriculum Standards Benchmark</span></li>
                <li><span className="hover:text-white cursor-pointer">Live Labor Market Telemetry</span></li>
              </ul>
            </div>

            {/* Column 4: Helpdesk */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Helpdesk &amp; Support
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li><span>Toll-Free Support: 1800-000-2026</span></li>
                <li><span>Email: support@skillsintelligence.org</span></li>
                <li><span className="hover:text-white cursor-pointer">Frequently Asked Questions</span></li>
                <li><span className="hover:text-white cursor-pointer">Grievance Redressal</span></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <div>
              &copy; {new Date().getFullYear()} Digital Skill Hub. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
              <span>&bull;</span>
              <span className="hover:text-slate-300 cursor-pointer">Terms of Use</span>
              <span>&bull;</span>
              <span className="hover:text-slate-300 cursor-pointer">Accessibility Statement</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Role Selection Modal */}
      <RoleSelectionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        mode={modalMode}
      />
    </div>
  );
};
