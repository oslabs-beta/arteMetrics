import React, { useState } from 'react';

const CreateAccount = () => {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(false);

  function fetchGQL(username, password) {
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
      />
      <br />
      <label for="password" translate-context="Password" translate></label>
      <input
        type="password"
        id="loginPassword"
        name="password"
        required
        placeholder="Password"
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
      />
      <br />
      <input
        type="submit"
        id="loginSubmitButton"
        value="Create Account"
        // onClick={() => setCount(count + 1)}
        onClick={() => fetchGQL('testmutation1', 'password')}
      />
      <p>current Count: {count}</p>
      {/* </form> */}
    </div>
  );
};

export default CreateAccount;
