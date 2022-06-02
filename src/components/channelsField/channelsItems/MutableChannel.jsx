
import React from 'react';
import { Button, Nav, Dropdown, Badge  } from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { withTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { handlerNewActiveChannel } from '../../../additionalFunction/handlers/handlerNewActiveChannel.js';
import { useModal } from '../../../hooks/index.jsx';
import DefaultModal from '../../modals/DefaultModal.jsx';
import RemoveModal from '../../modals/RemoveModal.jsx'

export const MutableChannel = ({dataChannel, variant, t}) => {
  const { channel, messagesCounter } = dataChannel;
  const dispatch = useDispatch();
  const { showState, handleShow} = useModal();

    return (
      <>
        <Nav.Item as="li" className='w-100'>
          <Dropdown as={ButtonGroup} className="w-100">

            <Button variant={variant} 
                    className='ps-4 w-100 rounded-0 text-start position-relative '
                    onClick={handlerNewActiveChannel(channel.id, dispatch)}
            >
            <Badge bg="primary" pill>
              +{messagesCounter}
            </Badge>
                <span># {channel.name }</span>

            </Button>

            <Dropdown.Toggle split variant={variant} id="dropdown-split" />

            <Dropdown.Menu>
              <Dropdown.Item as="button" onClick={handleShow('renameChannelModal')}>{t("chatPage.renameChannel")}</Dropdown.Item>
              <Dropdown.Item as="button" onClick={handleShow('removeChannelModal')} >{t("chatPage.removeChannel")}</Dropdown.Item>
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