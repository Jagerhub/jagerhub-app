import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancer = composeWithDevTools({ trace: true });

export default createStore(
  rootReducer,
  composeEnhancer(
    applyMiddleware(sagaMiddleware)
  ),
);

sagaMiddleware.run(rootSaga);
