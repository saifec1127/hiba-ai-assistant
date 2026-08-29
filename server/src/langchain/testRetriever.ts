import "dotenv/config";

import {
  formatDocumentsAsContext,
  retrieveHibaDocuments,
} from "./retriever";

async function run() {
  const question =
    "What does Hiba enjoy playing with?";

  const documents = await retrieveHibaDocuments(
    question,
    2
  );

  const context =
    formatDocumentsAsContext(documents);

  console.log("Question:");
  console.log(question);

  console.log("\nFinal Context:");
  console.log(context);
}

run();