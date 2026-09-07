import {
  END,
  START,
  StateGraph,
} from "@langchain/langgraph";

import {
  GraphState,
} from "./state";

import {
  generateResponseNode,
  loadHistoryNode,
  processInputNode,
  retrieveContextNode,
  saveHistoryNode,
} from "./nodes";


const workflow =
  new StateGraph(GraphState)

    .addNode(
      "loadHistory",
      loadHistoryNode
    )

    .addNode(
      "processInput",
      processInputNode
    )

    .addNode(
      "retrieveContext",
      retrieveContextNode
    )

    .addNode(
      "generateResponse",
      generateResponseNode
    )

    .addNode(
      "saveHistory",
      saveHistoryNode
    )

    .addEdge(
      START,
      "loadHistory"
    )

    .addEdge(
      "loadHistory",
      "processInput"
    )

    .addEdge(
      "processInput",
      "retrieveContext"
    )

    .addEdge(
      "retrieveContext",
      "generateResponse"
    )

    .addEdge(
      "generateResponse",
      "saveHistory"
    )

    .addEdge(
      "saveHistory",
      END
    );


export const applicationGraph =
  workflow.compile();