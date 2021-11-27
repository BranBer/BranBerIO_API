import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import dbConnection from "./db/getDb";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { getAuthorizedUser, userIsAuthorized } from "./auth/authorize";
import authenticatedUser from "./types/authenticatedUser";

require("dotenv").config();

//TODO: Implement servering static images
const startServer = async () => {
  const app = express();
  app.use(graphqlUploadExpress());

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
