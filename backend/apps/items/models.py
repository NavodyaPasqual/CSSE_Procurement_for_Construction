from typing import List
import uuid
import datetime
from pydantic import BaseModel, Field


class item(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    quantity: int = Field("1")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0090-0a0b0c0d0e0f",
                "name": "navi",
                "quantity": "1"
            }
        }


class updateitem(BaseModel):
    name: str = Field(...)
    quantity: int = Field("1")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "name": "navi",
                "quantity": "1"
            }
        }
