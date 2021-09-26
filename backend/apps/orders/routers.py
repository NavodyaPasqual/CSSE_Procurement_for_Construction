from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import order , updateOrder

router = APIRouter()


@router.post("/", response_description="Add Order")
async def create_Coordinates(request: Request, Order: order = Body(...)):
    Order = jsonable_encoder(Order)
    new_Order = await request.app.mongodb["Order"].insert_one(Order)
    created_Order = await request.app.mongodb["Order"].find_one(
        {"_id": new_Order.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_Order)


@router.get("/", response_description="List all Order")
async def list_Order(request: Request):
    Order = []
    for doc in await request.app.mongodb["Order"].find().to_list(length=100):
        Order.append(doc)
    return Order


@router.get("/{id}", response_description="Get a Area Order")
async def show_Order(id: str, request: Request):
    if (Order := await request.app.mongodb["Order"].find_one({"_id": id})) is not None:
        return Order

    raise HTTPException(status_code=404, detail=f"Order {id} not found")


@router.put("/{id}", response_description="Update a Area Order")
async def update_Order(id: str, request: Request, Order: updateOrder = Body(...)):
    Order = {k: v for k, v in Order.dict().items() if v is not None}

    if len(Order) >= 1:
        update_result = await request.app.mongodb["Order"].update_one(
            {"_id": id}, {"$set": Order}
        )

        if update_result.modified_count == 1:
            if (
                updated_Order := await request.app.mongodb["Order"].find_one({"_id": id})
            ) is not None:
                return updated_Order

    if (
        existing_Order := await request.app.mongodb["Order"].find_one({"_id": id})
    ) is not None:
        return existing_Order

    raise HTTPException(status_code=404, detail=f"Order {id} not found")


@router.delete("/{id}", response_description="Delete Order")
async def delete_Order(id: str, request: Request):
    delete_result = await request.app.mongodb["Order"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Order {id} not found")
