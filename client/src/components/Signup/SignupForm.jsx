import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const SignupForm = ({
  handleChange,
  handleSubmit,
  email,
  username,
  password,
  disable,
  error
}) => (
  <form onSubmit={handleSubmit}>
    <div className="row ">
      <div className="input-field col s12">
        <input
          id="username"
          value={username}
          onChange={handleChange}
          name="username"
          type="text"
        />
        <label htmlFor="username">Username</label>
        { error.username ?
          <span className="red-text">{error.username}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12">
        <input
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          type="email"
        />
        <label htmlFor="email">Email Address</label>
        { error.email ?
          <span className="red-text">{error.email}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12 ">
        <input
          id="password"
          name="password"
          value={password}
          onChange={handleChange}
          type="password"
        />
        <label htmlFor="password">Password</label>
        { error.password ?
          <span className="red-text">{error.password}</span>
    : <span />
    }
      </div>
      <div className="input-field col s12 l12">
        <button
          className="
          btn
          home-buttons
          waves-effect
          white-text
          green"
          type="submit"
          disabled={disable}
        >Sign Up
        </button>
        <div className="input-field col s12 l12">
          <Link
            to="/signin"
            className="waves-effect
              home-buttons
              waves-light
              btn
              green"
          >Signin
          </Link>
        </div>
      </div>
    </div>
  </form>
);

SignupForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  disable: PropTypes.bool.isRequired,
  error: PropTypes.objectOf(PropTypes.any).isRequired
};

export default SignupForm;