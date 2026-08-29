import { embeddings } from "./embeddings";
import { splitHibaDocuments } from "../data/hibaTextSplitter";

type VectorRecord = {
  pageContent: string;
  metadata: Record<string, unknown>;
  vector: number[];
};

function cosineSimilarity(
  vectorA: number[],
  vectorB: number[]
): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];

    magnitudeA += vectorA[i] * vectorA[i];
    magnitudeB += vectorB[i] * vectorB[i];
  }

  const denominator =
    Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

  if (denominator === 0) {
    return 0;
  }

  return dotProduct / denominator;
}

export async function createHibaVectorStore() {
  const chunks = await splitHibaDocuments();

  const texts = chunks.map((chunk) => chunk.pageContent);

  const vectors = await embeddings.embedDocuments(texts);

  const vectorStore: VectorRecord[] = chunks.map(
    (chunk, index) => ({
      pageContent: chunk.pageContent,
      metadata: chunk.metadata,
      vector: vectors[index],
    })
  );

  return vectorStore;
}

export async function searchHibaVectorStore(
  question: string,
  k = 2
) {
  const vectorStore = await createHibaVectorStore();

  const questionVector = await embeddings.embedQuery(question);

  const scoredResults = vectorStore.map((record) => ({
    ...record,
    score: cosineSimilarity(
      questionVector,
      record.vector
    ),
  }));

  scoredResults.sort((a, b) => b.score - a.score);

  return scoredResults.slice(0, k);
}