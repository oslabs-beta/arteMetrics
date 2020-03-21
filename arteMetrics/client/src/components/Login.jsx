import React from 'react';

import { form } from 'react-bootstrap';

const Login = () => {
  return (
    <div class="loginpanel">
      <form>
        <label for="username" translate-context="Label" translate></label>
        <input
          type="text"
          id="loginusername"
          name="username"
          required
          placeholder="username"
        />
        <br />
        <label for="password" translate-context="Password" translate></label>
        <input
          type="password"
          id="loginpassword"
          name="password"
          required
          placeholder="password"
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
