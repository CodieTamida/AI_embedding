from typing import Union
from fastapi import FastAPI
import uvicorn

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

@app.get("/About")
def get_response(query: Union[str, None]):
    query_engine = index.as_query_engine()
    response = query_engine.query(query)
    return {"response":response}



if __name__ == '__main__':
    uvicorn.run("app:app", host= '0.0.0.0', port = 8001, reload = True)


