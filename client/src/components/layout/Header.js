import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../../actions/authActions';

class Header extends Component {
  logout = () => {
    this.props.logoutUser();
  };

  render() {
    const { isAuthenticated, user, loading } = this.props.auth;

    const authLinks = (
      <Fragment>
        <li>Welcome {user.name}</li>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link onClick={this.logout}>Logout</Link>
        </li>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <li>
          <a href="/auth/google">Login with Google</a>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </Fragment>
    );

    const renderLinks = () => {
      if (loading) {
        return ' Loading...';
      }
      if (isAuthenticated) {
        return authLinks;
      }
      return guestLinks;
    };

    return (
      <nav>
        <div className="nav container">
          <Link className="nav-brand" to="/">
            Company Logo
          </Link>
          <ul className="nav-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            {renderLinks()}
          </ul>
        </div>
      </nav>
    );
  }
}

Header.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Header);