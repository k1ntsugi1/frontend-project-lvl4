
import React from 'react';
import { withTranslation } from "react-i18next";
import { Button, Modal } from 'react-bootstrap';
import mappingTitle from '../modals/maps/mappingTitle.js'
import { mappingAction } from '../modals/maps/mappingAction.js'
import { useModal, useSocket } from "../../hooks/index.jsx";
import { useSelector, useDispatch } from 'react-redux';

export const RemoveModal = ({t, impact}) => {
    const { type, value: channel } = impact;
    const { showState, handleClose } = useModal();
    const { socket } = useSocket();

    const handlerRemovingChannel = () => {
      mappingAction({type, channel, socket, t, handleClose, value: null});
    };

    return (
        <Modal centered show={showState[type]} onHide={handleClose(type)}>

        <Modal.Header closeButton>
          <Modal.Title>{t(mappingTitle[type]())}</Modal.Title>
        </Modal.Header>
  
              <Modal.Body>
                {t("modal.removeBody")}
              </Modal.Body>
  
              <Modal.Footer className="p-0">
                <Button variant="secondary" onClick={handleClose(type)}>
                  {t("modal.cancel")}
                </Button>
                <Button variant="danger" onClick={handlerRemovingChannel}>
                  {t("modal.remove")}
                </Button>
              </Modal.Footer>
  
         </Modal>
    )
}

export default withTranslation()(RemoveModal)