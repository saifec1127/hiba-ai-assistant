import { askHiba } from "../langchain/askHiba";

export const resolvers = {
  Query: {
    askHiba: async (
      _: unknown,
      { question }: { question: string }
    ) => {
      const answer = await askHiba(question);

      return {
        answer,
      };
    },
  },
};