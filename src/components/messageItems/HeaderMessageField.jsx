
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {  
    selectorsChannels,
} from '../../slices/channelsSlice.js';

export const HeaderMessageField = () => {
    const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
    // const channels = useSelector(selectorsChannels.selectAll);
    // что-то странное творится - через деструктуризацию и фильтер не работае а так работает хмммм
    //const  currentActiveChannel = channels.find(({id}) => (id === currentActiveChannelId)) ?? null;
    const  currentActiveChannel = useSelector( (state) => selectorsChannels.selectById(state,currentActiveChannelId ) ) ?? null


    return (
        <div className="bg-light mb-3 p-3 shadow-sm small">
            <h3># {currentActiveChannel && currentActiveChannel['name'] }</h3>
        </div>
    )
}