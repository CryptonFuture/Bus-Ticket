const Booking = require('../models/Booking');
const Bus = require('../models/Bus');
const axios = require('axios');

exports.createBooking = async (req, res) => {
  try {
    const { busId, journeyDate, passengers, busType } = req.body;
    if (!busId || !journeyDate || !passengers || !Array.isArray(passengers) || passengers.length === 0) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    if (bus.availableSeats < passengers.length) {
      return res.status(400).json({ success: false, message: 'Not enough seats available' });
    }

    let totalFare = 0;
    const pythonUrl = process.env.PYTHON_SERVICE_URL;
    try {
      const fareRes = await axios.post(`${pythonUrl}/calculate-fare`, {
        base_fare: bus.baseFare,
        bus_type: busType || bus.busType || 'Seater',
        passengers: passengers.length,
        journey_date: journeyDate,
        origin: bus.origin,
        destination: bus.destination
      });
      totalFare = fareRes.data.total_fare;
    } catch {
      const multipliers = { Seater: 1, Sleeper: 1.4, 'Semi-Sleeper': 1.2, 'AC Seater': 1.5, 'AC Sleeper': 1.8, Volvo: 2.0 };
      const mult = multipliers[busType || bus.busType] || 1;
      totalFare = Math.round(bus.baseFare * mult * passengers.length);
    }

    const startSeat = bus.totalSeats - bus.availableSeats + 1;
    passengers.forEach((p, i) => { p.seatNumber = `S${startSeat + i}`; });

    const booking = await Booking.create({
      user: req.user._id, bus: busId, journeyDate, passengers, totalFare,
      busType: busType || bus.busType || 'Seater', seatsBooked: passengers.length, status: 'confirmed'
    });

    bus.availableSeats -= passengers.length;
    await bus.save();

    const populated = await Booking.findById(booking._id).populate('bus').populate('user', 'name email');
    res.status(201).json({ success: true, message: 'Booking confirmed!', booking: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate('bus').sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bus').populate('user', 'name email phone');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    res.json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bus');
    if (!booking) return res.status(404).json({ success: false, message: 'Booking not found' });
    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }
    if (booking.status === 'cancelled') return res.status(400).json({ success: false, message: 'Booking already cancelled' });
    booking.status = 'cancelled';
    await booking.save();
    const bus = await Bus.findById(booking.bus._id);
    if (bus) { bus.availableSeats += booking.seatsBooked; await bus.save(); }
    res.json({ success: true, message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('bus').populate('user', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
