
import React from 'react';
import { Button, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';
import { handlerNewActiveChannel } from '../../../additionalFunction/handlers/handlerNewActiveChannel.js'

export const UnmutableChannel = ({dataChannel, variant}) => {
  const { channel, messagesCounter } = dataChannel; 
  const dispatch = useDispatch();
    return (
      <Nav.Item as="li" className='w-100'>
        <Button variant={variant} 
                className='ps-4 w-100 rounded-3 text-start position-relative'
                onClick={handlerNewActiveChannel(channel.id, dispatch)}
        >
            <span class=" positiona-absolute start-0 top-0 badge rounded-pill bg-info">
              +{messagesCounter}
              <span class="visually-hidden">unread messages</span>
            </span>
            <span># {channel.name }</span>
            {' '}
        </Button>
      </Nav.Item>
      )
}