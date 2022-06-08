
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import '../assets/myStyles.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React , { useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import i18n from "i18next";
import { io } from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import store from './slices/index.js';

import { AuthContext, SocketContext, BadWordsContext } from './contexts/index.jsx';

import App from './pages/App.jsx'

import translationRU from './i18n/locales/ru.json';
import translationEN from './i18n/locales/en.json';

const filterBadWords = require("leo-profanity");
const words = require("naughty-words");

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


const ruBadWords = words.ru;
filterBadWords.add(ruBadWords)

//injectStyle();

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
      <SocketContext.Provider value={{ socket }}>
          {children}
      </SocketContext.Provider>
  )
}

const BadWordsProvider = ({filterBadWords, children}) => {
  return (
      <BadWordsContext.Provider value={{ filterBadWords }}>
          {children}
      </BadWordsContext.Provider>
  )
}


const container = ReactDOM.createRoot(document.querySelector('#chat'));
container.render(
    <BrowserRouter>
      <Provider store={store}>
        <SocketProvider socket={socket}>
          <BadWordsProvider filterBadWords={filterBadWords}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BadWordsProvider>
        </SocketProvider>
      </Provider>
    </BrowserRouter>
)


