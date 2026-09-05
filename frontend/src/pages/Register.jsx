
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import {
  Bus,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form);
      toast.success('Account created successfully!');
      navigate('/search');
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 flex items-center justify-center px-4 py-12">

      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />

      {/* Decorative Circles */}
      <div className="absolute top-16 right-16 w-36 h-36 border border-white/10 rounded-full hidden lg:block" />
      <div className="absolute bottom-16 left-16 w-24 h-24 border border-blue-400/10 rounded-full hidden lg:block" />

      {/* Register Container */}
      <div className="relative z-10 w-full max-w-md">

        {/* Glass Card */}
        <div className="bg-white/[0.08] backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl shadow-black/30 p-8 sm:p-10">

          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">

              <div className="absolute inset-0 bg-blue-500 blur-xl opacity-40 rounded-2xl" />

              <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Bus className="w-8 h-8 text-white" />
              </div>

            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-7">
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Create Account
            </h1>

            <p className="text-slate-400 mt-2 text-sm">
              Join{' '}
              <span className="text-blue-400 font-semibold">
                BusTicket
              </span>{' '}
              and start your journey
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Full Name
              </label>

              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
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

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email Address
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
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

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Phone
                <span className="text-slate-500 text-xs ml-1">
                  (optional)
                </span>
              </label>

              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
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
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="Minimum 6 characters"
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

              <p className="text-[11px] text-slate-500 mt-2">
                Password must contain at least 6 characters.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                group
                w-full
                h-12
                mt-2
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
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-7">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-slate-900/80 px-4 text-xs text-slate-500">
                SECURE REGISTRATION
              </span>
            </div>
          </div>

          {/* Security Info */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Your information is securely protected</span>
          </div>

          {/* Login */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-400 font-semibold hover:text-blue-300 transition"
            >
              Login
            </Link>
          </p>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-6">
          © {new Date().getFullYear()} BusTicket. Travel smarter.
        </p>

      </div>
    </div>
  );
}

