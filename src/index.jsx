// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from "react-router-dom";

import './i18n/i18n.js';

import App from './pages/App.jsx'


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


const container = ReactDOM.createRoot(document.querySelector('#chat'));
container.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)


