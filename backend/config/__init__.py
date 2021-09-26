from pydantic import BaseSettings


class CommonSettings(BaseSettings):
    APP_NAME: str = "C_company"
    DEBUG_MODE: bool = True


class ServerSettings(BaseSettings):
    HOST: str = "0.0.0.0"
    PORT: int = 8000


class DatabaseSettings(BaseSettings):
    DB_URL = "mongodb+srv://user-123:user-123@construction-management.sk0gl.mongodb.net/constructionManager?retryWrites=true&w=majority"
    DB_NAME = "Backend"


class Settings(CommonSettings, ServerSettings, DatabaseSettings):
    pass


settings = Settings()
 