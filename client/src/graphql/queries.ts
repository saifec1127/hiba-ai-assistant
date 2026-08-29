import { gql } from "@apollo/client";

export const ASK_HIBA = gql`
  query AskHiba($question: String!) {
    askHiba(question: $question) {
      answer
    }
  }
`;