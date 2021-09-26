from typing import List
import uuid
from pydantic import BaseModel, Field


class order(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    status: str = Field("not decided")
    items: list[str] = []
    site: list[str] = []
    quantity: int = Field("1")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "id": "00010203-0405-0607-0809-0a0b0c0d0e0f",
                "status": "not decided",
                "items": ["sth sth", "lol"],
                "site": ["sth sth"],
                "quantity" : "1"
            }
        }


class updateOrder(BaseModel):
    status: str = Field("not decided")
    items: list[str] = []
    site: list[str] = []
    quantity: int = Field("1")

    class Config:
        allow_population_by_field_name = True
        schema_extra = {
            "example": {
                "status": "not decided",
                "items": ["sth sth"],
                "site": ["sth sth"],
                "quantity" : "1"
            }
        }
