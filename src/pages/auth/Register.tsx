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
  Home
} from 'lucide-react';
import type { UserRole } from '../../types/skillbridge';

export const Register: FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, currentRole, setNotification } = useSkillBridge();

  // If already logged in, lock user to their designated site
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

  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [fullName, setFullName] = useState('Rahul Kumar');
  const [email, setEmail] = useState('rahul.learner@domain.edu');
  const [password, setPassword] = useState('password123');
  const [organization, setOrganization] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('Data Science & Analytics');
  const [termsAgreed, setTermsAgreed] = useState(true);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'student') {
      setFullName('Rahul Kumar');
      setEmail('rahul.learner@domain.edu');
    } else if (role === 'trainer') {
      setFullName('Prof. Arjun Rao');
      setEmail('arjun.rao@faculty.edu');
      setOrganization('Applied AI & ML Department');
    } else if (role === 'institute') {
      setFullName('Dean of Academics');
      setEmail('admin@apexinstitute.edu');
      setOrganization('Apex Institute of Technology');
    } else {
      setFullName('Dr. Sunita Sen');
      setEmail('analyst@skillsintelligence.org');
      setOrganization('Global Skill Analytics Unit');
    }
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    login(selectedRole);
    setNotification(`Account registered & session locked as ${selectedRole.toUpperCase()}! Welcome to Global Skill Platform.`);
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
    setNotification(`Instant Demo: signed in as ${role.toUpperCase()}.`);
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

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4 sm:p-6 antialiased selection:bg-brand-500 selection:text-white">
      <div className="w-full max-w-4xl space-y-6">
        {/* Branding Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-brand-600 text-white font-bold text-xl shadow-sm mb-1 hover:scale-105 transition-transform">
            GS
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Create Your Account
          </h1>
          <p className="text-sm text-slate-500 font-medium">
            Join the Global Skilling &amp; Intelligence Ecosystem
          </p>
        </div>

        {/* Grid Container with 2D Graphic + Registration Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: 2D Animated Illustration */}
          <div className="lg:col-span-5 space-y-3">
            <AuthRoleIllustration role={selectedRole} />
            <p className="text-xs text-center text-slate-500 font-medium">
              Interactive 2D Workspace Preview &bull; {selectedRole.toUpperCase()} Registration
            </p>
          </div>

          {/* Right: Registration Card */}
          <div className="lg:col-span-7">
            <Card className="shadow-lg border-slate-200" padding="lg">
              <form onSubmit={handleRegister} className="space-y-4">
                {/* Role Selector Grid */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                    Choose Your Account Type
                  </label>
                  <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-medium">
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('student')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'student'
                          ? 'bg-white text-brand-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Learner</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('trainer')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'trainer'
                          ? 'bg-white text-amber-800 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Trainer</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('institute')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'institute'
                          ? 'bg-white text-purple-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <Building2 className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Institute</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRoleSelect('intelligence')}
                      className={`py-2 px-1 rounded-lg transition-all text-center flex flex-col items-center gap-1 ${
                        selectedRole === 'intelligence'
                          ? 'bg-white text-emerald-700 font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      <BrainCircuit className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Intelligence</span>
                    </button>
                  </div>
                </div>

                {/* Dynamic Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {selectedRole === 'institute' ? 'Authorized Contact Name' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="e.g. Alex Johnson"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder="name@institution.edu"
                    />
                  </div>
                </div>

                {selectedRole === 'student' && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      Degree / Field of Study
                    </label>
                    <select
                      value={fieldOfStudy}
                      onChange={(e) => setFieldOfStudy(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="Data Science & Analytics">B.Tech Data Science &amp; Analytics</option>
                      <option value="Computer Science & Engineering">B.Tech Computer Science &amp; Engineering</option>
                      <option value="Artificial Intelligence & ML">B.Tech Artificial Intelligence &amp; ML</option>
                      <option value="Cloud & Systems Engineering">B.Tech Cloud &amp; Systems Engineering</option>
                    </select>
                  </div>
                )}

                {(selectedRole === 'trainer' || selectedRole === 'institute' || selectedRole === 'intelligence') && (
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      {selectedRole === 'institute' ? 'Institution Name' : selectedRole === 'trainer' ? 'Department / Academy' : 'Organization / Unit'}
                    </label>
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      required
                      className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                      placeholder={selectedRole === 'institute' ? 'e.g. Apex Technical Academy' : 'e.g. Applied AI Faculty'}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-3.5 py-2 rounded-lg border border-slate-300 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-500"
                    placeholder="••••••••"
                  />
                </div>

                {/* Agreement Checkbox */}
                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms-agree"
                    checked={termsAgreed}
                    onChange={(e) => setTermsAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                    required
                  />
                  <label htmlFor="terms-agree" className="text-xs text-slate-600 leading-snug cursor-pointer">
                    I agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong> for verified skill development and transparent talent evaluation.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Register &amp; Lock Portal Session</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="text-center pt-2">
                  <span className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-brand-600 hover:text-brand-700 font-semibold">
                      Sign In here
                    </Link>
                  </span>
                </div>
              </form>

              {/* Fast-Switch Section */}
              <div className="mt-5 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-600" />
                  <span>Instant Evaluator Demo Entry</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('student')}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-brand-50 hover:border-brand-300 text-xs font-medium text-slate-700 transition-colors flex items-center gap-2"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                    <span className="truncate">Learner Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('trainer')}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-amber-50 hover:border-amber-300 text-xs font-medium text-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Users className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">Trainer Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('institute')}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-purple-50 hover:border-purple-300 text-xs font-medium text-slate-700 transition-colors flex items-center gap-2"
                  >
                    <Building2 className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                    <span className="truncate">Institute Demo</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('intelligence')}
                    className="p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 text-xs font-medium text-slate-700 transition-colors flex items-center gap-2"
                  >
                    <BrainCircuit className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">Intelligence Demo</span>
                  </button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Main Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
