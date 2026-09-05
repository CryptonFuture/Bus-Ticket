import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  IndianRupee,
  Bus,
  MapPin,
  Clock3,
  Users,
  CalendarDays,
  User,
  Mail,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';

export default function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [bus, setBus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [busType, setBusType] = useState('Seater');
  const [journeyDate, setJourneyDate] = useState(location.state?.date || '');
  const [passengers, setPassengers] = useState([
    { name: '', age: '', gender: 'Male' },
  ]);
  const [fareInfo, setFareInfo] = useState(null);

  useEffect(() => {
    api
      .get(`/buses/${id}`)
      .then((res) => {
        setBus(res.data.bus);
        setBusType(res.data.bus.busType || 'Seater');
      })
      .catch(() => toast.error('Bus not found'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (bus && passengers.length > 0) calculateFare();
  }, [bus, busType, passengers.length, journeyDate]);

  const calculateFare = async () => {
    try {
      const res = await api.post('/buses/calculate-fare', {
        busId: id,
        busType,
        passengers: passengers.length,
        journeyDate,
      });

      setFareInfo(res.data);
    } catch {}
  };

  const addPassenger = () => {
    if (passengers.length >= 6) {
      toast.error('Maximum 6 passengers allowed');
      return;
    }

    setPassengers([
      ...passengers,
      { name: '', age: '', gender: 'Male' },
    ]);
  };

  const removePassenger = (index) => {
    if (passengers.length === 1) return;

    setPassengers(passengers.filter((_, i) => i !== index));
  };

  const updatePassenger = (index, field, value) => {
    const updated = [...passengers];
    updated[index][field] = value;
    setPassengers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!journeyDate) {
      toast.error('Please select journey date');
      return;
    }

    for (const p of passengers) {
      if (!p.name || !p.age) {
        toast.error('Please fill all passenger details');
        return;
      }
    }

    setSubmitting(true);

    try {
      const res = await api.post('/bookings', {
        busId: id,
        journeyDate,
        passengers: passengers.map((p) => ({
          name: p.name,
          age: Number(p.age),
          gender: p.gender,
        })),
        busType,
      });

      toast.success(`Booking confirmed! PNR: ${res.data.booking.pnr}`);
      navigate('/my-bookings');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20" />
        <div className="absolute w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -bottom-20 -right-20" />

        <div className="relative flex flex-col items-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-2xl shadow-blue-500/30">
            <Bus className="w-8 h-8 text-white animate-pulse" />
          </div>

          <div className="mt-5 w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />

          <p className="mt-4 text-slate-400 text-sm">
            Loading booking details...
          </p>
        </div>
      </div>
    );
  }

  if (!bus) return null;

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl -top-40 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-3xl top-1/3 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-3xl -bottom-40 left-1/3" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 lg:py-10">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
            <Sparkles className="w-4 h-4" />
            Secure Bus Booking
          </div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                Book Your Journey
              </h1>
              <p className="text-slate-400 mt-2">
                Enter passenger details and confirm your trip.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Secure & trusted booking
            </div>
          </div>
        </div>

        {/* Bus Route Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-2xl mb-7">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="p-5 sm:p-7">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6">

              {/* Operator */}
              <div className="flex items-center gap-4 lg:w-56">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 border border-blue-500/20 flex items-center justify-center">
                  <Bus className="w-7 h-7 text-blue-400" />
                </div>

                <div>
                  <span className="inline-flex px-2.5 py-1 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold">
                    {bus.busNumber}
                  </span>

                  <h2 className="font-semibold mt-1">
                    {bus.operator}
                  </h2>

                  <p className="text-xs text-slate-500">
                    {bus.busType}
                  </p>
                </div>
              </div>

              {/* Route */}
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <div>
                    <p className="text-xl font-bold">
                      {bus.origin}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Departure
                    </p>
                  </div>

                  <div className="flex-1 flex items-center gap-2 px-2">
                    <div className="h-px flex-1 bg-slate-700" />
                    <div className="w-9 h-9 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-blue-400" />
                    </div>
                    <div className="h-px flex-1 bg-slate-700" />
                  </div>

                  <div className="text-right">
                    <p className="text-xl font-bold">
                      {bus.destination}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Arrival
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="w-4 h-4 text-blue-400" />
                    {bus.departureTime} - {bus.arrivalTime}
                  </span>

                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-emerald-400" />
                    {bus.availableSeats} seats available
                  </span>
                </div>
              </div>

              {/* Bus Type */}
              <div className="lg:w-40">
                <div className="rounded-2xl bg-slate-800/70 border border-slate-700 p-4">
                  <p className="text-xs text-slate-500 mb-1">
                    Bus Type
                  </p>
                  <p className="font-semibold">
                    {bus.busType}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-[1fr_360px] gap-7">

            {/* LEFT */}
            <div className="space-y-7">

              {/* Journey Information */}
              <section className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-xl overflow-hidden">
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                      <CalendarDays className="w-5 h-5 text-blue-400" />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">
                        Journey Information
                      </h2>
                      <p className="text-sm text-slate-500">
                        Select your travel date and bus class
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 grid sm:grid-cols-2 gap-5">

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Journey Date <span className="text-red-400">*</span>
                    </label>

                    <div className="relative">
                      <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 pointer-events-none" />

                      <input
                        type="date"
                        value={journeyDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setJourneyDate(e.target.value)}
                        required
                        className="booking-input pl-12"
                      />
                    </div>
                  </div>

                  {/* Bus Type */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Travel Class
                    </label>

                    <select
                      value={busType}
                      onChange={(e) => setBusType(e.target.value)}
                      className="booking-input"
                    >
                      {[
                        'Seater',
                        'Semi-Sleeper',
                        'Sleeper',
                        'AC Seater',
                        'AC Sleeper',
                        'Volvo',
                      ].map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </section>

              {/* Passengers */}
              <section className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl shadow-xl overflow-hidden">

                <div className="p-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                      <Users className="w-5 h-5 text-indigo-400" />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">
                        Passenger Details
                      </h2>
                      <p className="text-sm text-slate-500">
                        Add up to 6 passengers
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addPassenger}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 transition-all font-medium text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Passenger
                  </button>
                </div>

                <div className="p-6 space-y-4">

                  {passengers.map((p, i) => (
                    <div
                      key={i}
                      className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-5 hover:border-slate-700 transition-all"
                    >
                      {/* Passenger Header */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
                            {i + 1}
                          </div>

                          <div>
                            <p className="font-semibold">
                              Passenger {i + 1}
                            </p>
                            <p className="text-xs text-slate-500">
                              Enter passenger information
                            </p>
                          </div>
                        </div>

                        {passengers.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removePassenger(i)}
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                            title="Remove passenger"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid sm:grid-cols-4 gap-4">

                        {/* Name */}
                        <div className="sm:col-span-2">
                          <label className="booking-label">
                            Full Name
                          </label>

                          <div className="relative">
                            <User className="booking-icon" />

                            <input
                              type="text"
                              value={p.name}
                              onChange={(e) =>
                                updatePassenger(
                                  i,
                                  'name',
                                  e.target.value
                                )
                              }
                              required
                              placeholder="Enter full name"
                              className="booking-input pl-11"
                            />
                          </div>
                        </div>

                        {/* Age */}
                        <div>
                          <label className="booking-label">
                            Age
                          </label>

                          <input
                            type="number"
                            value={p.age}
                            onChange={(e) =>
                              updatePassenger(
                                i,
                                'age',
                                e.target.value
                              )
                            }
                            required
                            min="1"
                            max="120"
                            placeholder="Age"
                            className="booking-input"
                          />
                        </div>

                        {/* Gender */}
                        <div>
                          <label className="booking-label">
                            Gender
                          </label>

                          <select
                            value={p.gender}
                            onChange={(e) =>
                              updatePassenger(
                                i,
                                'gender',
                                e.target.value
                              )
                            }
                            className="booking-input"
                          >
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Security Note */}
              <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/5 p-5 flex gap-4">
                <div className="w-10 h-10 shrink-0 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>

                <div>
                  <h3 className="font-semibold text-emerald-300">
                    Your booking is secure
                  </h3>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    Your passenger information is securely processed and
                    used only for completing your bus reservation.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT / FARE SUMMARY */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">

                {/* Summary Header */}
                <div className="p-6 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-violet-500/20 border border-blue-500/20 flex items-center justify-center">
                      <IndianRupee className="w-5 h-5 text-blue-400" />
                    </div>

                    <div>
                      <h2 className="font-bold text-lg">
                        Fare Summary
                      </h2>
                      <p className="text-sm text-slate-500">
                        Your estimated booking cost
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6">

                  {/* Route Mini Card */}
                  <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 mb-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-slate-500">
                          FROM
                        </p>
                        <p className="font-semibold mt-1">
                          {bus.origin}
                        </p>
                      </div>

                      <ChevronRight className="w-5 h-5 text-slate-600" />

                      <div className="text-right">
                        <p className="text-xs text-slate-500">
                          TO
                        </p>
                        <p className="font-semibold mt-1">
                          {bus.destination}
                        </p>
                      </div>
                    </div>

                    {journeyDate && (
                      <div className="mt-4 pt-4 border-t border-slate-800 flex items-center gap-2 text-sm text-slate-400">
                        <CalendarDays className="w-4 h-4 text-blue-400" />
                        {journeyDate}
                      </div>
                    )}
                  </div>

                  {fareInfo ? (
                    <>
                      <div className="space-y-4">

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">
                            Base Fare
                          </span>
                          <span className="font-medium">
                            ₹{fareInfo.base_fare}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">
                            Class Multiplier
                          </span>
                          <span className="font-medium">
                            ×{fareInfo.class_multiplier}
                          </span>
                        </div>

                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">
                            Passengers
                          </span>
                          <span className="font-medium">
                            {fareInfo.passengers}
                          </span>
                        </div>

                        {fareInfo.route_factor &&
                          fareInfo.route_factor !== 1 && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-400">
                                Route Factor
                              </span>
                              <span className="font-medium">
                                ×{fareInfo.route_factor}
                              </span>
                            </div>
                          )}

                        {fareInfo.weekend_surge &&
                          fareInfo.weekend_surge !== 1 && (
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-slate-400">
                                Weekend Surge
                              </span>
                              <span className="font-medium text-orange-400">
                                ×{fareInfo.weekend_surge}
                              </span>
                            </div>
                          )}
                      </div>

                      <div className="my-6 border-t border-dashed border-slate-700" />

                      {/* Total */}
                      <div className="rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 p-5">
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Total Amount
                        </p>

                        <div className="flex items-center gap-1 mt-2">
                          <IndianRupee className="w-6 h-6 text-blue-400" />

                          <span className="text-3xl font-extrabold bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            {fareInfo.total_fare}
                          </span>
                        </div>

                        {fareInfo.calculated_by === 'python-service' && (
                          <div className="flex items-center gap-1.5 mt-3 text-xs text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            Calculated by Python service
                          </div>
                        )}
                      </div>
                    </>
                  ) : (
                    <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-5 text-center">
                      <div className="w-10 h-10 mx-auto rounded-xl bg-slate-800 flex items-center justify-center">
                        <IndianRupee className="w-5 h-5 text-slate-500" />
                      </div>

                      <p className="text-sm text-slate-400 mt-3">
                        Select a journey date to calculate your fare.
                      </p>
                    </div>
                  )}

                  {/* Confirm Button */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group w-full mt-5 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-500 hover:via-indigo-500 hover:to-violet-500 disabled:opacity-60 disabled:cursor-not-allowed shadow-xl shadow-blue-600/20 transition-all duration-300 font-bold text-base flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Confirming Booking...
                      </>
                    ) : (
                      <>
                        Confirm Booking
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-slate-600 mt-4">
                    By confirming, you agree to our booking terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
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