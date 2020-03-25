import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from './QueryTime.jsx';
import Bar from './Bar.jsx';
import LineG from './LineG.jsx';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainContainer = () => {
  let history = useHistory();

  async function verifyjwt() {
    const jwt = await Cookies.get('token');
    console.log('inside else fetch now. this is jwt: ', jwt);

    console.log('hello');

    fetch('testjwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt })
    })
      .then(data => data.json())
      .then(myJson => console.log(myJson))
      .catch(err => console.log(err));
  }

  if (!Cookies.get('token')) {
    history.push('/');
  } else {
    verifyjwt();
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
