
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, InputGroup, FormControl  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from "react-i18next";
import { useModal, useSocket } from "../hooks/index.jsx";
import {  
  actionsChannels,
  selectorsChannels,
} from '../slices/channelsSlice.js';

const DefaultModal = ({t, impact}) => {

  const { type, value  } = impact;
  const [inputValue, setInputValue] = useState('');
  const { show, handleClose } = useModal()
  const { socket } = useSocket();
  const dispatch = useDispatch();
  const inputRef = useRef()
  
  useEffect( () => {
    inputRef.current.focus();
  } )

  const mappingTitle = {
    'showAddChannelModal': () => "modal.headerAdding",
    'showRenameChannelModal': () => "modal.headerChangeName"
  };

  const mappingAction = {

    'showAddChannelModal': (nameOfChannel) => () => {
      socket.emit('newChannel', { nameOfChannel }, (socket) => {
        if (socket.status !== 'ok') {
          console.log('error Заглушка');
          return;
        };
      });
      socket.once('newChannel', (channelWithId) => {
        const { id, removable, nameOfChannel  } = channelWithId;
        const newChannel = {
          id, 
          name: nameOfChannel,
          removable
        };
        dispatch(actionsChannels.addNewChannel(newChannel));
        handleClose(type)()
      } )
    },

    'showRenameChannelModal': (newNameOfChannel) => () => {
      const { id } = value;
      socket.emit('renameChannel', { id, name: newNameOfChannel }, (socket) => {
        if (socket.status !== 'ok') {
          console.log('error Заглушка');
          return;
        };
      });
      socket.once('renameChannel', (channelWithId) => {
        console.log('hmmmmmmmmmmmmmmmmmmm');
        const { id, name  } = channelWithId;
        console.log(id, name)
        dispatch(actionsChannels.updateNameOfChannel({id, changes: {name} }));
        handleClose(type)()
      } )
    }

  }
  // валидация на длину и доставку собщений о каналах
  return (
    <Modal centered show={show[type]} onHide={handleClose(type)}>

      <Modal.Header closeButton>
        <Modal.Title>{t(mappingTitle[type]())}</Modal.Title>
      </Modal.Header>

            <Modal.Body>
              <InputGroup >
              <FormControl
                    id={type}
                    name={type}
                    placeholder=""
                    aria-label={type}
                    value={inputValue}
                    ref={inputRef}
                    onChange={({target}) => setInputValue(target.value) }
              />
              </InputGroup >
            </Modal.Body>

            <Modal.Footer className="p-0">
              <Button variant="secondary" onClick={handleClose(type)}>
                {t("modal.cancel")}
              </Button>
              <Button variant="primary" onClick={mappingAction[type](inputValue)}>
                {t("modal.send")}
              </Button>
            </Modal.Footer>

       </Modal>
        )
}

export default withTranslation()(DefaultModal);