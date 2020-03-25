import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import Data from '../querydata.json';
import { select, scaleLinear, axisRight, axisBottom, scaleBand } from 'd3';
import '../styles/styles.css';

// console.log(Data)

const QueryTime = () => {
  const svgRef = useRef();

  const results = [];
  const labels = [];

  for (let i in Data) {
    results.push(Data[i].duration.toString());
    labels.push(i.toString());
  }

  const [data, setData] = useState(results);
  // console.log(results);

  // const [queryData, setQueryData] = useState({});

  // const chart = () => {
  //   setQueryData({
  //     labels: labels,
  //     datasets: [
  //       {
  //         data: results,
  //         backgroundColor: 'rgba(255, 99, 132, 0.5)'
  //       }
  //     ]
  //   });
  // };

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
      .domain([0, 300])
      .range([150, 0]);

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
      .transition()
      .attr('height', value => 150 - yScale(value));
  }, [data]);

  // <div>
  //   <QueryTime  />
  // </div>

  return (
    <React.Fragment className="fragment-container">
      <svg ref={svgRef}>
        <g className="x-axis" />
        <g className="y-axis" />
      </svg>
    </React.Fragment>
  );
};

export default QueryTime;
