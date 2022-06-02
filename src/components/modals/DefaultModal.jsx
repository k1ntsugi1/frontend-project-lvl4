
import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, InputGroup, Form  } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { withTranslation } from "react-i18next";
import { useModal, useSocket } from "../../hooks/index.jsx";
import { useImmer } from "use-immer";
import mappingTitle from '../modals/maps/mappingTitle.js'
import { mappingAction } from '../modals/maps/mappingAction.js'

import _ from 'lodash';
import {  
  actionsChannels,
  selectorsChannels,
} from '../../slices/channelsSlice.js';



const DefaultModal = ({t, impact}) => {
  const { showState, handleClose } = useModal();
  const { socket } = useSocket();
  const dispatch = useDispatch();

  const inputRef = useRef()
  const channels = useSelector(selectorsChannels.selectAll)

  const { type, value: channel  } = impact;

  const [inputValue, setInputValue] = useState('');

  const [errorStore, updateErrorStore ] = useImmer({errorValue: '', containError: false, validatedCount: 0});

  const handleErrorValue = (string) => {

    updateErrorStore((draft) => {
      draft.errorValue = string;
      draft.containError = true;
      draft.validatedCount += 1;
    } )
  };

  const resetErrorStore = () => {
    
    updateErrorStore((draft) => {
      draft.errorValue = null;
      draft.containError = false;
      draft.validatedCount += 1;
    })
  };

 const validate = () => {
  if ( inputValue === '' ) return handleErrorValue(t("modal.errors.required"));
 
  if ( inputValue.length > 10 ) return handleErrorValue(t("modal.errors.tooLong"));

  const isUniq = _.find(channels, (channel) => channel.name === inputValue ) ? false : true;
  if (!isUniq ) return handleErrorValue(t("modal.errors.isNotUniq"));
  resetErrorStore()
}

  useEffect( () => {
    inputRef.current.focus();
  })

  useEffect( () => {
    if(errorStore.errorValue === null && errorStore.containError === false ) mappingAction({type, channel, socket, dispatch, handleClose, value: inputValue})
  }, [errorStore.validatedCount])

  // валидация на доставку собщений о каналах
  return (
    <Modal centered show={showState[type]} onHide={handleClose(type)}>

      <Modal.Header closeButton>
        <Modal.Title>{t(mappingTitle[type]())}</Modal.Title>
      </Modal.Header>

            <Modal.Body>
              <InputGroup >
              <Form.Control
                    id={type}
                    name={type}
                    placeholder=""
                    aria-label={type}
                    value={inputValue}
                    ref={inputRef}
                    onChange={({target}) => setInputValue(target.value) }
                    isInvalid={errorStore.containError}
              />
              <Form.Control.Feedback type="invalid" tooltip>
                        {errorStore.errorValue}
              </Form.Control.Feedback>
              </InputGroup >
            </Modal.Body>

            <Modal.Footer className="p-0">
              <Button variant="secondary" onClick={handleClose(type)}>
                {t("modal.cancel")}
              </Button>
              <Button variant="primary"  onClick={validate}>
                {t("modal.send")}
              </Button>
            </Modal.Footer>

       </Modal>
        )
}

export default withTranslation()(DefaultModal);