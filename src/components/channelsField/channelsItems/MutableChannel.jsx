
import React from 'react';
import Popup from 'reactjs-popup';
import { Button, Nav, Dropdown, ButtonGroup} from 'react-bootstrap';

import { withTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { handlerNewActiveChannel } from '../../../additionalFunction/handlers/handlerNewActiveChannel.js';

import { actionsUiModal } from '../../../slices/uiModalSlice.js';

import DefaultModal from '../../modals/DefaultModal.jsx';
import RemoveModal from '../../modals/RemoveModal.jsx'



export const MutableChannel = ({dataChannel, variant, t}) => {
  const { channel, messagesCounter } = dataChannel;
  const dispatch = useDispatch();
  const stateModal = useSelector( (store) => store.uiModal )

    return (
      <>
        <Nav.Item as="li" className='w-100'>
          <Dropdown as={ButtonGroup} className="w-100">
          <Popup trigger={
            
            <Button variant={variant} 
                    className='ps-3 w-100 rounded-start text-start text-truncate'
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
              <Dropdown.Item as="button" onClick={() => dispatch(actionsUiModal.setModal({typeModal:'renameChannelModal'}))}>{t("chatPage.channelsField.renameChannel")}</Dropdown.Item>
              <Dropdown.Item as="button" onClick={() => dispatch(actionsUiModal.setModal({typeModal:'removeChannelModal'}))} >{t("chatPage.channelsField.removeChannel")}</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>

          { stateModal.renameChannelModal 
           ? <DefaultModal impact={{ type: 'renameChannelModal', value: channel }} /> 
           : null }
           
          { stateModal.removeChannelModal 
           ? <RemoveModal impact={{ type: 'removeChannelModal', value: channel }} /> 
           : null }

        </Nav.Item>
      </>
      )
}

export default withTranslation()(MutableChannel)