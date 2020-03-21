import React from 'react';

import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div class="loginpanel">
      <form>
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
