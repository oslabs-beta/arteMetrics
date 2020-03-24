import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from './QueryTime.jsx';
import Bar from './Bar.jsx';
import TopNavBar from './TopNavBar.jsx';

const cn = (...args) => args.filter(Boolean).join(' ');

const Tab = ({ children }) => {
  const { isActive, onClick } = useTabState();

  return (
    <button className={cn('tab', isActive && 'active')} onClick={onClick}>
      {children}
    </button>
  );
};

export default () => (
  <Tabs>
    <div className="tabs">
      <div className="tab-list">
        <Tab>Tracing</Tab>
        <Tab>Bar Graph</Tab>
        <Tab>More Tracing</Tab>
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
        <p>other graph</p>
      </Panel>
    </div>
  </Tabs>
);
