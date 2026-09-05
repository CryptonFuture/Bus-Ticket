const Bus = require('../models/Bus');
const axios = require('axios');

exports.getBuses = async (req, res) => {
  try {
    const { origin, destination } = req.query;
    let query = { isActive: true };
    if (origin) query.origin = { $regex: origin, $options: 'i' };
    if (destination) query.destination = { $regex: destination, $options: 'i' };
    const buses = await Bus.find(query).sort({ departureTime: 1 });
    res.json({ success: true, count: buses.length, buses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    res.json({ success: true, bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBus = async (req, res) => {
  try {
    const busData = req.body;
    if (!busData.availableSeats) busData.availableSeats = busData.totalSeats;
    const bus = await Bus.create(busData);
    res.status(201).json({ success: true, bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    res.json({ success: true, bus });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBus = async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });
    res.json({ success: true, message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.calculateFare = async (req, res) => {
  try {
    const { busId, busType, passengers, journeyDate } = req.body;
    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ success: false, message: 'Bus not found' });

    const pythonUrl = process.env.PYTHON_SERVICE_URL || 'http://localhost:8000';
    try {
      const response = await axios.post(`${pythonUrl}/calculate-fare`, {
        base_fare: bus.baseFare,
        bus_type: busType || bus.busType || 'Seater',
        passengers: passengers || 1,
        journey_date: journeyDate,
        origin: bus.origin,
        destination: bus.destination
      });
      return res.json({ success: true, ...response.data });
    } catch {
      const multipliers = { Seater: 1, Sleeper: 1.4, 'Semi-Sleeper': 1.2, 'AC Seater': 1.5, 'AC Sleeper': 1.8, Volvo: 2.0 };
      const mult = multipliers[busType || bus.busType] || 1;
      const total = Math.round(bus.baseFare * mult * (passengers || 1));
      return res.json({
        success: true, base_fare: bus.baseFare, multiplier: mult,
        passengers: passengers || 1, total_fare: total,
        note: 'Calculated locally (Python service unavailable)'
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
