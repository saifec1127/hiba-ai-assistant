import { Annotation } from "@langchain/langgraph";

import type { Document } from "@langchain/core/documents";


export const GraphState = Annotation.Root({
  input: Annotation<string>,

  sessionId: Annotation<string>,

  historyText: Annotation<string>,

  processedInput: Annotation<string>,

  documents: Annotation<Document[]>,

  context: Annotation<string>,

  output: Annotation<string>,
});


export type GraphStateType =
  typeof GraphState.State;