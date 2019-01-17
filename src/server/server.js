const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const passport = require('passport');

// Retrieve Configuration Keys
const { SERVER_PORT, CLIENT_URL } = require('../config/keys');

// Root Query schema
const schema = require('./queries');

// Create an express server
const app = express();

// Allow cross-origin requests betwen localhosts
app.use(cors());

// Initialize Passport
app.use(passport.initialize());
require('./passport');

// Create a GraphQL endpoint
app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  }),
);

// GET Google Authentication API
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  (req, res) => {
    const { token } = req.user;
    res.redirect(`${CLIENT_URL}?token=${token}`);
  },
);

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
