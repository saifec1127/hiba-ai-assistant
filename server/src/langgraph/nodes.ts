import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { model } from "../langchain/model";

import {
  addToChatHistory,
  formatChatHistory,
  getChatHistory,
} from "../langchain/chatHistory";

import { rewriteQuestion } from "../langchain/questionRewriter";

import {
  formatDocumentsAsContext,
  retrieveHibaDocuments,
} from "../langchain/retriever";

import { hibaChain } from "../langchain/chain";

import type { GraphStateType } from "./state";

const contextValidationPrompt = new PromptTemplate({
  template: `
You are a retrieval quality evaluator.

Your job is to decide whether the retrieved context contains enough relevant information to answer the user's question.

Question:
{question}

Retrieved Context:
{context}

Rules:

1. Return "GOOD" if the context contains information that can answer the question.
2. Return "POOR" if the context is missing the required information.
3. Do not answer the user's question.
4. Return only one word:
GOOD
or
POOR
`,
  inputVariables: ["question", "context"],
});

const contextValidationChain = contextValidationPrompt
  .pipe(model)
  .pipe(new StringOutputParser());

export async function validateContextNode(state: GraphStateType) {
  const result = await contextValidationChain.invoke({
    question: state.processedInput,
    context: state.context,
  });

  const normalizedResult = result.trim().toUpperCase();

  const isContextRelevant = normalizedResult === "GOOD";

  console.log("\nContext Validation:", normalizedResult);

  return {
    isContextRelevant,
  };
}

const inputImprovementPrompt = new PromptTemplate({
  template: `
You improve search queries for semantic retrieval.

Original user input:
{originalInput}

Current processed query:
{processedInput}

Conversation history:
{historyText}

The previous retrieval did not provide enough relevant context.

Rewrite the query so that a semantic vector search can retrieve better documents.

Rules:

1. Preserve the user's original intent.
2. Make the query explicit and standalone.
3. Expand ambiguous relationship words when useful.
4. Use clear English terms that are likely to appear in documents.
5. Do not answer the question.
6. Return only the improved search query.

Examples:

"phuphu name?"
→ "What are the names of Hiba's paternal aunts or father's sisters?"

"and mother?"
→ "What is the name of Hiba's mother?"

"dadi name?"
→ "What is the name of Hiba's paternal grandmother or father's mother?"
`,
  inputVariables: ["originalInput", "processedInput", "historyText"],
});

const inputImprovementChain = inputImprovementPrompt
  .pipe(model)
  .pipe(new StringOutputParser());

export async function improveInputNode(state: GraphStateType) {
  const improvedInput = await inputImprovementChain.invoke({
    originalInput: state.input,
    processedInput: state.processedInput,
    historyText: state.historyText,
  });

  const processedInput = improvedInput.trim().replace(/^["']|["']$/g, "");

  const retryCount = state.retryCount + 1;

  console.log("\nImproved Search Query:");

  console.log(processedInput);

  console.log("Retry Count:", retryCount);

  return {
    processedInput,
    retryCount,
  };
}

// ========================================
// NODE 1
// Load conversation history
// ========================================

export async function loadHistoryNode(state: GraphStateType) {
  const history = getChatHistory(state.sessionId);

  const historyText = formatChatHistory(history);

  return {
    historyText,
  };
}

// ========================================
// NODE 2
// Process / rewrite user input
// ========================================

export async function processInputNode(state: GraphStateType) {
  const processedInput = await rewriteQuestion(state.input, state.historyText);

  return {
    processedInput,
  };
}

// ========================================
// NODE 3
// Retrieve relevant documents
// ========================================

// export async function retrieveContextNode(state: GraphStateType) {
//   const documents = await retrieveHibaDocuments(state.processedInput, 4);

//   const context = formatDocumentsAsContext(documents);

//   return {
//     documents,
//     context,
//   };
// }

// ========================================
// NODE 3
// Retrieve relevant documents
// ========================================

export async function retrieveContextNode(state: GraphStateType) {
  console.log("\nSearching Pinecone for:");
  console.log(state.processedInput);

  const documents = await retrieveHibaDocuments(state.processedInput, 8);

  console.log("\nRetrieved Documents:");

  documents.forEach((document, index) => {
    console.log(`${index + 1}. ${document.metadata.source ?? "unknown"}`);
  });

  const context = formatDocumentsAsContext(documents);

  return {
    documents,
    context,
  };
}

// ========================================
// NODE 4
// Generate final AI response
// ========================================

// export async function generateResponseNode(state: GraphStateType) {
//   const output = await hibaChain.invoke({
//     context: state.context,
//     question: state.processedInput,
//   });

//   return {
//     output,
//   };
// }

export async function generateResponseNode(state: GraphStateType) {
  console.log("\n==============================");

  console.log("FINAL CONTEXT SENT TO LLM");

  console.log("==============================");

  console.log(state.context);

  console.log("==============================\n");

  const output = await hibaChain.invoke({
    context: state.context,
    question: state.processedInput,
  });

  return {
    output,
  };
}

// ========================================
// NODE 5
// Save conversation
// ========================================

export async function saveHistoryNode(state: GraphStateType) {
  addToChatHistory(state.sessionId, {
    role: "user",
    content: state.input,
  });

  addToChatHistory(state.sessionId, {
    role: "assistant",
    content: state.output,
  });

  return {};
}
