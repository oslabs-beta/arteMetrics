import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from '../QueryTime.jsx';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import BarContainer from './BarContainer.jsx';
import LineContainer from './LineContainer.jsx';
import OverviewContainer from './OverviewContainer.jsx';

const MainContainer = props => {
  let history = useHistory();
  let user;
  const { loggedin } = props;
  console.log('loggedin in maincontainer: ', loggedin);

  // async function verifyjwt() {
  //   const jwt = await Cookies.get('token');

  //   await fetch('testjwt', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ token: jwt })
  //   })
  //     .then(data => data.json())
  //     .then(myJson => {
  //       user = myJson.user;
  //       return user;
  //     })
  //     .catch(err => console.log(err));
  // }

  // if (!loggedin) {
  //   history.push('/');
  // }

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
      <div className="mainContainer">
        <div className="tab-list">
          <Tab>24 Hour Timeline</Tab>
          <Tab>Tracing</Tab>
          <Tab>Bar Graph</Tab>
          <Tab>Overview</Tab>
        </div>
        <div className="tab-progress" />
        <Panel>
          <LineContainer />
        </Panel>
        <Panel>
          <div>
            <QueryTime id="chart" />
          </div>
        </Panel>
        <Panel>
          <div>
            <BarContainer />
          </div>
        </Panel>
        <Panel>
          <OverviewContainer />
        </Panel>
      </div>
    </Tabs>
  );
};

export default MainContainer;
