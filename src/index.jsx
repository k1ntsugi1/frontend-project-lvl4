
import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';
import '../assets/myStyles.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

import React , { useState} from 'react';
import * as ReactDOM from 'react-dom/client';
import * as RollbarModule from '@rollbar/react';
import i18n from "i18next";
import { io } from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import { initReactI18next } from "react-i18next";
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css'

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

const rollbarConfig = {
  accessToken: 'c2ae4cb92bcb4d098630266cfd62c42d',
  environment: 'production',
};

const ErrorDisplay = ({ error, resetError }) => {
  console.log(error, resetError, 'Rollbar');
  return (
    <div className="d-flex flex-column justify-content-center h-100 my-4 pt-5 rounded shadow border border-warning bg-white">
      <h3 className='text-danger pb-3'>Как-то накосячили программисты...</h3>
      <p className='px-3'>Ошибка уже отправлена автору</p>
      <p className='px-3 align-self-end fw-lighter'>Если ты делал эту страницу, то перейди в devTools, а потом в rollbar</p>
    </div>
  )
};
const container = ReactDOM.createRoot(document.querySelector('#chat'));
container.render(
  <RollbarModule.Provider config={rollbarConfig}>
    <RollbarModule.ErrorBoundary fallbackUI={ErrorDisplay}>
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
    </RollbarModule.ErrorBoundary>
  </RollbarModule.Provider>
)


