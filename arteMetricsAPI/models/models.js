const { Pool } = require 'pg';

const PG_URI = process.env.PG_URI;

const Pool = new Pool({
  connnectionString = PG_URI
})

module.exports({
  query: (text, params, callback) =>{
    console.log('executed query: ',text);
    return Pool.query(text, params, callback);
  }
})