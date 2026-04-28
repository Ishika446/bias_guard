import os
from dotenv import load_dotenv


class Settings:
    APP_NAME = "BiasGuard AI"
    DEBUG = True

    @property
    def GEMINI_API_KEY(self) -> str:
        # Re-read from .env on every access so the key is never
        # stale if the file was changed while the server is running.
        load_dotenv(override=True)
        return os.getenv("GEMINI_API_KEY", "")


settings = Settings()