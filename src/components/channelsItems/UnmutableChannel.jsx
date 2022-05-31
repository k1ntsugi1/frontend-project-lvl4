
import React from 'react';
import { Button, Nav, Badge  } from 'react-bootstrap';

export const UnmutableChannel = ({dataChannel, variant}) => {
  const { channel, messagesCounter } = dataChannel; 
    return (
      <Nav.Item as="li" className='w-100'>
        <Button variant={variant} className='ps-4 w-100 rounded-0 text-start'>
            <span># {channel.name }</span>
            {' '}
            <Badge bg="primary" className='rounded-circle'>{messagesCounter}</Badge>
        </Button>
      </Nav.Item>
      )
}