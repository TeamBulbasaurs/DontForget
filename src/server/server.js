const express = require('express');
const expressGraphQL = require('express-graphql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const passport = require('passport');

// Retrieve Configuration Keys
const { SERVER_PORT, CLIENT_URL } = require('../config/keys');

// Root Query schema
const schema = require('./queries');

// Create an express server
const app = express();

// Allow cross-origin requests betwen localhosts
app.use(cors());

// Parse Cookies
app.use(cookieParser());

// Initialize Passport
app.use(passport.initialize());
require('./passport');

// CLEAR ANY SET COOKIES ASSUME FAILED oAuth
app.get(
  '/',
  (req, res) => {
    res.clearCookie('dontforget.token');
    res.redirect(`${CLIENT_URL}`);
  },
);

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
    const { token, email, name } = req.user;

    // set cookie dontforget.token
    res.cookie('dontforget.token', token, { maxAge: 900000, httpOnly: true });

    // Add user to database

    res.redirect(`${CLIENT_URL}/Lists`);
  },
);

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
