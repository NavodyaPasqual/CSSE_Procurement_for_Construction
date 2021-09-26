from typing import List
import uuid
import datetime
from pydantic import BaseModel, Field


class user(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    username: str = Field(...)
    password: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-5555-0809-0a0b0c0d0e0f",
                "username": "tandin",
                "password": "1234",
            }
        }


class updateuser(BaseModel):
    username: str = Field(...)
    password: str

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "username": "tandin",
                "password": "1234",
            }
        }
