import fs from "node:fs/promises";
import { Document, VectorStoreIndex, QdrantVectorStore } from "llamaindex";
import { QdrantClient } from "@qdrant/js-client-rest";

// const client = new ChromaClient();

async function About() {
  const path = "data/Artificial_Intelligence-_A_Modern_Approach.pdf";
  const essay = await fs.readFile(path, "utf-8");

  const vectorStore = new QdrantClient({
    url: "http://localhost:6333",
  });

  const document = new Document({ text: essay, id_: path });

  const index = await VectorStoreIndex.fromDocuments([document], {
    vectorStore,
  });

  const queryEngine = index.asQueryEngine();

  const response = await queryEngine.query({
    query: "What book are you trained on?",
  });
  // const collection = await client.getCollection({ name: "quick_collection" });

  // const queryEngine = index.asQueryEngine();
  // const response = await queryEngine.query({
  //   query: "What book are you trained on?",
  // });
  console.log(response);
  //const collections = await client.listCollections();
  //console.log(collections);

  return <div>{JSON.stringify(response)}</div>;
}

export default About;
