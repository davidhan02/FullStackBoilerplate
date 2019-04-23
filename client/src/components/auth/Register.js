import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FormField from '../common/FormField';
import { submitRegister } from '../../actions/authActions';

const registerFields = [
  { label: 'Name', name: 'name' },
  { label: 'Email', name: 'email' },
  { label: 'Password', name: 'password' },
  { label: 'Confirm Password', name: 'password2' }
];

class Register extends Component {
  renderFields() {
    return registerFields.map(({ label, name }) => {
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
    this.props.submitRegister(formValues, this.props.history);
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <main>
        <h3>Login</h3>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {this.renderFields()}
          <button type="submit">Register</button>
        </form>
      </main>
    );
  }
}

Register.propTypes = {
  auth: PropTypes.object.isRequired,
  submitRegister: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth });

const validate = formValues => {
  const errors = {};

  registerFields.forEach(({ name }) => {
    if (!formValues[name]) {
      errors[name] = `You must provide a ${name}`;
    }
  });

  const { password, password2 } = formValues;
  if (password !== password2) {
    errors.password2 = 'Passwords do not match';
  }

  return errors;
};

const formWrap = reduxForm({
  validate,
  form: 'registerForm'
})(Register);

export default connect(
  mapStateToProps,
  { submitRegister }
)(formWrap);
