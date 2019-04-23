import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from '../common/FormField';

const loginFields = [
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' }
];

class Login extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  componentDidUpdate(prevProps) {
    const { isAuthenticated } = this.props.auth;
    isAuthenticated && this.props.history.push('/dashboard');
  }

  renderFields() {
    return loginFields.map(({ label, name }) => {
      return (
        <Field
          key={name}
          type={name}
          name={name}
          label={label}
          placeholder={label}
          component={FormField}
        />
      );
    });
  }

  render() {
    return (
      <main>
        <h3>Login</h3>
        <a href="/auth/google">
          <span>Sign in with Google</span>
        </a>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
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

const formWrap = reduxForm({
  form: 'loginForm'
})(Login);

export default connect(mapStateToProps)(formWrap);
