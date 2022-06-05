
import React from 'react';
import { Button, Nav, Dropdown, Badge} from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { withTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { handlerNewActiveChannel } from '../../../additionalFunction/handlers/handlerNewActiveChannel.js';
import { useModal } from '../../../hooks/index.jsx';
import DefaultModal from '../../modals/DefaultModal.jsx';
import RemoveModal from '../../modals/RemoveModal.jsx'
import Popup from 'reactjs-popup';


export const MutableChannel = ({dataChannel, variant, t}) => {
  const { channel, messagesCounter } = dataChannel;
  const dispatch = useDispatch();
  const { showState, handleShow} = useModal();

    return (
      <>
        <Nav.Item as="li" className='w-100'>
          <Dropdown as={ButtonGroup} className="w-100">
          <Popup trigger={
            
            <Button variant={variant} 
                    className='ps-3 w-100 rounded-start text-start'
                    onClick={handlerNewActiveChannel(channel.id, dispatch)}
            >
              <span className='m-auto'># {channel.name }</span>
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

            <Dropdown.Toggle split variant={variant} id="dropdown-split" className='rounded-end' />

            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleShow('renameChannelModal')}>{t("chatPage.channelsField.renameChannel")}</Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleShow('removeChannelModal')} >{t("chatPage.channelsField.removeChannel")}</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>

          { showState.renameChannelModal 
           ? <DefaultModal impact={{ type: 'renameChannelModal', value: channel }} /> 
           : null }
           
          { showState.removeChannelModal 
           ? <RemoveModal impact={{ type: 'removeChannelModal', value: channel }} /> 
           : null }

        </Nav.Item>
      </>
      )
}

export default withTranslation()(MutableChannel)