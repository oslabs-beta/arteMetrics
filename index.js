const arteMetrics = {};
const db = require("./db/model");

arteMetrics.process = response => {
  const text =
    "INSERT INTO trace_response(fieldName, startOffset, duration) VALUES($1, $2, $3) RETURNING *";
  const values = [
    response.extensions.tracing.execution.resolvers[0].fieldName,
    response.extensions.tracing.execution.resolvers[0].startOffset,
    response.extensions.tracing.execution.resolvers[0].duration
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
