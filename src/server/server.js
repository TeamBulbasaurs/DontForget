const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');

// Retrieve Configuration Keys
const { SERVER_PORT } = require('../config/keys');

// Root Query schema
const schema = require('./queries');

// Create an express server
const app = express();

// Allow cross-origin requests betwen localhosts
app.use(cors());

// Create a GraphQL endpoint
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
