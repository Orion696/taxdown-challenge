import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import { watchLoginRequest, watchEditAndDeleteSubmissions } from './saga';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watchLoginRequest);
sagaMiddleware.run(watchLoginRequest);
sagaMiddleware.run(watchEditAndDeleteSubmissions);


export default store;
