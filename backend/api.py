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

class Req(BaseModel):
    elements: List[Msg]

class Msg(BaseModel):
    role: str
    content: str

app = FastAPI()

@app.get("/")
async def handle(data: History):
    return {
        "maciek": "Jest szansa!"
    }

prolog_prompt = [
    {
        "role": "system",
        "content": "\n".join([
            "Jesteś asystenetm, który pomaga użytkownikowi wypełnić deklarację podatkową.",
            "Odpowiadasz na pytania tylko wykorzystująć wiedzę, którą dostaniesz opisaną jako kontekst. Nie wymyślasz odpowiedzi.",
            "Jeśli czegoś nie wiesz. Nie wysyłaj użytkownikowi swoich domysłów i podejrzeń. Informuj go tylko jeśli jesteś czegoś pewien.",
            "Komunikuj się z użytkownikiem w jego języku.",
        ]),
    }
]

@app.post("/chat-complete")
async def chat_complete(req: Req):
    ctx = ""
    if len(req.elements) > 0:
        last_message = req.elements[-1].content
        ctx = query_rag(last_message)

    user_stuff = [
        {
            "role": e.role,
            "content": e.content
        } for e in req.elements
    ]

    res = query_llm(
        prolog_prompt + [{
            "role": "assistant",
            "content": "\n".join([
                "Kontekst:",
                "---",
                ctx,
                "---",
                "Wypełniana deklaracja: PCC-3",
                "Nazwa deklaracji: DEKLARACJA W SPRAWIE PODATKU OD CZYNNOŚCI CYWILNOPRAWNYCH",
                "---"
            ])
        }] + user_stuff
    )

    return {
        "role": "assistant",
        "content": res,
    }