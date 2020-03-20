import React, { useState, useEffect } from 'react';
// import NavBar from './components/NavBar';
import QueryTime from './QueryTime.jsx';
import NavBar from './NaveBar.jsx'

const MainContainer = () => {
  return (
    <div>
      <NavBar />
      <div>
        <QueryTime />
      </div>
    </div>
  );
};

export default MainContainer;
