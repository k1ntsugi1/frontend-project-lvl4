

import toastes from "../../../toastes/toastes.js";

export const mappingActionsUiModal = (objOfProperties) => {
    const { socket, t, dispatch,  handleClose, type, channel, value, filterBadWords  } = objOfProperties;

    const isBadWord = (string) => {
      if(filterBadWords.check(string)) {
        toastes["badWord"](t);
        dispatch(handleClose({typeModal: type}))
        return true;
      };
      return false
    };
    
    const mapping = {
        'addChannelModal': () => {
          if(isBadWord(value)) return;

          socket.emit('newChannel', { name: value }, (response) => {
            console.log(response)
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
          dispatch(handleClose({typeModal:type}))
        },
    
        'renameChannelModal': () => {
          if(isBadWord(value)) return;
          const { id } = channel;
          socket.emit('renameChannel', { id, name: value }, (response) => {
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
          dispatch(handleClose({typeModal:type}))
        },

        'removeChannelModal': () => {
          const { id } = channel;
          console.log(id, 'firstStep')
          socket.emit('removeChannel', { id }, (response) => {
            if (response.status !== 'ok') toastes["errorNetwork"](t);
          });
          dispatch(handleClose({typeModal:type}))
        }
      };

      mapping[type](); 
}