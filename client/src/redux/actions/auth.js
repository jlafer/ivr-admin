import {LOGIN, LOGOUT} from './types';

export const attemptLogin = (username, password) => {
	return {
		type: LOGIN,
		payload: {data: {username: username, password: password}}
	};
};

export const attemptLogout = (username) => {
	return {
		type: LOGOUT,
		payload: {username}
	};
};
