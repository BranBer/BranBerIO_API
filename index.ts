import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import dbConnection from "./src/db/getDb";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { getAuthorizedUser, userIsAuthorized } from "./src/auth/authorize";
import authenticatedUser from "./src/types/authenticatedUser";

require("dotenv").config();

const startServer = async () => {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use(express.static("static"));

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req }) => ({
      connection: dbConnection,
      user: getAuthorizedUser(req),
      isAuthorized: (user: authenticatedUser | null) => {
        userIsAuthorized(user);
      },
    }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
