import {
  formatDocumentsAsContext,
  retrieveHibaDocuments,
} from "./retriever";

import { hibaChain } from "./chain";

export async function askHiba(question: string) {
  const documents = await retrieveHibaDocuments(
    question,
    2
  );

  const context =
    formatDocumentsAsContext(documents);

  const answer = await hibaChain.invoke({
    context,
    question,
  });

  return answer;
}