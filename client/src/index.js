import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import promiseMiddlerware from 'redux-promise';
import rootReducer from './_reducers/index';

const store = createStore(rootReducer, compose(
  applyMiddleware(promiseMiddlerware,reduxThunk),
  window.navigator.userAgent.includes('Chrome') ?
  window.__REDUX_DEVTOOLS_EXTENSION__ && 
  window.__REDUX_DEVTOOLS_EXTENSION__() : compose
));

ReactDOM.render(
  <Provider store={ store }>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
