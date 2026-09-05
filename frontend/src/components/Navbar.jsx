
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Bus,
  LogOut,
  User,
  LayoutDashboard,
  Ticket,
  Search,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileOpen(false);
    navigate('/');
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-2xl shadow-lg shadow-black/10">

      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between h-[72px]">

          {/* =====================================================
              LOGO
          ====================================================== */}
          <Link
            to="/"
            onClick={closeMobile}
            className="group flex items-center gap-3"
          >

            {/* Logo Icon */}
            <div className="relative">

              <div className="absolute inset-0 bg-blue-500/40 blur-lg rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="
                relative
                w-10
                h-10
                rounded-xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-500/20
                group-hover:scale-105
                transition-transform
              ">
                <Bus className="w-5 h-5 text-white" />
              </div>

            </div>

            {/* Brand */}
            <div className="hidden sm:block">
              <span className="
                text-xl
                font-extrabold
                tracking-tight
                bg-gradient-to-r
                from-white
                via-blue-100
                to-blue-400
                bg-clip-text
                text-transparent
              ">
                BusTicket
              </span>

              <p className="text-[9px] text-slate-500 -mt-1 tracking-[0.18em] uppercase">
                Smart Travel
              </p>
            </div>

          </Link>


          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}
          <div className="hidden md:flex items-center gap-1">

            {user ? (
              <>
                {/* Search */}
                <Link
                  to="/search"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-medium
                    text-slate-400
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition-all
                  "
                >
                  <Search className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  Search Buses
                </Link>

                {/* My Bookings */}
                <Link
                  to="/my-bookings"
                  className="
                    group
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-medium
                    text-slate-400
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition-all
                  "
                >
                  <Ticket className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
                  My Bookings
                </Link>

                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="
                      group
                      flex
                      items-center
                      gap-2
                      px-4
                      py-2.5
                      rounded-xl
                      text-sm
                      font-medium
                      text-slate-400
                      hover:text-white
                      hover:bg-purple-500/[0.08]
                      transition-all
                    "
                  >
                    <LayoutDashboard className="w-4 h-4 text-purple-400" />
                    Admin
                  </Link>
                )}
              </>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition-all
                  "
                >
                  Login
                </Link>

                {/* Register */}
                <Link
                  to="/register"
                  className="
                    ml-2
                    px-5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-white
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-600
                    shadow-lg
                    shadow-blue-500/20
                    hover:shadow-blue-500/40
                    hover:scale-[1.02]
                    transition-all
                  "
                >
                  Register
                </Link>
              </>
            )}

          </div>


          {/* =====================================================
              USER PROFILE - DESKTOP
          ====================================================== */}
          {user && (
            <div className="hidden md:flex items-center gap-3 ml-4 pl-4 border-l border-white/10">

              {/* User Info */}
              <div className="flex items-center gap-2.5">

                <div className="
                  w-9
                  h-9
                  rounded-full
                  bg-gradient-to-br
                  from-blue-500/20
                  to-indigo-500/20
                  border
                  border-blue-400/20
                  flex
                  items-center
                  justify-center
                ">
                  <User className="w-4 h-4 text-blue-400" />
                </div>

                <div className="leading-tight">
                  <p className="text-sm font-semibold text-white max-w-[120px] truncate">
                    {user.name}
                  </p>

                  {isAdmin ? (
                    <span className="text-[10px] text-purple-400 font-medium">
                      Administrator
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-500">
                      Passenger
                    </span>
                  )}
                </div>

              </div>


              {/* Logout */}
              <button
                onClick={handleLogout}
                title="Logout"
                className="
                  group
                  w-10
                  h-10
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  flex
                  items-center
                  justify-center
                  text-slate-400
                  hover:text-red-400
                  hover:bg-red-500/[0.08]
                  hover:border-red-400/20
                  transition-all
                "
              >
                <LogOut className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

            </div>
          )}


          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="
              md:hidden
              w-10
              h-10
              rounded-xl
              border
              border-white/10
              bg-white/[0.05]
              flex
              items-center
              justify-center
              text-slate-300
              hover:text-white
              hover:bg-white/[0.08]
              transition
            "
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

        </div>


        {/* =====================================================
            MOBILE NAVIGATION
        ====================================================== */}
        {mobileOpen && (
          <div className="
            md:hidden
            pb-5
            pt-2
            border-t
            border-white/5
            animate-in
            slide-in-from-top-2
            duration-200
          ">

            {user ? (
              <div className="space-y-2">

                {/* Mobile User */}
                <div className="
                  flex
                  items-center
                  gap-3
                  p-3
                  mb-3
                  rounded-2xl
                  bg-white/[0.04]
                  border
                  border-white/10
                ">

                  <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-gradient-to-br
                    from-blue-500/20
                    to-indigo-500/20
                    border
                    border-blue-400/20
                    flex
                    items-center
                    justify-center
                  ">
                    <User className="w-5 h-5 text-blue-400" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-white">
                      {user.name}
                    </p>

                    <p className="text-xs text-slate-500">
                      {isAdmin ? 'Administrator' : 'Passenger'}
                    </p>
                  </div>

                  {isAdmin && (
                    <span className="ml-auto text-[10px] px-2 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-400/10">
                      ADMIN
                    </span>
                  )}

                </div>


                {/* Search */}
                <Link
                  to="/search"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition
                  "
                >
                  <Search className="w-5 h-5 text-blue-400" />
                  Search Buses
                </Link>


                {/* Bookings */}
                <Link
                  to="/my-bookings"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.06]
                    transition
                  "
                >
                  <Ticket className="w-5 h-5 text-blue-400" />
                  My Bookings
                </Link>


                {/* Admin */}
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={closeMobile}
                    className="
                      flex
                      items-center
                      gap-3
                      px-4
                      py-3
                      rounded-xl
                      text-sm
                      text-slate-300
                      hover:text-white
                      hover:bg-purple-500/[0.08]
                      transition
                    "
                  >
                    <LayoutDashboard className="w-5 h-5 text-purple-400" />
                    Admin Dashboard
                  </Link>
                )}


                {/* Divider */}
                <div className="border-t border-white/5 my-2" />


                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-xl
                    text-sm
                    text-red-400
                    hover:bg-red-500/[0.08]
                    transition
                  "
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>

              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">

                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-center
                    py-3
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    text-sm
                    font-semibold
                    text-slate-300
                    hover:text-white
                    hover:bg-white/[0.08]
                    transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={closeMobile}
                  className="
                    flex
                    items-center
                    justify-center
                    py-3
                    rounded-xl
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-600
                    text-sm
                    font-semibold
                    text-white
                    shadow-lg
                    shadow-blue-500/20
                    transition
                  "
                >
                  Register
                </Link>

              </div>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}

