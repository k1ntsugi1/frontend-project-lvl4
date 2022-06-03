

import toastes from "../../../toastes/toastes.js";

export const mappingAction = (objOfProperties) => {
    const { socket, t, handleClose, type, channel, value  } = objOfProperties;
    
    const mapping = {
        'addChannelModal': () => {
          socket.emit('newChannel', { name: value }, (response) => {
            if (response.status !== 'ok') {
              toastes["errorNetwork"](t)
              return;
            };
          });
          handleClose(type)()
        },
    
        'renameChannelModal': () => {
          const { id } = channel;
          socket.emit('renameChannel', { id, name: value }, (response) => {
            if (response.status !== 'ok') {
              toastes["errorNetwork"](t)
              return;
            };
          });
          handleClose(type)()
        },

        'removeChannelModal': () => {
          const { id } = channel;
          console.log(id, 'firstStep')
          socket.emit('removeChannel', { id }, (response) => {
            if (response.status !== 'ok') {
              toastes["errorNetwork"](t)
              return;
            };
          });
        handleClose(type)()
        }
      };

      mapping[type](); 
}