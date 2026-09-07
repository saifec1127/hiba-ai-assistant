import { END, START, StateGraph } from "@langchain/langgraph";

import { GraphState } from "./state";

import type { GraphStateType } from "./state";

import {
  generateResponseNode,
  improveInputNode,
  loadHistoryNode,
  processInputNode,
  regenerateResponseNode,
  retrieveContextNode,
  saveHistoryNode,
  validateContextNode,
  validateResponseNode,
} from "./nodes";

function routeAfterValidation(state: GraphStateType) {
  if (state.isContextRelevant) {
    return "generateResponse";
  }

  if (state.retryCount >= 2) {
    return "generateResponse";
  }

  return "improveInput";
}

function routeAfterResponseValidation(state: GraphStateType) {
  if (state.isResponseValid) {
    return "saveHistory";
  }

  if (state.responseRetryCount >= 2) {
    return "saveHistory";
  }

  return "regenerateResponse";
}

const workflow = new StateGraph(GraphState)

  .addNode("loadHistory", loadHistoryNode)

  .addNode("processInput", processInputNode)

  .addNode("retrieveContext", retrieveContextNode)

  .addNode("validateContext", validateContextNode)

  .addNode("improveInput", improveInputNode)

  .addNode("generateResponse", generateResponseNode)

  .addNode("validateResponse", validateResponseNode)

  .addNode("regenerateResponse", regenerateResponseNode)

  .addNode("saveHistory", saveHistoryNode)

  .addEdge(START, "loadHistory")

  .addEdge("loadHistory", "processInput")

  .addEdge("processInput", "retrieveContext")

  .addEdge("retrieveContext", "validateContext")

  .addConditionalEdges("validateContext", routeAfterValidation, [
    "generateResponse",
    "improveInput",
  ])

  .addEdge("improveInput", "retrieveContext")

  .addEdge("generateResponse", "validateResponse")

  .addConditionalEdges("validateResponse", routeAfterResponseValidation, [
    "saveHistory",
    "regenerateResponse",
  ])

  .addEdge("regenerateResponse", "validateResponse")

  .addEdge("saveHistory", END);

export const applicationGraph = workflow.compile();
