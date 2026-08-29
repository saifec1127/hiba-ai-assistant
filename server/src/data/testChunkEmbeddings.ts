import "dotenv/config";

import { embeddings } from "../langchain/embeddings";
import { splitHibaDocuments } from "./hibaTextSplitter";

async function run() {
  const chunks = await splitHibaDocuments();

  console.log("Total chunks:", chunks.length);

  const chunkTexts = chunks.map((chunk) => {
    return chunk.pageContent;
  });

  const vectors = await embeddings.embedDocuments(chunkTexts);

  console.log("Total vectors:", vectors.length);

  console.log("First chunk:");
  console.log(chunkTexts[0]);

  console.log("\nFirst vector length:");
  console.log(vectors[0].length);

  console.log("\nFirst few vector values:");
  console.log(vectors[0].slice(0, 10));
}

run();