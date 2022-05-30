
import React from 'react';
import { Button, Nav, Dropdown } from 'react-bootstrap';

export const Channels = ({channels, currentChannelId}) => {

    const removableChannels = [];
    const unRemovableChannels = [];
    channels.forEach((channel) => {
        if(channel.removable) removableChannels.push(channel);
        if(!channel.removable) unRemovableChannels.push(channel);
    })

    return (
        <Nav as="ul" className='flex-column'>
          { unRemovableChannels.map((channel) => {
            const variant = channel.id === currentChannelId ? 'primary' : 'outline-primary';
            return (
              <Nav.Item key={channel.id} as="li">
                <Button variant={ variant }>{ channel.name }</Button>
              </Nav.Item>
              )
            }) 
          }
          { removableChannels.map((channel) => {
            const variant = channel.id === currentChannelId ? 'primary' : 'outline-primary';
              return (
                <Nav.Item key={channel.id} as="li">
                  <Dropdown as={ButtonGroup}>

                    <Button variant={ variant }>{ channel.name }</Button>
                    <Dropdown.Toggle split variant="primary" id="dropdown-split" />

                    <Dropdown.Menu>
                      <Dropdown.Item as="button">Переименовать</Dropdown.Item>
                      <Dropdown.Item as="button">Удалить</Dropdown.Item>
                    </Dropdown.Menu>

                  </Dropdown>
                </Nav.Item>
              )
            }) 
          }
        </Nav>
    )
}