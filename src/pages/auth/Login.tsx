import { useState, useEffect } from 'react';
import type { FC, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSkillBridge } from '../../context/SkillBridgeContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { AuthRoleIllustration } from '../../components/illustrations/AuthIllustrations2D';
import {
  GraduationCap,
  Users,
  Building2,
  BrainCircuit,
  ArrowRight,
  ShieldCheck,
  Home,
  Lock,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import type { UserRole } from '../../types/skillbridge';

export const Login: FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, currentRole, setNotification } = useSkillBridge();

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('rahul@learner.edu');
  const [password, setPassword] = useState('password123');

  // Once authenticated, lock user to their specific site - cannot access login or switch roles
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

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setEmail('rahul@learner.edu');
    } else if (role === 'trainer') {
      setEmail('arjun.rao@faculty.edu');
    } else if (role === 'institute') {
      setEmail('admin@apexinstitute.edu');
    } else {
      setEmail('officer@skillsintelligence.org');
    }
  };

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    setNotification(`Signed in successfully as ${selectedRole.toUpperCase()}. Session locked.`);
    if (selectedRole === 'student') {
      navigate('/student');
    } else if (selectedRole === 'trainer') {
      navigate('/trainer');
    } else if (selectedRole === 'institute') {
      navigate('/institute');
    } else {
      navigate('/intelligence');
    }
  };

  const handleQuickDemo = (role: UserRole) => {
    login(role);
    setNotification(`Instant Demo: signed in as ${role.toUpperCase()}. Session locked.`);
    if (role === 'student') {
      navigate('/student');
    } else if (role === 'trainer') {
      navigate('/trainer');
    } else if (role === 'institute') {
      navigate('/institute');
    } else {
      navigate('/intelligence');
    }
  };

  const roleDescriptions: Record<UserRole, { title: string; subtitle: string; features: string[] }> = {
    student: {
      title: 'Learner & Student Portal',
      subtitle: 'Personalized skill pathways, dynamic assessments & placement matches',
      features: ['Personal Skill Passport', 'Interactive Skill Assessments', 'Curated Job Opportunities']
    },
    trainer: {
      title: 'Trainer & Faculty Portal',
      subtitle: 'Cohort management, syllabus delivery & automated grading telemetry',
      features: ['Assigned Batch Schedules', 'Assessment Evaluation Suite', 'Skill Gap Alerts']
    },
    institute: {
      title: 'Institute & Partner Portal',
      subtitle: 'Campus analytics, curriculum synchronization & placement monitoring',
      features: ['Student Enrollment Telemetry', 'Curriculum Recommendation Engine', 'Industry Partner Network']
    },
    intelligence: {
      title: 'Skill Intelligence Officer Portal',
      subtitle: 'Restricted administrative telemetry, labor trends & policy simulator',
      features: ['National Labour Demand Radar', 'Emerging Tech Skill Deficits', 'Multi-Source Algorithmic Feeds']
    }
  };

  const activeInfo = roleDescriptions[selectedRole];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 antialiased selection:bg-brand-500 selection:text-white relative overflow-hidden">
      {/* Decorative Subtle Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl space-y-6 relative z-10">
        {/* Top Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold shadow-2xs mb-1 animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Unified Digital Skilling &amp; Intelligence Ecosystem</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Sign In to Your Workspace
          </h1>
          <p className="text-sm text-slate-500 font-medium max-w-lg mx-auto">
            Choose your role to access your dedicated site. Once authenticated, your session remains strictly locked to that portal.
          </p>
        </div>

        {/* Main Grid: Animated 2D Illustration + Login Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Column: 2D Animated Illustration Workspace */}
          <div className="lg:col-span-6 space-y-4">
            <AuthRoleIllustration role={selectedRole} />

            {/* Portal Feature Summary Card */}
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Active Portal Context
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <Lock className="w-3 h-3" />
                  Locked on Sign-in
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                {activeInfo.title}
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                {activeInfo.subtitle}
              </p>
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-2">
                {activeInfo.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-600 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-brand-600 shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Login Card */}
          <div className="lg:col-span-6">
            <Card className="shadow-xl border-slate-200/90 backdrop-blur-xs" padding="lg">
              <form onSubmit={handleLogin} className="space-y-4">
                {/* 4-Role Tab Switcher */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Select Your Portal Role
                    </label>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Redirects automatically
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => handleRoleChange('student')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'student'
                          ? 'bg-white text-brand-700 font-bold shadow-xs ring-1 ring-brand-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4" />
                      <span className="text-[11px]">Learner</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleChange('trainer')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'trainer'
                          ? 'bg-white text-amber-800 font-bold shadow-xs ring-1 ring-amber-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Users className="w-4 h-4" />
                      <span className="text-[11px]">Trainer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleChange('institute')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'institute'
                          ? 'bg-white text-purple-800 font-bold shadow-xs ring-1 ring-purple-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      <span className="text-[11px]">Institute</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRoleChange('intelligence')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'intelligence'
                          ? 'bg-white text-emerald-800 font-bold shadow-xs ring-1 ring-emerald-200'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                      }`}
                    >
                      <BrainCircuit className="w-4 h-4" />
                      <span className="text-[11px]">Officer</span>
                    </button>
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Work or Academic Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                    placeholder="name@institution.edu"
                  />
                </div>

                {/* Password */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Password
                    </label>
                    <span className="text-[11px] text-slate-400 hover:text-brand-600 cursor-pointer">
                      Forgot password?
                    </span>
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all bg-white"
                    placeholder="••••••••"
                  />
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-[0.99] text-white text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md shadow-brand-500/20"
                >
                  <span>Sign In &amp; Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">
                    Need a new account?{' '}
                    <Link to="/register" className="text-brand-600 hover:text-brand-700 font-bold">
                      Register here
                    </Link>
                  </span>
                </div>
              </form>

              {/* Fast 1-Click Demo Login Bar */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-2.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Instant Direct Demo Access</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('student')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-brand-50 hover:border-brand-300 text-xs font-semibold text-slate-700 transition-all flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-brand-100 text-brand-700 flex items-center justify-center shrink-0 group-hover:bg-brand-600 group-hover:text-white transition-colors">
                      <GraduationCap className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">Learner Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('trainer')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-amber-50 hover:border-amber-300 text-xs font-semibold text-slate-700 transition-all flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">Trainer Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('institute')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-purple-50 hover:border-purple-300 text-xs font-semibold text-slate-700 transition-all flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Building2 className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">Institute Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('intelligence')}
                    className="p-2.5 rounded-xl border border-slate-200 bg-slate-50/80 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-semibold text-slate-700 transition-all flex items-center gap-2 group"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <BrainCircuit className="w-3.5 h-3.5" />
                    </div>
                    <span className="truncate">Officer Demo</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="text-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Public Portal Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
