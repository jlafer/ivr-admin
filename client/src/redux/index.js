import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';
import authSaga from './sagas/auth';
import dataSaga from './sagas/data';

const sagaMiddleware = createSagaMiddleware()
let store = createStore(rootReducer, applyMiddleware(
  sagaMiddleware,
  createLogger()
));
sagaMiddleware.run(authSaga);
sagaMiddleware.run(dataSaga);

export default store;