import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";

import { ASK_HIBA } from "../graphql/queries";

import type {
  AskHibaData,
  AskHibaVariables,
  ChatMessage,
} from "../types/chat.types";

function getSessionId() {
  const existingSessionId =
    localStorage.getItem("hiba-session-id");

  if (existingSessionId) {
    return existingSessionId;
  }

  const newSessionId = crypto.randomUUID();

  localStorage.setItem(
    "hiba-session-id",
    newSessionId
  );

  return newSessionId;
}

export function useHibaChat() {
  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [
    askHiba,
    {
      loading,
      error,
    },
  ] = useLazyQuery<
    AskHibaData,
    AskHibaVariables
  >(ASK_HIBA);

  const handleQuestionChange = (
    value: string
  ) => {
    setQuestion(value);
  };

  const handleAsk = async () => {
    const cleanQuestion =
      question.trim();

    if (!cleanQuestion || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: cleanQuestion,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setQuestion("");

    try {
      const result = await askHiba({
        variables: {
          question: cleanQuestion,
          sessionId: getSessionId(),
        },
      });

      const answer =
        result.data?.askHiba.answer;

      if (!answer) {
        return;
      }

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: answer,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);
    } catch (error) {
      console.error(
        "Failed to ask Hiba AI:",
        error
      );
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      void handleAsk();
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    question,
    messages,
    loading,
    error,

    handleQuestionChange,
    handleAsk,
    handleKeyDown,
    clearMessages,
  };
}