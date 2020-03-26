import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import loadingGif from '../../assets/loading.gif';

const LineG = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    createGraph();
  }, []);

  async function createGraph() {
    console.log('inside create graph');
    let json;
    await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
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
      .then(myJson => (json = myJson.data.allQueries))
      .catch(err => console.log(err));

    let hours = json.map(item => {
      return moment(item.start_time, 'YYYY-MM-DDTHH:mm:ss.SSS').format('HH');
    });

    let plot = [];
    for (let i = 0; i < 25; i++) {
      let count = 0;
      for (let j = 0; j < hours.length; j++) {
        if (i === parseInt(hours[j], 10)) {
          count++;
        }
      }
      plot.push(count);
    }

    setData({
      labels: [
        '00:00',
        '01:00',
        '02:00',
        '03:00',
        '04:00',
        '05:00',
        '06:00',
        '07:00',
        '08:00',
        '09:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00',
        '24:00'
      ],
      datasets: [
        {
          label: 'Queries per Hour',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: plot
        }
      ]
    });
  }
  // console.log(plot, hours);

  return (
    <div>
      <h5>Queries Over Time</h5>
      {Object.keys(data).length ? (
        <Line data={data} width={1000} height={500} />
      ) : (
        <div className="gifPos">
          <img className="loadingGif" src={loadingGif} />
        </div>
      )}
    </div>
  );
};
export default LineG;
