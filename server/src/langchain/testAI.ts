import "dotenv/config";

import { askHiba } from "./askHiba";

async function run() {
  const answer = await askHiba(
    "What activities does Hiba enjoy?"
  );

  console.log("AI Answer:");
  console.log(answer);
}

run();