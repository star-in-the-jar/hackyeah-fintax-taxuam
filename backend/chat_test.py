from chat import llm, get_chroma
from typing import List, Dict
from pprint import pprint

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
    user = """Wczoraj kupiłem na giełdzie samochodowej Fiata 126p rok prod. 1975, kolor zielony. Przejechane ma
1000000 km, idzie jak przecinak, nic nie stuka, nic nie puka, dosłownie igła. Zapłaciłem za niego 1000
zł ale jego wartość jest wyższa o 2000 zł i co mam z tym zrobić ?"""
    ctx = query_rag(user)
    res = query_llm(
        prolog_answer + [
            {
                "role": "assistant",
                "content": "\n".join([
                    "Kontekst:",
                    "---",
                    ctx,
                    "---",
                    "Wypełniana deklaracja: PCC-3",
                    "Nazwa deklaracji: DEKLARACJA W SPRAWIE PODATKU OD CZYNNOŚCI CYWILNOPRAWNYCH",
                    "Opis deklaracji: PCC-3 to deklaracja składana",
                    "---"
                ])
            },
            {
                "role": "user",
                "content": user
            },
        ]
    )
    return res

if __name__ == "__main__":
    pprint(maciek())