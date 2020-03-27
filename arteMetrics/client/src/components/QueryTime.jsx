//this component renders the overall tracing chart for a specific query
import * as d3 from 'd3';
import React, { useState, useEffect, useRef } from 'react';
import loadingGif from '../assets/loading.gif';

const QueryTime = () => {
  const svgRef = useRef();
  const startOffset = [];
  const resolverDuration = [];
  const paths = [];
  const rootQuery = [];
  const response = [];
  const [startOffSet, setStartOffset] = useState(startOffset);
  const [root, setRoot] = useState(rootQuery);
  const [path, setPath] = useState(paths);
  const [resolver, setResolver] = useState(resolverDuration);
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
      d3.json(`/query/${id}`).then(queries => {
        const {
          id,
          api_key,
          name,
          start_time,
          end_time,
          duration
        } = queries[0];
        //pushing the root query information into rootQuery
        rootQuery.push(id, api_key, name, start_time, end_time, duration);
        const resolvers = queries[0].resolvers;
        resolvers.forEach((info, i) => {
          //pushing resolver information into respective arrays declared above
          startOffset.push(info['startOffset']);
          resolverDuration.push(info['duration']);
          paths.push(info['path']);
        });
        const responseTime = rootQuery[5]- ((startOffSet[startOffSet.length-1]) - resolver[resolver.length-1]);
        const responseOffset = startOffSet[startOffSet.length - 1] + resolver[resolver.length - 1];
        response.push(responseTime, responseOffset);
        resolverDuration.push(response);


        //setting a height and width variable for the svg image
        const width = 1400;
        const height = 1000;

        //creating a svg tag and appending it to svgRef.current
        const svg = d3
          .select(svgRef.current)
          .attr('class', 'svg')
          .attr('width', width)
          .attr('height', height);

        //creating the x-axis with the domain set to 0 - the max duration value from root query and setting the range to fit inside of the actual web page
        const x = d3
          .scaleLinear()
          .domain([0, d3.max(root, d => d / 1000)])
          .range([100, width - 100]);

        //creating an x-axis
        const xAxis = g => {
          g.attr('class', 'x-axis')
            .attr('transform', `translate(0, 30)`)
            .call(d3.axisTop(x));
        };

        svg.append('g').call(xAxis);

        //creating an initial rect element that appends to the svg element created above
        svg
          .append('rect')
          .attr('class', 'background')
          .attr('fill', 'none')
          .attr('width', width)
          .attr('height', height);


        //this renders the bars that display the query data (need to refine svg bars)
        svg
          .selectAll('rect')
          .data(root[5])
          .enter()
          .append('rect')
          .attr('x', d => d)
          .attr('y', (d, i) => (i + 1) * 30)
          .attr('width', d => d)
          .attr('height', 25)
          .attr('class', 'firstbar')
          .data(resolvers)
          .enter()
          .append('rect')
          .attr('x', (d, i) => d['startOffset'] / 1000000)
          .attr('y', (d, i) => (i + 1) * 30)
          .attr('width', (d, i) => {
            if (i === 0) return d['duration'] / 1000000;
            else return d['duration'] / 10000;
          })
          .attr('height', 6)
          .attr('transform', 'translate(100, 10)')
          .attr('fill', 'navy')
          .attr('class', 'bar');

          console.log(resolver.length)
          console.log(resolver)
          svg.selectAll('rect')
          .data(resolver)
          .enter()
          .append('rect')
          .attr('x', (d, i) => d[d.length - 1][1] / 1000000)
          .attr('y', (d, i) =>  d.length * 30)
          .attr('width', (d, i) => d[d.length - 1][0] / 1000)
          .attr('height', 6)
          .attr('transform', 'translate(100, 10)')
          .attr('fill', 'navy')

        //this renders text elements that contain the paths of each query, sticking them next to their respective bars
        svg
          .selectAll('text')
          .data(root[2])
          .enter()
          .append('text')
          .text(d => d)
          .attr('x', 0)
          .attr('y', 0)
          .data(resolvers)
          .enter()
          .append('text')
          .attr('text-anchor', 'end')
          .text(d => d['path'].join('.'))
          //  + ' ' + Math.floor(d["duration"]/1000) + 'µs')
          .attr('x', (d, i) => d['startOffset'] / 1000000 + 90)
          .attr('y', (d, i) => (i + 1) * 30)
          .attr('transform', 'translate(0, 20)')
          .attr('class', 'text');

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
