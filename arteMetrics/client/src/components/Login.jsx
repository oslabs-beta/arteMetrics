import React, { useState } from 'react';

import { Link, useHistory, Router } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  let history = useHistory();

  function handleUserChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function login(e) {
    e.preventDefault();
    console.log('inside login');
    console.log(username);
    console.log(password);

    fetch('login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(data => data.json())
      .then(myJson => {
        console.log(myJson);
        if (myJson.success) {
          document.cookie = 'token=' + myJson.token;
          history.push('/metrics');
        }
      })
      .catch(err => console.log(err));
  }

  return (
    <div class="loginpanel">
      <form onSubmit={login}>
        <label for="username" translate-context="Label" translate></label>
        <input
          type="text"
          id="loginUsername"
          name="username"
          required
          placeholder="Username"
          onChange={handleUserChange}
        />
        <br />
        <label for="password" translate-context="Password" translate></label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          required
          placeholder="Password"
          onChange={handlePasswordChange}
        />
        <br />
        <input type="submit" id="loginSubmitButton" value="LOGIN" />
      </form>
      <Link to="/createaccount">
        <button to="/createaccount" id="createAccountButton">
          Create Account
        </button>
      </Link>
    </div>
  );
};

export default Login;
