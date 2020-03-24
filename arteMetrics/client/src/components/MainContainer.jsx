import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import QueryTime from './QueryTime.jsx';

const MainContainer = () => {
  let history = useHistory();
  if (!Cookies.get('token')) {
    history.push('/');
  }
  return (
    <section id="chart">
      <QueryTime />
    </section>
  );
};

export default MainContainer;
