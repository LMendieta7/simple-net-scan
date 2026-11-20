from fastapi import APIRouter

from .service import nmap_results

router = APIRouter(tags=["discovery"])


@router.get("/discovery")
def run_discovery():
    return nmap_results()
