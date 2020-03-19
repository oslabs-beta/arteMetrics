require("dotenv").config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.PG
});

// export the query function
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
