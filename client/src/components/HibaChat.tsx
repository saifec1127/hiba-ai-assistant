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
};

function HibaChat() {
  const [question, setQuestion] = useState("");

  const [askHiba, { data, loading, error }] = useLazyQuery<
    AskHibaData,
    AskHibaVariables
  >(ASK_HIBA);

  const handleAsk = async () => {
    if (!question.trim()) {
      return;
    }

    await askHiba({
      variables: {
        question,
      },
    });
  };

  return (
    <div>
      <h1>Hiba AI Assistant</h1>

      <input
        type="text"
        value={question}
        placeholder="Ask something about Hiba..."
        onChange={(event) => setQuestion(event.target.value)}
      />

      <button onClick={handleAsk} disabled={loading}>
        {loading ? "Asking..." : "Ask Hiba"}
      </button>

      {error && <p>Something went wrong.</p>}

      {data && (
        <div>
          <h2>Answer</h2>
          <p>{data.askHiba.answer}</p>
        </div>
      )}
    </div>
  );
}

export default HibaChat;