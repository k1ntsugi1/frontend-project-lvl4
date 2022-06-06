
import {  
    actionsChannels,
  } from '../../slices/dataChannelsSlice.js';

export  const handlerNewActiveChannel = (id, dispatch) => () => {
    dispatch(actionsChannels.setNewActiveChannelId({ newId: id, typePreviousAct: 'clickOnChannel' }));
  } 