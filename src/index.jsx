
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React , { useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import i18n from "i18next";
import { io } from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from 'react-redux';
import { injectStyle } from "react-toastify/dist/inject-style";

import store from './slices/index.js';

import { AuthContext } from './contexts/index.jsx';
import { SocketContex } from './contexts/index.jsx';

import App from './pages/App.jsx'

import translationRU from './i18n/locales/ru.json';
import translationEN from './i18n/locales/en.json';



if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const resources = {
  en: {
    translation: translationEN
  },
  ru: {
    translation: translationRU
  }
}

i18n.use(initReactI18next)
    .init({
      debug: true,
      fallbackLng: 'ru',
      resources,
      interpolation: {
        escapeValue: false,
      },
})

const socket = io();

injectStyle();

const AuthProvider = ({children}) => {
  const userId = JSON.parse(localStorage.getItem('userId')) ?? false;
  const startState = (userId && userId.token) ? true : false; 
  const [loggedIn, setLoggetIn] = useState(startState);

  const logIn = () => setLoggetIn(true);
  const logOut = () => {
      localStorage.removeItem('userId');
      setLoggetIn(false);
  }

  return (
      <AuthContext.Provider value={ {loggedIn, logIn, logOut} }>
          { children }
      </AuthContext.Provider>
  )
};

const SocketProvider = ({socket, children}) => {
  return (
      <SocketContex.Provider value={{ socket }}>
          {children}
      </SocketContex.Provider>
  )
}


const container = ReactDOM.createRoot(document.querySelector('#chat'));
container.render(
    <BrowserRouter>
      <Provider store={store}>
        <AuthProvider>
          <SocketProvider socket={socket}>
            <App />
          </SocketProvider>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
)


