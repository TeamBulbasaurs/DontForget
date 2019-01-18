const express = require('express');
const expressGraphQL = require('express-graphql');
const passport = require('passport');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const bodyParser = require('body-parser');

// Retrieve Configuration Keys
const { SERVER_PORT, SENDGRID_API_KEY } = require('../config/keys');

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
require('./passport');
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

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
sgMail.setApiKey(SENDGRID_API_KEY);

app.post(
  '/invite', 
  bodyParser.json(), 
  function(req, res) {
    const { to, from, subject, text, html } = req.body
    const msg = { to, from, subject, text, html };
    sgMail.send(msg);
    res.send("OK")
  }
);

app.listen(SERVER_PORT, () => console.log(`Express GraphQL Server now running on port: ${SERVER_PORT}`));
