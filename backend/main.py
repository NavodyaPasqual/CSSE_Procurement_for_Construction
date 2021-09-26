from fastapi import FastAPI
import uvicorn
from motor.motor_asyncio import AsyncIOMotorClient
from config import settings

from apps.items.routers import router as items_router
from apps.orders.routers import router as orders_router
from apps.sites.routers import router as sites_router
from apps.users.routers import router as users_router


app = FastAPI()


@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(settings.DB_URL)
    app.mongodb = app.mongodb_client[settings.DB_NAME]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


app.include_router(items_router, tags=["items"], prefix="/items")
app.include_router(orders_router, tags=["orders"], prefix="/orders")
app.include_router(sites_router, tags=["sites"], prefix="/sites")
app.include_router(users_router, tags=["users"], prefix="/users")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
