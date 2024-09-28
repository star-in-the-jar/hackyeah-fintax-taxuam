from chat import llm
from typing import List, Dict

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


prolog_answer = [
    {
        "role": "system",
        "content": "\n".join([
            "Jesteś asystenetm, który pomaga użytkownikowi wypełnić deklarację podatkową.",
            "Odpowiadasz na pytania tylko wykorzystująć wiedzę, którą dostaniesz opisaną jako kontekst. Nie wymyślasz odpowiedzi.",
            "Jeśli czegoś nie wiesz, albo nie jesteś pewien to zakomunikuj to użytkownikowi. Nie wysyłaj użytkownikowi swoich domysłów i podejrzeń. Informuj go tylko jeśli jesteś czegoś pewien."
        ]),
    }
]

def maciek():
    res = query_llm(
        prolog_answer + [
            {
                "role": "assistant",
                "content": "\n".join([
                    "Kontekst:",
                    "---",
                    "PESEL to numer identifikacyjny, który wraz z nazwiskiem identyfikuje każdą osobę.",
                    "---",
                    "Wypełniana deklaracja: PCC-3",
                    "Nazwa deklaracji: DEKLARACJA W SPRAWIE PODATKU OD CZYNNOŚCI CYWILNOPRAWNYCH",
                    "Opis deklaracji: PCC-3 to deklaracja składana",
                    "---"
                ])
            },
            {
                "role": "user",
                "content": "Co powinieniem wpisać w polu PESEL?"
            },
            {
                "role": "assistant",
                "content": "W polu PESEL powinieneś wpisać swój numer identyfikacyjny PESEL, który identyfikuje Ciebie jako osobę."
            },
            {
                "role": "user",
                "content": "Czym jest PESEL i gdzie mogę go znaleźć?",
            },
        ]
    )

    print(res)

if __name__ == "__main__":
    maciek()