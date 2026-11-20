from pathlib import Path

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from .features.discovery.router import router as discovery_router

app = FastAPI()
app.include_router(discovery_router)

frontend = Path(__file__).resolve().parents[1] / "frontend"
app.mount("/", StaticFiles(directory=frontend, html=True), name="frontend")
