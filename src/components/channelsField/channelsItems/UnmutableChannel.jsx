
import React from 'react';
import { Button, Nav} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Popup from 'reactjs-popup';

import { handlerNewActiveChannel } from '../../../additionalFunction/handlers/handlerNewActiveChannel.js'

export const UnmutableChannel = ({dataChannel, variant}) => {
  const { channel, messagesCounter } = dataChannel; 
  const dispatch = useDispatch();
    return (
      <Nav.Item as="li" className='w-100 position-relative'>
        <Popup trigger={
                  <Button variant={variant} 
                          className='ps-3 w-100 rounded text-start position-relative'
                          onClick={handlerNewActiveChannel(channel.id, dispatch)}
                  >
                    <span># {channel.name }</span>
                  </Button>
                      }
               position='left'
               on={['hover', 'focus']}
               contentStyle={ 
                 {
                  display: 'inline-block',
                  padding: '0.35em 0.65em',
                  fontSize: '0.75em',
                  fontWeight: '700',
                  borderRadius: '50rem',
                  lineHeight: '1',
                  color: '#FFFFFF',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  verticalAlign: 'baseline',
                  backgroundColor: '#198754'
                }
               }
          >
           <span>+{messagesCounter}</span>             
        </Popup>
      </Nav.Item>
      )
}