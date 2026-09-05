import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Search as SearchIcon,
  Clock,
  MapPin,
  IndianRupee,
  Bus,
  CalendarDays,
  ArrowRight,
  Sparkles,
  Users,
  Wifi,
  CheckCircle2,
  SlidersHorizontal,
  Navigation,
} from 'lucide-react';

export default function Search() {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    date: '',
  });

  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const navigate = useNavigate();

  const popularRoutes = [
    { origin: 'Delhi', destination: 'Jaipur' },
    { origin: 'Mumbai', destination: 'Pune' },
    { origin: 'Bangalore', destination: 'Hyderabad' },
    { origin: 'Chennai', destination: 'Bangalore' },
  ];

  const handleSearch = async (e) => {
    e?.preventDefault();

    setLoading(true);
    setSearched(true);

    try {
      const params = {};

      if (filters.origin) params.origin = filters.origin;
      if (filters.destination) params.destination = filters.destination;

      const res = await api.get('/buses', { params });

      setBuses(res.data.buses);
    } catch {
      toast.error('Failed to fetch buses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch();
  }, []);

  const selectPopularRoute = (route) => {
    setFilters({
      ...filters,
      origin: route.origin,
      destination: route.destination,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[550px] h-[550px] bg-blue-600/10 rounded-full blur-3xl -top-48 -left-48" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl top-1/3 -right-48" />
        <div className="absolute w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl -bottom-48 left-1/3" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-10">

        {/* ================= HEADER ================= */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            Smart Travel Search
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Find Your Perfect Bus
              </h1>

              <p className="text-slate-400 mt-2">
                Search comfortable and affordable buses for your next journey.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Verified bus operators
            </div>
          </div>
        </div>

        {/* ================= SEARCH PANEL ================= */}
        <form
          onSubmit={handleSearch}
          className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/75 backdrop-blur-xl shadow-2xl mb-9"
        >
          {/* Top Gradient */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="p-5 sm:p-7">

            {/* Search Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <h2 className="font-bold text-lg">
                  Search Buses
                </h2>

                <p className="text-sm text-slate-500">
                  Choose your route and travel date
                </p>
              </div>
            </div>

            {/* Inputs */}
            <div className="grid md:grid-cols-4 gap-4">

              {/* From */}
              <div>
                <label className="booking-label">
                  From
                </label>

                <div className="relative">
                  <Navigation className="booking-icon" />

                  <input
                    className="booking-input pl-11"
                    placeholder="Origin city"
                    value={filters.origin}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        origin: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* To */}
              <div>
                <label className="booking-label">
                  To
                </label>

                <div className="relative">
                  <MapPin className="booking-icon" />

                  <input
                    className="booking-input pl-11"
                    placeholder="Destination city"
                    value={filters.destination}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        destination: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="booking-label">
                  Journey Date
                </label>

                <div className="relative">
                  <CalendarDays className="booking-icon" />

                  <input
                    type="date"
                    className="booking-input pl-11"
                    value={filters.date}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        date: e.target.value,
                      })
                    }
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="group w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
                >
                  {loading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Searching...
                    </>
                  ) : (
                    <>
                      <SearchIcon className="w-4 h-4" />
                      Search Buses
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Popular Routes */}
            <div className="mt-6 pt-5 border-t border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-slate-600 mr-1">
                  Popular routes
                </span>

                {popularRoutes.map((route, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => selectPopularRoute(route)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-blue-500/30 hover:bg-blue-500/5 text-xs text-slate-400 hover:text-blue-400 transition-all"
                  >
                    {route.origin}
                    <span className="mx-1.5 text-slate-700">→</span>
                    {route.destination}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </form>

        {/* ================= RESULTS HEADER ================= */}
        {!loading && searched && buses.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold">
                Available Buses
              </h2>

              <p className="text-sm text-slate-500 mt-1">
                {buses.length} bus{buses.length !== 1 ? 'es' : ''} available
                for your search
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Live availability
            </div>
          </div>
        )}

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="relative rounded-3xl border border-slate-800 bg-slate-900/60 backdrop-blur-xl py-20 text-center">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center">
              <Bus className="w-7 h-7 text-blue-400 animate-pulse" />
            </div>

            <div className="mt-5 w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin mx-auto" />

            <p className="text-slate-400 mt-4">
              Searching available buses...
            </p>

            <p className="text-xs text-slate-600 mt-1">
              Finding the best options for your journey
            </p>
          </div>
        ) : buses.length === 0 && searched ? (

          /* ================= EMPTY STATE ================= */
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-xl">
            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-950 border border-slate-800 flex items-center justify-center">
                <Bus className="w-9 h-9 text-slate-600" />
              </div>

              <h2 className="text-xl font-bold mt-6">
                No buses found
              </h2>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                We couldn't find any buses matching your search.
                Try another city or route.
              </p>

              <button
                type="button"
                onClick={() =>
                  setFilters({
                    origin: '',
                    destination: '',
                    date: '',
                  })
                }
                className="mt-6 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-sm font-medium transition"
              >
                Clear Search
              </button>
            </div>
          </div>
        ) : (

          /* ================= BUS RESULTS ================= */
          <div className="space-y-5">
            {buses.map((bus) => (
              <div
                key={bus._id}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/75 backdrop-blur-xl shadow-xl hover:border-slate-700 hover:shadow-2xl transition-all duration-300"
              >
                {/* Top Line */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-70" />

                <div className="p-5 sm:p-6">

                  {/* ================= BUS HEADER ================= */}
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                    <div className="flex items-start gap-4">

                      {/* Bus Icon */}
                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-blue-500/15 to-indigo-500/15 border border-blue-500/20 flex items-center justify-center">
                        <Bus className="w-7 h-7 text-blue-400" />
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">

                          <span className="px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
                            {bus.busNumber}
                          </span>

                          <span className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                            {bus.busType}
                          </span>
                        </div>

                        <h3 className="font-bold text-xl">
                          {bus.operator}
                        </h3>

                        <p className="text-xs text-slate-600 mt-1">
                          Premium bus operator
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="lg:text-right">
                      <p className="text-xs uppercase tracking-wider text-slate-600">
                        Starting from
                      </p>

                      <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent flex items-center lg:justify-end gap-0.5">
                        <IndianRupee className="w-6 h-6 text-blue-400" />
                        {bus.baseFare}
                      </p>

                      <p className="text-xs text-slate-600">
                        per passenger
                      </p>
                    </div>
                  </div>

                  {/* ================= ROUTE ================= */}
                  <div className="mt-6 rounded-2xl bg-slate-950/60 border border-slate-800 p-5">

                    <div className="flex items-center gap-4">

                      <div className="min-w-0">
                        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">
                          From
                        </p>

                        <p className="font-bold text-lg truncate">
                          {bus.origin}
                        </p>

                        <p className="text-xs text-slate-600 mt-1">
                          {bus.departureTime}
                        </p>
                      </div>

                      <div className="flex-1 flex items-center gap-2">

                        <div className="h-px flex-1 bg-slate-800" />

                        <div className="relative w-10 h-10 shrink-0 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-blue-400" />
                        </div>

                        <div className="h-px flex-1 bg-slate-800" />

                      </div>

                      <div className="min-w-0 text-right">
                        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-1">
                          To
                        </p>

                        <p className="font-bold text-lg truncate">
                          {bus.destination}
                        </p>

                        <p className="text-xs text-slate-600 mt-1">
                          {bus.arrivalTime}
                        </p>
                      </div>
                    </div>

                    {/* Route Info */}
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-5 pt-4 border-t border-slate-800 text-sm text-slate-500">

                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-blue-400" />
                        {bus.departureTime} - {bus.arrivalTime}
                        {bus.duration && ` • ${bus.duration}`}
                      </span>

                      <span className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-emerald-400" />
                        {bus.availableSeats} seats available
                      </span>
                    </div>
                  </div>

                  {/* ================= AMENITIES ================= */}
                  {bus.amenities?.length > 0 && (
                    <div className="mt-5">
                      <div className="flex items-center gap-2 mb-2">
                        <Wifi className="w-4 h-4 text-slate-600" />
                        <span className="text-xs uppercase tracking-wider text-slate-600">
                          Amenities
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {bus.amenities.map((amenity, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/5 border border-emerald-500/10 text-xs text-emerald-400"
                          >
                            <CheckCircle2 className="w-3 h-3" />
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ================= FOOTER ================= */}
                  <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div className="flex items-center gap-2 text-xs text-slate-600">
                      <CalendarDays className="w-4 h-4" />

                      {filters.date
                        ? new Date(filters.date).toLocaleDateString(
                            'en-IN',
                            {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            }
                          )
                        : 'Flexible travel date'}
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/book/${bus._id}`, {
                          state: { date: filters.date },
                        })
                      }
                      disabled={bus.availableSeats === 0}
                      className="group/btn w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-600/15 transition-all font-semibold flex items-center justify-center gap-2"
                    >
                      {bus.availableSeats === 0
                        ? 'Sold Out'
                        : 'Book Now'}

                      {bus.availableSeats > 0 && (
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Component Styles */}
      <style>{`
        .booking-input {
          width: 100%;
          height: 48px;
          border-radius: 14px;
          border: 1px solid rgb(51 65 85);
          background: rgb(15 23 42 / 0.75);
          color: white;
          padding: 0 14px;
          outline: none;
          transition: all 0.2s ease;
        }

        .booking-input::placeholder {
          color: rgb(100 116 139);
        }

        .booking-input:hover {
          border-color: rgb(71 85 105);
        }

        .booking-input:focus {
          border-color: rgb(59 130 246);
          box-shadow:
            0 0 0 3px rgb(59 130 246 / 0.10),
            0 0 25px rgb(59 130 246 / 0.06);
        }

        .booking-input option {
          background: rgb(15 23 42);
          color: white;
        }

        .booking-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: rgb(203 213 225);
          margin-bottom: 8px;
        }

        .booking-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 18px;
          height: 18px;
          color: rgb(100 116 139);
          pointer-events: none;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: invert(1);
          opacity: 0.5;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}