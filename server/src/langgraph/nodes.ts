import {
  addToChatHistory,
  formatChatHistory,
  getChatHistory,
} from "../langchain/chatHistory";

import {
  rewriteQuestion,
} from "../langchain/questionRewriter";

import {
  formatDocumentsAsContext,
  retrieveHibaDocuments,
} from "../langchain/retriever";

import {
  hibaChain,
} from "../langchain/chain";

import type {
  GraphStateType,
} from "./state";


// ========================================
// NODE 1
// Load conversation history
// ========================================

export async function loadHistoryNode(
  state: GraphStateType
) {
  const history =
    getChatHistory(state.sessionId);

  const historyText =
    formatChatHistory(history);

  return {
    historyText,
  };
}


// ========================================
// NODE 2
// Process / rewrite user input
// ========================================

export async function processInputNode(
  state: GraphStateType
) {
  const processedInput =
    await rewriteQuestion(
      state.input,
      state.historyText
    );

  return {
    processedInput,
  };
}


// ========================================
// NODE 3
// Retrieve relevant documents
// ========================================

export async function retrieveContextNode(
  state: GraphStateType
) {
  const documents =
    await retrieveHibaDocuments(
      state.processedInput,
      4
    );

  const context =
    formatDocumentsAsContext(
      documents
    );

  return {
    documents,
    context,
  };
}


// ========================================
// NODE 4
// Generate final AI response
// ========================================

export async function generateResponseNode(
  state: GraphStateType
) {
  const output =
    await hibaChain.invoke({
      context: state.context,
      question:
        state.processedInput,
    });

  return {
    output,
  };
}


// ========================================
// NODE 5
// Save conversation
// ========================================

export async function saveHistoryNode(
  state: GraphStateType
) {
  addToChatHistory(
    state.sessionId,
    {
      role: "user",
      content: state.input,
    }
  );

  addToChatHistory(
    state.sessionId,
    {
      role: "assistant",
      content: state.output,
    }
  );

  return {};
}