import "dotenv/config";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./graphql/typeDefs";
import { resolvers } from "./graphql/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: {
      port: Number(process.env.PORT) || 5000,
    },
  });

  console.log(`GraphQL server running at ${url}`);
}

startServer();