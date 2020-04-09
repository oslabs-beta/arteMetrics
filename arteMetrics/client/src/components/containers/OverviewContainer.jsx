import React, { useState, useEffect } from 'react';
import loadingGif from '../../assets/loading.gif';
import Cookies from 'js-cookie';

const QueriesOverview = (props) => {
  // allQueries will contain the JSON object with queries in the last 24hrs
  const [latest, setLatest] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [slowestFive, setSlowestFive] = useState([]);

  // grab the query id by URL
  const urlParams = window.location.search;

  let apiKey = urlParams.substr(4);
  console.log('API KEY', apiKey);
  if (urlParams.length > 20) {
    document.cookie = 'apikey=' + apiKey;
  }
  if (urlParams.length < 20) {
    apiKey = Cookies.get('apikey');
  }

  useEffect(() => {
    // queries array
    const data = props.data.allQueries;

    // filter the results to only show top 5 ('frequent' state)
    const names = data.map((item) => item.name);
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
            topArray.map((item) => {
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

    // grab the slowest queries
    const getSlowestQueries = (data) => {
      // grab unique query names in a Set
      const queries = new Set();
      // console.log(data[0].name);
      for (let i = 0; i < data.length; i++) {
        queries.add(data[i].name);
      }

      // loop through the set and grab durations for each
      const queryDurations = {};
      queries.forEach((query) => {
        // loop through data object and store all durations
        let durations = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].name === query) {
            durations.push(data[i].duration);
          }
        }
        // assign query name and grab the average duration
        queryDurations[query] = Math.floor(
          durations.reduce((previous, current) => (current += previous)) /
            durations.length /
            1000000
        );
      });

      // queries and its avg duration in ms
      let sortable = [];
      for (let query in queryDurations) {
        sortable.push([query, queryDurations[query]]);
      }

      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      const slowestFive = sortable.slice(0, 5);
      const queryWithId = [];

      // grab latest ID's from the slowestFive
      for (let array of slowestFive) {
        let name = array[0];
        let duration = array[1];
        for (let i = data.length - 1; i >= 0; i--) {
          if (data[i].name === name) {
            queryWithId.push([
              name,
              data[i].id,
              duration.toString().concat('ms')
            ]);
            break;
          }
        }
      }
      return queryWithId;
    };
    setSlowestFive(getSlowestQueries(data));
  }, []);

  return (
    <div className="queriesOverview">
      <div className="overviewCard">
        <h3>Queries Overview</h3>
        <h6>By Request Rate</h6>
        <ul>
          {topFive.length ? (
            topFive.map((item, i) => (
              <div key={`top_${[i]}`}>
                <div className="query">
                  <div>
                    <a href={`/metrics?id=${item.id}`}>{item.name}</a>
                  </div>
                  <div className="spacer"></div>
                  <div className="ms">
                    {Math.floor(item.duration / 1000000)}ms
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="gifPos">
              <img className="performanceGif" src={loadingGif} />
            </div>
          )}
        </ul>

        <h6>Slowest Response Time</h6>
        <ul>
          {slowestFive.length ? (
            slowestFive.map((item, i) => (
              <div key={`top_${[i]}`}>
                <div className="query">
                  <div>
                    <a href={`/metrics?id=${item[1]}`}>{item[0]}</a>
                  </div>
                  <div className="spacer"></div>
                  <div className="ms">{item[2]}</div>
                </div>
              </div>
            ))
          ) : (
            <div className="gifPos">
              <img className="performanceGif" src={loadingGif} />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default QueriesOverview;
