import "dotenv/config";

import { loadHibaDocuments } from "./hibaDocumentLoader";

async function run() {
  const documents = await loadHibaDocuments();

  console.log("Total Documents:", documents.length);

  console.log("\nPage Content:");
  console.log(documents[0].pageContent);

  console.log("\nMetadata:");
  console.log(documents[0].metadata);
}

run();