import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';

import Bar from '../charts/QueryResolveTime.jsx';

const BarContainer = (props) => {
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
            <Bar
              id="chart"
              data={props.data}
              scope="ten minutes"
              amount={10}
              unit="minutes"
              granularity="minute"
              yaxis="ms"
            />
          </div>
        </Panel>
        <Panel>
          <div>
            <Bar
              id="chart"
              data={props.data}
              scope="hour"
              amount={60}
              unit="minutes"
              granularity="minute"
              yaxis="ms"
            />
          </div>
        </Panel>
        <Panel>
          <Bar
            id="chart"
            data={props.data}
            scope="day"
            amount={24}
            unit="hours"
            granularity="hour"
            yaxis="ms"
          />
        </Panel>
      </div>
    </Tabs>
  );
};

export default BarContainer;
