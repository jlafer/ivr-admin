import {call, put, select, takeEvery} from 'redux-saga/effects'
import {fetchAPI, addAPI, patchAPI, updateAPI, deleteAPI} from 'xverce-ajax';

import {API_START, API_SUCCESS, API_FAILURE} from '../actions/types';

const apiHostAndBase = () => 'http://localhost:9000';

function verbToApiCall(verb) {
	return {
		add: addAPI,
		fetch: fetchAPI,
		patch: patchAPI,
		update: updateAPI,
		delete: deleteAPI
	 }[verb];
}

const qryFilter = filter => (filter) ? `?filter=${JSON.stringify(filter)}` : '';

function* apiCall(action) {
  console.log('apiCall: action:', action);
  const {payload} = action;
  const {verb, domain, id, filter, data} = payload;
	const idElement = id ? `/${id}` : '';
  const url = `${apiHostAndBase()}/${domain}${idElement}${qryFilter(filter)}`;
	const api = verbToApiCall(verb);
  const getAuth = (state) => state.auth;
	try {
		const auth = yield select(getAuth);
		const inData = {token: auth.token, data: data};
		const res = yield call(api, url, inData);
		console.log('apiCall: received data:', res);
		yield put({type: API_SUCCESS, payload: {...payload, data: res}});
	} catch (e) {
		yield put({type: API_FAILURE, payload: {...payload, error: e}});
	}
}

/*
  Starts apiCall on each dispatched `API_START` action.
  Allows concurrent fetches of data.
*/
function* dataSaga() {
  yield takeEvery(API_START, apiCall);
}

export default dataSaga;