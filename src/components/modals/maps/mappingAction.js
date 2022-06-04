

import toastes from "../../../toastes/toastes.js";

export const mappingAction = (objOfProperties) => {
    const { socket, t, handleClose, type, channel, value, filterBadWords  } = objOfProperties;

    const isBadWord = (string) => {
      if(filterBadWords.check(string)) {
        toastes["badWord"](t);
        handleClose(type)()
        return true;
      };
      return false
    };
    
    const mapping = {
        'addChannelModal': () => {
          if(isBadWord(value)) return;

          socket.emit('newChannel', { name: value }, (response) => {
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
          handleClose(type)()
        },
    
        'renameChannelModal': () => {
          if(isBadWord(value)) return;
          const { id } = channel;
          socket.emit('renameChannel', { id, name: value }, (response) => {
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
          handleClose(type)()
        },

        'removeChannelModal': () => {
          const { id } = channel;
          console.log(id, 'firstStep')
          socket.emit('removeChannel', { id }, (response) => {
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
        handleClose(type)()
        }
      };

      mapping[type](); 
}