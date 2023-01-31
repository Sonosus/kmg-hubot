from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

class KosmoModule(BaseModel):
    id: str
    maker_id: str
    function: List[str]
    name: str
    description: List[str]
    width: int
    type: List[str]
    link: str
    image_link: str


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "You won't find anything here!"}

@app.post("/add")
def new_module(module: KosmoModule):
    print(module)
    return module
