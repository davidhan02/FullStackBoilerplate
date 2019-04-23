import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  render() {
    return (
      <main>
        <h3>Login</h3>
        <a href="/auth/google">
          <span>Sign in with Google</span>
        </a>
        <form method="post" action="/api/users/login">
          <input name="email" type="email" placeholder="email" />
          <input name="password" type="password" placeholder="password" />
          <button type="submit">Login</button>
        </form>
        <span>No Account?</span>
        <Link to="/register">Register</Link>
      </main>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(Login);
