import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from './QueryTime.jsx';
import Bar from './Bar.jsx';
import LineG from './LineG.jsx';
import TopNavBar from './TopNavBar.jsx';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainContainer = () => {
  let history = useHistory();
  if (!Cookies.get('token')) {
    history.push('/');
  }
  const cn = (...args) => args.filter(Boolean).join(' ');

  const Tab = ({ children }) => {
    const { isActive, onClick } = useTabState();
    return (
      <button className={cn('tab', isActive && 'active')} onClick={onClick}>
        {children}
      </button>
    );
  };
  return (
    <Tabs>
      <div className="tabs">
        <div className="tab-list">
          <Tab>Tracing</Tab>
          <Tab>Bar Graph</Tab>
          <Tab>24 Hour Timeline</Tab>
        </div>
        <div className="tab-progress" />
        <Panel>
          <div>
            <QueryTime id="chart" />
          </div>
        </Panel>
        <Panel>
          <div>
            <Bar id="chart" />
          </div>
        </Panel>
        <Panel>
          <LineG />
        </Panel>
      </div>
    </Tabs>
  );
};

export default MainContainer;
