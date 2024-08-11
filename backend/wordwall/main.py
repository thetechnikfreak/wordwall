################################################################################
"""
WordWall - Simple, Self-Hosted, Collaborative Word Cloud Generator.

(c) 2024 | Stanley Solutions | Joe Stanley
License: MIT
"""
################################################################################

from typing import Annotated
from tempfile import TemporaryDirectory
from pathlib import Path
from contextlib import asynccontextmanager
from uuid import uuid4

from fastapi import FastAPI, Request, Cookie
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from loguru import logger

from . import __header__, __version__, api
from .configuration import settings
from .database import connect_database


__html_header__ = __header__.replace("\n", r"\n")

APP_COOKIE_NAME: str = "client_token"

@asynccontextmanager
async def lifespan(_: FastAPI):
    """Application Lifespan System."""
    # Setup
    logger.debug(__header__)
    # Manage Temporary Database File Contextually
    with TemporaryDirectory() as tmp_directory:
        connect_database(database_path=Path(tmp_directory) / "words.db")
        yield
    # Teardown

app = FastAPI(
    title="WordWall",
    summary="Simple, Self-Hosted, Collaborative Word Cloud Generator.",
    version=__version__,
    lifespan=lifespan,
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost",
        "http://localhost:8000", # Uvicorn Default Server
    # pylint: disable=no-member
    ] + settings.application.cross_site_origins, # noqa
    # pylint: enable=no-member
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(api.router)

# Mount the Static File Path
app.mount(
    "/static",
    StaticFiles(directory=Path(__file__).parent/"static"),
    name="static"
)

# Load Templates
TEMPLATES: Jinja2Templates = Jinja2Templates(
    directory=(Path(__file__).parent/"templates"),
)

################################################################################

@app.get("/", response_class=HTMLResponse, include_in_schema=False)
async def root(request: Request) -> HTMLResponse:
    """Main Application Landing - Allow Creation of New Wall and Token."""
    wall_id = str(uuid4())
    response = TEMPLATES.TemplateResponse(
        "landing.html",
        {
            "request": request,
            "console_app_name": __html_header__,
            "wall_id": wall_id,
            "wall_hash": hash(wall_id),
        },
    )
    return response

@app.get("/run/{wall_id}", response_class=HTMLResponse, include_in_schema=False)
async def operate_wall(request: Request, wall_id: str) -> HTMLResponse:
    """Generate the New Data Store for a New Wall - Operate as Moderator."""
    response = TEMPLATES.TemplateResponse(
        "index.html",
        {
            "request": request,
            "console_app_name": __html_header__,
            "wall_id": wall_id,
            "wall_hash": hash(wall_id),
        },
    )
    return response

@app.get("/participate", response_class=HTMLResponse, include_in_schema=False)
async def participant_page(
    request: Request,
    # Hash of the Wall ID
    wall: str,
    # Unique ID for Participant
    client_token: Annotated[str | None, Cookie()] = None,
) -> HTMLResponse:
    """Participant's Interaction Point - Use Wall."""
    if not client_token:
        client_token = str(uuid4())
    response = TEMPLATES.TemplateResponse(
        "index.html",
        {
            "request": request,
            APP_COOKIE_NAME: client_token,
            "console_app_name": __html_header__,
            "wall_hash": wall,
        },
    )
    response.set_cookie(APP_COOKIE_NAME, client_token)
    return response
