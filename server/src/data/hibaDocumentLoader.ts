import fs from "fs/promises";
import path from "path";
import { Document } from "@langchain/core/documents";

export async function loadHibaDocuments() {
  const filePath = path.resolve(
    process.cwd(),
    "../data/hiba-profile.md"
  );

  const content = await fs.readFile(filePath, "utf-8");

  const document = new Document({
    pageContent: content,
    metadata: {
      source: filePath,
      type: "hiba-profile",
    },
  });

  return [document];
}