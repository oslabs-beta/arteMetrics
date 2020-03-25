import React, { useState, useEffect, useRef } from 'react';
// import { HorizontalBar } from 'react-chartjs-2';
import Data from '../querydata.json';
import { select, scaleLinear, axisRight, axisBottom, scaleBand } from 'd3';
import '../styles/styles.css';

// console.log(Data)
function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 600);
  var seconds = ((millis % 6000) / 1000).toFixed(0);
  return minutes + '.' + (seconds < 10 ? '0' : '') + seconds;
}

const QueryTime = () => {
  const svgRef = useRef();

  const results = [];
  const labels = [];
  const dataMilli = [];

  for (let i in Data) {
    const data = Data[i].duration.toString();
    labels.push(Data.fieldName);
    dataMilli.push(millisToMinutesAndSeconds(Data[i].duration));
  }

  const [data, setData] = useState(dataMilli);
  console.log(data);


  //   const [queryData, setQueryData] = useState({});
  // // console.log(queryData)
  //   const chart = () => {
  //     setQueryData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           data: dataMilli,
  //           backgroundColor: 'rgba(255, 99, 132, 0.5)'
  //         }
  //       ],
  //       options: {
  //         'onClick' : function (evt, item) {
  //           console.log ('legend onClick', evt);
  //           console.log('legd item', item);
  //       }
  //       }
  //     });
  //   };

  // useEffect(() => {
  //   chart();
  // }, []);
  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale = scaleBand()
      .domain(data.map((value, index) => index))
      .range([0, 300])
      .padding(0.5);

    const yScale = scaleLinear()
      .domain([0, 500])
      .range([150, 0]);

    const colorScale = scaleLinear()
      .domain([75, 100, 150])
      .range(['green', 'orange', 'red'])
      .clamp(true);

    const xAxis = axisBottom(xScale).ticks(data.length);
    svg
      .select('.x-axis')
      .style('transform', 'translateY(150px)')
      .call(xAxis);

    const yAxis = axisRight(yScale);
    svg
      .select('.y-axis')
      .style('tranform', 'translateX(300px)')
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', (value, index) => xScale(index))
      .attr('y', -150)
      .attr('width', xScale.bandwidth())
      .attr('fill', colorScale)
      .transition()
      .attr('height', value => 150 - yScale(value));
  }, [data]);

  return (
    // <div>
    //   <HorizontalBar data={queryData} />
    // </div>
    <React.Fragment>
      <svg ref={svgRef} className="fragment-container">
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
};

export default QueryTime;
