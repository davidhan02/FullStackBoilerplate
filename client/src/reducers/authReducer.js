import {
  FETCH_USER,
  LOGOUT_USER,
  LOADING_DATA,
  CLEAR_LOADING
} from '../actions/types';
import isEmpty from '../utils/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: true
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: false,
        user: {},
        loading: false
      };
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case CLEAR_LOADING:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
