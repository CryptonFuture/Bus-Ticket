const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Bus = require('./models/Bus');
const User = require('./models/User');

dotenv.config();

const buses = [
  {
    busNumber: 'DL-01-AB-1234',
    operator: 'RedBus Travels',
    origin: 'Delhi',
    destination: 'Jaipur',
    departureTime: '06:00',
    arrivalTime: '11:30',
    duration: '5h 30m',
    totalSeats: 40,
    availableSeats: 28,
    baseFare: 450,
    busType: 'AC Seater',
    amenities: ['AC', 'Charging Point', 'Water Bottle']
  },
  {
    busNumber: 'MH-12-CD-5678',
    operator: 'Sharma Travels',
    origin: 'Mumbai',
    destination: 'Pune',
    departureTime: '07:30',
    arrivalTime: '11:00',
    duration: '3h 30m',
    totalSeats: 36,
    availableSeats: 20,
    baseFare: 350,
    busType: 'Volvo',
    amenities: ['AC', 'WiFi', 'Blanket', 'Charging Point']
  },
  {
    busNumber: 'KA-05-EF-9012',
    operator: 'VRL Travels',
    origin: 'Bangalore',
    destination: 'Hyderabad',
    departureTime: '21:00',
    arrivalTime: '06:00',
    duration: '9h 00m',
    totalSeats: 30,
    availableSeats: 15,
    baseFare: 900,
    busType: 'AC Sleeper',
    amenities: ['AC', 'Blanket', 'Pillow', 'Water Bottle']
  },
  {
    busNumber: 'TN-09-GH-3456',
    operator: 'KPN Travels',
    origin: 'Chennai',
    destination: 'Bangalore',
    departureTime: '22:30',
    arrivalTime: '05:30',
    duration: '7h 00m',
    totalSeats: 40,
    availableSeats: 32,
    baseFare: 700,
    busType: 'Sleeper',
    amenities: ['Blanket', 'Water Bottle']
  },
  {
    busNumber: 'RJ-14-IJ-7890',
    operator: 'Rajasthan State Roadways',
    origin: 'Jaipur',
    destination: 'Udaipur',
    departureTime: '08:00',
    arrivalTime: '14:00',
    duration: '6h 00m',
    totalSeats: 45,
    availableSeats: 40,
    baseFare: 400,
    busType: 'Seater',
    amenities: ['Water Bottle']
  },
  {
    busNumber: 'GJ-01-KL-2345',
    operator: 'Gujarat Travels',
    origin: 'Ahmedabad',
    destination: 'Surat',
    departureTime: '09:15',
    arrivalTime: '13:45',
    duration: '4h 30m',
    totalSeats: 40,
    availableSeats: 25,
    baseFare: 380,
    busType: 'AC Seater',
    amenities: ['AC', 'Charging Point']
  },
  {
    busNumber: 'UP-32-MN-6789',
    operator: 'UPSRTC',
    origin: 'Lucknow',
    destination: 'Varanasi',
    departureTime: '10:00',
    arrivalTime: '16:30',
    duration: '6h 30m',
    totalSeats: 50,
    availableSeats: 42,
    baseFare: 320,
    busType: 'Semi-Sleeper',
    amenities: ['Water Bottle']
  },
  {
    busNumber: 'WB-01-OP-0123',
    operator: 'SBSTC',
    origin: 'Kolkata',
    destination: 'Durgapur',
    departureTime: '07:00',
    arrivalTime: '11:00',
    duration: '4h 00m',
    totalSeats: 40,
    availableSeats: 35,
    baseFare: 280,
    busType: 'Seater',
    amenities: []
  },
  {
    busNumber: 'HR-26-QR-4567',
    operator: 'Haryana Roadways',
    origin: 'Delhi',
    destination: 'Chandigarh',
    departureTime: '05:30',
    arrivalTime: '09:30',
    duration: '4h 00m',
    totalSeats: 45,
    availableSeats: 30,
    baseFare: 350,
    busType: 'AC Seater',
    amenities: ['AC', 'Charging Point']
  },
  {
    busNumber: 'KL-07-ST-8901',
    operator: 'KSRTC',
    origin: 'Kochi',
    destination: 'Trivandrum',
    departureTime: '14:00',
    arrivalTime: '18:30',
    duration: '4h 30m',
    totalSeats: 40,
    availableSeats: 22,
    baseFare: 420,
    busType: 'Volvo',
    amenities: ['AC', 'WiFi', 'Charging Point', 'Water Bottle']
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await Bus.deleteMany({});
    console.log('Cleared existing buses');
    await Bus.insertMany(buses);
    console.log(`Seeded ${buses.length} buses`);

    const adminExists = await User.findOne({ email: 'admin@bus.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@bus.com',
        password: 'admin123',
        role: 'admin',
        phone: '9999999999'
      });
      console.log('Created demo admin: admin@bus.com / admin123');
    }
    console.log('Seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedDB();
