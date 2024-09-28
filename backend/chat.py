import base64

import os
from openai import OpenAI
from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.prompts import PromptTemplate

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_chroma import Chroma

OPENAI_API_KEY = base64.b64decode(b"c2stcHJvai1ZTWVhUzF4OUwzMlIxdzAxb1VjaHNYR3VJNjQwajNQUVdYUl93UE1GRWljUnQ3cmY4R05ZQnFNdnRVZDBBYzVHNVJZV3Fpc3Q2T1QzQmxia0ZKR0VUc3JpcVRhRWpQYVRLUnZQOXJ2SGZnWGNxd1pPbEZTeFFsN1d5d0R3QkJUaVpJcGJOUHpaZm9QR0FPREE3M3J2TU4wNXE3TUE=")
OPENAI_API_KEY = OPENAI_API_KEY.decode('ascii')

STORE_DIR = "./data"

embedding_model="text-embedding-3-small"

embeddings = OpenAIEmbeddings(
    model=embedding_model,
    api_key=OPENAI_API_KEY
)
llm = OpenAI(api_key=OPENAI_API_KEY)

text_splitter = RecursiveCharacterTextSplitter(chunk_size=7500, chunk_overlap=500)

# text = "This is a test document."
# query_result = embeddings.embed_query(text)
# print(query_result)
# sys.exit(1)

def get_chroma():
    return Chroma(embedding_function=embeddings, persist_directory=STORE_DIR)

def build_chroma():
    texts = []
    chunks = []

    for doc in texts:
        with open(doc, "rt") as f:
            for chunk in text_splitter.split_text(f.read()):
                try:
                    chunks.append(chunk)
                except Exception as ex:
                    print(doc, len(chunk), "not processable", str(ex))

    return Chroma.from_texts(chunks, embeddings, persist_directory=STORE_DIR)