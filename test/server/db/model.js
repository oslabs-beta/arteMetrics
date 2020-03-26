const { Pool } = require("pg");
const pool = new Pool({
  connectionString:
    "postgres://ygynkuai:C4tjB0Qm8aI_95ckX1dvoPfxlGXaTczQ@drona.db.elephantsql.com:5432/ygynkuai"
});

// export the query function
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
