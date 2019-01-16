const initOptions = {
  connect(client, dc, useCount) {
    const cp = client.connectionParameters;
    console.log(`Connected to database: ${cp.database}. useCount: ${useCount}`);
  },
  disconnect(client, dc) {
    const cp = client.connectionParameters;
    console.log(`Disconnecting from database: ${cp.database}`);
  },
  error(err, e) {
    console.error(`e: ${e}`);
    console.error(`DB connection error: ${err}`);
  },
};

const pgp = require('pg-promise')(initOptions);

// Retrieve Configuration Keys
const { dbURI } = require('../../config/keys');

// Create connection to DBMS
const db = pgp(dbURI);

// Exporting the database object for shared use
module.exports = db;
