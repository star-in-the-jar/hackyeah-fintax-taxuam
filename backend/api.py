from fastapi import FastAPI
from .chat import llm, get_chroma
from pydantic import BaseModel
from typing import List

vectorstore = get_chroma()
retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

def query_rag(query):
    return '\n\n'.join(c.page_content for c in retriever.invoke(query))

class History(BaseModel):
    elements: List[BaseModel]

class HistoryElement(BaseModel):
    role: str

app = FastAPI()

@app.get("/v1")
async def handle(data: History):
    return {
        "maciek": "MACIEK"
    }