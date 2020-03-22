import React, { useState, useEffect } from 'react';
import QueryTime from './QueryTime.jsx';
import TopNavBar from './TopNavBar.jsx';

const MainContainer = () => {
  return (
    <section id="chart">
      <QueryTime />
    </section>
  );
};

export default MainContainer;
