import {LOGIN_SUCCESS, LOGOUT, LOGIN_FAILURE, RESUME_SESSION}
	from '../actions/types';

const defaultState = {
	isLoggedIn: false,
	token: '',
  user: {}
};

export default function reducer(state = defaultState, action) {
  switch (action.type) {
		case LOGIN_SUCCESS:
		case RESUME_SESSION:
			let authData = action.payload.data;
		  return {isLoggedIn: true, ...authData};
		case LOGIN_FAILURE:
			//console.error('LOGIN_FAILURE:', action.payload);
			return state;
		case LOGOUT:
			//TODO need to remove userToken from storage; navigate to Auth
		  return defaultState;
	  default:
		  return state;
  }
}