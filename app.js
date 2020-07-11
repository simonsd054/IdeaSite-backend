const express = require('express');
const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const graphqlResolvers = require('./graphql/resolvers');
const graphqlSchemas = require('./graphql/schemas');

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

// console.log(process.env.PORT);

const app = express();

//remove deprecation warning
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

// const { Idea } = require('./database/schemas')

const server = new ApolloServer({
  typeDefs: graphqlSchemas,
  resolvers: graphqlResolvers,
});

server.applyMiddleware({ app, path: '/api/graphql' });

const httpServer = http.createServer(app);

// server.installSubscriptionHandlers(httpServer);

app.get('/', () => {
  console.log('lol');
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    httpServer.listen({ port: PORT }, () => {
      console.log(`Database connected and Apollo Graphql Server on http://localhost:${PORT}/api/graphql`);
    });
  })
