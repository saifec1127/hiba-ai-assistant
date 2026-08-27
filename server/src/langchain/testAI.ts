import "dotenv/config";

import { askHiba } from "./askHiba";

async function run() {
  const answer = await askHiba(
    "What is Hiba's favorite food?"
  );

  console.log("AI Answer:");
  console.log(answer);
}

run();