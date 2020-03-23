import React, { useState } from 'react';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  function createUser(username, password) {
    console.log('inside fetchGQL');
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        // query: '{allUsers{username}}'
        query: `mutation {createUser(username: "${username}", password: "${password}"){username password}}`
      })
    })
      .then(data => data.json())
      .then(myJson => console.log('data back: ', myJson))
      .catch(err => console.log(err));
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
      {/* <form method="post"> */}
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
      <input
        type="submit"
        id="loginSubmitButton"
        value="Create Account"
        onClick={() => {
          if (password === confirmPassword) {
            createUser(username, password);
          } else {
            alert('password and confirm password must match');
          }
        }}
      />
      {/* </form> */}
    </div>
  );
};

export default CreateAccount;
