import React, { useState } from 'react';

import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [count, setCount] = useState(0);
  const [post, setPost] = useState(false);

  function fetchGQL() {
    console.log('inside fetchGQL');
    fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        hi: 'bye'
      })
    })
      .then(data => data.json())
      .then(myJson => console.log(myJson));
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
        onClick={() => fetchGQL()}
      />
      <p>current Count: {count}</p>
      {/* </form> */}
    </div>
  );
};

export default CreateAccount;
