const express = require('express');
const expressGraphQL = require('express-graphql');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strateg
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
console.log("in server.js line 26")
app.use(passport.initialize()); // does this require express.static?
require('../config/passport');
console.log("in server.js line 29")

/* GET Google Authentication API. */
app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function(req, res) {
    const token = req.user.token;
    res.redirect('http://localhost:8080?token=' + token);
  }
);

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
