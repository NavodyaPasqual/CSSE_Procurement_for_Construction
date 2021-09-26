from typing import List
import uuid
import datetime
from pydantic import BaseModel, Field


class site(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    location: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-9212-0a0b0c0d0e0f",
                "name": "sth sth",
                "location": "Gampha"
            }
        }


class updatesite(BaseModel):
    name: str = Field(...)
    location: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "sth sth",
                "location": "Gampha"
            }
        }
