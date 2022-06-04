
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import HeaderChannels from './channelsItems/HeaderChannels.jsx'
import { UnmutableChannel } from './channelsItems/UnmutableChannel.jsx'
import MutableChannel from './channelsItems/MutableChannel.jsx'

import {  selectorsChannels } from '../../slices/channelsSlice.js';

import { selectorsMessages } from '../../slices/messagesSlice.js';

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
  const currentActiveChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
  const channels = useSelector(selectorsChannels.selectAll);
  const messages = useSelector(selectorsMessages.selectAll);

  const { unmutableChannels, mutableChannels} = getChannelsByMutableState(channels);

    return (
      <div className='col-4 col-md-2 pt-5 px-0 h-100 bg-light border-end border-info'>

        <HeaderChannels />

        <Nav as="ul" variant="pills" className='flex-column px-2'>
          { unmutableChannels.map((channel) => {
              const variant = getVariant(channel.id, currentActiveChannelId,'secondary');
              const messagesCurrentChannel = getMessagesCurrentChannel(channel.id, messages);
              return <UnmutableChannel  key={channel.id} 
                                        dataChannel={ {channel, messagesCounter: messagesCurrentChannel.length} } 
                                        variant={variant}
                      />
            }) 
          }

          { mutableChannels.map((channel) => {
              const variant = getVariant(channel.id, currentActiveChannelId,'secondary');
              const messagesCurrentChannel = getMessagesCurrentChannel(channel.id, messages);
              return <MutableChannel  key={channel.id} 
                                      dataChannel={ {channel, messagesCounter: messagesCurrentChannel.length} } 
                                      variant={variant}
                      />
            }) 
          }

        </Nav>

      </div>
    )
}

