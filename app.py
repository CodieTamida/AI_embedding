from typing import Union
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

import chromadb
from llama_index.core import SimpleDirectoryReader
from llama_index.core import VectorStoreIndex
from llama_index.vector_stores.chroma import ChromaVectorStore
from llama_index.embeddings.openai import OpenAIEmbedding
from llama_index.core import StorageContext
from llama_index.core import Settings

from openai import OpenAI
from dotenv import load_dotenv
import os

chroma_client = chromadb.HttpClient(host='localhost', port = 8000)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    content: str

load_dotenv()
OpenAI.api_key = os.getenv('API_KEY')

Settings.embed_model = OpenAIEmbedding()

print(os.listdir('./data'))

# documents = SimpleDirectoryReader("./data").load_data()

db = chromadb.PersistentClient(path="./chroma_db")
chroma_collection = db.get_or_create_collection("quick_collection")

vector_store = ChromaVectorStore(chroma_collection = chroma_collection)
storage_context = StorageContext.from_defaults(vector_store=vector_store)

index = VectorStoreIndex.from_vector_store(
    vector_store, storage_context=storage_context                                       
)
# index.storage_context.persist()

# vector_index = VectorStoreIndex.from_documents(documents)
# vector_index.as_query_engine(0)

query_engine = index.as_query_engine()
response = query_engine.query("What book are you trained on?")

@app.post("/api/About")
def get_response(message: Message):
    if not message.content:
        raise HTTPException(status_code = 400, details='No content in message')
    print("Received message")
    query_engine = index.as_query_engine()
    response = query_engine.query(message.content)
    #print(response)
    return {"response":response}



if __name__ == '__main__':
    uvicorn.run("app:app", host= '0.0.0.0', port = 8001, reload = True)


