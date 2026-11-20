from pydantic import BaseModel, ConfigDict, Field
from typing import Optional
from datetime import datetime
from app.models import TripType


class TripCreate(BaseModel):
    name: str
    trip_type: TripType
    location: str
    start_date: datetime
    end_date: datetime
    cost: float


class TripRead(TripCreate):
    model_config = ConfigDict(from_attributes=True)

    archived: bool
    id: int
    

class TripUpdate(TripCreate):
    name: Optional[str] = Field(default=None, max_length=100)
    trip_type: Optional[TripType] = None
    location: Optional[str] = Field(default=None, max_length=100)
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    cost: Optional[float] = None
    archived: Optional[bool] = False
