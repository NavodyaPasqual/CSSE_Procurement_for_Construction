from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import user , updateuser

router = APIRouter()


@router.post("/", response_description="Add user")
async def create_user(request: Request, user: user = Body(...)):
    user = jsonable_encoder(user)
    new_user = await request.app.mongodb["user"].insert_one(user)
    created_user = await request.app.mongodb["user"].find_one(
        {"_id": new_user.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)


@router.get("/", response_description="List all user")
async def list_user(request: Request):
    user = []
    for doc in await request.app.mongodb["user"].find().to_list(length=100):
        user.append(doc)
    return user


@router.get("/{id}", response_description="Get a Area user")
async def show_user(id: str, request: Request):
    if (user := await request.app.mongodb["user"].find_one({"_id": id})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {id} not found")


@router.put("/{id}", response_description="Update a Area user")
async def update_user(id: str, request: Request, user: updateuser = Body(...)):
    user = {k: v for k, v in user.dict().items() if v is not None}

    if len(user) >= 1:
        update_result = await request.app.mongodb["user"].update_one(
            {"_id": id}, {"$set": user}
        )

        if update_result.modified_count == 1:
            if (
                updated_user := await request.app.mongodb["user"].find_one({"_id": id})
            ) is not None:
                return updated_user

    if (
        existing_user := await request.app.mongodb["user"].find_one({"_id": id})
    ) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"user {id} not found")


@router.delete("/{id}", response_description="Delete user")
async def delete_user(id: str, request: Request):
    delete_result = await request.app.mongodb["user"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {id} not found")
