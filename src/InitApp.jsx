
import React from "react";
import { io } from "socket.io-client";
import toastes from "./toastes/toastes.js";
import i18n from "i18next";
import { initReactI18next, withTranslation } from "react-i18next";


import { SocketProvider } from "./Providers/SocketProvider";
import { AuthProvider } from "./Providers/AuthProvider";
import { BadWordsProvider } from "./Providers/BadWordsProvider";
import { useDispatch, batch} from "react-redux";

import translationRU from './i18n/locales/ru.json';
import translationEN from './i18n/locales/en.json';

import { actionsChannels } from './slices/dataChannelsSlice.js';
import { actionsMessages } from './slices/dataMessagesSlice.js';

import filterBadWords from "leo-profanity";
import words from "naughty-words";


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

const InitApp = ({t, children}) => {
  const dispatch = useDispatch()
  const socket = io();

  socket.on('newMessage', (messageWithId) => {
    const { id, body, channelId, username, time } = messageWithId;
    const newMessage = {
      body,
      channelId,
      username,
      id,
      time
    };
    dispatch(actionsMessages.addMessage(newMessage));
  });

  socket.on('newChannel', (channelWithId) => {
    const { id, removable, name  } = channelWithId;
    const newChannel = {
      id, 
      name,
      removable
    };
    batch( ()=> {
      dispatch(actionsChannels.addNewChannel(newChannel)); 
      dispatch(actionsChannels.setNewActiveChannelId({ newId: newChannel.id, typePreviousAct: 'addChannel' })); 
    })     
    toastes['newChannel'](t, name);
  });

  socket.on('renameChannel', (channelWithId) => {
    const { id, name  } = channelWithId;
    dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
    toastes['renameChannel'](t, name);
  });

  socket.on('removeChannel', (channelWithId) => {
    const { id } = channelWithId;
    batch( () => {
      dispatch(actionsChannels.removeChannel( id ));
      dispatch(actionsChannels.setNewActiveChannelId( { newId: id, typePreviousAct: 'removeChannel' } ));
    })   
    toastes['removeChannel'](t);
  })
    
  const ruBadWords = words.ru;
  filterBadWords.add(ruBadWords)

  return (
    <SocketProvider socket={socket}>
      <BadWordsProvider filterBadWords={filterBadWords}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </BadWordsProvider>
    </SocketProvider>
  )
}

export default withTranslation()(InitApp);