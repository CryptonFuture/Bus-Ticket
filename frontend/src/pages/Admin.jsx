
import { useState, useEffect } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';
import {
  Plus,
  Trash2,
  Bus,
  X,
  Clock3,
  MapPin,
  IndianRupee,
  Users,
  Route,
  Building2,
  Armchair,
} from 'lucide-react';

export default function Admin() {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    busNumber: '',
    operator: '',
    origin: '',
    destination: '',
    departureTime: '',
    arrivalTime: '',
    duration: '',
    totalSeats: 40,
    baseFare: 400,
    busType: 'Seater',
  });

  const fetchBuses = () => {
    api
      .get('/buses')
      .then((res) => setBuses(res.data.buses))
      .catch(() => toast.error('Failed to load buses'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        name === 'totalSeats' || name === 'baseFare'
          ? Number(value)
          : value,
    });
  };

  const resetForm = () => {
    setForm({
      busNumber: '',
      operator: '',
      origin: '',
      destination: '',
      departureTime: '',
      arrivalTime: '',
      duration: '',
      totalSeats: 40,
      baseFare: 400,
      busType: 'Seater',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/buses', {
        ...form,
        availableSeats: form.totalSeats,
      });

      toast.success('Bus added successfully');

      setShowForm(false);
      resetForm();
      fetchBuses();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Failed to add bus'
      );
    }
  };

  const deleteBus = async (id) => {
    if (!confirm('Delete this bus?')) return;

    try {
      await api.delete(`/buses/${id}`);

      toast.success('Bus deleted');
      fetchBuses();
    } catch (err) {
      toast.error(
        err.response?.data?.message || 'Delete failed'
      );
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-hidden">

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

          <div className="flex items-center gap-4">

            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-2xl" />

              <div className="
                relative
                w-14
                h-14
                rounded-2xl
                bg-gradient-to-br
                from-blue-500
                to-indigo-600
                flex
                items-center
                justify-center
                shadow-lg
                shadow-blue-500/20
              ">
                <Bus className="w-7 h-7 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Bus Management
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Manage your fleet, routes and pricing
              </p>
            </div>

          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-5
              py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-500
              to-indigo-600
              text-white
              font-semibold
              shadow-lg
              shadow-blue-500/20
              hover:shadow-blue-500/40
              hover:scale-[1.02]
              transition-all
            "
          >
            {showForm ? (
              <>
                <X className="w-5 h-5" />
                Cancel
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add New Bus
              </>
            )}
          </button>

        </div>


        {/* =====================================================
            STATS
        ====================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          <div className="
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            backdrop-blur-xl
            p-5
          ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Total Buses
                </p>

                <p className="text-2xl font-bold mt-2">
                  {buses.length}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Bus className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            backdrop-blur-xl
            p-5
          ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Available Seats
                </p>

                <p className="text-2xl font-bold mt-2">
                  {buses.reduce(
                    (sum, bus) => sum + (bus.availableSeats || 0),
                    0
                  )}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
          </div>

          <div className="
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            backdrop-blur-xl
            p-5
          ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Bus Types
                </p>

                <p className="text-2xl font-bold mt-2">
                  {new Set(buses.map((b) => b.busType)).size}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Armchair className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </div>

          <div className="
            rounded-2xl
            bg-white/[0.05]
            border border-white/10
            backdrop-blur-xl
            p-5
          ">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider">
                  Operators
                </p>

                <p className="text-2xl font-bold mt-2">
                  {new Set(buses.map((b) => b.operator)).size}
                </p>
              </div>

              <div className="w-11 h-11 rounded-xl bg-orange-500/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-orange-400" />
              </div>
            </div>
          </div>

        </div>


        {/* =====================================================
            ADD BUS FORM
        ====================================================== */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="
              mb-8
              rounded-3xl
              bg-white/[0.06]
              border border-white/10
              backdrop-blur-2xl
              shadow-2xl
              p-6 sm:p-8
            "
          >

            {/* Form Header */}
            <div className="flex items-center gap-3 mb-7">

              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Plus className="w-5 h-5 text-blue-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Add New Bus
                </h2>

                <p className="text-xs text-slate-500 mt-1">
                  Enter the bus and route details below
                </p>
              </div>

            </div>


            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

              {/* Bus Number */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bus Number *
                </label>

                <input
                  name="busNumber"
                  value={form.busNumber}
                  onChange={handleChange}
                  required
                  placeholder="DL-01-AB-1234"
                  className="admin-input"
                />
              </div>


              {/* Operator */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Operator *
                </label>

                <input
                  name="operator"
                  value={form.operator}
                  onChange={handleChange}
                  required
                  placeholder="RedBus Travels"
                  className="admin-input"
                />
              </div>


              {/* Origin */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Origin *
                </label>

                <div className="relative">
                  <MapPin className="admin-icon" />

                  <input
                    name="origin"
                    value={form.origin}
                    onChange={handleChange}
                    required
                    placeholder="Delhi"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Destination */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Destination *
                </label>

                <div className="relative">
                  <MapPin className="admin-icon" />

                  <input
                    name="destination"
                    value={form.destination}
                    onChange={handleChange}
                    required
                    placeholder="Jaipur"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Departure */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Departure Time *
                </label>

                <div className="relative">
                  <Clock3 className="admin-icon" />

                  <input
                    name="departureTime"
                    value={form.departureTime}
                    onChange={handleChange}
                    required
                    placeholder="06:00"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Arrival */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Arrival Time *
                </label>

                <div className="relative">
                  <Clock3 className="admin-icon" />

                  <input
                    name="arrivalTime"
                    value={form.arrivalTime}
                    onChange={handleChange}
                    required
                    placeholder="11:30"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Duration
                </label>

                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  placeholder="5h 30m"
                  className="admin-input"
                />
              </div>


              {/* Total Seats */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Total Seats *
                </label>

                <div className="relative">
                  <Users className="admin-icon" />

                  <input
                    type="number"
                    name="totalSeats"
                    value={form.totalSeats}
                    onChange={handleChange}
                    required
                    min="1"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Base Fare */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Base Fare (₹) *
                </label>

                <div className="relative">
                  <IndianRupee className="admin-icon" />

                  <input
                    type="number"
                    name="baseFare"
                    value={form.baseFare}
                    onChange={handleChange}
                    required
                    min="0"
                    className="admin-input pl-11"
                  />
                </div>
              </div>


              {/* Bus Type */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Bus Type
                </label>

                <select
                  name="busType"
                  value={form.busType}
                  onChange={handleChange}
                  className="admin-input"
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


            {/* Submit */}
            <div className="flex justify-end gap-3 mt-7 pt-6 border-t border-white/10">

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border border-white/10
                  bg-white/[0.04]
                  text-slate-300
                  font-medium
                  hover:bg-white/[0.08]
                  transition
                "
              >
                Cancel
              </button>

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  gap-2
                  px-6
                  py-2.5
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-500
                  to-indigo-600
                  text-white
                  font-semibold
                  shadow-lg
                  shadow-blue-500/20
                  hover:shadow-blue-500/40
                  transition
                "
              >
                <Plus className="w-4 h-4" />
                Add Bus
              </button>

            </div>

          </form>
        )}


        {/* =====================================================
            BUS LIST
        ====================================================== */}
        <div className="
          rounded-3xl
          bg-white/[0.05]
          border border-white/10
          backdrop-blur-2xl
          overflow-hidden
          shadow-2xl
        ">

          {/* Table Header */}
          <div className="
            px-6
            py-5
            border-b
            border-white/10
            flex
            items-center
            justify-between
          ">

            <div>
              <h2 className="text-lg font-bold">
                Bus Fleet
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                {buses.length} buses currently registered
              </p>
            </div>

            <div className="
              px-3
              py-1.5
              rounded-full
              bg-emerald-500/10
              border border-emerald-400/10
              text-xs
              text-emerald-400
            ">
              Live
            </div>

          </div>


          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center">

              <div className="
                w-12
                h-12
                border-2
                border-blue-500/20
                border-t-blue-500
                rounded-full
                animate-spin
                mb-4
              " />

              <p className="text-sm text-slate-500">
                Loading buses...
              </p>

            </div>
          ) : buses.length === 0 ? (
            <div className="py-20 text-center">

              <div className="
                w-16
                h-16
                mx-auto
                rounded-2xl
                bg-white/[0.04]
                border border-white/10
                flex
                items-center
                justify-center
                mb-4
              ">
                <Bus className="w-7 h-7 text-slate-600" />
              </div>

              <h3 className="font-semibold text-slate-300">
                No buses found
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                Add your first bus to get started.
              </p>

            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full min-w-[950px]">

                <thead>
                  <tr className="
                    bg-white/[0.025]
                    text-left
                    text-xs
                    uppercase
                    tracking-wider
                    text-slate-500
                  ">

                    <th className="px-6 py-4">
                      Bus
                    </th>

                    <th className="px-6 py-4">
                      Operator
                    </th>

                    <th className="px-6 py-4">
                      Route
                    </th>

                    <th className="px-6 py-4">
                      Timing
                    </th>

                    <th className="px-6 py-4">
                      Type
                    </th>

                    <th className="px-6 py-4">
                      Seats
                    </th>

                    <th className="px-6 py-4">
                      Fare
                    </th>

                    <th className="px-6 py-4 text-right">
                      Action
                    </th>

                  </tr>
                </thead>


                <tbody className="divide-y divide-white/5">

                  {buses.map((b) => (
                    <tr
                      key={b._id}
                      className="
                        group
                        hover:bg-white/[0.035]
                        transition-colors
                      "
                    >

                      {/* Bus */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-3">

                          <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-500/10
                            border border-blue-400/10
                            flex
                            items-center
                            justify-center
                          ">
                            <Bus className="w-5 h-5 text-blue-400" />
                          </div>

                          <div>
                            <p className="font-semibold text-white">
                              {b.busNumber}
                            </p>

                            <p className="text-[11px] text-slate-500">
                              Bus ID: {b._id?.slice(-6)}
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Operator */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-slate-600" />

                          <span className="text-sm text-slate-300">
                            {b.operator}
                          </span>
                        </div>

                      </td>


                      {/* Route */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm">

                          <span className="text-slate-300">
                            {b.origin}
                          </span>

                          <Route className="w-4 h-4 text-blue-400" />

                          <span className="text-slate-300">
                            {b.destination}
                          </span>

                        </div>

                      </td>


                      {/* Timing */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2 text-sm text-slate-300">

                          <Clock3 className="w-4 h-4 text-slate-500" />

                          {b.departureTime}

                          <span className="text-slate-600">
                            →
                          </span>

                          {b.arrivalTime}

                        </div>

                        {b.duration && (
                          <p className="text-[11px] text-slate-500 mt-1 ml-6">
                            {b.duration}
                          </p>
                        )}

                      </td>


                      {/* Type */}
                      <td className="px-6 py-5">

                        <span className="
                          inline-flex
                          items-center
                          px-3
                          py-1.5
                          rounded-full
                          bg-purple-500/10
                          border border-purple-400/10
                          text-xs
                          text-purple-300
                        ">
                          {b.busType}
                        </span>

                      </td>


                      {/* Seats */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                            <Users className="w-4 h-4 text-emerald-400" />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-white">
                              {b.availableSeats}
                            </p>

                            <p className="text-[10px] text-slate-500">
                              of {b.totalSeats}
                            </p>
                          </div>

                        </div>

                      </td>


                      {/* Fare */}
                      <td className="px-6 py-5">

                        <div className="flex items-center gap-1 text-sm font-semibold text-white">
                          <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                          {b.baseFare}
                        </div>

                        <p className="text-[10px] text-slate-500">
                          base fare
                        </p>

                      </td>


                      {/* Action */}
                      <td className="px-6 py-5 text-right">

                        <button
                          onClick={() => deleteBus(b._id)}
                          title="Delete bus"
                          className="
                            inline-flex
                            w-9
                            h-9
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-white/10
                            bg-white/[0.03]
                            text-slate-500
                            hover:text-red-400
                            hover:bg-red-500/10
                            hover:border-red-400/20
                            transition-all
                          "
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>


      {/* =====================================================
          CUSTOM INPUT STYLES
      ====================================================== */}
      <style>{`
        .admin-input {
          width: 100%;
          height: 46px;
          padding: 0 14px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          color: white;
          outline: none;
          transition: all 0.2s ease;
        }

        .admin-input::placeholder {
          color: rgb(100 116 139);
        }

        .admin-input:focus {
          border-color: rgba(59,130,246,0.6);
          background: rgba(255,255,255,0.07);
          box-shadow: 0 0 0 4px rgba(59,130,246,0.08);
        }

        .admin-input option {
          background: #0f172a;
          color: white;
        }

        .admin-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 17px;
          height: 17px;
          color: rgb(100 116 139);
          pointer-events: none;
        }
      `}</style>

    </div>
  );
}

