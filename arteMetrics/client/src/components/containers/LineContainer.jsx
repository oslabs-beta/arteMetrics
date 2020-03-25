import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import Line from '../charts/Line.jsx';

const LineContainer = () => {
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
      <div className="side-tabs">
        <div className="side-tab-list">
          <Tab>10 Minutes</Tab>
          <Tab>1 Hour</Tab>
          <Tab>1 Day</Tab>
        </div>
        <Panel>
          <div>
            <Line id="chart" />
          </div>
        </Panel>
        <Panel>
          <div>
            <Line id="chart" />
          </div>
        </Panel>
        <Panel>
          <Line id="chart" />
        </Panel>
      </div>
    </Tabs>
  );
};

export default LineContainer;
