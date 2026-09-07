import { applicationGraph } from "./graph";

export async function runApplicationGraph(
  input: string,
  sessionId: string,
): Promise<string> {
  const result = await applicationGraph.invoke({
    input,
    sessionId,
    historyText: "",
    processedInput: "",
    documents: [],
    context: "",
    isContextRelevant: false,
    retryCount: 0,
    output: "",
    isResponseValid: false,
    responseRetryCount: 0,
  });

  return result.output;
}
