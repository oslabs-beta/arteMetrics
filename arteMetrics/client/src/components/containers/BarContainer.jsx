import React, { useState, useEffect } from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import Bar from '../charts/Bar.jsx';

const BarContainer = () => {
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
            <Bar id="chart" />
          </div>
        </Panel>
        <Panel>
          <div>
            <Bar id="chart" />
          </div>
        </Panel>
        <Panel>
          <Bar id="chart" />
        </Panel>
      </div>
    </Tabs>
  );
};

export default BarContainer;
