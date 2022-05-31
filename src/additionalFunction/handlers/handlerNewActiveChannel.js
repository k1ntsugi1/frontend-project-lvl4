
import {  
    actionsActiveChannel,
  } from '../../slices/activeChannelSlice.js';

export  const handlerNewActiveChannel = (id, dispatch) => () => {
    dispatch(actionsActiveChannel.setNewActiveChannelId(id));
  } 