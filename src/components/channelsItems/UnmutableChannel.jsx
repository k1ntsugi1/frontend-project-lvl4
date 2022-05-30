
import React from 'react';
import { Button, Nav, Badge  } from 'react-bootstrap';

export const UnmutableChannel = ({channel, variant}) => {
    return (
      <Nav.Item as="li" className='w-100'>
        <Button variant={variant} className='ps-4 w-100 rounded-0 text-start'>
            <span># {channel.name }</span> <Badge bg="success" className='rounded-circle'>0</Badge>
        </Button>
      </Nav.Item>
      )
}