import React, { useState } from 'react';

const CreateApp = (props) => {
  const [app, setApp] = useState('');
  const [api, setAPI] = useState('');

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
        app_name: app
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
