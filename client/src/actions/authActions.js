import axios from 'axios';
import { FETCH_USER, LOGOUT_USER, SET_ERRORS, CLEAR_ERRORS } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/users/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const logoutUser = history => async dispatch => {
  await axios.get('/api/users/logout');
  dispatch({
    type: LOGOUT_USER
  });
  history.push('/');
};

export const submitLogin = (formValues, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', formValues);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
    history.push('/login');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const submitRegister = (formValues, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/register', formValues);
    dispatch({
      type: FETCH_USER,
      payload: res.data
    });
    history.push('/login');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};
