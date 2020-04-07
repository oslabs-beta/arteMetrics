import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import QueriesOverNTIme from '../charts/QueriesOverNTime.jsx';

// grab the query id by URL
const urlParams = window.location.search;
const apiKey = urlParams.substr(4);
console.log('LineContainer API KEY, ', apiKey);
const GET_DATA = gql`
  query {
    allQueries(id:"${apiKey}") {
      start_time
    }
  }
`;

const LineContainer = () => {
  const { data, loading, error } = useQuery(GET_DATA);
  if (loading) return <p>Loading ...</p>;
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
            <QueriesOverNTIme
              id="chart"
              scope="Ten Minutes"
              amount={10}
              unit="minutes"
              granularity="minute"
              data={data}
            />
          </div>
        </Panel>
        <Panel>
          <div>
            <QueriesOverNTIme
              id="chart"
              scope="hour"
              amount={60}
              unit="minutes"
              granularity="minute"
              data={data}
            />
          </div>
        </Panel>
        <Panel>
          <QueriesOverNTIme
            id="chart"
            scope="day"
            amount={24}
            unit="hours"
            granularity="hour"
            data={data}
          />
        </Panel>
      </div>
    </Tabs>
  );
};

export default LineContainer;
