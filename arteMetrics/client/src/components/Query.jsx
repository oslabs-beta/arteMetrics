import React, { useState, useEffect } from 'react';

const Query = () => {
  // query data will contain the specific query that has tracing data
  const [queryData, setQueryData] = useState([]);
  const urlParams = window.location.search;
  const id = urlParams.substr(4);

  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // query for dummy apikey account
        query: `query {
          query(id: ${id}) {
            id
            name
            duration
            start_time
            end_time
            resolvers
          }
        }`
      })
    })
      .then(data => data.json())
      .then(myJson => {
        // queries array
        const data = myJson.data.query;
        console.log('data back: ', data);
        setQueryData(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div class="Query">
      <h1>Query</h1>
      <h3>Performed at: {new Date(queryData.start_time).toString()}</h3>
      <h4>Name: {queryData.name}</h4>
      <ul>
        <li>Duration: {Math.floor(queryData.duration / 1000000)}ms</li>
        <li>Resolvers: {JSON.stringify(queryData.resolvers)}</li>
      </ul>
    </div>
  );
};

export default Query;
