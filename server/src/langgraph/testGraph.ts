import "dotenv/config";

import {
  runApplicationGraph,
} from "./runGraph";


async function run() {
  const sessionId =
    "langgraph-test-session";

  const input =
    "Who is Hiba's father?";

  console.log(
    "\nInput:"
  );

  console.log(input);


  const output =
    await runApplicationGraph(
      input,
      sessionId
    );


  console.log(
    "\nOutput:"
  );

  console.log(output);
}


run().catch((error) => {
  console.error(
    "Graph test failed:",
    error
  );
});