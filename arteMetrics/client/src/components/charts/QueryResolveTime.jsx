import React from 'react';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';

const BarGraph = (props) => {
  let output = [];
  let time = [];

  const parse = (data, unit, amount, granularity) => {
    // filtering out times tht match requested time frame
    let timeFrame = moment().subtract(amount, unit);
    if (data === undefined) return;
    let temp = data.allQueries.filter((stat) =>
      moment(stat.start_time).isAfter(timeFrame)
    );

    // sort time i n acsending order
    temp = temp.sort((a, b) => moment(a.start_time) - moment(b.start_time));

    // push values to separate arrays
    for (let i = 0; i < temp.length; i++) {
      output.push(temp[i].duration / 1000000);
      time.push(moment(temp[i].start_time).format('LTS'));
    }
  };

  parse(props.data, props.unit, props.amount, props.granularity);

  let finalData = {
    labels: time,
    datasets: [
      {
        label: `Time in ${props.yaxis}`,
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
        <h5>Query resolve time in past {props.scope}</h5>
      </center>
      <Bar
        data={finalData}
        width={1000}
        height={500}
        options={{
          maintainAspectRatio: true,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false
                },
                ticks: {
                  maxTicksLimit: 16
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
                  labelString: `Resolve time (${props.yaxis})`
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};

export default BarGraph;
