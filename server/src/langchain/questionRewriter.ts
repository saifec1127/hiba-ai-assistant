import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { RunnableSequence } from "@langchain/core/runnables";

import { model } from "./model";

const rewritePrompt = new PromptTemplate({
  template: `
You are helping rewrite follow-up questions.

Previous conversation:
{chatHistory}

Current question:
{question}

Rewrite the current question as a standalone question.

Rules:
- Resolve words like "she", "her", "it", "that", or "they" using the previous conversation.
- Do not answer the question.
- Only rewrite the question.
- If the question is already standalone, return it unchanged.

Standalone question:
`,
  inputVariables: [
    "chatHistory",
    "question",
  ],
});

const outputParser =
  new StringOutputParser();

const rewriteChain =
  RunnableSequence.from([
    rewritePrompt,
    model,
    outputParser,
  ]);

export async function rewriteQuestion(
  question: string,
  chatHistory: string
) {
  if (!chatHistory.trim()) {
    return question;
  }

  const rewrittenQuestion =
    await rewriteChain.invoke({
      chatHistory,
      question,
    });

  return rewrittenQuestion.trim();
}