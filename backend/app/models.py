import enum
from datetime import datetime, timezone
from sqlalchemy import String, Enum, Float, DateTime, Boolean
from sqlalchemy.orm import Mapped, mapped_column

from .db import Base

# A class to define all three definite trip types
class TripType(enum.Enum):
    FACULTY = "Faculty Led"
    EXCHANGE = "Exchange"
    DIRECT = "Direct"

# A class that defines the model for the 'trips' table
class Trip(Base):
    __tablename__ = "trips"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(1000))
    trip_type: Mapped[TripType] = mapped_column(Enum(TripType))
    location: Mapped[str] = mapped_column(String(1000))
    start_date: Mapped[datetime] = mapped_column(DateTime)
    end_date: Mapped[datetime] = mapped_column(DateTime)
    cost: Mapped[float] = mapped_column(Float)
    archived: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)

