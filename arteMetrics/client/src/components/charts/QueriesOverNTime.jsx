import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

const QueriesOverNTIme = (props) => {
  let output = [];

  const parse = (data, unit, amount, granularity) => {
    // filtering out times tht match requested time frame
    let timeFrame = moment().subtract(amount, unit);
    if (data === undefined) return;
    let temp = data.allQueries.filter((stat) =>
      moment(stat.start_time).isAfter(timeFrame)
    );

    // rounding down times array to nearest hour/minute depending on granularity
    temp = temp.map((item) => {
      return moment(item.start_time).startOf(granularity).format('LLL');
    });

    // object with counts of queries per hour/minute
    temp = temp.reduce(function (prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});

    // chart.js readable data object {x: time, y: count}
    for (let [key, value] of Object.entries(temp)) {
      output.push({ x: key, y: value });
    }
  };

  parse(props.data, props.unit, props.amount, props.granularity);

  let finalData = {
    datasets: [
      {
        label: `Queries per ${props.granularity}`,
        fill: false,
        lineTension: 0.001,
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
        data: output
      }
    ]
  };

  return (
    <div>
      <center>
        <h5>Queries in the last {props.scope}</h5>
      </center>
      <Line
        data={finalData}
        width={1000}
        height={500}
        options={{
          responsive: true,

          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                type: 'time',
                time: {
                  format: 'LLL',
                  tooltipFormat: 'LLL',
                  unit: props.granularity,
                  unitStepSize: 1,
                  displayFormats: {
                    day: 'LLL'
                  }
                },
                scaleLabel: {
                  display: true,
                  labelString: 'Time'
                }
              }
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: 'number of queries'
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};
export default QueriesOverNTIme;
