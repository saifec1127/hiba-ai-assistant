import "dotenv/config";

import { askHiba } from "./askHiba";
import { getChatHistory } from "./chatHistory";

async function run() {
  const sessionId =
    "test-session-1";

  const answer1 =
    await askHiba(
      "What activities does Hiba enjoy?",
      sessionId
    );

  console.log(
    "\nAnswer 1:"
  );

  console.log(answer1);

  const answer2 =
    await askHiba(
      "What does she like to play with?",
      sessionId
    );

  console.log(
    "\nAnswer 2:"
  );

  console.log(answer2);

  console.log(
    "\nChat History:"
  );

  console.log(
    getChatHistory(
      sessionId
    )
  );
}

run();