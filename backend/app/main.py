from fastapi import FastAPI
from .database import Base, engine
from .routers import auth, sops, progress, admin

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Smart SOP & Training Assistant")

app.include_router(auth.router)
app.include_router(sops.router)
app.include_router(progress.router)
app.include_router(admin.router)
