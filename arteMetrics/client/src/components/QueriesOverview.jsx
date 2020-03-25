import React, { useState, useEffect } from 'react';

const QueriesOverview = () => {
  const [allQueries, setAllQueries] = useState([]);
  const [topFive, setTopFive] = useState([]);

  useEffect(() => {
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
      .then(myJson => {
        // queries array
        const data = myJson.data.allQueries;
        console.log('data back: ', data);
        setAllQueries(data);
        // filter the results to only show top 5 ('frequent' state)
        const names = data.map(item => item.name);
        const counter = {};
        for (let i = 0; i < names.length; i++) {
          if (counter[names[i]]) {
            counter[names[i]] += 1;
          } else counter[names[i]] = 1;
        }
        const sortable = [];
        for (let names in counter) {
          sortable.push([names, counter[names]]);
        }
        const result = sortable.sort((a, b) => b[1] - a[1]);
        const topFive = result.slice(0, 5);

        const topObj = [];

        // grab latest objects based on top5
        for (let i = 0; i < topFive.length; i++) {
          let top = topFive[i][0];

          // get the array of the same query name
          let topArray = [];
          for (let item in data) {
            if (data[item].name === top) {
              topArray.push(data[item]);
            }
          }
          // grab the latest date of that query
          for (let i in topArray) {
            let d1 = new Date(topArray[i].start_time);
            let d2 = new Date(
              Math.max.apply(
                null,
                topArray.map(item => {
                  return new Date(item.start_time);
                })
              )
            );
            if (d1.getTime() === d2.getTime()) {
              topObj.push(topArray[i]);
            }
          }
        }
        setTopFive(topObj);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div class="queriesOverview">
      <h1>Queries Overview</h1>
      <h3>Request Rate</h3>
      <ul>
        {topFive.map((item, i) => (
          <li key={`top_${[i]}`}>
            <a href={`/query?id=${item.id}`}>{item.name}</a>
            .......................
            {Math.floor(item.duration / 1000000)}ms
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueriesOverview;
