
import React from 'react';
import { Button, Nav, Dropdown, Badge  } from 'react-bootstrap';

export const MutableChannel = ({channel, variant}) => {
    return (
        <Nav.Item as="li" className='w-100'>
          <Dropdown as={ButtonGroup}>

            <Button variant={variant} className='ps-4 w-100 rounded-0 text-start'>
                <span># {channel.name }</span> <Badge bg="outline-success" className='rounded-circle'>0</Badge>
            </Button>

            <Dropdown.Toggle split variant={variant} id="dropdown-split" />

            <Dropdown.Menu>
              <Dropdown.Item as="button">Переименовать</Dropdown.Item>
              <Dropdown.Item as="button">Удалить</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        </Nav.Item>
      )
}