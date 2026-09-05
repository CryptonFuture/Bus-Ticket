from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
from datetime import datetime, date

app = FastAPI(
    title="Bus Ticketing Python Service",
    description="Dynamic fare calculation & seat suggestions for buses",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BUS_TYPE_MULTIPLIERS = {
    "Seater": 1.0,
    "Semi-Sleeper": 1.2,
    "Sleeper": 1.4,
    "AC Seater": 1.5,
    "AC Sleeper": 1.8,
    "Volvo": 2.0,
}

ROUTE_FACTOR = {
    ("Delhi", "Jaipur"): 1.0,
    ("Mumbai", "Pune"): 0.9,
    ("Bangalore", "Hyderabad"): 1.2,
    ("Chennai", "Bangalore"): 1.1,
    ("Jaipur", "Udaipur"): 1.0,
    ("Ahmedabad", "Surat"): 0.95,
    ("Lucknow", "Varanasi"): 1.05,
    ("Kolkata", "Durgapur"): 0.85,
    ("Delhi", "Chandigarh"): 0.95,
    ("Kochi", "Trivandrum"): 1.0,
}

class FareRequest(BaseModel):
    base_fare: float
    bus_type: str = "Seater"
    passengers: int = 1
    journey_date: Optional[str] = None
    origin: Optional[str] = None
    destination: Optional[str] = None

class SeatSuggestRequest(BaseModel):
    total_seats: int
    available_seats: int
    passengers: int
    bus_type: str = "Seater"
    preferred_side: Optional[str] = None

@app.get("/")
def root():
    return {
        "service": "Bus Ticketing Python Microservice",
        "status": "running",
        "endpoints": ["/calculate-fare", "/suggest-seats", "/health"]
    }

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/calculate-fare")
def calculate_fare(req: FareRequest):
    try:
        mult = BUS_TYPE_MULTIPLIERS.get(req.bus_type, 1.0)
        route_factor = 1.0
        if req.origin and req.destination:
            key = (req.origin, req.destination)
            route_factor = ROUTE_FACTOR.get(key, 1.0)
            if route_factor == 1.0:
                route_factor = ROUTE_FACTOR.get((req.destination, req.origin), 1.0)

        weekend_surge = 1.0
        if req.journey_date:
            try:
                jdate = datetime.strptime(req.journey_date[:10], "%Y-%m-%d").date()
                if jdate.weekday() >= 5:
                    weekend_surge = 1.15
                days_diff = (jdate - date.today()).days
                if 0 <= days_diff <= 1:
                    weekend_surge *= 1.1
                elif days_diff > 14:
                    weekend_surge *= 0.95
            except Exception:
                pass

        total = round(req.base_fare * mult * req.passengers * route_factor * weekend_surge)
        return {
            "base_fare": req.base_fare,
            "bus_type": req.bus_type,
            "class_multiplier": mult,
            "passengers": req.passengers,
            "route_factor": round(route_factor, 2),
            "weekend_surge": round(weekend_surge, 2),
            "total_fare": total,
            "currency": "INR",
            "calculated_by": "python-service"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/suggest-seats")
def suggest_seats(req: SeatSuggestRequest):
    if req.passengers > req.available_seats:
        raise HTTPException(status_code=400, detail="Not enough seats available")
    occupied = req.total_seats - req.available_seats
    available = list(range(occupied + 1, req.total_seats + 1))
    if req.preferred_side == "window":
        available = sorted(available, key=lambda x: 0 if x % 2 == 1 else 1)
    elif req.preferred_side == "aisle":
        available = sorted(available, key=lambda x: 0 if x % 2 == 0 else 1)
    selected = available[:req.passengers]
    seats = [f"S{s}" for s in selected]
    return {
        "suggested_seats": seats,
        "bus_type": req.bus_type,
        "count": len(seats),
        "note": "Seats are suggestions only. Final allocation happens at booking."
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
