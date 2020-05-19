require("dotenv").config();
const arteMetrics = {};

const fetch = require("node-fetch");
let name = "NPM_Package_placeholderName";
let apiKey = "NPM_Package_placeholderAPIKey";
arteMetrics.getName = (query) => {
  name = query.definitions[0].name.value;
};
arteMetrics.setApiKey = (key) => {
  apiKey = key;
};
arteMetrics.process = (response) => {

  const {
    startTime,
    endTime,
    duration,
    execution,
  } = response.extensions.tracing;
  console.log("this is startime: ", startTime);
  fetch("http://artemetrics-api.us-west-1.elasticbeanstalk.com/test/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify({
      apiKey: apiKey,
      name: name,
      startTime: startTime,
      endTime: endTime,
      duration: duration,
      execution: execution,
    }),
  })
    .then((x) => x.json())
    .then((myJson) => console.log(myJson))
    .catch((err) => console.log(err));
};

module.exports = arteMetrics;
