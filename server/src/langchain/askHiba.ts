import {
  addAssistantMessage,
  addUserMessage,
  formatChatHistory,
} from "./chatHistory";

import { formatDocumentsAsContext, retrieveHibaDocuments } from "./retriever";

import { rewriteQuestion } from "./questionRewriter";
import { hibaChain } from "./chain";

export async function askHiba(question: string, sessionId: string) {
  const cleanQuestion = question.trim();

  if (!cleanQuestion) {
    return "Please ask a question about Hiba.";
  }

  const chatHistory = formatChatHistory(sessionId);

  const standaloneQuestion = await rewriteQuestion(cleanQuestion, chatHistory);

  console.log("Original Question:");
  console.log(cleanQuestion);

  console.log("Standalone Question:");
  console.log(standaloneQuestion);

  const documents = await retrieveHibaDocuments(standaloneQuestion, 2);

  const context = formatDocumentsAsContext(documents);

  const answer = await hibaChain.invoke({
    chatHistory,
    context,
    question: cleanQuestion,
  });

  addUserMessage(sessionId, cleanQuestion);

  addAssistantMessage(sessionId, answer);

  return answer;
}
