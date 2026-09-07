import { END, START, StateGraph } from "@langchain/langgraph";

import { GraphState } from "./state";

import type { GraphStateType } from "./state";

import {
  generateResponseNode,
  improveInputNode,
  loadHistoryNode,
  processInputNode,
  retrieveContextNode,
  saveHistoryNode,
  validateContextNode,
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

const workflow = new StateGraph(GraphState)

  .addNode("loadHistory", loadHistoryNode)

  .addNode("processInput", processInputNode)

  .addNode("retrieveContext", retrieveContextNode)

  .addNode("validateContext", validateContextNode)

  .addNode("improveInput", improveInputNode)

  .addNode("generateResponse", generateResponseNode)

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

  .addEdge("generateResponse", "saveHistory")

  .addEdge("saveHistory", END);

export const applicationGraph = workflow.compile();
