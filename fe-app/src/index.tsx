import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { applyMiddleware, createStore } from 'redux';

import App from './App';
import { combinedReducer } from './common/redux';
import authSagas from './common/redux/auth/sagas';

import './index.scss';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = composeWithDevTools({});
const store = createStore(combinedReducer, composeEnhancers(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(authSagas);

ReactDOM.render(
    <Provider store={store}>
        {/* <React.StrictMode> */}
        <App />
        {/* </React.StrictMode> */}
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
