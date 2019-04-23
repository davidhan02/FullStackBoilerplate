import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from '../common/FormField';
import { submitLogin } from '../../actions/authActions';

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

  onSubmit = formValues => {
    this.props.submitLogin(formValues, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <main>
        <h3>Login</h3>
        <a href="/auth/google">
          <span>Sign in with Google</span>
        </a>
        <form onSubmit={handleSubmit(this.onSubmit)}>
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
  auth: PropTypes.object.isRequired,
  submitLogin: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const validate = formValues => {
  const errors = {};

  loginFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'loginForm'
})(Login);

export default connect(
  mapStateToProps,
  { submitLogin }
)(formWrap);
