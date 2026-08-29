import "dotenv/config";

import { askHiba } from "./askHiba";

async function run() {
  const answer = await askHiba(
    "What does Hiba enjoy playing with?"
  );

  console.log("AI Answer:");
  console.log(answer);
}

run();