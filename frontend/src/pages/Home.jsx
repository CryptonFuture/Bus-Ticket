import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Search,
  Ticket,
  Shield,
  Zap,
  Bus,
  ArrowRight,
  MapPin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-white overflow-hidden">

      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <section className="relative min-h-[680px] flex items-center overflow-hidden">

        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950" />

        {/* Glow Effects */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl" />

        <div className="absolute top-1/3 left-1/2 w-[350px] h-[350px] -translate-x-1/2 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Decorative Rings */}
        <div className="absolute top-20 right-10 lg:right-32 w-64 h-64 border border-white/5 rounded-full" />

        <div className="absolute top-28 right-18 lg:right-40 w-48 h-48 border border-blue-400/10 rounded-full" />

        <div className="absolute bottom-20 left-10 lg:left-24 w-40 h-40 border border-white/5 rounded-full" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 py-24">

          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <div className="text-center lg:text-left">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-xl">
                <Sparkles className="w-4 h-4 text-cyan-400" />

                <span className="text-sm text-slate-300">
                  India's Smart Bus Booking Platform
                </span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05] tracking-tight mb-6">

                Book Your Journey.
                <br />

                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                  Travel Smarter.
                </span>

              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                Search buses, compare fares, choose your favorite seats,
                and book your journey in seconds.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">

                <Link
                  to={user ? '/search' : '/register'}
                  className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    px-7
                    py-3.5
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-500
                    via-indigo-500
                    to-violet-500
                    text-white
                    font-semibold
                    shadow-xl
                    shadow-blue-500/25
                    hover:shadow-blue-500/40
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  {user ? 'Search Buses' : 'Get Started'}

                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                {!user && (
                  <Link
                    to="/login"
                    className="
                      inline-flex
                      items-center
                      gap-2
                      px-7
                      py-3.5
                      rounded-xl
                      border
                      border-white/15
                      bg-white/[0.05]
                      backdrop-blur-xl
                      text-white
                      font-semibold
                      hover:bg-white/[0.1]
                      hover:border-white/25
                      transition-all
                    "
                  >
                    Login
                  </Link>
                )}

              </div>

              {/* Trust Points */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 mt-8">

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Secure Booking
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Easy Cancellation
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Best Fares
                </div>

              </div>

            </div>

            {/* Right Visual */}
            <div className="hidden lg:flex justify-center relative">

              {/* Main Card Glow */}
              <div className="absolute w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />

              {/* Bus Card */}
              <div className="
                relative
                w-[390px]
                rounded-3xl
                bg-white/[0.07]
                backdrop-blur-2xl
                border
                border-white/10
                shadow-2xl
                p-6
                rotate-2
                hover:rotate-0
                transition-transform
                duration-500
              ">

                {/* Top */}
                <div className="flex items-center justify-between mb-8">

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                      <Bus className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <p className="font-bold text-white">
                        BusTicket
                      </p>

                      <p className="text-xs text-slate-500">
                        Smart Travel
                      </p>
                    </div>
                  </div>

                  <div className="px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/10">
                    <span className="text-xs text-emerald-400">
                      Available
                    </span>
                  </div>

                </div>

                {/* Route */}
                <div className="rounded-2xl bg-black/20 border border-white/5 p-5">

                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-xs text-slate-500 mb-1">
                        FROM
                      </p>

                      <p className="text-xl font-bold">
                        Delhi
                      </p>
                    </div>

                    <div className="flex-1 mx-5 relative">

                      <div className="border-t border-dashed border-slate-600" />

                      <div className="absolute left-1/2 -top-3 -translate-x-1/2 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-400/20 flex items-center justify-center">
                        <Bus className="w-3.5 h-3.5 text-blue-400" />
                      </div>

                    </div>

                    <div className="text-right">
                      <p className="text-xs text-slate-500 mb-1">
                        TO
                      </p>

                      <p className="text-xl font-bold">
                        Mumbai
                      </p>
                    </div>

                  </div>

                  <div className="flex justify-between mt-6 text-xs text-slate-500">
                    <span>Today</span>
                    <span>8h 30m</span>
                    <span>AC Sleeper</span>
                  </div>

                </div>

                {/* Bottom */}
                <div className="flex items-center justify-between mt-5">

                  <div>
                    <p className="text-xs text-slate-500">
                      Starting from
                    </p>

                    <p className="text-2xl font-bold text-white">
                      ₹499
                    </p>
                  </div>

                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-blue-400" />
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          FEATURES
      ====================================================== */}
      <section className="relative py-24 bg-slate-950">

        <div className="max-w-7xl mx-auto px-4">

          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-14">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/10 mb-4">
              <Zap className="w-4 h-4 text-blue-400" />

              <span className="text-xs font-medium text-blue-300">
                Powerful Features
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything you need to
              <span className="text-blue-400"> travel better</span>
            </h2>

            <p className="text-slate-400">
              A fast, secure and intelligent bus booking experience
              designed for modern travelers.
            </p>

          </div>


          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">

            {/* Smart Search */}
            <div className="
              group
              relative
              rounded-2xl
              bg-white/[0.04]
              border
              border-white/10
              p-7
              hover:bg-white/[0.07]
              hover:border-blue-400/20
              transition-all
              duration-300
              hover:-translate-y-1
            ">

              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center mb-6">
                <Search className="w-7 h-7 text-blue-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Smart Search
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Find buses by origin and destination with real-time
                seat availability and detailed route information.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-blue-400">
                Explore buses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>


            {/* Dynamic Pricing */}
            <div className="
              group
              relative
              rounded-2xl
              bg-white/[0.04]
              border
              border-white/10
              p-7
              hover:bg-white/[0.07]
              hover:border-indigo-400/20
              transition-all
              duration-300
              hover:-translate-y-1
            ">

              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-indigo-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Dynamic Pricing
              </h3>

              <p className="text-slate-400 leading-relaxed">
                Python-powered fare calculations based on bus type,
                routes, weekends and other pricing factors.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-indigo-400">
                Smart fares
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>


            {/* Secure Booking */}
            <div className="
              group
              relative
              rounded-2xl
              bg-white/[0.04]
              border
              border-white/10
              p-7
              hover:bg-white/[0.07]
              hover:border-emerald-400/20
              transition-all
              duration-300
              hover:-translate-y-1
            ">

              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-400/10 flex items-center justify-center mb-6">
                <Shield className="w-7 h-7 text-emerald-400" />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                Secure Booking
              </h3>

              <p className="text-slate-400 leading-relaxed">
                JWT authentication, secure bookings, confirmed PNR
                and simple cancellation whenever you need it.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm text-emerald-400">
                Travel securely
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          HOW IT WORKS
      ====================================================== */}
      <section className="py-20 bg-slate-900/50 border-y border-white/5">

        <div className="max-w-6xl mx-auto px-4">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-white mb-3">
              Book in 3 simple steps
            </h2>

            <p className="text-slate-400">
              Your next journey is only a few clicks away.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-blue-500/10 border border-blue-400/10 flex items-center justify-center mb-5">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>

              <h3 className="font-bold text-white text-lg mb-2">
                01. Search
              </h3>

              <p className="text-sm text-slate-400">
                Enter your origin, destination and travel date.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-indigo-500/10 border border-indigo-400/10 flex items-center justify-center mb-5">
                <Bus className="w-6 h-6 text-indigo-400" />
              </div>

              <h3 className="font-bold text-white text-lg mb-2">
                02. Choose
              </h3>

              <p className="text-sm text-slate-400">
                Compare buses, fares and available seats.
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-400/10 flex items-center justify-center mb-5">
                <Ticket className="w-6 h-6 text-emerald-400" />
              </div>

              <h3 className="font-bold text-white text-lg mb-2">
                03. Book
              </h3>

              <p className="text-sm text-slate-400">
                Select your seat and confirm your journey.
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative py-24 overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700" />

        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />

        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto text-center px-4">

          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl flex items-center justify-center">
            <Ticket className="w-8 h-8 text-white" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready for your next journey?
          </h2>

          <p className="text-blue-100 text-lg mb-8">
            Create your free account and book your next bus journey
            in less than a minute.
          </p>

          <Link
            to={user ? '/search' : '/register'}
            className="
              group
              inline-flex
              items-center
              gap-2
              px-8
              py-3.5
              rounded-xl
              bg-white
              text-indigo-700
              font-bold
              shadow-2xl
              hover:bg-blue-50
              hover:scale-[1.03]
              transition-all
            "
          >
            {user ? 'Search Buses' : 'Register Free'}

            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

        </div>

      </section>

    </div>
  );
}

