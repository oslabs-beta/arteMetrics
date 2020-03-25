// import * as d3 from 'd3';
// import React, { useState, useEffect, useRef } from 'react';
// import Data from '../querydata.json';
// import TimelinesChart from 'timelines-chart';

// const queryChart = TimelinesChart();

// const D3Chart = () => {
//   const svgRef = useRef();
//   const startOffset = [];
//   const resolverDuration = [];
//   const paths = [];
//   const rootQuery = [];
//   const [startOffSet, setStartOffset] = useState(startOffset);
//   const [root, setRoot] = useState(rootQuery);
//   const [path, setPath] = useState(paths);
//   const [resolver, setResolver] = useState(resolverDuration);

//   d3.json('/query/345').then(queries => {
//     const { id, api_key, name, start_time, end_time, duration } = queries[0];
//     console.log(rootQuery);
//     rootQuery.push(id, api_key, name, start_time, end_time, duration);
//     const resolvers = queries[0].resolvers;
//     // console.log(resolvers);
//     resolvers.forEach((info, i) => {
//       startOffset.push(info['startOffset']);
//       resolverDuration.push(info['duration']);
//       paths.push(info['path']);
//     });

//     const width = 1400;
//     const height = 465;
//     const x = d3
//       .scaleLinear()
//       .domain([0, d3.max(root, d => d)])
//       .range([150, width]);
//     const xAxis = g => {
//       g.attr('class', 'x-axis')
//         .attr('transform', `translate(0, 30)`)
//         .call(d3.axisTop(x));
//     };

//     const svg = d3
//       .select(svgRef.current)
//       .attr('width', width)
//       .attr('height', height);

//     svg
//       .append('rect')
//       .attr('class', 'background')
//       .attr('fill', 'none')
//       .attr('width', width)
//       .attr('height', height);
//     svg.append('g').call(xAxis);
//     // svg.append('g').call(yAxis);

//     // svg.selectAll('rect').data(root[5]).enter().append('rect').attr('x', 0).attr('y', 0).attr('width', (d, i) => d / 1000).attr('height', 25).attr('transform', 'translate(150, 30)').attr('fill', 'navy')

//     const firstQuery = resolver[0] / 1000000;
//     // console.log(firstQuery)

//     // svg.selectAll('rect').data(firstQuery).enter().append('rect').attr('x', 0).attr('y', 0).attr('width', (d) => d).attr('height', 25).attr('transform', 'translate(150, 10)').attr('fill', 'navy').attr('class', 'bar');

//     //this renders the bars
//     svg
//       .selectAll('rect')
//       .data(root[5])
//       .enter()
//       .append('rect')
//       .attr('x', 0)
//       .attr('y', 0)
//       .attr('width', d => d)
//       .attr('height', 25)
//       .data(resolver)
//       .enter()
//       .append('rect')
//       .attr('x', 0)
//       .attr('y', (d, i) => (i + 1) * 30)
//       .attr('width', (d, i) => d / 1000)
//       .attr('height', 25)
//       .attr('transform', 'translate(150, 10)')
//       .attr('fill', 'navy')
//       .attr('class', 'bar');

//     //this renders the path's of each bar
//     svg
//       .selectAll('text')
//       .data(root[2])
//       .enter()
//       .append('text')
//       .text(d => d)
//       .attr('x', 1)
//       .attr('y', 0)
//       .data(path)
//       .enter()
//       .append('text')
//       .text(d => d)
//       .attr('x', 0)
//       .attr('y', (d, i) => (i + 1) * 30)
//       .attr('transform', 'translate(0, 30)');
//   });

//   //   console.log('this is data', data)
//   // const xAxis = d3.axisBottom(xScale).ticks(data.length);
//   // svg
//   //   .select('.x-axis')
//   //   .style('transform', 'translateY(150px)')
//   //   .call(xAxis);

//   // const yAxis = d3.axisRight(yScale);
//   // svg
//   //   .select('.y-axis')
//   //   .style('tranform', 'translateX(500px)')
//   //   .call(yAxis);

//   //     svg
//   //       .selectAll('.bar')
//   //       .data(data)
//   //       .join('rect')
//   //       .attr('class', 'bar')
//   //       .style('transform', 'scale(1, -1)')
//   //       .attr('x', (value, index) => xScale(index))
//   //       .attr('y', -150)
//   //       .attr('width', xScale.bandwidth())
//   //       .transition()
//   //       .attr('height', value => 150 - yScale(value));
//   //   }, [data]);

//   // <div>
//   //   <QueryTime  />
//   // </div>

//   return (
//     <React.Fragment>
//       <svg ref={svgRef}></svg>
//     </React.Fragment>
//   );
//   //   for (let i in data) {
//   //     startOffset.push(Data[i].duration.toString());
//   //     paths.push(i.toString());
//   //   }

//   // const svg = d3
//   //   .select(props)
//   //   .append('svg')
//   //   .attr('width', 500)
//   //   .attr('height', 100)
//   //   .attr('background-color', 'red');
// };

// export default D3Chart;
