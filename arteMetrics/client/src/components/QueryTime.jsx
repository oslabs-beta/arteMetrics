import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Data from '../querydata.json';
import TopNavBar from './TopNavBar.jsx';


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
          data: results,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        }
      ]
    });
  };

  useEffect(() => {
    chart();
  }, []);

  return (
    <div>
      <TopNavBar />
      <Bar data={queryData} />
    </div>
  );
};

export default QueryTime;
