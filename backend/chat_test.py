from chat import llm, get_chroma
from typing import List, Dict
from pprint import pprint

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

vectorstore = get_chroma()
retriever = vectorstore.as_retriever(search_kwargs={'k': 3})
def query_rag(query):
    return '\n\n'.join(c.page_content for c in retriever.invoke(query))

prolog_answer = [
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

def maciek():
    user = """Jak rozliczyć spadek?"""
    ctx = query_rag(user)
    res = query_llm(
        stream=True,
        messages=prolog_answer + [
            {
                "role": "assistant",
                "content": "\n".join([
                    "Kontekst:",
                    "---",
                    ctx,
                    "---",
                ])
            },
            {
                "role": "user",
                "content": user
            },
        ]
    )
    print(type(res))

    for part in res:
        print(type(part))
        print(part, end="")
    print()

if __name__ == "__main__":
    pprint(maciek())