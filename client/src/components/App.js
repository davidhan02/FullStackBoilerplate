import React, { Component, Fragment } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/authActions';
import PropTypes from 'prop-types';

import PrivateRoute from './common/PrivateRoute';
import Header from './layout/Header';
import Login from './auth/Login';
const Dashboard = () => <h2>Dashboard</h2>;
const Register = () => <h2>Register</h2>;
const Landing = () => <h2>Landing</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <Header />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired
};

export default connect(
  null,
  { fetchUser }
)(App);
