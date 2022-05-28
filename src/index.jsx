// @ts-check

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import '../assets/application.scss';

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
} from "react-router-dom";

import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next"
import languages from './resources/languages.js'

import { App } from './pages/App.jsx'





if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

i18n.use(initReactI18next)
    .init({
      lng: "ru",
      resources: languages.ru,
    })

const { t } = useTranslation();

const LangContext = React.createContext({});

const container = ReactDOM.createRoot(document.querySelector('#chat'));
container.render(
  <LangContext.Provider value={ {t} }>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </LangContext.Provider>

)


