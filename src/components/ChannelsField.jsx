
import React from 'react';
import { Nav } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import HeaderChannels from './channelsItems/HeaderChannels.jsx'
import { UnmutableChannel } from './channelsItems/UnmutableChannel.jsx'
import { MutableChannel } from './channelsItems/MutableChannel.jsx'

import {  
  actionsChannels,
  selectorsChannels,
} from '../slices/channelsSlice.js';

import {  
  actionsMessages,
  selectorsMessages,
} from '../slices/messagesSlice.js';

const getChannelsByMutableState = (channels) => {
  const unmutableChannels = [];
  const mutableChannels = [];
  
  channels.forEach((channel) => {
    if(channel.removable) mutableChannels.push(channel);
    if(!channel.removable) unmutableChannels.push(channel);
  });

  return { unmutableChannels, mutableChannels };
}


export const ChannelsField = () => {
  const channels = useSelector(selectorsChannels.selectAll);
  console.log(channels, 'channels');
  const currentChannelId = useSelector( (state) => state.activeChannel.currentChannelId);
  const messages = useSelector(selectorsMessages.selectAll)
  //Отображение Сообщений сделать!
  const { unmutableChannels, mutableChannels} = getChannelsByMutableState(channels);

    return (
      <div className='col-4 col-md-2 pt-5 px-0 h-100 bg-light border-end border-info'>

        <HeaderChannels />

        <Nav as="ul" variant="pills" className='flex-column'>

          { unmutableChannels.map((channel) => {
              const variant = channel.id === currentChannelId ? 'secondary' : null;
              return <UnmutableChannel  key={channel.id} channel={channel} variant={variant}/>
            }) 
          }

          { mutableChannels.map((channel) => {
              const variant = channel.id === currentChannelId ? 'info' : null;
              return <MutableChannel  key={channel.id} channel={channel} variant={variant}/>
            }) 
          }

        </Nav>

      </div>
    )
}

