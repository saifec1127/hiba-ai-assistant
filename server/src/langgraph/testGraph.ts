import "dotenv/config";

import {
  runApplicationGraph,
} from "./runGraph";

async function run() {
  const sessionId =
    "langgraph-followup-test";


  console.log(
    "\n=============================="
  );

  console.log(
    "LANGGRAPH FOLLOW-UP TEST"
  );

  console.log(
    "=============================="
  );


  // ========================================
  // QUESTION 1
  // ========================================

  const question1 =
    "Who is Hiba's father?";

  console.log(
    "\nQuestion 1:"
  );

  console.log(question1);


  const answer1 =
    await runApplicationGraph(
      question1,
      sessionId
    );


  console.log(
    "\nAnswer 1:"
  );

  console.log(answer1);


  // ========================================
  // QUESTION 2
  // Same session
  // ========================================

  const question2 =
    "And mother?";

  console.log(
    "\nQuestion 2:"
  );

  console.log(question2);


  const answer2 =
    await runApplicationGraph(
      question2,
      sessionId
    );


  console.log(
    "\nAnswer 2:"
  );

  console.log(answer2);


  console.log(
    "\n=============================="
  );
}


run().catch((error) => {
  console.error(
    "Graph test failed:",
    error
  );

  process.exit(1);
});