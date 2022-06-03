
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
    
          socket.once('newChannel', (channelWithId) => {
            const { id, removable, name  } = channelWithId;
            const newChannel = {
              id, 
              name,
              removable
            };
            dispatch(actionsChannels.addNewChannel(newChannel));
            handleClose(type)()
            toast('⭐ Канал создан!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          })
        },
    
        'renameChannelModal': () => {
          const { id } = channel;
          socket.emit('renameChannel', { id, name: value }, (socket) => {
            if (socket.status !== 'ok') {
              console.log('error Заглушка');
              return;
            };
          });
    
          socket.once('renameChannel', (channelWithId) => {
            const { id, name  } = channelWithId;
            dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
            handleClose(type)()
            toast('🦄 Канал перименован!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          } )
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
    
          socket.once('removeChannel', (channelWithId) => {
            const { id } = channelWithId;
            dispatch(actionsChannels.removeChannel( id ));
            handleClose(type)()
            toast('😲 Канал удален!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
          } )
        }
      };

      mapping[type](); 
}