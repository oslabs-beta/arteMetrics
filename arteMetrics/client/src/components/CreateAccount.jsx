import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const CreateAccount = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { verifyjwt } = props;

  let history = useHistory();

  function createUser(e) {
    e.preventDefault();
    console.log('inside createUser');
    if (password === confirmPassword) {
      fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          query: `mutation {createUser(username: "${username}", password: "${password}"){token}}`
        })
      })
        .then((data) => data.json())
        .then((myJson) => {
          console.log('data back: ', myJson);
          document.cookie = 'token=' + myJson.data.createUser.token;
          verifyjwt();
          history.push('/');
        })
        .catch((err) => console.log(err));
    } else {
      alert('password and confirm password must match');
    }
  }

  function handleUserChange(e) {
    setUsername(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPasswordChange(e) {
    setConfirmPassword(e.target.value);
  }

  return (
    <div class="loginpanel">
      <h2>arteMetrics</h2> <br></br>
      <p>Create Account</p>
      <form onSubmit={createUser}>
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
        <label
          for="confirmPassword"
          translate-context="Password"
          translate
        ></label>
        <input
          type="password"
          id="loginPassword"
          name="password"
          required
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
        />
        <br />
        <input type="submit" id="loginSubmitButton" value="Create Account" />
      </form>
    </div>
  );
};

export default CreateAccount;
