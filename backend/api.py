from fastapi import FastAPI
from .chat import llm, get_chroma
from pydantic import BaseModel
from typing import List, Dict, Optional
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi import HTTPException

vectorstore = get_chroma()
retriever = vectorstore.as_retriever(search_kwargs={'k': 3})

def query_rag(query):
    return '\n\n'.join(c.page_content for c in retriever.invoke(query))

def query_llm(
    messages: List[Dict[str, str]],
    stream=False
):
    completion = llm.chat.completions.create(
        messages=messages,
        model="gpt-4o-mini", 
        stream=True,
        max_tokens=1024
    )
    if not stream:
        gen = (m.choices[0].delta.content for m in completion if not m.choices[0].finish_reason)
        return "".join(gen)
    else:
        def gen():
            yield from (m.choices[0].delta.content for m in completion if not m.choices[0].finish_reason)
        return gen()

class Msg(BaseModel):
    role: str
    content: str

class Req(BaseModel):
    field: Optional[str]
    declaration: Optional[str]
    elements: List[Msg]


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
    
prolog_prompt = [
    {
        "role": "system",
        "content": "\n".join([
            "Jesteś asystenetm, który pomaga użytkownikowi wypełnić deklarację podatkową.",
            "Odpowiadasz na pytania tylko wykorzystująć wiedzę, którą dostaniesz opisaną jako kontekst. Nie wymyślasz odpowiedzi.",
            "Jeśli czegoś nie wiesz. Nie wysyłaj użytkownikowi swoich domysłów i podejrzeń. Informuj go tylko jeśli jesteś czegoś pewien.",
            "Komunikuj się z użytkownikiem w wybranym przez niego języku.",
            "Jeśli obecnie wypełniana deklaracja jest tą, którą użytkownik ma wypełnić, to go o tym poinformuj.",
            "Jeśli użytkownik obecnie wypełnia inną deklarację, niż tą, którą powinien wypełniać, to mu o tym powiedz."
        ]),
    }
]

@app.post("/chat-complete-stream")
async def chat_complete_stream(req: Req):
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

    declaration = req.declaration or ""
    if declaration: 
        declaration = declaration or "n/a"
        declaration = f"Obecnie wypełniana deklaracja: {declaration}"

    res = query_llm(
        stream=True,
        messages=prolog_prompt + [{
            "role": "assistant",
            "content": "\n".join([
                "Kontekst:",
                "---",
                ctx,
                "---",
                declaration
            ])
        }] + user_stuff
    )

    print(res)

    return StreamingResponse(res, media_type="text/plain", headers={
        "Content-Encoding": "utf8"
    })

@app.post("/main-page-complete")
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
            ])
        }] + user_stuff
    )

    return JSONResponse(content={
        "role": "assistant",
        "content": res,
    })
front_path = "../frontend/dist"
app.mount("/", StaticFiles(directory=front_path, html = True), name="dist")

@app.exception_handler(404)
def on_not_found(x, y):
    return HTMLResponse(
        content=open(front_path + "/index.html", "rt").read()
    )