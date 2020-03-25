import React, { useState } from 'react';

const QueriesOverview = () => {
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      // query for dummy apikey account
      query: `query {
          allQueries {
            id
            name
            duration
            start_time
            end_time
          }
        }`
    })
  })
    .then(data => data.json())
    .then(myJson => console.log('data back: ', myJson))
    .catch(err => console.log(err));

  return (
    <div class="queriesOverview">
      <h1>Queries Overview</h1>
    </div>
  );
};
export default QueriesOverview;
