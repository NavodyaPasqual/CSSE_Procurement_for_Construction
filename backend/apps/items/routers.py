from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import item , updateitem

router = APIRouter()


@router.post("/", response_description="Add items")
async def create_items(request: Request, items: item = Body(...)):
    items = jsonable_encoder(items)
    new_items = await request.app.mongodb["items"].insert_one(items)
    created_items = await request.app.mongodb["items"].find_one(
        {"_id": new_items.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_items)


@router.get("/", response_description="List all items")
async def list_items(request: Request):
    items = []
    for doc in await request.app.mongodb["items"].find().to_list(length=100):
        items.append(doc)
    return items


@router.get("/{id}", response_description="Get a Area items")
async def show_items(id: str, request: Request):
    if (items := await request.app.mongodb["items"].find_one({"_id": id})) is not None:
        return items

    raise HTTPException(status_code=404, detail=f"items {id} not found")


@router.put("/{id}", response_description="Update a Area items")
async def update_items(id: str, request: Request, items: updateitem = Body(...)):
    items = {k: v for k, v in items.dict().items() if v is not None}

    if len(items) >= 1:
        update_result = await request.app.mongodb["items"].update_one(
            {"_id": id}, {"$set": items}
        )

        if update_result.modified_count == 1:
            if (
                updated_items := await request.app.mongodb["items"].find_one({"_id": id})
            ) is not None:
                return updated_items

    if (
        existing_items := await request.app.mongodb["items"].find_one({"_id": id})
    ) is not None:
        return existing_items

    raise HTTPException(status_code=404, detail=f"items {id} not found")


@router.delete("/{id}", response_description="Delete items")
async def delete_items(id: str, request: Request):
    delete_result = await request.app.mongodb["items"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"items {id} not found")
