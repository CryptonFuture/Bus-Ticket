# 🚌 Bus Ticketing App

Complete full-stack Bus Ticket Booking System

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express.js + MongoDB (Mongoose)
- **Python Service**: FastAPI microservice for dynamic fare calculation & seat suggestions

## Features

- User Registration & Login (JWT Auth)
- Admin Panel to manage buses
- Search buses by origin, destination & date
- Book tickets with passenger details
- View & Cancel bookings (with PNR)
- Dynamic fare calculation via Python service
- Responsive modern UI

## Project Structure

```
bus-ticketing-app/
├── backend/                 # Node.js + Express + MongoDB
├── frontend/                # React + Vite
├── python-service/          # FastAPI (fare & suggestions)
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Python 3.9+
- npm

## Setup Instructions

### 1. Backend (Node.js)

```bash
cd backend
npm install
npm run seed          # sample buses + admin
npm run dev
```

Backend: `http://localhost:5000`

**.env**:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/bus_ticketing
JWT_SECRET=super_secret_jwt_key_change_in_production_12345
PYTHON_SERVICE_URL=http://localhost:8000
```

### 2. Python Service

```bash
cd python-service
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend: `http://localhost:5173`

## Demo Admin

- Email: `admin@bus.com`
- Password: `admin123`

(Run `npm run seed` first)

## API Endpoints

### Auth
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/auth/me

### Buses
- GET    /api/buses
- GET    /api/buses/:id
- POST   /api/buses (Admin)
- PUT    /api/buses/:id (Admin)
- DELETE /api/buses/:id (Admin)
- POST   /api/buses/calculate-fare

### Bookings
- POST /api/bookings
- GET  /api/bookings/my
- GET  /api/bookings/:id
- PUT  /api/bookings/:id/cancel
- GET  /api/bookings/all (Admin)

## Tech Stack

| Layer          | Technology |
|----------------|------------|
| Frontend       | React 18, Vite, Tailwind, React Router, Axios |
| Backend        | Node.js, Express, Mongoose, JWT, bcrypt |
| Database       | MongoDB |
| Python Service | FastAPI, Uvicorn |

## License

MIT
# Bus-Ticket
