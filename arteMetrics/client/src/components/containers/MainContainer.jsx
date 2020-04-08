import React from 'react';
import { Tabs, useTabState, Panel } from '@bumaga/tabs';
import QueryTime from '../QueryTime.jsx';
import { useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import BarContainer from './BarContainer.jsx';
import LineContainer from './LineContainer.jsx';
import OverviewContainer from './OverviewContainer.jsx';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import loadingGif from '../../assets/loading.gif';


// grab the query id by URL
const urlParams = window.location.search;
let apiKey = urlParams.substr(4);
if (urlParams.length > 20) {
  document.cookie = 'apikey=' + apiKey;
}

const id = urlParams.substr(4);
apiKey = Cookies.get('apikey');

const GET_DATA = gql`
  query {
    allQueries(id:"${apiKey}") {
      id
      name
      duration
      start_time
      end_time
      resolvers
    }
  }
`;

const MainContainer = (props) => {
  // get data for all charts
  const { data, loading, error } = useQuery(GET_DATA);
  if (loading)
    return (
      <div className="mainContainer">
        <h2>Loading arteMetrics...</h2>
        <div className="gifPos">
          <img className="loadingGif" src={loadingGif} />
        </div>
      </div>
    );
  if (error) return <p>Error fetching data</p>;

  // let history = useHistory();
  // let user;
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
        {id.length > 0 && id.length < 16 ? (
          <div className="tab-list">
            <Tab>Tracing</Tab>
            <Tab>Queries Over Time</Tab>
            <Tab>Performance</Tab>
            <Tab>Bar Graph</Tab>
          </div>
        ) : (
          <div className="tab-list">
            <Tab>Queries Over Time</Tab>
            <Tab>Performance</Tab>
            <Tab>Bar Graph</Tab>
          </div>
        )}

        {id.length > 0 && id.length < 16 ? (
          <div>
            <div className="tab-progress" />
            <Panel>
              <div>
                <QueryTime id="chart" data={data} />
              </div>
            </Panel>
            <Panel>
              <LineContainer data={data} />
            </Panel>
            <Panel>
              <OverviewContainer data={data} />
            </Panel>
            <Panel>
              <div>
                <BarContainer data={data} />
              </div>
            </Panel>
          </div>
        ) : (
          <div>
            <div className="tab-progress" />
            <Panel>
              <LineContainer data={data} />
            </Panel>
            <Panel>
              <OverviewContainer data={data} />
            </Panel>
            <Panel>
              <div>
                <BarContainer data={data} />
              </div>
            </Panel>
          </div>
        )}
      </div>
    </Tabs>
  );
};

export default MainContainer;
