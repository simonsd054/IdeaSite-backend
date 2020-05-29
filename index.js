const express = require("express");
const http = require("http");

const { ApolloServer } = require("apollo-server-express");

const graphqlResolvers = require("./graphql/resolvers");
const graphqlSchemas = require("./graphql/schemas");

const PORT = process.env.port || 4000;

const app = express();

const server = new ApolloServer({
  typeDefs: graphqlSchemas,
  resolvers: graphqlResolvers,
});

server.applyMiddleware({ app, path: "/api/graphql" });

const httpServer = http.createServer(app);

// server.installSubscriptionHandlers(httpServer);

app.get("/", () => {
  console.log("lol");
});

httpServer.listen({ port: PORT }, () => {
  console.log("Server Created");
});
