import React, { useState } from 'react';
import { assetPath } from '../../utils/assetPath';
import {
  X,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  GraduationCap,
  Shield,
  ArrowRight,
  Eye,
  EyeOff,
  KeyRound,
  LogIn,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface AuthModalProps {
  isOpen: boolean;
  defaultTab?: 'login' | 'register';
  onClose: () => void;
  onSuccess: (targetView: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  defaultTab = 'login',
  onClose,
  onSuccess,
}) => {
  const { login, registerStudent } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(defaultTab);
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Login Form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register Form
  const [regFullName, setRegFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regEducation, setRegEducation] = useState('B.Tech ECE');
  const [regYearOfPassout, setRegYearOfPassout] = useState('2025');
  const [regExperience, setRegExperience] = useState<'Fresher' | '1-2 Years' | '3+ Years'>('Fresher');
  const [regCity, setRegCity] = useState('Hyderabad');
  const [showRegPassword, setShowRegPassword] = useState(false);

  if (!isOpen) return null;

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password.', 'error');
      return;
    }
    setIsLoading(true);
    const result = await login(email.trim(), password);
    setIsLoading(false);

    if (result.success) {
      // Determine routing based on what login returned (auth context sets role)
      // We re-read from storage to check if it's admin
      const adminAccounts = ['admin_design_silicon@dsv.com', 'harikrishna@dsv.com', 'kranthikadinti@gmail.com', 'designsiliconvlsi@gmail.com'];
      const isAdmin = adminAccounts.includes(email.trim().toLowerCase()) ||
        (await import('../../services/storage')).storageService.getAdminAccounts()
          .some(a => a.email.toLowerCase() === email.trim().toLowerCase());

      showToast(
        isAdmin ? `Welcome, Institute Admin!` : `Welcome back! Loading your dashboard...`,
        'success'
      );
      onSuccess(isAdmin ? 'admin-portal' : 'student-portal');
      onClose();
    } else {
      showToast(result.message || 'Login failed. Please check your credentials.', 'error');
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!regFullName || !regEmail || !regPhone || !regPassword) {
      showToast('Please fill in all mandatory fields.', 'error');
      return;
    }
    if (regPassword.length < 6) {
      showToast('Password must be at least 6 characters.', 'error');
      return;
    }
    if (regPassword !== regConfirmPassword) {
      showToast('Passwords do not match.', 'error');
      return;
    }

    setIsLoading(true);
    const ok = await registerStudent({
      fullName: regFullName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      education: regEducation,
      yearOfPassout: regYearOfPassout,
      experienceLevel: regExperience,
      city: regCity
    });
    setIsLoading(false);

    if (ok) {
      showToast('Account created! Welcome to Design Silicon VLSI.', 'success');
      onSuccess('student-portal');
      onClose();
    } else {
      showToast('This email is already registered or is not allowed. Please use a different email.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fade-in font-sans">
      <div className="relative w-full max-w-md bg-slate-900 border border-sky-500/30 rounded-2xl shadow-2xl overflow-hidden">
        {/* Silicon Grid Background */}
        <div className="absolute inset-0 silicon-grid opacity-20 pointer-events-none" />

        {/* Modal Header */}
        <div className="bg-slate-950/90 p-5 border-b border-slate-800 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-sky-500/30 shrink-0">
              <img src={assetPath('/images/dsv-badge-dark.jpg')} alt="DSV" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Design Silicon VLSI</h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {activeTab === 'login' ? 'Sign in to your account' : 'Create your learner account'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 bg-slate-950 border-b border-slate-800 p-1 gap-1 relative z-10 text-xs font-semibold">
          <button
            onClick={() => { setActiveTab('login'); setForgotPasswordOpen(false); }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-slate-800 text-cyan-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>
          <button
            onClick={() => { setActiveTab('register'); setForgotPasswordOpen(false); }}
            className={`py-2 rounded-lg transition flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-slate-800 text-emerald-400 shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            <span>Register</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 relative z-10 max-h-[75vh] overflow-y-auto">
          {forgotPasswordOpen ? (
            /* Forgot Password Flow */
            <div className="space-y-4">
              <div className="text-center">
                <KeyRound className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                <h4 className="text-base font-bold text-white">Reset Account Access</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Enter your registered email and our admissions team will help reset your access.
                </p>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Registered Email</label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3.5 py-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  showToast('Request sent. Our team will contact you within 24 hours.', 'info');
                  setForgotPasswordOpen(false);
                }}
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-md"
              >
                Request Password Reset
              </button>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(false)}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 underline"
              >
                Back to Sign In
              </button>
            </div>
          ) : activeTab === 'register' ? (
            /* REGISTRATION FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div className="p-3 rounded-xl bg-sky-950/40 border border-sky-800/50 text-xs text-sky-300 flex items-start gap-2">
                <GraduationCap className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Register to access the Student Learning Portal. Admin accounts are provisioned separately.</span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="E.g. Siddharth Rao"
                  className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Education</label>
                  <input
                    type="text"
                    value={regEducation}
                    onChange={(e) => setRegEducation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Passout Year</label>
                  <select
                    value={regYearOfPassout}
                    onChange={(e) => setRegYearOfPassout(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    {['2027','2026','2025','2024','2023','2022','2021'].map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Experience</label>
                  <select
                    value={regExperience}
                    onChange={(e) => setRegExperience(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value="Fresher">Fresher</option>
                    <option value="1-2 Years">1-2 Years</option>
                    <option value="3+ Years">3+ Years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">City</label>
                  <input
                    type="text"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
                  <div className="relative">
                    <input
                      type={showRegPassword ? 'text' : 'password'}
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 pr-9 py-2 text-xs text-slate-100 focus:outline-none"
                    />
                    <button type="button" onClick={() => setShowRegPassword(!showRegPassword)}
                      className="absolute right-2.5 top-2 text-slate-500 hover:text-slate-300">
                      {showRegPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-bold text-xs hover:brightness-110 transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-1.5 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />Creating Account...</span>
                ) : (
                  <><span>Create Account &amp; Enter</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                Already have an account?{' '}
                <button type="button" onClick={() => setActiveTab('login')} className="text-cyan-400 hover:underline">
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            /* LOGIN FORM — unified, auto-detects admin vs student */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {/* Info Banner */}
              <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 text-xs space-y-1.5">
                <div className="flex items-center gap-2 text-slate-300 font-semibold">
                  <LogIn className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Single login for students &amp; institute admins</span>
                </div>
                <div className="flex items-start gap-2 text-slate-500 leading-relaxed">
                  <Shield className="w-3 h-3 text-rose-400 shrink-0 mt-0.5" />
                  <span>Admin access: authorized institute email + password only.</span>
                </div>
                <div className="flex items-start gap-2 text-slate-500 leading-relaxed">
                  <GraduationCap className="w-3 h-3 text-cyan-400 shrink-0 mt-0.5" />
                  <span>Student access: use the email &amp; password you registered with.</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-3.5 py-2 text-xs text-slate-100 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password..."
                    className="w-full bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-xl pl-10 pr-10 py-2 text-xs text-slate-100 focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 hover:brightness-110 transition shadow-lg flex items-center justify-center gap-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-400 shadow-cyan-500/20 disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2"><span className="w-3 h-3 border-2 border-slate-950/40 border-t-slate-950 rounded-full animate-spin" />Signing in...</span>
                ) : (
                  <><span>Sign In</span><ArrowRight className="w-4 h-4" /></>
                )}
              </button>

              <p className="text-center text-xs text-slate-500">
                New to Design Silicon VLSI?{' '}
                <button type="button" onClick={() => setActiveTab('register')} className="text-cyan-400 hover:underline">
                  Create Account
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
