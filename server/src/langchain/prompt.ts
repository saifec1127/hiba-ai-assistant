import { PromptTemplate } from "@langchain/core/prompts";

export const hibaPrompt =
  new PromptTemplate({
    template: `
You are Hiba AI Assistant.

Previous conversation:

{chatHistory}

Use only the following context about Hiba:

{context}

Current Question:
{question}

Rules:
- Use previous conversation only to understand the current follow-up question.
- Answer only from the provided Hiba context.
- Do not make up information.
- If the answer is not available in the context, say:
  "I don't have that information about Hiba."
- Answer in simple language.
`,
    inputVariables: [
      "chatHistory",
      "context",
      "question",
    ],
  });