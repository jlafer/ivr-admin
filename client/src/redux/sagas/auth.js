import {call, put, takeEvery} from 'redux-saga/effects';
import {authAPI} from 'xverce-ajax';

import {LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE}
	from '../actions/types';

const apiHostAndBase = () => 'http://localhost:9000';

function* authenticate(action) {
	const {payload} = action;
  // note the lack of trailing slash in url
  const authUrl = apiHostAndBase() + '/auth';
  console.log(`authenticate: authUrl=${authUrl}`);
	try {
    const data = yield call(authAPI, authUrl, {data: payload.data});
		const {authData} = data;
    console.log('authenticate: got token: ', authData.token);
		console.log('authenticate: got user: ', authData.user);
		const clientAuthData = {token: authData.token, user: authData.user};
		yield put({type: LOGIN_SUCCESS, payload: {...payload, data: clientAuthData}});
	 } catch (e) {
			yield put({type: LOGIN_FAILURE, payload: {...payload, error: e}});
	 }
}

function* logout(action) {
	const {payload} = action;
	try {
		yield put({type: LOGOUT_SUCCESS, payload});
	 } catch (e) {
		yield put({type: LOGOUT_FAILURE, payload: {...payload, error: e}});
	 }
}

/*
	Starts authenticate on each dispatched `LOGIN` action.
*/
function* authSaga() {
	yield takeEvery(LOGIN, authenticate);
	yield takeEvery(LOGOUT, logout);
}

export default authSaga;
