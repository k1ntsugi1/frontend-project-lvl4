
import { useModal, useSocket } from "../../../hooks/index.jsx";
import { useSelector, useDispatch } from 'react-redux';
import {  
    actionsChannels,
    selectorsChannels,
  } from '../../../slices/channelsSlice.js';

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
          } )
        },

        'removeChannelModal': () => {
          const { id } = channel;
          console.log(id, 'firstStep')
          socket.emit('renameChannel', { id }, (socket) => {
            if (socket.status !== 'ok') {
              console.log('error Заглушка');
              return;
            };
          });
    
          socket.once('renameChannel', (channelWithId) => {
            const { id } = channelWithId;
            console.log(id, 'secondStep')
            dispatch(actionsChannels.removeChannel( id ));
            handleClose(type)()
          } )
        }
      };

      mapping[type](); 
}