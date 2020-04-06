import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

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
          <p>Create an App</p>
          <form onSubmit={createApp}>
            <label for="name" translate-context="Label" translate></label>
            <input
              type="text"
              id="appName"
              name="appname"
              required
              placeholder="App name"
              onChange={handleAppChange}
            />
            <br />
            <input type="submit" id="loginSubmitButton" value="Create App" />
          </form>
        </div>
      ) : (
        <div className="apiCard">
          Save this API Key for use!!!!
          <br />
          {api}
        </div>
      )}
    </div>
  );
};

export default CreateApp;
