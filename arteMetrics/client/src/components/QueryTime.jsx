//this component renders the overall tracing chart for a specific query
import * as d3 from 'd3';
import React, { useState, useEffect, useRef } from 'react';
import loadingGif from '../assets/loading.gif';

const QueryTime = () => {
  const svgRef = useRef();
  // const startOffset = [];
  // const resolverDuration = [];
  // const paths = [];
  const rootQuery = [];
  // const response = [];
  // const [startOffSet, setStartOffset] = useState(startOffset);
  const [root, setRoot] = useState(rootQuery);
  // const [path, setPath] = useState(paths);
  // const [resolver, setResolver] = useState(resolverDuration);
  const [queryData, setQueryData] = useState([]);

  // grab the query id by URL
  const urlParams = window.location.search;
  const id = urlParams.substr(4);

  useEffect(() => {
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // query for dummy apikey account
        query: `query {
          query(id: ${id}) {
            id
            name
            start_time
            end_time
            duration
            resolvers
          }
        }`
      })
    })
      .then(data => data.json())
      .then(myJson => {
        // queries array
        const data = myJson.data.query;
        console.log('data back: ', data);
        setQueryData(data);
      })
      .catch(err => console.log(err));
    if (id.length > 0) {
      //making a fetch request to grab a query based on it's id to SQL database
      //id 1603 ${id}
      d3.json(`/query/${id}`).then(queries => {
        const {
          id,
          api_key,
          name,
          start_time,
          end_time,
          duration,
          resolvers
        } = queries[0];

        //pushing root query information into array
        rootQuery.push({
          id,
          api_key,
          name,
          start_time,
          end_time,
          duration,
          resolvers
        });

        //calculating the response startOffset time
        const responseOffset =
          resolvers[resolvers.length - 1]['startOffset'] +
          resolvers[resolvers.length - 1]['duration'];

        //calculating the response duration time
        const responseDuration = duration - responseOffset;

        //calculating the initial request duration time
        let counter = 0;
        resolvers.forEach(val => {
          return (counter += val['duration']);
        });
        let requestDuration = duration - counter - responseDuration;

        //unshifting the root query's id, name, and duration into array of resolvers
        resolvers.unshift({
          id,
          name,
          path: 'Request',
          duration: requestDuration
        });

        //pushing the response's start_offset time and duration time into array of resolvers
        resolvers.push({
          startOffset: responseOffset,
          duration: responseDuration,
          path: 'Response'
        });
        console.log('resolvers', resolvers);

        const margin = { top: 10, right: 10, bottom: 10, left: 10 };

        //setting a height and width variable for the svg image
        const width = 1400 - margin.left - margin.right;
        const height = 1000 - margin.top - margin.bottom;

        // console.log(queries);
        //creating a svg tag and appending it to svgRef.current
        const svg = d3
          .select(svgRef.current)
          .attr('class', 'svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
          .append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

        //creating the x-axis with the domain set to 0 - the max duration value from root query and setting the range to fit inside of the actual web page
        const x = d3
          .scaleLinear()
          .domain([0, d3.max(root, d => d['duration'] / 1000000)]) //change this line
          .range([100, width - 100]);

        //creating an x-axis
        const xAxis = g => {
          g.attr('class', 'x-axis')
            .attr('transform', `translate(0, 30)`)
            .call(d3.axisTop(x));
        };
        svg
          .append('g')
          .transition(1000)
          .call(xAxis);

        //this renders the bars that display the query data (need to refine svg bars)
        const rects = svg.selectAll('rect').data(resolvers);

        rects
          .enter()
          .append('rect')
          .transition(1000)
          .attr('x', (d, i) => {
            if (i === 0) return 0;
            else return d['startOffset'] / 1000000;
          })
          .attr('y', (d, i) => (i + 1) * 30)
          .attr('width', (d, i) => {
            //first element in resolvers dataset is always the initial request information
            if (i === 0 || i === 1) return d['duration'] / 1000000;
            //if resolver duration time is less than 1,000,000 nanoseconds, set the bar to 1.5 to make it visible
            else if (d['duration'] < 100000) return 1.5;
            else return d['duration'] / 100000;
          })
          .attr('height', 6)
          .attr('transform', 'translate(100, 10)')
          .attr('fill', 'navy')
          .attr('class', 'bar');

        const texts = svg.selectAll('.svg').data(resolvers);

        texts
          .enter()
          .append('text')
          .transition(1000)
          .attr('text-anchor', 'end')
          .attr('fill', 'black')
          .attr('x', (d, i) => {
            if (i === 0) return 90;
            else return d['startOffset'] / 1000000 + 90;
          })
          .attr('y', (d, i) => (i + 1) * 30)
          .attr('transform', 'translate(0, 20)')
          .attr('class', 'text')
          .text(d =>
            Array.isArray(d['path']) ? d['path'].join('.') : d['path']
          );

        //label for x-axis
        svg
          .append('text')
          .attr('x', width / 2)
          .attr('y', 8)
          .attr('text-anchor', 'middle')
          .text('Tracing in milliseconds');
        // svg
        //   .selectAll('text')
        //   .data(resolvers)
        //   .enter()
        //   .append('text')
        //   .attr('text-anchor', 'end')
        //   .text((d, i) => {
        //     // console.log(d['path']);
        //     // if (i === 0) return 'Request: ' + d['name'];
        //     // else if (i === d.length - 1) return `Response`;
        //     // else return d['path'].join('.');
        //   })
        //   .attr('x', (d, i) => {
        //     // //the first bar should start at x-coordinate 0
        //     // if (i === 0) return 0;
        //     // //the second bar (first resolver) should start at this x-coordinate
        //     // else if (i === 1) return d['startOffset'] / 100000 + 90;
        //     // //the last bar should start at x-coordinate equal to last bar's response start_offset
        //     // else if (i === d.length - 1)
        //     //   return d['responseOffset'] / 1000000 + 90;
        //     // //every other resolver should start at this x-coordinate
        //     // else return d['startOffset'] / 1000000 + 90;
        //   })
        //   .attr('y', (d, i) => (i + 1) * 30)
        //   .attr('transform', 'translate(0, 20)')
        //   .attr('class', 'text');

        //this renders text elements that contain the paths of each query, sticking them next to their respective bars
        // svg
        //   .selectAll('text')
        //   .data(root[2])
        //   .enter()
        //   .append('text')
        //   .text(d => d)
        //   .attr('x', 0)
        //   .attr('y', 0)
        //   .data(resolvers)
        //   .enter()
        //   .append('text')
        //   .attr('text-anchor', 'end')
        //   .text(d => d['path'].join('.'))
        //   //  + ' ' + Math.floor(d["duration"]/1000) + 'µs')
        //   .attr('x', (d, i) => d['startOffset'] / 1000000 + 90)
        //   .attr('y', (d, i) => (i + 1) * 30)
        //   .attr('transform', 'translate(0, 20)')
        //   .attr('class', 'text');

        // svg.selectAll('text')
        //     .data(resolvers)
        //     .enter()
        //     .append('text')
        //     .attr('text-anchor', 'start')
        //     .text((d) => `d["duration"]/1000 µs`)
        //     .attr('x', (d, i) => (d["startOffset"] / 1000000) + 100)
        //     .attr('y', (d, i) => (i + 1) * 30)
        //     .attr('transform', 'translate(0, 20)')
        //     .attr('class', 'text');
      });
    }
  }, []);

  return (
    <div className="chartTab">
      <React.Fragment>
        <h4>Operation: {queryData.name}</h4>
        {queryData.start_time && id.length > 0 ? (
          <h6>Performed at: {new Date(queryData.start_time).toString()}</h6>
        ) : (
          <div className="gifPos">
            <img className="loadingGif" src={loadingGif} />
          </div>
        )}
        <svg ref={svgRef}></svg>
      </React.Fragment>
    </div>
  );
};

export default QueryTime;
