import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Ticket,
  XCircle,
  Calendar,
  MapPin,
  Users,
  Bus,
  Clock3,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  User,
} from 'lucide-react';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    api
      .get('/bookings/my')
      .then((res) => setBookings(res.data.bookings))
      .catch(() => toast.error('Failed to load bookings'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const cancelBooking = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;

    try {
      await api.put(`/bookings/${id}/cancel`);
      toast.success('Booking cancelled');
      fetchBookings();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Cancel failed');
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[450px] h-[450px] bg-indigo-600/10 rounded-full blur-3xl -bottom-40 -right-40" />

        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Ticket className="w-8 h-8 text-white animate-pulse" />
          </div>

          <div className="mt-5 w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

          <p className="mt-4 text-slate-400 text-sm">
            Loading your bookings...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl top-1/3 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl -bottom-40 left-1/3" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            Travel Dashboard
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight flex items-center gap-3">
                <span className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Ticket className="w-6 h-6" />
                </span>
                My Bookings
              </h1>

              <p className="text-slate-400 mt-3">
                Manage your upcoming and previous bus journeys.
              </p>
            </div>

            {bookings.length > 0 && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Secure bookings
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

            <div className="py-20 px-6 text-center">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 flex items-center justify-center">
                <Ticket className="w-9 h-9 text-blue-400" />
              </div>

              <h2 className="text-2xl font-bold mt-6">
                No bookings yet
              </h2>

              <p className="text-slate-500 mt-2 max-w-md mx-auto">
                You haven't booked any bus tickets yet. Find your next
                destination and start your journey.
              </p>

              <Link
                to="/search"
                className="inline-flex items-center gap-2 mt-7 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 font-semibold shadow-lg shadow-blue-600/20 transition-all group"
              >
                Search Buses
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-5">

            {/* Booking Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {bookings.length} booking{bookings.length !== 1 ? 's' : ''} found
              </p>

              <Link
                to="/search"
                className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1 transition"
              >
                Book another trip
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Booking Cards */}
            {bookings.map((b) => {
              const isCancelled = b.status === 'cancelled';
              const isConfirmed = b.status === 'confirmed';

              return (
                <div
                  key={b._id}
                  className={`group relative overflow-hidden rounded-3xl border backdrop-blur-xl shadow-xl transition-all duration-300 ${
                    isCancelled
                      ? 'border-red-500/10 bg-slate-900/60 opacity-75'
                      : 'border-slate-800 bg-slate-900/75 hover:border-slate-700 hover:shadow-2xl'
                  }`}
                >
                  {/* Top Glow */}
                  <div
                    className={`absolute inset-x-0 top-0 h-px ${
                      isCancelled
                        ? 'bg-gradient-to-r from-transparent via-red-500/50 to-transparent'
                        : 'bg-gradient-to-r from-transparent via-blue-500/70 to-transparent'
                    }`}
                  />

                  {/* Main Card */}
                  <div className="p-5 sm:p-6">

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">

                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">

                          {/* PNR */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                            <Ticket className="w-3.5 h-3.5 text-blue-400" />
                            PNR: {b.pnr}
                          </span>

                          {/* Status */}
                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                              isConfirmed
                                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                                : isCancelled
                                ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                                : 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                            }`}
                          >
                            {isConfirmed ? (
                              <CheckCircle2 className="w-3.5 h-3.5" />
                            ) : isCancelled ? (
                              <XCircle className="w-3.5 h-3.5" />
                            ) : (
                              <AlertCircle className="w-3.5 h-3.5" />
                            )}

                            {b.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <Bus className="w-5 h-5 text-blue-400" />
                          </div>

                          <div>
                            <h2 className="font-bold text-lg sm:text-xl">
                              {b.bus?.operator}
                            </h2>

                            <p className="text-sm text-slate-500 mt-0.5">
                              Bus No. {b.bus?.busNumber}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Fare */}
                      <div className="lg:text-right">
                        <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">
                          Total Fare
                        </p>

                        <p className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                          ₹{b.totalFare}
                        </p>

                        <div className="flex lg:justify-end items-center gap-2 mt-1 text-xs text-slate-500">
                          <span>{b.busType}</span>
                          <span>•</span>
                          <span>{b.seatsBooked} seat(s)</span>
                        </div>
                      </div>
                    </div>

                    {/* Route */}
                    <div className="mt-6 rounded-2xl bg-slate-950/60 border border-slate-800 p-5">

                      <div className="flex items-center gap-4">

                        <div className="min-w-0">
                          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                            From
                          </p>

                          <p className="font-bold text-lg truncate">
                            {b.bus?.origin}
                          </p>
                        </div>

                        <div className="flex-1 flex items-center gap-2">
                          <div className="h-px flex-1 bg-slate-800" />

                          <div className="w-9 h-9 shrink-0 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                            <ArrowRight className="w-4 h-4 text-blue-400" />
                          </div>

                          <div className="h-px flex-1 bg-slate-800" />
                        </div>

                        <div className="min-w-0 text-right">
                          <p className="text-xs uppercase tracking-wider text-slate-600 mb-1">
                            To
                          </p>

                          <p className="font-bold text-lg truncate">
                            {b.bus?.destination}
                          </p>
                        </div>
                      </div>

                      {/* Route Meta */}
                      <div className="grid sm:grid-cols-3 gap-3 mt-5 pt-5 border-t border-slate-800">

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-blue-400" />
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              Route
                            </p>
                            <p className="text-sm text-slate-300">
                              {b.bus?.origin} → {b.bus?.destination}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                            <Calendar className="w-4 h-4 text-indigo-400" />
                          </div>

                          <div>
                            <p className="text-xs text-slate-600">
                              Journey Date
                            </p>
                            <p className="text-sm text-slate-300">
                              {new Date(b.journeyDate).toLocaleDateString(
                                'en-IN',
                                {
                                  weekday: 'short',
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-violet-500/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-violet-400" />
                          </div>

                          <div className="min-w-0">
                            <p className="text-xs text-slate-600">
                              Passengers
                            </p>
                            <p className="text-sm text-slate-300 truncate">
                              {b.passengers.map((p) => p.name).join(', ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Passenger Section */}
                    <div className="mt-5">

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-slate-500" />

                          <p className="text-sm font-semibold text-slate-300">
                            Passenger & Seat Details
                          </p>
                        </div>

                        <span className="text-xs text-slate-600">
                          {b.passengers.length} passenger
                          {b.passengers.length !== 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {b.passengers.map((p, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between gap-3 rounded-xl bg-slate-950/50 border border-slate-800 p-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-9 h-9 shrink-0 rounded-xl bg-slate-800 flex items-center justify-center">
                                <User className="w-4 h-4 text-slate-400" />
                              </div>

                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-200 truncate">
                                  {p.name}
                                </p>

                                <p className="text-xs text-slate-600 mt-0.5">
                                  {p.age} years • {p.gender}
                                </p>
                              </div>
                            </div>

                            <div className="shrink-0 text-right">
                              <p className="text-[10px] uppercase tracking-wider text-slate-600">
                                Seat
                              </p>

                              <p className="text-sm font-bold text-blue-400">
                                {p.seatNumber || 'N/A'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Clock3 className="w-4 h-4" />
                        {b.bus?.departureTime} - {b.bus?.arrivalTime}
                      </div>

                      {isConfirmed && (
                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all text-sm font-medium"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </button>
                      )}

                      {isCancelled && (
                        <div className="flex items-center gap-2 text-sm text-red-400">
                          <XCircle className="w-4 h-4" />
                          This booking has been cancelled
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}