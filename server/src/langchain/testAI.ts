import "dotenv/config";

import { askHiba } from "./askHiba";

async function run() {
  const sessionId =
    "rewrite-test-session";

  const answer1 =
    await askHiba(
      "What activities does Hiba enjoy?",
      sessionId
    );

  console.log("\nAnswer 1:");
  console.log(answer1);

  const answer2 =
    await askHiba(
      "What does she like to play with?",
      sessionId
    );

  console.log("\nAnswer 2:");
  console.log(answer2);
}

run();