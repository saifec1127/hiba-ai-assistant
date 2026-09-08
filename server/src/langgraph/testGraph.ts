import "dotenv/config";

import { runApplicationGraph } from "./runGraph";

async function run() {
  const sessionId = "langgraph-retrieval-test";

  const input = "What is Hiba's favorite toy?";

  console.log("\n==============================");

  console.log("LANGGRAPH RETRIEVAL TEST");

  console.log("==============================");

  console.log("\nInput:");
  console.log(input);

  const output = await runApplicationGraph(input, sessionId);

  console.log("\nFinal Output:");
  console.log(output);

  console.log("\n==============================");
}

run().catch((error) => {
  console.error("Graph test failed:", error);

  process.exit(1);
});
