import os
from contextlib import asynccontextmanager

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select, text
from sqlalchemy.orm import Session

from . import models, schemas
from .db import Base, engine, get_db


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Simple bootstrap. Swap for Alembic migrations when the schema grows.
    Base.metadata.create_all(bind=engine)
    yield


app = FastAPI(title="Capstone API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:5173").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health(db: Session = Depends(get_db)):
    db.execute(text("SELECT 1"))
    return {"status": "ok"}


@app.get("/api/trips", response_model=list[schemas.TripRead])
def list_trips(db: Session = Depends(get_db)):
    """ Gets all trips and their data """
    return db.scalars(select(models.Trip).order_by(models.Trip.id)).all()


@app.get("/api/active-trips", response_model=list[schemas.TripRead])
def list_active_trips(db: Session = Depends(get_db)):
    """ Gets all trips and their data """
    return db.scalars(select(models.Trip).where(models.Trip.archived==False).order_by(models.Trip.id)).all()


@app.post("/api/trips", response_model=schemas.TripRead, status_code=201)
def create_item(payload: schemas.TripCreate, db: Session = Depends(get_db)):
    """ Creates a trip and adds it to the database """
    trip = models.Trip(**payload.model_dump())
    db.add(trip)
    db.commit()
    return trip


@app.patch("/api/trips/{trip_id}", response_model=schemas.TripRead)
def update_trip(trip_id: int, new_trip: schemas.TripUpdate, db: Session = Depends(get_db)):
    """ Updating an existing trip by id """
    trip = db.get(models.Trip, trip_id)
    if trip.id == trip_id:
        if new_trip.name is not None:
            trip.name = new_trip.name
        if new_trip.trip_type is not None:
            trip.trip_type = new_trip.trip_type
        if new_trip.location is not None:
            trip.location = new_trip.location
        if new_trip.start_date is not None:
            trip.start_date = new_trip.start_date
        if new_trip.end_date is not None:
            trip.end_date = new_trip.end_date
        if new_trip.cost is not None:
            trip.cost = new_trip.cost
        if new_trip.archived is not None:
            trip.archived = new_trip.archived
        db.commit()
        return trip
    else:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trip not found")

    
@app.delete("/api/trips/{trip_id}", status_code=204)
def delete_item(trip_id: int, db: Session = Depends(get_db)):
    """ Deleting a trip by id """
    trip = db.get(models.Trip, trip_id)
    if trip.id is not trip_id:
        raise HTTPException(status_code=404, detail="Trip not found")
    db.delete(trip)
    db.commit()
        
        

