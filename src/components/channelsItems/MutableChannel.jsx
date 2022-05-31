
import React from 'react';
import { Button, Nav, Dropdown, Badge  } from 'react-bootstrap';
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { withTranslation } from 'react-i18next';

export const MutableChannel = ({dataChannel, variant, t}) => {
  const { channel, messagesCounter } = dataChannel; 
    return (
        <Nav.Item as="li" className='w-100'>
          <Dropdown as={ButtonGroup}>

            <Button variant={variant} className='ps-4 w-100 rounded-0 text-start'>
                <span># {channel.name }</span>
                {' '}
                <Badge bg="primary" className='rounded-circle'>{messagesCounter}</Badge>
            </Button>

            <Dropdown.Toggle split variant={variant} id="dropdown-split" />

            <Dropdown.Menu>
              <Dropdown.Item as="button">{t("chatPage.ChangeNameOfChannel")}</Dropdown.Item>
              <Dropdown.Item as="button">{t("chatPage.removeChannel")}</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        </Nav.Item>
      )
}

export default withTranslation()(MutableChannel)