const express = require('express');
const expressGraphQL = require('express-graphql');
const { buildSchema } = require('graphql');

const { SERVER_PORT } = require('../config/keys');

// Create an express server
const app = express();

/*
 *  A sample setup while learning GraphQL
 *  once squared away all components should
 *  reside in their appropriate homes in the
 *  directory structure.
 */

// GraphQL schema
const schema = buildSchema(`
  type Query {
    message: String
  }
`);

// Root resolver
const root = {
  message: () => 'Hello World!',
};

// Create a GraphQL endpoint
app.use('/graphql', expressGraphQL({
  schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
