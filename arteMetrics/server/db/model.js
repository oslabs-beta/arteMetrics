const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.testPG
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
