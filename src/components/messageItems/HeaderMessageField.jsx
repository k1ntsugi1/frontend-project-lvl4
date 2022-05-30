
import React from 'react';
import { useSelector } from 'react-redux';
import {  
    selectorsChannels,
} from '../../slices/channelsSlice.js';

export const HeaderMessageField = () => {
    const currentChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    const channels = useSelector(selectorsChannels.selectAll);
    console.log(channels, 'channels messagefield', currentChannelId)
    const  currentActiveChannel = channels.filter(({id}) => (id === currentChannelId));
    
    //console.log(currentActiveChannel.name, 'currentChannel2');

    return (
        <div className="bg-light mb-2 p-3 shadow-sm small">
            <h3># { currentActiveChannel.name }</h3>
        </div>
    )
}