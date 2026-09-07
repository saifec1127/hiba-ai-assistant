import {
  applicationGraph,
} from "./graph";


export async function runApplicationGraph(
  input: string,
  sessionId: string
): Promise<string> {
  const result =
    await applicationGraph.invoke({
      input,
      sessionId,

      historyText: "",
      processedInput: "",
      documents: [],
      context: "",
      output: "",
    });

  return result.output;
}