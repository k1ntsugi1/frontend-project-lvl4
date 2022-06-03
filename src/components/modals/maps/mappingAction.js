
import { useModal, useSocket } from "../../../hooks/index.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";
import {  
    actionsChannels,
    selectorsChannels,
  } from '../../../slices/channelsSlice.js';
injectStyle();

export const mappingAction = (objOfProperties) => {
    const { socket, dispatch, handleClose, type, channel, value  } = objOfProperties;
    
    const mapping = {
        'addChannelModal': () => {
            console.log('add', value, channel)
          socket.emit('newChannel', { name: value }, (socket) => {
            if (socket.status !== 'ok') {
              console.log('error Заглушка');
              return;
            };
          });
          handleClose(type)()
        },
    
        'renameChannelModal': () => {
          const { id } = channel;
          socket.emit('renameChannel', { id, name: value }, (socket) => {
            if (socket.status !== 'ok') {
              console.log('error Заглушка');
              return;
            };
          });
          handleClose(type)()
        },

        'removeChannelModal': () => {
          const { id } = channel;
          console.log(id, 'firstStep')
          socket.emit('removeChannel', { id }, (socket) => {
            if (socket.status !== 'ok') {
              console.log('error Заглушка');
              return;
            };
          });
        handleClose(type)()
        }
      };

      mapping[type](); 
}