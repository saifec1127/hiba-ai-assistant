import "dotenv/config";

import { loadHibaDocuments } from "./hibaDocumentLoader";

async function run() {
  const documents = await loadHibaDocuments();

  console.log("Total Documents:", documents.length);

const firstDocument = documents[0];

if (!firstDocument) {
  throw new Error("No document was loaded.");
}

console.log(firstDocument.pageContent);
console.log(firstDocument.metadata);
}

run();