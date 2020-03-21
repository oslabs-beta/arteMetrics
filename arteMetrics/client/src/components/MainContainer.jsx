import React, { useState, useEffect } from 'react';
import QueryTime from './QueryTime.jsx';
import TopNavBar from './TopNavBar.jsx';

const MainContainer = () => {
  return (
    <section id="chart">
      <div>
        <TopNavBar />
        <QueryTime />
        <QueryTime />
      </div>
    </section>
  );
};

export default MainContainer;
