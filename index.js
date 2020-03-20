require("dotenv").config();
const arteMetrics = {};
const db = require("./db/model");

let name;

arteMetrics.getName = query => {
  name = query.definitions[0].name.value;
};

arteMetrics.process = response => {
  const {
    startTime,
    endTime,
    duration,
    execution
  } = response.extensions.tracing;
  const text =
    "INSERT INTO queries(api_key, name, start_time, end_time, duration, resolvers) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    process.env.API_KEY,
    name,
    startTime,
    endTime,
    duration,
    JSON.stringify(execution.resolvers)
  ];

  db.query(text, values)
    .then(result => {
      // console.log(result);
    })
    .catch(err => {
      // console.log(err);
    });
};

module.exports = arteMetrics;
