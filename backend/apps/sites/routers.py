from fastapi import APIRouter, Body, Request, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

from .models import site , updatesite

router = APIRouter()


@router.post("/", response_description="Add sites")
async def create_sites(request: Request, sites: site = Body(...)):
    sites = jsonable_encoder(sites)
    new_sites = await request.app.mongodb["sites"].insert_one(sites)
    created_sites = await request.app.mongodb["sites"].find_one(
        {"_id": new_sites.inserted_id}
    )

    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_sites)


@router.get("/", response_description="List all sites")
async def list_sites(request: Request):
    sites = []
    for doc in await request.app.mongodb["sites"].find().to_list(length=100):
        sites.append(doc)
    return sites


@router.get("/{id}", response_description="Get a Area sites")
async def show_sites(id: str, request: Request):
    if (sites := await request.app.mongodb["sites"].find_one({"_id": id})) is not None:
        return sites

    raise HTTPException(status_code=404, detail=f"sites {id} not found")


@router.put("/{id}", response_description="Update a Area sites")
async def update_sites(id: str, request: Request, sites: updatesite = Body(...)):
    sites = {k: v for k, v in sites.dict().items() if v is not None}

    if len(sites) >= 1:
        update_result = await request.app.mongodb["sites"].update_one(
            {"_id": id}, {"$set": sites}
        )

        if update_result.modified_count == 1:
            if (
                updated_sites := await request.app.mongodb["sites"].find_one({"_id": id})
            ) is not None:
                return updated_sites

    if (
        existing_sites := await request.app.mongodb["sites"].find_one({"_id": id})
    ) is not None:
        return existing_sites

    raise HTTPException(status_code=404, detail=f"sites {id} not found")


@router.delete("/{id}", response_description="Delete sites")
async def delete_sites(id: str, request: Request):
    delete_result = await request.app.mongodb["sites"].delete_one({"_id": id})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"sites {id} not found")
