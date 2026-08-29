import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";

import { ASK_HIBA } from "../graphql/queries";

type AskHibaData = {
  askHiba: {
    answer: string;
  };
};

type AskHibaVariables = {
  question: string;
  sessionId: string;
};

const sessionId =
  "hiba-web-session";

function HibaChat() {
  const [question, setQuestion] =
    useState("");

  const [
    askHiba,
    {
      data,
      loading,
      error,
    },
  ] = useLazyQuery<
    AskHibaData,
    AskHibaVariables
  >(ASK_HIBA);

  const handleAsk = async () => {
    const cleanQuestion =
      question.trim();

    if (!cleanQuestion) {
      return;
    }

    await askHiba({
      variables: {
        question: cleanQuestion,
        sessionId,
      },
    });

    setQuestion("");
  };

  return (
    <div>
      <h1>Hiba AI Assistant</h1>

      <input
        type="text"
        value={question}
        placeholder="Ask something about Hiba..."
        onChange={(event) =>
          setQuestion(
            event.target.value
          )
        }
      />

      <button
        onClick={handleAsk}
        disabled={loading}
      >
        {loading
          ? "Asking..."
          : "Ask Hiba"}
      </button>

      {error && (
        <p>
          Something went wrong.
        </p>
      )}

      {data && (
        <div>
          <h2>Answer</h2>

          <p>
            {
              data.askHiba
                .answer
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default HibaChat;