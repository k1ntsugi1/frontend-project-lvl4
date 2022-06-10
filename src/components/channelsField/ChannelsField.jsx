
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import HeaderChannels from './channelsItems/HeaderChannels.jsx'
import { UnmutableChannel } from './channelsItems/UnmutableChannel.jsx'
import MutableChannel from './channelsItems/MutableChannel.jsx'

import {  selectorsChannels } from '../../slices/dataChannelsSlice.js';

import { selectorsMessages } from '../../slices/dataMessagesSlice.js';

import { getMessagesCurrentChannel } from '../../additionalFunction/getMessagesCurrentChannel.js'


const getChannelsByMutableState = (channels) => {
  const unmutableChannels = [];
  const mutableChannels = [];
  
  channels.forEach((channel) => {
    if(channel.removable) mutableChannels.push(channel);
    if(!channel.removable) unmutableChannels.push(channel);
  });

  return { unmutableChannels, mutableChannels };
};

const getVariant = (currentChannelId, currentActiveChannelId, variant) => {
  return currentChannelId === currentActiveChannelId ? variant : null;
};


export const ChannelsField = () => {
  const currentActiveChannelId = useSelector( (store) => store.dataChannels.currentChannelId);
  const channels = useSelector(selectorsChannels.selectAll);
  const messages = useSelector(selectorsMessages.selectAll);

  const { unmutableChannels, mutableChannels} = getChannelsByMutableState(channels);

    return (
      <div className='pt-5 px-0 col-4 col-md-2 h-100 border-end border-success bg-light'>

        <HeaderChannels />
      <div className=' m-0  h-90  w-100 scrollbar2 scrollbar-success bg-light' >
        <Nav as="ul" variant="pills" className='flex-column px-2'>
          { unmutableChannels.map((channel) => {
              const variant = getVariant(channel.id, currentActiveChannelId,'success');
              const messagesCurrentChannel = getMessagesCurrentChannel(channel.id, messages);
              return <UnmutableChannel  key={channel.id} 
                                        dataChannel={ {channel, messagesCounter: messagesCurrentChannel.length} } 
                                        variant={variant}
                      />
            }) 
          }

          { mutableChannels.map((channel) => {
              const variant = getVariant(channel.id, currentActiveChannelId,'success');
              const messagesCurrentChannel = getMessagesCurrentChannel(channel.id, messages);
              return <MutableChannel  key={channel.id} 
                                      dataChannel={ {channel, messagesCounter: messagesCurrentChannel.length} } 
                                      variant={variant}
                      />
            }) 
          }

        </Nav>
</div>
      </div>
    )
}

