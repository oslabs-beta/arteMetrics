import React from 'react';

import { Link } from 'react-router-dom';

const CreateAccount = () => {
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
        <input type="submit" id="loginSubmitButton" value="Create Account" />
      </form>
    </div>
  );
};

export default CreateAccount;
