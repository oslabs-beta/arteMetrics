import React, { Component } from 'react';
import Data from '../querydata.json';
import D3Chart from './D3Chart.jsx';

const MetricsContainer = () => {
  return (
    <div id='chart'>
      <D3Chart />
    </div>
  );
}

export default MetricsContainer