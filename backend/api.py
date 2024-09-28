from fastapi import FastAPI
from .chat import llm, get_chroma
from pydantic import BaseModel
from typing import List, Dict

vectorstore = get_chroma()
retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

def query_rag(query):
    return '\n\n'.join(c.page_content for c in retriever.invoke(query))

def query_llm(
    messages: List[Dict[str, str]]
):
    completion = llm.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini", 
        stream=True,
        max_tokens=1024
    )
    gen = (m.choices[0].delta.content for m in completion if not m.choices[0].finish_reason)
    return "".join(gen)

class History(BaseModel):
    elements: List[BaseModel]

class HistoryElement(BaseModel):
    role: str

app = FastAPI()

@app.get("/")
async def handle(data: History):
    return {
        "maciek": "Jest szansa!"
    }

@app.get("/test")
async def handle():
    res = query_llm([
        {
            "role": "system",
            "content": "Jesteś asystentem piszącym wiersze. Piszesz wiersze na tematy zdane ci przez urzytkownika."
        },
        {
            "role": "user",
            "content": "Napisz wiersz o AI bielik - polskim czacie GPT",
        }
    ])

    return {
        "role": "assistant",
        "content": res,
    }