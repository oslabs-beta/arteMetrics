import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

const CreateApp = (props) => {
  const [app, setApp] = useState('');
  const [api, setAPI] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
    // fetch current user's name and ID
    const jwt = Cookies.get('token');
    fetch('testjwt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: jwt })
    })
      .then((data) => data.json())
      .then((myJson) => {
        setUser(myJson.user);
      })
      .catch((err) => console.log(err));
  });

  function createApp(e) {
    e.preventDefault();
    console.log(app);
    // transaction to add app name and receive an API key to display after 'create'

    fetch('/createApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        app_name: app,
        user: user
      })
    })
      .then((data) => data.json())
      .then((myJson) => {
        //set API KEY
        setAPI(myJson);
      });
  }

  function handleAppChange(e) {
    setApp(e.target.value);
  }

  return (
    <div className="apppanel">
      {!api ? (
        <div className="appform">
          <h3>Create an App</h3>
          <form onSubmit={createApp}>
            <p></p>
            To get started, please enter the name of your app:
            <label for="name" translate-context="Label" translate></label>
            <p></p>
            <input
              type="text"
              id="appName"
              name="appname"
              required
              placeholder={`${user}'s cool new app`}
              onChange={handleAppChange}
            />
            <br />
            <p></p>
            <input
              className="btn btn-info"
              type="submit"
              id="loginSubmitButton"
              value="OK"
            />
          </form>
        </div>
      ) : (
        <div className="apiCard">
          <h4>Save this API Key to use with your app</h4>
          <div className="appdescription">
            <p>
              Each app that you create is assigned with a specific API Key. To
              view metrics, copy and paste this API Key to your .env file inside
              your Apollo Server.
            </p>
          </div>
          <br />
          <div className="warning">
            WARNING: You are only issued this key once so put it in a safe
            place!!!
          </div>
          <p></p>
          <div className="api">{api}</div>
          <br />
          <Link to={`/metrics?id=${api}`}>
            <button type="button" className="btn btn-info">
              OK
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CreateApp;
