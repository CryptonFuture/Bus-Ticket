const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  busNumber: { type: String, required: true, unique: true, trim: true },
  operator: { type: String, required: true, trim: true },
  origin: { type: String, required: true, trim: true },
  destination: { type: String, required: true, trim: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },
  duration: { type: String, default: '' },
  totalSeats: { type: Number, required: true, min: 1 },
  availableSeats: { type: Number, required: true },
  baseFare: { type: Number, required: true, min: 0 },
  busType: {
    type: String,
    enum: ['Seater', 'Sleeper', 'Semi-Sleeper', 'AC Seater', 'AC Sleeper', 'Volvo'],
    default: 'Seater'
  },
  amenities: [{ type: String }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);
