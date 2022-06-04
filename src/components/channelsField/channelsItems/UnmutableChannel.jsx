
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
        <Popup trigger={
                  <Button variant={variant} 
                          className='ps-3 w-100 rounded-3 text-start position-relative'
                          onClick={handlerNewActiveChannel(channel.id, dispatch)}
                  >
                    <span># {channel.name }</span>
                  </Button>
                      }
               position='left'
               on={['hover', 'focus']}
               contentStyle={ 
                 {marginRight: '8px',
                  padding: "2px",
                  color: '#00022f',
                  textAlign: 'center',
                  backgroundColor: '#e8e8e8',
                  borderRadius: '10px',
                  opacity: '90%'}
               }
          >
           <span>+{messagesCounter}</span>             
        </Popup>
      </Nav.Item>
      )
}