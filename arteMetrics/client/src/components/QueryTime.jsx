import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Data from '../querydata.json';

// console.log(Data)

const QueryTime = () => {
  const results = [];
  const labels = [];

  for (let i in Data) {
    results.push(Data[i].duration.toString());
    labels.push(i.toString());
  }
  // console.log(results);

  const [queryData, setQueryData] = useState({});

  const chart = () => {
    setQueryData({
      labels: labels,
      datasets: [
        {
          data: results
        }
      ]
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <Bar data={queryData} />
    </div>
  );
};

export default QueryTime;
