
import React from 'react';
import { Button, Nav, Badge  } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { handlerNewActiveChannel } from '../../additionalFunction/handlers/handlerNewActiveChannel.js'

export const UnmutableChannel = ({dataChannel, variant}) => {
  const { channel, messagesCounter } = dataChannel; 
  const dispatch = useDispatch();
    return (
      <Nav.Item as="li" className='w-100'>
        <Button variant={variant} 
                className='ps-4 w-100 rounded-0 text-start position-relative'
                onClick={handlerNewActiveChannel(channel.id, dispatch)}
        >
            <Badge bg="primary" pill>
              +{messagesCounter}
            </Badge>
            <span># {channel.name }</span>
            {' '}
        </Button>
      </Nav.Item>
      )
}