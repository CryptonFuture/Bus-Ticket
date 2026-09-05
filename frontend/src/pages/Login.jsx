
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Bus, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/search');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-12">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Decorative Circles */}
      <div className="absolute top-20 right-20 w-32 h-32 border border-white/10 rounded-full hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-20 h-20 border border-blue-400/10 rounded-full hidden lg:block" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">

        <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-black/30 p-8 sm:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-7">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 rounded-2xl" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bus className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Login to continue your journey with{' '}
              <span className="text-blue-400 font-medium">
                BusTicket
              </span>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-4
                    rounded-xl
                    bg-white/[0.06]
                    border
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-500/60
                    focus:bg-white/[0.09]
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-300">
                  Password
                </label>

                <button
                  type="button"
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="
                    w-full
                    h-12
                    pl-12
                    pr-4
                    rounded-xl
                    bg-white/[0.06]
                    border
                    border-white/10
                    text-white
                    placeholder:text-slate-500
                    outline-none
                    transition-all
                    duration-200
                    focus:border-blue-500/60
                    focus:bg-white/[0.09]
                    focus:ring-4
                    focus:ring-blue-500/10
                  "
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="
                group
                w-full
                h-12
                rounded-xl
                bg-gradient-to-r
                from-blue-500
                via-indigo-500
                to-violet-500
                text-white
                font-semibold
                shadow-lg
                shadow-blue-500/25
                hover:shadow-blue-500/40
                hover:scale-[1.01]
                active:scale-[0.99]
                transition-all
                duration-200
                disabled:opacity-60
                disabled:cursor-not-allowed
                flex
                items-center
                justify-center
                gap-2
              "
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </>
              ) : (
                <>
                  Login to Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Register */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-slate-900/80 px-4 text-xs text-slate-500">
                OR
              </span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Create Account
            </Link>
          </p>

          {/* Demo Admin */}
          <div className="mt-7 rounded-2xl border border-blue-400/10 bg-blue-500/[0.06] p-4">

            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>

              <div className="text-sm">
                <p className="font-semibold text-blue-300">
                  Demo Admin Account
                </p>

                <p className="text-slate-400 mt-1">
                  admin@bus.com
                </p>

                <p className="text-slate-400">
                  Password: admin123
                </p>

                <p className="text-[11px] text-slate-500 mt-2">
                  Run the seed script first.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} BusTicket. Travel smarter.
        </p>

      </div>
    </div>
  );
}
