import { ApolloServer } from "apollo-server-express";
import typeDefs from "./src/graphql/typeDefs";
import resolvers from "./src/graphql/resolvers";
import dbConnection from "./src/db/getDb";
import express from "express";
import { graphqlUploadExpress } from "graphql-upload";
import { getAuthorizedUser, userIsAuthorized } from "./src/auth/authorize";
import authenticatedUser from "./src/types/authenticatedUser";

require("dotenv").config();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

const startServer = async () => {
  const app = express();
  app.use(graphqlUploadExpress());
  app.use("/static", express.static(__dirname + "/static"));

  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    context: ({ req, res }) => {
      console.log("COOKIES");
      console.log(req.cookies);

      return {
        connection: dbConnection,
        user: getAuthorizedUser(req, res),
        isAuthorized: (user: authenticatedUser | null) => {
          userIsAuthorized(user);
        },
        userIsAdmin: (user: authenticatedUser | null) => {
          userIsAuthorized(user);
        },
      };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: corsOptions });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  );
};

startServer();
