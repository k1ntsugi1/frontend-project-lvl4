
import React from "react";
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './slices/index.js';

import App from './pages/App.jsx'
import InitApp from "./InitApp";

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import './myAssets/styles/myStyles.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const container = ReactDOM.createRoot(document.querySelector('#chat'));

container.render(
  <BrowserRouter>
    <Provider store={store}>
      <InitApp>
        <App />
      </InitApp>
    </Provider>
  </BrowserRouter>
 
)


