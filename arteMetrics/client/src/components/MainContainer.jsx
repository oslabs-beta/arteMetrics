import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from './QueryTime.jsx';
import Bar from './Bar.jsx';
import LineG from './LineG.jsx';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';

const MainContainer = () => {
  let history = useHistory();
  let user;

  async function verifyjwt() {
    const jwt = await Cookies.get('token');

    await fetch('testjwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt })
    })
      .then(data => data.json())
      .then(myJson => {
        user = myJson.user;
        return user;
      })
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
          <Tab>24 Hour Timeline</Tab>
          <Tab>Tracing</Tab>
          <Tab>Bar Graph</Tab>
        </div>
        <div className="tab-progress" />
        <Panel>
          <LineG />
        </Panel>
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
      </div>
    </Tabs>
  );
};

export default MainContainer;
