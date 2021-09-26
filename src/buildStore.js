import { createStore, applyMiddleware, compose } from 'redux';
import reduxMulti from 'redux-multi';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas/index';

export default function buildStore(apiUrl) {
    let myState;
    const sagaMiddleWare = createSagaMiddleware();
    const middleware = applyMiddleware(sagaMiddleWare, reduxMulti);
    const enhancer = compose(middleware);
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(rootReducer, myState, composeEnhancers(enhancer));

    sagaMiddleWare.run(rootSaga(apiUrl));

    return store;
}