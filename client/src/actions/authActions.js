import axios from 'axios';
import { FETCH_USER, LOGOUT_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/users/current_user');

  dispatch({
    type: FETCH_USER,
    payload: res.data
  });
};

export const logoutUser = () => async dispatch => {
  await axios.get('/api/users/logout');
  dispatch({
    type: LOGOUT_USER
  });
};
